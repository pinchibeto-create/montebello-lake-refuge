import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { BedDouble, CalendarDays, ChevronLeft, ChevronRight, CircleUserRound, Eye, FileText, LogOut, MessageCircle, Pencil, Plus, X } from "lucide-react";
import { getRecoverySessionFromUrl, getStoredSession, invokeFunction, requestPasswordReset, resendSignupConfirmation, rest, signIn, signOutLocal, updatePassword, type AuthSession } from "../lib/supabase-rest";

export const Route = createFileRoute("/panel")({
  head: () => ({ meta: [{ title: "Panel de reservaciones | Cinco Lagos" }, { name: "robots", content: "noindex, nofollow" }] }),
  component: PanelPage,
});

type Membership = { cliente_id: string; rol: "admin" | "operador" | "lectura" };
type Cabin = { id: string; nombre: string; codigo: string; orden: number };
type Source = "booking" | "airbnb" | "social" | "local" | "directa" | "otro";
type Payment = "pendiente" | "anticipo" | "pagado";
type Reservation = {
  id: string; cabin_id: string; source: Source; guest_name: string | null; guest_phone: string | null;
  check_in: string; check_out: string; guests: number | null;
  status: "pendiente" | "confirmada" | "cancelada" | "completada";
  payment_status: Payment; total_amount: number | null; paid_amount: number;
  reservation_code: string; payment_reference: string | null;
};

type PdfResult = { url: string; bytes?: number; generated_at?: string };

const sourceLabels: Record<Source, string> = { booking: "Booking", airbnb: "Airbnb", social: "Redes", local: "Local", directa: "Directa", otro: "Otro" };
const sourceStyles: Record<Source, string> = { booking: "bg-blue-100 text-blue-800", airbnb: "bg-rose-100 text-rose-800", social: "bg-violet-100 text-violet-800", local: "bg-amber-100 text-amber-900", directa: "bg-emerald-100 text-emerald-800", otro: "bg-slate-100 text-slate-700" };
const paymentLabels: Record<Payment, string> = { pendiente: "Pendiente", anticipo: "Anticipo", pagado: "Pagado" };
const paymentStyles: Record<Payment, string> = { pendiente: "bg-red-50 text-red-700", anticipo: "bg-amber-100 text-amber-900", pagado: "bg-emerald-100 text-emerald-800" };

