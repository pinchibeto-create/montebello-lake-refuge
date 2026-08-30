import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  BedDouble,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  LogOut,
  Plus,
  X,
} from "lucide-react";
import {
  getStoredSession,
  rest,
  signIn,
  signOutLocal,
  type AuthSession,
} from "../lib/supabase-rest";

export const Route = createFileRoute("/panel")({
  head: () => ({
    meta: [
      { title: "Panel de reservaciones | Cinco Lagos" },
      {
        name: "description",
        content: "Panel interno de ocupación y reservaciones de Cabañas Cinco Lagos.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: PanelPage,
});

type Membership = {
  cliente_id: string;
  rol: "admin" | "operador" | "lectura";
};

type Cabin = {
  id: string;
  nombre: string;
  codigo: string;
  orden: number;
};

type Reservation = {
  id: string;
  cabin_id: string;
  source: "booking" | "airbnb" | "social" | "local" | "directa" | "otro";
  guest_name: string | null;
  guest_phone: string | null;
  check_in: string;
  check_out: string;
  guests: number | null;
  status: "pendiente" | "confirmada" | "cancelada" | "completada";
};

const sourceLabels: Record<Reservation["source"], string> = {
  booking: "Booking",
  airbnb: "Airbnb",
  social: "Redes",
  local: "Local",
  directa: "Directa",
  otro: "Otro",
};

const sourceStyles: Record<Reservation["source"], string> = {
  booking: "bg-blue-100 text-blue-800",
  airbnb: "bg-rose-100 text-rose-800",
  social: "bg-violet-100 text-violet-800",
  local: "bg-amber-100 text-amber-900",
  directa: "bg-emerald-100 text-emerald-800",
  otro: "bg-slate-100 text-slate-700",
};

function isoDate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function addDays(date: Date, days: number) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

function displayDate(date: Date) {
  return new Intl.DateTimeFormat("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function PanelPage() {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [checking, setChecking] = useState(true);
  const [membership, setMembership] = useState<Membership | null>(null);
  const [cabins, setCabins] = useState<Cabin[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showNew, setShowNew] = useState(false);

  useEffect(() => {
    const stored = getStoredSession();
    setSession(stored);
    setChecking(false);
  }, []);

  useEffect(() => {
    if (!session) return;
    void loadMembership(session);
  }, [session]);

  useEffect(() => {
    if (!session || !membership) return;
    void loadData();
  }, [session, membership, selectedDate]);

  async function loadMembership(currentSession: AuthSession) {
    setError("");
    try {
      const memberships = await rest<Membership[]>(
        `usuario_clientes?select=cliente_id,rol&usuario_id=eq.${currentSession.user.id}&activo=eq.true`,
        currentSession,
      );

      for (const candidate of memberships) {
        const clients = await rest<Array<{ id: string; slug: string }>>(
          `clientes?select=id,slug&id=eq.${candidate.cliente_id}`,
          currentSession,
        );
        if (clients[0]?.slug === "cinco-lagos") {
          setMembership(candidate);
          return;
        }
      }

      setMembership(null);
      setError("Tu cuenta existe, pero todavía no tiene acceso a Cabañas Cinco Lagos.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo verificar el acceso.");
    }
  }

  async function loadData() {
    if (!session || !membership) return;
    setLoading(true);
    setError("");
    try {
      const date = isoDate(selectedDate);
      const [cabinRows, reservationRows] = await Promise.all([
        rest<Cabin[]>(
          `cabins?select=id,nombre,codigo,orden&cliente_id=eq.${membership.cliente_id}&activa=eq.true&order=orden.asc`,
          session,
        ),
        rest<Reservation[]>(
          `reservations?select=id,cabin_id,source,guest_name,guest_phone,check_in,check_out,guests,status&cliente_id=eq.${membership.cliente_id}&status=in.(pendiente,confirmada)&check_in=lte.${date}&check_out=gt.${date}`,
          session,
        ),
      ]);
      setCabins(cabinRows);
      setReservations(reservationRows);
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudieron cargar las reservaciones.");
    } finally {
      setLoading(false);
    }
  }

  const occupiedByCabin = useMemo(() => {
    const map = new Map<string, Reservation>();
    for (const reservation of reservations) map.set(reservation.cabin_id, reservation);
    return map;
  }, [reservations]);

  const occupied = occupiedByCabin.size;
  const available = cabins.length - occupied;
  const arrivals = reservations.filter((r) => r.check_in === isoDate(selectedDate)).length;

  if (checking) return <LoadingScreen />;
  if (!session) return <LoginScreen onLogin={setSession} />;

  if (!membership) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#f4f1ea] px-5 text-[#173c34]">
        <div className="w-full max-w-lg rounded-3xl border border-[#173c34]/10 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold">Acceso pendiente</h1>
          <p className="mt-3 text-sm leading-relaxed text-[#173c34]/65">
            {error || "Estamos verificando tu acceso a Cinco Lagos…"}
          </p>
          <p className="mt-4 text-sm text-[#173c34]/50">Cuenta: {session.user.email}</p>
          <button
            className="mt-6 rounded-2xl bg-[#173c34] px-5 py-3 text-sm font-semibold text-white"
            onClick={() => {
              signOutLocal();
              setSession(null);
            }}
          >
            Usar otra cuenta
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f1ea] text-[#173c34]">
      <header className="border-b border-[#173c34]/10 bg-[#123d34] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <img
              src="/images/logo/cinco-lagos-logo.jpeg"
              alt="Cinco Lagos"
              className="h-11 w-11 rounded-full object-cover ring-1 ring-white/20"
            />
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-white/60">Panel interno</p>
              <h1 className="text-lg font-semibold">Cinco Lagos</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white/90 sm:flex">
              <CircleUserRound className="h-4 w-4" />
              {session.user.email || "Usuario"}
            </span>
            <button
              type="button"
              aria-label="Cerrar sesión"
              onClick={() => {
                signOutLocal();
                setSession(null);
                setMembership(null);
              }}
              className="rounded-full p-2.5 text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-7 md:px-8 md:py-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium capitalize text-[#2f7668]">{displayDate(selectedDate)}</p>
            <h2 className="mt-1 text-3xl font-semibold tracking-tight md:text-4xl">Ocupación de cabañas</h2>
            <p className="mt-2 max-w-2xl text-sm text-[#173c34]/60 md:text-base">
              Datos reales de Supabase. Las reservaciones activas se muestran para la fecha seleccionada.
            </p>
          </div>

          {membership.rol !== "lectura" && (
            <button
              type="button"
              onClick={() => setShowNew(true)}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1f8f7a] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#187563]"
            >
              <Plus className="h-4 w-4" /> Nueva reservación
            </button>
          )}
        </div>

        {error && (
          <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</div>
        )}

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <MetricCard label="Ocupadas" value={`${occupied} / ${cabins.length || 7}`} detail="Cabañas con reservación" />
          <MetricCard label="Disponibles" value={`${available} / ${cabins.length || 7}`} detail="Listas para reservar" />
          <MetricCard label="Llegadas" value={String(arrivals)} detail="En la fecha seleccionada" />
        </section>

        <section className="mt-8 overflow-hidden rounded-3xl border border-[#173c34]/10 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-[#173c34]/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between md:px-7">
            <div className="flex items-center gap-3">
              <CalendarDays className="h-5 w-5 text-[#1f8f7a]" />
              <div>
                <h3 className="font-semibold">Estado actual</h3>
                <p className="text-xs capitalize text-[#173c34]/50">{displayDate(selectedDate)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" aria-label="Día anterior" onClick={() => setSelectedDate((d) => addDays(d, -1))} className="rounded-xl border border-[#173c34]/10 p-2 transition hover:bg-[#f4f1ea]"><ChevronLeft className="h-4 w-4" /></button>
              <button type="button" onClick={() => setSelectedDate(new Date())} className="rounded-xl border border-[#173c34]/10 px-4 py-2 text-sm font-medium transition hover:bg-[#f4f1ea]">Hoy</button>
              <button type="button" aria-label="Día siguiente" onClick={() => setSelectedDate((d) => addDays(d, 1))} className="rounded-xl border border-[#173c34]/10 p-2 transition hover:bg-[#f4f1ea]"><ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>

          {loading ? (
            <div className="p-8 text-sm text-[#173c34]/50">Cargando reservaciones…</div>
          ) : (
            <div className="divide-y divide-[#173c34]/8">
              {cabins.map((cabin) => {
                const reservation = occupiedByCabin.get(cabin.id);
                return (
                  <div key={cabin.id} className="grid gap-3 px-5 py-4 transition hover:bg-[#f8f6f1] sm:grid-cols-[180px_140px_1fr_auto] sm:items-center md:px-7">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#e6f0ec] text-[#176a5a]"><BedDouble className="h-4 w-4" /></span>
                      <span className="font-semibold">{cabin.nombre}</span>
                    </div>
                    <div><span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${reservation ? "bg-slate-100 text-slate-700" : "bg-emerald-100 text-emerald-800"}`}>{reservation ? "Ocupada" : "Disponible"}</span></div>
                    <div className="min-w-0">
                      {reservation ? (
                        <div className="flex flex-wrap items-center gap-2 text-sm">
                          <span className={`rounded-md px-2 py-1 text-xs font-semibold ${sourceStyles[reservation.source]}`}>{sourceLabels[reservation.source]}</span>
                          <span className="truncate text-[#173c34]/70">{reservation.guest_name || "Reservación"}</span>
                        </div>
                      ) : <span className="text-sm text-[#173c34]/45">Sin reservación activa</span>}
                    </div>
                    <div className="text-sm font-medium text-[#173c34]/60">{reservation ? `Hasta ${reservation.check_out}` : "—"}</div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {showNew && (
        <NewReservationModal
          cabins={cabins}
          membership={membership}
          session={session}
          onClose={() => setShowNew(false)}
          onSaved={async () => {
            setShowNew(false);
            await loadData();
          }}
        />
      )}
    </div>
  );
}

function LoginScreen({ onLogin }: { onLogin: (session: AuthSession) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      onLogin(await signIn(email.trim(), password));
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo iniciar sesión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-[#f4f1ea] px-5 text-[#173c34]">
      <form onSubmit={submit} className="w-full max-w-md rounded-3xl border border-[#173c34]/10 bg-white p-7 shadow-sm md:p-9">
        <div className="flex items-center gap-3">
          <img src="/images/logo/cinco-lagos-logo.jpeg" alt="Cinco Lagos" className="h-14 w-14 rounded-full object-cover" />
          <div><p className="text-xs uppercase tracking-[0.2em] text-[#1f8f7a]">Panel interno</p><h1 className="text-2xl font-semibold">Cinco Lagos</h1></div>
        </div>
        <p className="mt-6 text-sm text-[#173c34]/60">Ingresa con tu cuenta autorizada para administrar reservaciones.</p>
        <label className="mt-6 block text-sm font-medium">Correo</label>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-2xl border border-[#173c34]/15 px-4 py-3 outline-none focus:border-[#1f8f7a]" />
        <label className="mt-4 block text-sm font-medium">Contraseña</label>
        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-2xl border border-[#173c34]/15 px-4 py-3 outline-none focus:border-[#1f8f7a]" />
        {error && <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        <button disabled={loading} className="mt-6 w-full rounded-2xl bg-[#173c34] px-5 py-3 font-semibold text-white disabled:opacity-60">{loading ? "Entrando…" : "Entrar"}</button>
      </form>
    </div>
  );
}

function NewReservationModal({ cabins, membership, session, onClose, onSaved }: { cabins: Cabin[]; membership: Membership; session: AuthSession; onClose: () => void; onSaved: () => void }) {
  const [cabinId, setCabinId] = useState(cabins[0]?.id || "");
  const [source, setSource] = useState<Reservation["source"]>("local");
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [checkIn, setCheckIn] = useState(isoDate(new Date()));
  const [checkOut, setCheckOut] = useState(isoDate(addDays(new Date(), 1)));
  const [guests, setGuests] = useState("2");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await rest("reservations", session, {
        method: "POST",
        headers: { Prefer: "return=minimal" },
        body: JSON.stringify({
          cliente_id: membership.cliente_id,
          cabin_id: cabinId,
          source,
          created_by: session.user.id,
          guest_name: guestName || null,
          guest_phone: guestPhone || null,
          check_in: checkIn,
          check_out: checkOut,
          guests: Number(guests) || null,
          status: "confirmada",
        }),
      });
      onSaved();
    } catch (e) {
      const message = e instanceof Error ? e.message : "No se pudo guardar";
      setError(message.includes("reservations_no_overlap") ? "Esa cabaña ya tiene una reservación que se cruza con esas fechas." : message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/45 p-4">
      <form onSubmit={submit} className="max-h-[92vh] w-full max-w-xl overflow-auto rounded-3xl bg-white p-6 text-[#173c34] shadow-xl md:p-8">
        <div className="flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1f8f7a]">Cinco Lagos</p><h2 className="mt-1 text-2xl font-semibold">Nueva reservación</h2></div><button type="button" onClick={onClose} className="rounded-full p-2 hover:bg-slate-100"><X className="h-5 w-5" /></button></div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Field label="Cabaña"><select value={cabinId} onChange={(e) => setCabinId(e.target.value)} required className="input-panel">{cabins.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}</select></Field>
          <Field label="Origen"><select value={source} onChange={(e) => setSource(e.target.value as Reservation["source"])} className="input-panel"><option value="local">Local</option><option value="social">Redes</option><option value="directa">Directa</option><option value="airbnb">Airbnb</option><option value="booking">Booking</option><option value="otro">Otro</option></select></Field>
          <Field label="Nombre del huésped"><input value={guestName} onChange={(e) => setGuestName(e.target.value)} className="input-panel" /></Field>
          <Field label="Teléfono"><input value={guestPhone} onChange={(e) => setGuestPhone(e.target.value)} className="input-panel" /></Field>
          <Field label="Entrada"><input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} required className="input-panel" /></Field>
          <Field label="Salida"><input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} required className="input-panel" /></Field>
          <Field label="Huéspedes"><input type="number" min="1" value={guests} onChange={(e) => setGuests(e.target.value)} className="input-panel" /></Field>
        </div>
        {error && <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        <div className="mt-6 flex justify-end gap-3"><button type="button" onClick={onClose} className="rounded-2xl border border-[#173c34]/15 px-5 py-3 text-sm font-semibold">Cancelar</button><button disabled={saving} className="rounded-2xl bg-[#1f8f7a] px-5 py-3 text-sm font-semibold text-white disabled:opacity-60">{saving ? "Guardando…" : "Guardar reservación"}</button></div>
      </form>
      <style>{`.input-panel{margin-top:.5rem;width:100%;border:1px solid rgba(23,60,52,.15);border-radius:1rem;padding:.75rem 1rem;background:white;outline:none}.input-panel:focus{border-color:#1f8f7a}`}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block text-sm font-medium">{label}{children}</label>;
}

function LoadingScreen() {
  return <div className="grid min-h-screen place-items-center bg-[#f4f1ea] text-sm text-[#173c34]/60">Cargando panel…</div>;
}

function MetricCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return <article className="rounded-3xl border border-[#173c34]/10 bg-white p-5 shadow-sm md:p-6"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#173c34]/45">{label}</p><p className="mt-3 text-3xl font-semibold tracking-tight">{value}</p><p className="mt-1 text-sm text-[#173c34]/50">{detail}</p></article>;
}