function isoDate(d: Date) { return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; }
function addDays(d: Date, n: number) { const c = new Date(d); c.setDate(c.getDate() + n); return c; }
function displayDate(d: Date) { return new Intl.DateTimeFormat("es-MX", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(d); }
function shortDay(d: Date) { return new Intl.DateTimeFormat("es-MX", { weekday: "short" }).format(d).replace(".", ""); }
function shortDate(d: Date) { return new Intl.DateTimeFormat("es-MX", { day: "numeric", month: "short" }).format(d).replace(".", ""); }
function money(v: number | null) { return v == null ? "—" : new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(v); }
function whatsapp(phone: string | null) { if (!phone) return null; let n = phone.replace(/\D/g, ""); if (n.length === 10) n = `52${n}`; return `https://wa.me/${n}`; }

function PanelPage() {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [checking, setChecking] = useState(true);
  const [membership, setMembership] = useState<Membership | null>(null);
  const [cabins, setCabins] = useState<Cabin[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [startDate, setStartDate] = useState(() => new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [editing, setEditing] = useState<Reservation | null>(null);
  const [viewing, setViewing] = useState<Reservation | null>(null);

  const days = useMemo(() => Array.from({ length: 7 }, (_, i) => addDays(startDate, i)), [startDate]);
  const endDate = useMemo(() => addDays(startDate, 7), [startDate]);

  useEffect(() => {
    if (getRecoverySessionFromUrl()) {
      signOutLocal();
      setSession(null);
    } else {
      setSession(getStoredSession());
    }
    setChecking(false);
  }, []);
  useEffect(() => { if (session) void loadMembership(session); }, [session]);
  useEffect(() => { if (session && membership) void loadData(); }, [session, membership, startDate]);

  async function loadMembership(s: AuthSession) {
    try {
      const ms = await rest<Membership[]>(`usuario_clientes?select=cliente_id,rol&usuario_id=eq.${s.user.id}&activo=eq.true`, s);
      for (const m of ms) {
        const c = await rest<Array<{ slug: string }>>(`clientes?select=slug&id=eq.${m.cliente_id}`, s);
        if (c[0]?.slug === "cinco-lagos") { setMembership(m); return; }
      }
      setError("Tu cuenta todavía no tiene acceso a Cinco Lagos.");
    } catch (e) { setError(e instanceof Error ? e.message : "No se pudo verificar el acceso"); }
  }

  async function loadData() {
    if (!session || !membership) return;
    setLoading(true); setError("");
    try {
      const start = isoDate(startDate), end = isoDate(endDate);
      const [c, r] = await Promise.all([
        rest<Cabin[]>(`cabins?select=id,nombre,codigo,orden&cliente_id=eq.${membership.cliente_id}&activa=eq.true&order=orden.asc`, session),
        rest<Reservation[]>(`reservations?select=id,cabin_id,source,guest_name,guest_phone,check_in,check_out,guests,status,payment_status,total_amount,paid_amount,reservation_code,payment_reference&cliente_id=eq.${membership.cliente_id}&status=in.(pendiente,confirmada)&check_in=lt.${end}&check_out=gt.${start}`, session),
      ]);
      setCabins(c); setReservations(r);
    } catch (e) { setError(e instanceof Error ? e.message : "No se pudieron cargar las reservaciones"); }
    finally { setLoading(false); }
  }

  function reservationFor(cabinId: string, day: Date) {
    const date = isoDate(day);
    return reservations.find(r => r.cabin_id === cabinId && r.check_in <= date && r.check_out > date);
  }

  const occupiedNights = useMemo(() => cabins.reduce((sum, c) => sum + days.filter(d => reservationFor(c.id, d)).length, 0), [cabins, days, reservations]);
  const totalNights = cabins.length * 7;
  const arrivals = reservations.filter(r => r.check_in >= isoDate(startDate) && r.check_in < isoDate(endDate)).length;

  if (checking) return <LoadingScreen />;
  if (!session) return <LoginScreen onLogin={setSession} />;
  if (!membership) return <div className="grid min-h-screen place-items-center bg-[#f4f1ea] px-5 text-[#173c34]"><div className="max-w-lg rounded-3xl bg-white p-8"><h1 className="text-2xl font-semibold">Acceso pendiente</h1><p className="mt-3 text-sm">{error || "Verificando acceso…"}</p><button className="mt-6 rounded-2xl bg-[#173c34] px-5 py-3 text-white" onClick={() => { signOutLocal(); setSession(null); }}>Usar otra cuenta</button></div></div>;

  return <div className="min-h-screen bg-[#f4f1ea] text-[#173c34]">
    <header className="bg-[#123d34] text-white"><div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 md:px-8"><div className="flex items-center gap-3"><img src="/images/logo/cinco-lagos-logo.jpeg" alt="Cinco Lagos" className="h-11 w-11 rounded-full object-cover"/><div><p className="text-xs uppercase tracking-[.22em] text-white/60">Panel interno</p><h1 className="text-lg font-semibold">Cinco Lagos</h1></div></div><div className="flex items-center gap-2"><span className="hidden items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm sm:flex"><CircleUserRound className="h-4 w-4"/>{session.user.email}</span><button onClick={() => { signOutLocal(); setSession(null); setMembership(null); }} className="p-2"><LogOut className="h-5 w-5"/></button></div></div></header>

    <main className="mx-auto max-w-[1500px] px-5 py-7 md:px-8 md:py-10">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-sm font-medium capitalize text-[#2f7668]">{displayDate(startDate)} — {displayDate(addDays(startDate, 6))}</p><h2 className="mt-1 text-3xl font-semibold">Ocupación de cabañas</h2><p className="mt-2 text-sm text-[#173c34]/60">Vista de 7 días para revisar disponibilidad de un vistazo.</p></div>{membership.rol !== "lectura" && <button onClick={() => setShowNew(true)} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1f8f7a] px-5 py-3 text-sm font-semibold text-white"><Plus className="h-4 w-4"/> Nueva reservación</button>}</div>
      {error && <div className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-800">{error}</div>}

      <section className="mt-8 grid gap-4 sm:grid-cols-3"><MetricCard label="Noches ocupadas" value={`${occupiedNights} / ${totalNights || 49}`} detail="En los próximos 7 días"/><MetricCard label="Noches disponibles" value={`${Math.max(0, totalNights - occupiedNights)} / ${totalNights || 49}`} detail="Espacios libres en la semana"/><MetricCard label="Llegadas" value={String(arrivals)} detail="Durante estos 7 días"/></section>

      <section className="mt-8 overflow-hidden rounded-3xl border border-[#173c34]/10 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b px-5 py-5 sm:flex-row sm:items-center sm:justify-between md:px-7"><div className="flex items-center gap-3"><CalendarDays className="h-5 w-5 text-[#1f8f7a]"/><div><h3 className="font-semibold">Calendario de 7 días</h3><p className="text-xs text-[#173c34]/50">Desliza horizontalmente en celular</p></div></div><div className="flex gap-2"><button onClick={() => setStartDate(d => addDays(d, -7))} className="rounded-xl border p-2" aria-label="Semana anterior"><ChevronLeft className="h-4 w-4"/></button><button onClick={() => setStartDate(new Date())} className="rounded-xl border px-4 py-2 text-sm">Hoy</button><button onClick={() => setStartDate(d => addDays(d, 7))} className="rounded-xl border p-2" aria-label="Semana siguiente"><ChevronRight className="h-4 w-4"/></button></div></div>

        <div className="overflow-x-auto"><div className="min-w-[1120px]">
          <div className="grid grid-cols-[170px_repeat(7,minmax(130px,1fr))] border-b bg-[#f8f6f1]">
            <div className="px-5 py-4 text-xs font-semibold uppercase tracking-[.14em] text-[#173c34]/45">Cabaña</div>
            {days.map(d => <div key={isoDate(d)} className={`border-l px-3 py-3 text-center ${isoDate(d) === isoDate(new Date()) ? "bg-[#eaf6f1]" : ""}`}><div className="text-xs font-semibold uppercase text-[#1f8f7a]">{shortDay(d)}</div><div className="mt-1 text-sm font-semibold capitalize">{shortDate(d)}</div></div>)}
          </div>
          {loading ? <div className="p-8 text-sm">Cargando…</div> : cabins.map(c => <div key={c.id} className="grid grid-cols-[170px_repeat(7,minmax(130px,1fr))] border-b last:border-b-0">
            <div className="flex items-center gap-3 px-5 py-4"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#e6f0ec]"><BedDouble className="h-4 w-4"/></span><b className="text-sm">{c.nombre}</b></div>
            {days.map(d => {
              const r = reservationFor(c.id, d), wa = r ? whatsapp(r.guest_phone) : null;
              if (!r) return <div key={isoDate(d)} className="border-l p-2"><div className="flex h-full min-h-[104px] items-center justify-center rounded-xl bg-emerald-50 text-xs font-semibold text-emerald-700">Disponible</div></div>;
              return <div key={isoDate(d)} className="border-l p-2"><div className="min-h-[104px] rounded-xl bg-slate-50 p-2.5">
                <div className="flex flex-wrap gap-1"><span className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${sourceStyles[r.source]}`}>{sourceLabels[r.source]}</span><span className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${paymentStyles[r.payment_status]}`}>{paymentLabels[r.payment_status]}</span></div>
                <p className="mt-1.5 font-mono text-[10px] font-bold tracking-[.12em] text-[#1f8f7a]">#{r.reservation_code}</p>
                <p className="mt-1 truncate text-xs font-semibold" title={r.guest_name || "Reservación"}>{r.guest_name || "Reservación"}</p>
                <p className="mt-0.5 text-[10px] text-[#173c34]/50">{r.check_in} → {r.check_out}</p>
                <div className="mt-2 flex flex-wrap gap-1"><button onClick={() => setViewing(r)} className="inline-flex items-center gap-1 rounded-lg border bg-white px-2 py-1 text-[10px] font-semibold"><Eye className="h-3 w-3"/>Ver</button>{membership.rol !== "lectura" && <button onClick={() => setEditing(r)} className="inline-flex items-center gap-1 rounded-lg border bg-white px-2 py-1 text-[10px] font-semibold"><Pencil className="h-3 w-3"/>Modificar</button>}{wa && <a href={wa} target="_blank" rel="noreferrer" aria-label="Enviar WhatsApp" className="grid h-6 w-6 place-items-center rounded-lg bg-[#25D366] text-white"><MessageCircle className="h-3 w-3"/></a>}</div>
              </div></div>;
            })}
          </div>)}
        </div></div>
      </section>
    </main>

    {showNew && <ReservationModal cabins={cabins} membership={membership} session={session} onClose={() => setShowNew(false)} onSaved={async () => { setShowNew(false); await loadData(); }}/>} 
    {editing && <ReservationModal cabins={cabins} membership={membership} session={session} reservation={editing} onClose={() => setEditing(null)} onSaved={async () => { setEditing(null); await loadData(); }}/>} 
    {viewing && <ReservationDetails session={session} reservation={viewing} cabin={cabins.find(c => c.id === viewing.cabin_id)} canEdit={membership.rol !== "lectura"} onEdit={() => { setViewing(null); setEditing(viewing); }} onClose={() => setViewing(null)}/>} 
  </div>;
}

function LoginScreen({ onLogin }: { onLogin: (s: AuthSession) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [recoverySession, setRecoverySession] = useState<AuthSession | null>(() => getRecoverySessionFromUrl());
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function submit(e: FormEvent) {
    e.preventDefault(); setLoading(true); setError(""); setMessage("");
    try { onLogin(await signIn(email.trim(), password)); }
    catch (e) { setError(e instanceof Error ? e.message : "No se pudo iniciar sesión"); }
    finally { setLoading(false); }
  }

  async function resendConfirmation() {
    setLoading(true); setError(""); setMessage("");
    try {
      await resendSignupConfirmation(email);
      setMessage("Te enviamos nuevamente el correo de confirmación. Revisa también Spam o Promociones.");
    } catch (e) { setError(e instanceof Error ? e.message : "No se pudo reenviar el correo"); }
    finally { setLoading(false); }
  }

  async function forgotPassword() {
    setLoading(true); setError(""); setMessage("");
    try {
      await requestPasswordReset(email);
      setMessage("Si la cuenta existe, recibirás un correo para crear una contraseña nueva. Revisa también Spam o Promociones.");
    } catch (e) { setError(e instanceof Error ? e.message : "No se pudo enviar el correo"); }
    finally { setLoading(false); }
  }

  async function saveNewPassword(e: FormEvent) {
    e.preventDefault(); setError(""); setMessage("");
    if (!recoverySession) return;
    if (newPassword !== confirmPassword) { setError("Las contraseñas no coinciden."); return; }
    setLoading(true);
    try {
      await updatePassword(recoverySession.access_token, newPassword);
      window.history.replaceState({}, document.title, window.location.pathname);
      setRecoverySession(null); setNewPassword(""); setConfirmPassword("");
      setMessage("Contraseña actualizada. Ya puedes iniciar sesión con tu nueva contraseña.");
    } catch (e) { setError(e instanceof Error ? e.message : "No se pudo actualizar la contraseña"); }
    finally { setLoading(false); }
  }

  if (recoverySession) {
    return <div className="grid min-h-screen place-items-center bg-[#f4f1ea] px-5"><form onSubmit={saveNewPassword} className="w-full max-w-md rounded-3xl bg-white p-8 text-[#173c34]"><h1 className="text-2xl font-semibold">Crear nueva contraseña</h1><p className="mt-2 text-sm text-slate-500">Escribe una contraseña nueva de al menos 8 caracteres.</p><input type="password" required minLength={8} placeholder="Nueva contraseña" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="input-panel mt-6"/><input type="password" required minLength={8} placeholder="Repetir contraseña" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="input-panel mt-3"/>{error && <p className="mt-3 text-sm text-red-700">{error}</p>}<button disabled={loading} className="mt-5 w-full rounded-2xl bg-[#173c34] px-5 py-3 font-semibold text-white">{loading ? "Guardando…" : "Guardar nueva contraseña"}</button><style>{inputStyle}</style></form></div>;
  }

  return <div className="grid min-h-screen place-items-center bg-[#f4f1ea] px-5"><form onSubmit={submit} className="w-full max-w-md rounded-3xl bg-white p-8 text-[#173c34]"><h1 className="text-2xl font-semibold">Cinco Lagos</h1><p className="mt-2 text-sm text-slate-500">Panel interno de reservaciones</p><input type="email" required placeholder="Correo" value={email} onChange={e => setEmail(e.target.value)} className="input-panel mt-6"/><input type="password" required placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} className="input-panel mt-3"/>{error && <p className="mt-3 text-sm text-red-700">{error}</p>}{message && <p className="mt-3 rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-800">{message}</p>}<button disabled={loading} className="mt-5 w-full rounded-2xl bg-[#173c34] px-5 py-3 font-semibold text-white">{loading ? "Procesando…" : "Entrar"}</button><div className="mt-4 flex flex-col gap-2 text-center"><button type="button" disabled={loading} onClick={forgotPassword} className="text-sm font-semibold text-[#176957] hover:underline disabled:opacity-50">¿Olvidaste tu contraseña?</button><button type="button" disabled={loading} onClick={resendConfirmation} className="text-sm text-[#176957] hover:underline disabled:opacity-50">Reenviar correo de confirmación</button></div><p className="mt-4 text-center text-xs text-slate-400">Escribe primero el correo de la cuenta y luego elige la opción que necesites.</p><style>{inputStyle}</style></form></div>;
}

function ReservationDetails({ session, reservation, cabin, canEdit, onEdit, onClose }: { session: AuthSession; reservation: Reservation; cabin?: Cabin; canEdit: boolean; onEdit: () => void; onClose: () => void }) {
  const wa = whatsapp(reservation.guest_phone);
  const balance = reservation.total_amount == null ? null : Math.max(0, reservation.total_amount - (reservation.paid_amount || 0));
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState("");

  async function openPdf() {
    setPdfLoading(true); setPdfError("");
    try {
      const result = await invokeFunction<PdfResult>("reservation-pdf", session, { reservation_id: reservation.id });
      if (!result.url) throw new Error("No se recibió el enlace del PDF.");
      window.open(result.url, "_blank", "noopener,noreferrer");
    } catch (e) {
      setPdfError(e instanceof Error ? e.message : "No se pudo generar el PDF");
    } finally { setPdfLoading(false); }
  }

  return <div className="fixed inset-0 z-50 grid place-items-center bg-black/45 p-4"><div className="max-h-[92vh] w-full max-w-2xl overflow-auto rounded-3xl bg-white p-6 text-[#173c34] shadow-xl md:p-8">
    <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[.18em] text-[#1f8f7a]">Ficha de reservación</p><h2 className="mt-1 text-2xl font-semibold">{reservation.guest_name || "Reservación"}</h2><div className="mt-3 inline-flex rounded-xl bg-[#eaf6f1] px-4 py-2 font-mono text-lg font-bold tracking-[.2em] text-[#176957]">{reservation.reservation_code}</div></div><button onClick={onClose} className="rounded-xl border p-2"><X className="h-4 w-4"/></button></div>
    <div className="mt-7 grid gap-4 sm:grid-cols-2"><Detail label="Cabaña" value={cabin?.nombre || "—"}/><Detail label="Origen" value={sourceLabels[reservation.source]}/><Detail label="Teléfono" value={reservation.guest_phone || "—"}/><Detail label="Huéspedes" value={reservation.guests ? String(reservation.guests) : "—"}/><Detail label="Entrada" value={reservation.check_in}/><Detail label="Salida" value={reservation.check_out}/></div>
    <div className="mt-6 rounded-2xl bg-[#f8f6f1] p-5"><div className="flex flex-wrap items-center justify-between gap-3"><h3 className="font-semibold">Pago</h3><span className={`rounded-full px-3 py-1 text-xs font-semibold ${paymentStyles[reservation.payment_status]}`}>{paymentLabels[reservation.payment_status]}</span></div><div className="mt-4 grid gap-4 sm:grid-cols-3"><Detail label="Total" value={money(reservation.total_amount)}/><Detail label="Pagado" value={money(reservation.paid_amount)}/><Detail label="Saldo" value={money(balance)}/></div><div className="mt-4"><Detail label="Autorización / referencia" value={reservation.payment_reference || "Sin referencia"}/></div></div>
    {pdfError && <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{pdfError}</p>}
    <div className="mt-7 flex flex-wrap justify-end gap-2"><button onClick={openPdf} disabled={pdfLoading} className="inline-flex items-center gap-2 rounded-2xl bg-[#176957] px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"><FileText className="h-4 w-4"/>{pdfLoading ? "Generando PDF…" : "Ver PDF"}</button>{wa && <a href={wa} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl bg-[#25D366] px-5 py-3 text-sm font-semibold text-white"><MessageCircle className="h-4 w-4"/>WhatsApp</a>}{canEdit && <button onClick={onEdit} className="inline-flex items-center gap-2 rounded-2xl border px-5 py-3 text-sm font-semibold"><Pencil className="h-4 w-4"/>Modificar</button>}<button onClick={onClose} className="rounded-2xl bg-[#173c34] px-5 py-3 text-sm font-semibold text-white">Cerrar</button></div>
  </div></div>;
}

function ReservationModal({ cabins, membership, session, reservation, onClose, onSaved }: { cabins: Cabin[]; membership: Membership; session: AuthSession; reservation?: Reservation; onClose: () => void; onSaved: () => void }) {
  const [cabinId, setCabinId] = useState(reservation?.cabin_id || cabins[0]?.id || ""), [source, setSource] = useState<Source>(reservation?.source || "local"), [guestName, setGuestName] = useState(reservation?.guest_name || ""), [guestPhone, setGuestPhone] = useState(reservation?.guest_phone || ""), [checkIn, setCheckIn] = useState(reservation?.check_in || isoDate(new Date())), [checkOut, setCheckOut] = useState(reservation?.check_out || isoDate(addDays(new Date(), 1))), [guests, setGuests] = useState(String(reservation?.guests || 2)), [paymentStatus, setPaymentStatus] = useState<Payment>(reservation?.payment_status || "pendiente"), [total, setTotal] = useState(reservation?.total_amount == null ? "" : String(reservation.total_amount)), [paid, setPaid] = useState(String(reservation?.paid_amount || 0)), [paymentReference, setPaymentReference] = useState(reservation?.payment_reference || ""), [error, setError] = useState(""), [saving, setSaving] = useState(false);
  async function submit(e: FormEvent) {
    e.preventDefault(); setSaving(true); setError("");
    try {
      const body = { cliente_id: membership.cliente_id, cabin_id: cabinId, source, created_by: session.user.id, guest_name: guestName || null, guest_phone: guestPhone || null, check_in: checkIn, check_out: checkOut, guests: Number(guests) || null, status: "confirmada", payment_status: paymentStatus, total_amount: total === "" ? null : Number(total), paid_amount: Number(paid) || 0, payment_reference: paymentReference.trim() || null };
      if (reservation) {
        await rest(`reservations?id=eq.${reservation.id}`, session, { method: "PATCH", headers: { Prefer: "return=minimal" }, body: JSON.stringify(body) });
      } else {
        const created = await rest<Reservation[]>("reservations?select=id,reservation_code", session, { method: "POST", headers: { Prefer: "return=representation" }, body: JSON.stringify(body) });
        if (created[0]?.reservation_code) window.alert(`Reservación creada correctamente. Código: ${created[0].reservation_code}`);
      }
      onSaved();
    } catch (e) { const m = e instanceof Error ? e.message : "No se pudo guardar"; setError(m.includes("reservations_no_overlap") ? "Esa cabaña ya tiene una reservación que se cruza con esas fechas." : m); } finally { setSaving(false); }
  }
  return <div className="fixed inset-0 z-50 grid place-items-center bg-black/45 p-4"><form onSubmit={submit} className="max-h-[92vh] w-full max-w-2xl overflow-auto rounded-3xl bg-white p-6 text-[#173c34] shadow-xl md:p-8"><div className="flex justify-between"><div><p className="text-xs font-semibold uppercase tracking-[.18em] text-[#1f8f7a]">Cinco Lagos</p><h2 className="text-2xl font-semibold">{reservation ? "Modificar reservación" : "Nueva reservación"}</h2>{reservation?.reservation_code && <p className="mt-2 font-mono text-sm font-bold tracking-[.18em] text-[#1f8f7a]">Código: {reservation.reservation_code}</p>}</div><button type="button" onClick={onClose}><X className="h-5 w-5"/></button></div><div className="mt-6 grid gap-4 sm:grid-cols-2">
    <Field label="Cabaña"><select value={cabinId} onChange={e => setCabinId(e.target.value)} className="input-panel">{cabins.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}</select></Field>
    <Field label="Origen"><select value={source} onChange={e => setSource(e.target.value as Source)} className="input-panel">{Object.entries(sourceLabels).map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></Field>
    <Field label="Nombre"><input value={guestName} onChange={e => setGuestName(e.target.value)} className="input-panel"/></Field><Field label="Teléfono"><input value={guestPhone} onChange={e => setGuestPhone(e.target.value)} className="input-panel"/></Field>
    <Field label="Entrada"><input type="date" required value={checkIn} onChange={e => setCheckIn(e.target.value)} className="input-panel"/></Field><Field label="Salida"><input type="date" required value={checkOut} onChange={e => setCheckOut(e.target.value)} className="input-panel"/></Field>
    <Field label="Huéspedes"><input type="number" min="1" value={guests} onChange={e => setGuests(e.target.value)} className="input-panel"/></Field><Field label="Estado de pago"><select value={paymentStatus} onChange={e => setPaymentStatus(e.target.value as Payment)} className="input-panel"><option value="pendiente">Pendiente</option><option value="anticipo">Anticipo</option><option value="pagado">Pagado</option></select></Field>
    <Field label="Total"><input type="number" min="0" value={total} onChange={e => setTotal(e.target.value)} className="input-panel"/></Field><Field label="Monto pagado"><input type="number" min="0" value={paid} onChange={e => setPaid(e.target.value)} className="input-panel"/></Field>
    <Field label="Autorización / referencia de transferencia"><input value={paymentReference} onChange={e => setPaymentReference(e.target.value)} className="input-panel" placeholder="Opcional"/></Field>
  </div><p className="mt-3 text-sm text-[#173c34]/55">Saldo pendiente: {total === "" ? "—" : money(Math.max(0, Number(total) - (Number(paid) || 0)))}</p>{error && <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}<div className="mt-6 flex justify-end gap-3"><button type="button" onClick={onClose} className="rounded-2xl border px-5 py-3 text-sm font-semibold">Cancelar</button><button disabled={saving} className="rounded-2xl bg-[#1f8f7a] px-5 py-3 text-sm font-semibold text-white">{saving ? "Guardando…" : "Guardar"}</button></div><style>{inputStyle}</style></form></div>;
}

const inputStyle = `.input-panel{margin-top:.5rem;width:100%;border:1px solid rgba(23,60,52,.15);border-radius:1rem;padding:.75rem 1rem;background:white;color:#173c34;caret-color:#173c34;outline:none}.input-panel::placeholder{color:rgba(23,60,52,.48)}.input-panel:focus{border-color:#1f8f7a}`;
function Field({ label, children }: { label: string; children: ReactNode }) { return <label className="block text-sm font-medium">{label}{children}</label>; }
function Detail({ label, value }: { label: string; value: string }) { return <div><p className="text-[11px] font-semibold uppercase tracking-[.12em] text-[#173c34]/45">{label}</p><p className="mt-1 text-sm font-semibold">{value}</p></div>; }
function LoadingScreen() { return <div className="grid min-h-screen place-items-center bg-[#f4f1ea] text-sm text-[#173c34]/60">Cargando panel…</div>; }
function MetricCard({ label, value, detail }: { label: string; value: string; detail: string }) { return <article className="rounded-3xl border border-[#173c34]/10 bg-white p-5 shadow-sm md:p-6"><p className="text-xs font-semibold uppercase tracking-[.16em] text-[#173c34]/45">{label}</p><p className="mt-3 text-3xl font-semibold">{value}</p><p className="mt-1 text-sm text-[#173c34]/50">{detail}</p></article>; }
