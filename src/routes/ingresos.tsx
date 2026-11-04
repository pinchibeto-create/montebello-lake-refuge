import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, CalendarDays, CircleDollarSign, CreditCard, FileSpreadsheet, LogOut, RefreshCw, Wallet } from "lucide-react";
import { getStoredSession, rest, signOutLocal, type AuthSession } from "../lib/supabase-rest";

export const Route = createFileRoute("/ingresos")({
  head: () => ({ meta: [{ title: "Estadísticas de ingresos | Cinco Lagos" }, { name: "robots", content: "noindex, nofollow" }] }),
  component: IncomePage,
});

const OWNER = "bbc35370-eb27-4bd1-b0de-a86f60c5a54f";
const CLIENT = "ef6d824e-03a9-436e-a56b-8e8032e9624a";
const TIME_ZONE = "America/Merida";
const SOURCE_LABELS: Record<string, string> = {
  booking: "Booking", airbnb: "Airbnb", social: "Redes", local: "Local", directa: "Directa", otro: "Otro",
};

type Reservation = {
  id: string; created_at: string; created_by: string | null; added_by_name: string | null;
  source: string; status: string; payment_status: string;
  guest_name: string | null; reservation_code: string | null;
  cabin_id: string; check_in: string; check_out: string;
  total_amount: number | null; paid_amount: number | null;
};
type Cabin = { id: string; nombre: string; cabin_type_id: string };
type CabinType = { id: string; nombre: string };
type Review = { reservation_id: string; decision: "approved" | "rejected"; commission_amount: number };
type Commission = { value: number | null; status: "approved" | "pending" | "rejected" | "canceled" | "none" };
type Enriched = Reservation & { cabinName: string; month: string; commission: Commission };

const money = (value: number | null) => value == null ? "—" : new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
const asNumber = (value: number | null) => value == null ? null : Number(value);
function monthKey(value: string) {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: TIME_ZONE, year: "numeric", month: "2-digit" }).formatToParts(new Date(value));
  return parts.find(p => p.type === "year")?.value + "-" + parts.find(p => p.type === "month")?.value;
}
function displayDate(value: string) {
  return new Intl.DateTimeFormat("es-MX", { timeZone: TIME_ZONE, day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(value));
}
function displayMonth(value: string) {
  return new Intl.DateTimeFormat("es-MX", { month: "long", year: "numeric" }).format(new Date(value + "-15T12:00:00"));
}
function commissionFor(r: Reservation, typeName: string, review: Review | undefined): Commission {
  if (r.created_by !== OWNER || (r.added_by_name || "").trim().toLowerCase() !== "luis" || !["social", "local", "directa", "otro"].includes(r.source)) return { value: null, status: "none" };
  const fixed = ["Grande", "Mayor"].includes(typeName) ? 100 : ["Cristal", "Pequeña"].includes(typeName) ? 50 : null;
  if (fixed == null) return { value: null, status: "none" };
  if (r.status === "cancelada") return { value: null, status: "canceled" };
  if (review?.decision === "rejected") return { value: null, status: "rejected" };
  return { value: review ? Number(review.commission_amount) : fixed, status: review?.decision === "approved" ? "approved" : "pending" };
}
function SummaryCard({ title, value, detail, icon }: { title: string; value: string; detail: string; icon: React.ReactNode }) {
  return <div className="rounded-2xl border border-[#173c34]/10 bg-white p-4 shadow-sm md:p-5">
    <div className="flex items-center gap-2 text-[#1f8f7a]">{icon}<span className="text-xs font-semibold text-[#173c34]/65">{title}</span></div>
    <strong className="mt-3 block text-xl font-bold tabular-nums md:text-2xl">{value}</strong>
    <p className="mt-1 text-xs text-[#173c34]/55">{detail}</p>
  </div>;
}
async function getAllReservations(session: AuthSession): Promise<Reservation[]> {
  const output: Reservation[] = [];
  const fields = "id,created_at,created_by,added_by_name,source,status,payment_status,guest_name,reservation_code,cabin_id,check_in,check_out,total_amount,paid_amount";
  for (let page = 0; page < 100; page++) {
    const batch = await rest<Reservation[]>("reservations?select=" + fields + "&cliente_id=eq." + CLIENT + "&order=created_at.desc,id.desc&limit=1000&offset=" + page * 1000, session);
    output.push(...batch);
    if (batch.length < 1000) return output;
  }
  throw new Error("Se alcanzó el límite de registros del reporte. Contacta al administrador.");
}

function IncomePage() {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [records, setRecords] = useState<Reservation[]>([]);
  const [cabins, setCabins] = useState<Cabin[]>([]);
  const [types, setTypes] = useState<CabinType[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [monthFilter, setMonthFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("active");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const saved = getStoredSession();
    setSession(saved);
    if (saved) void load(saved);
    else setLoading(false);
  }, []);

  async function load(current: AuthSession) {
    setLoading(true);
    setError("");
    try {
      if (current.user.id !== OWNER) throw new Error("Este reporte financiero está disponible solamente para Luis, administrador de Cinco Lagos.");
      const permissions = await rest<Array<{ rol: string }>>("usuario_clientes?select=rol&cliente_id=eq." + CLIENT + "&usuario_id=eq." + current.user.id + "&activo=eq.true", current);
      if (!permissions.some(p => p.rol === "admin")) throw new Error("Tu cuenta no tiene permisos de administrador.");
      const [r, c, t, v] = await Promise.all([
        getAllReservations(current),
        rest<Cabin[]>("cabins?select=id,nombre,cabin_type_id&cliente_id=eq." + CLIENT, current),
        rest<CabinType[]>("cabin_types?select=id,nombre&cliente_id=eq." + CLIENT, current),
        rest<Review[]>("commission_reviews?select=reservation_id,decision,commission_amount&cliente_id=eq." + CLIENT, current),
      ]);
      setRecords(r);
      setCabins(c);
      setTypes(t);
      setReviews(v);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "No se pudieron consultar los ingresos.");
    } finally {
      setLoading(false);
    }
  }

  const entries = useMemo<Enriched[]>(() => {
    const cabinMap = new Map(cabins.map(c => [c.id, c]));
    const typeMap = new Map(types.map(t => [t.id, t.nombre]));
    const reviewMap = new Map(reviews.map(r => [r.reservation_id, r]));
    return records.map(r => {
      const cabin = cabinMap.get(r.cabin_id);
      return {
        ...r, cabinName: cabin?.nombre || "Cabaña no identificada", month: monthKey(r.created_at),
        commission: commissionFor(r, typeMap.get(cabin?.cabin_type_id || "") || "", reviewMap.get(r.id)),
      };
    });
  }, [records, cabins, types, reviews]);

  const availableMonths = useMemo(() => [...new Set(entries.map(r => r.month))].sort().reverse(), [entries]);
  const filtered = useMemo(() => entries.filter(r => {
    if (monthFilter !== "all" && r.month !== monthFilter) return false;
    if (sourceFilter !== "all" && r.source !== sourceFilter) return false;
    if (statusFilter === "active" && r.status === "cancelada") return false;
    if (statusFilter === "canceled" && r.status !== "cancelada") return false;
    const searchText = ((r.guest_name || "") + " " + (r.reservation_code || "") + " " + r.cabinName).toLocaleLowerCase("es-MX");
    return searchText.includes(search.trim().toLocaleLowerCase("es-MX"));
  }), [entries, monthFilter, sourceFilter, statusFilter, search]);

  const totals = useMemo(() => {
    const active = filtered.filter(r => r.status !== "cancelada");
    return {
      count: active.length,
      total: active.reduce((sum, r) => sum + (asNumber(r.total_amount) || 0), 0),
      paid: active.reduce((sum, r) => sum + (asNumber(r.paid_amount) || 0), 0),
      commission: active.reduce((sum, r) => sum + (r.commission.value || 0), 0),
      missing: active.filter(r => r.total_amount == null).length,
      pendingCommission: active.filter(r => r.commission.status === "pending").length,
    };
  }, [filtered]);

  const groups = useMemo(() => {
    const map = new Map<string, Enriched[]>();
    for (const entry of filtered) {
      const previous = map.get(entry.month) || [];
      previous.push(entry);
      map.set(entry.month, previous);
    }
    return [...map.entries()].sort((a, b) => b[0].localeCompare(a[0])).map(([month, rows]) => {
      const active = rows.filter(r => r.status !== "cancelada");
      return {
        month, rows,
        total: active.reduce((sum, r) => sum + (asNumber(r.total_amount) || 0), 0),
        paid: active.reduce((sum, r) => sum + (asNumber(r.paid_amount) || 0), 0),
        commission: active.reduce((sum, r) => sum + (r.commission.value || 0), 0),
      };
    });
  }, [filtered]);

  if (!session && !loading) return <main className="grid min-h-screen place-items-center bg-[#f4f1ea] px-5 text-[#173c34]"><div className="rounded-3xl bg-white p-8"><h1 className="text-xl font-semibold">Inicia sesión para ver tus ingresos</h1><a className="mt-4 block font-medium text-[#1f8f7a] underline" href="/panel">Entrar al panel</a></div></main>;

  return <div className="min-h-screen bg-[#f4f1ea] text-[#173c34]">
    <header className="bg-[#123d34] text-white">
      <div className="mx-auto flex max-w-[1450px] flex-wrap items-center justify-between gap-3 px-4 py-4 md:px-8">
        <div className="flex items-center gap-3">
          <img src="/images/logo/cinco-lagos-logo.jpeg" alt="Cinco Lagos" className="h-11 w-11 rounded-full object-cover" />
          <div><p className="text-[10px] uppercase tracking-[.2em] text-white/60">Administración · Luis</p><h1 className="text-lg font-semibold">Estadísticas de ingresos</h1></div>
        </div>
        <div className="flex items-center gap-2">
          <a href="/panel" className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-3 py-2 text-xs font-semibold hover:bg-white/10"><ArrowLeft size={16} /> Reservaciones</a>
          <a href="/comisiones" className="rounded-xl border border-white/20 px-3 py-2 text-xs font-semibold hover:bg-white/10">Comisiones</a>
          <button onClick={() => session && void load(session)} aria-label="Actualizar ingresos" title="Actualizar" disabled={loading} className="rounded-xl p-2 disabled:opacity-50"><RefreshCw size={18} /></button>
          <button onClick={() => { signOutLocal(); window.location.href = "/panel"; }} aria-label="Cerrar sesión" title="Cerrar sesión" className="rounded-xl p-2"><LogOut size={18} /></button>
        </div>
      </div>
    </header>

    <main className="mx-auto max-w-[1450px] px-4 py-7 md:px-8 md:py-10">
      <div className="mb-6"><p className="text-sm font-semibold text-[#2f7668]">Ingresos por fecha de creación de reserva</p><h2 className="mt-1 text-2xl font-semibold md:text-3xl">Resumen mensual de reservaciones</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-[#173c34]/65">Cada reservación se agrupa en el mes en que fue registrada, aunque el hospedaje ocurra después. Los importes se consultan directamente de Cinco Lagos.</p></div>

      {error && <div role="alert" className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</div>}
      {loading ? <div className="rounded-3xl bg-white p-9 text-center text-sm">Cargando estadísticas de ingresos…</div> : !error && <>
        <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
          <SummaryCard title="Reservas vigentes" value={String(totals.count)} detail="Excluye canceladas" icon={<CalendarDays size={17} />} />
          <SummaryCard title="Monto total" value={money(totals.total)} detail={totals.missing ? String(totals.missing) + " sin monto registrado" : "Valor registrado de las reservas"} icon={<CircleDollarSign size={17} />} />
          <SummaryCard title="Anticipos / pagos" value={money(totals.paid)} detail="Importes pagados registrados" icon={<CreditCard size={17} />} />
          <SummaryCard title="Comisión a Luis" value={money(totals.commission)} detail={totals.pendingCommission ? String(totals.pendingCommission) + " comisiones sin aprobar" : "Aprobadas y pendientes aplicables"} icon={<Wallet size={17} />} />
        </div>

        <section className="mt-6 rounded-3xl border border-[#173c34]/10 bg-white p-4 shadow-sm md:p-5">
          <div className="mb-3 flex items-center gap-2"><FileSpreadsheet size={18} className="text-[#1f8f7a]" /><h3 className="text-sm font-semibold">Filtros del reporte</h3></div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <label className="text-xs font-semibold text-[#173c34]/65">Mes de creación
              <select value={monthFilter} onChange={e => setMonthFilter(e.target.value)} className="mt-1 block w-full rounded-xl border border-[#173c34]/15 bg-white px-3 py-3 text-sm text-[#173c34]"><option value="all">Todos los meses</option>{availableMonths.map(month => <option key={month} value={month} className="capitalize">{displayMonth(month)}</option>)}</select>
            </label>
            <label className="text-xs font-semibold text-[#173c34]/65">Origen
              <select value={sourceFilter} onChange={e => setSourceFilter(e.target.value)} className="mt-1 block w-full rounded-xl border border-[#173c34]/15 bg-white px-3 py-3 text-sm text-[#173c34]"><option value="all">Todos los canales</option>{Object.entries(SOURCE_LABELS).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select>
            </label>
            <label className="text-xs font-semibold text-[#173c34]/65">Estado
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="mt-1 block w-full rounded-xl border border-[#173c34]/15 bg-white px-3 py-3 text-sm text-[#173c34]"><option value="active">Sin canceladas</option><option value="all">Todas las reservas</option><option value="canceled">Solo canceladas</option></select>
            </label>
            <label className="text-xs font-semibold text-[#173c34]/65">Buscar reserva
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Huésped, código o cabaña" className="mt-1 block w-full rounded-xl border border-[#173c34]/15 bg-white px-3 py-3 text-sm font-normal text-[#173c34]" />
            </label>
          </div>
        </section>

        <div className="mt-6 space-y-6">
          {groups.length === 0 ? <div className="rounded-3xl bg-white p-8 text-center text-sm text-[#173c34]/70">No hay reservas que coincidan con estos filtros.</div> : groups.map(group => <section key={group.month} className="overflow-hidden rounded-3xl border border-[#173c34]/10 bg-white shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 bg-[#eaf1ec] px-5 py-5">
              <div><h3 className="text-lg font-bold capitalize">{displayMonth(group.month)}</h3><p className="mt-1 text-xs text-[#173c34]/65">{group.rows.length} reservaciones registradas</p></div>
              <div className="text-right"><span className="block text-xs text-[#173c34]/60">Monto registrado del mes</span><strong className="text-xl tabular-nums">{money(group.total)}</strong></div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1090px] border-collapse text-left text-sm">
                <thead className="bg-[#f8f6f1] text-xs uppercase tracking-wide text-[#173c34]/70"><tr>
                  <th className="whitespace-nowrap px-4 py-3 font-semibold">Fecha de creación</th>
                  <th className="px-4 py-3 font-semibold">Reservación</th>
                  <th className="px-4 py-3 font-semibold">Hospedaje</th>
                  <th className="px-4 py-3 font-semibold">Origen</th>
                  <th className="whitespace-nowrap px-4 py-3 text-right font-semibold">Monto total</th>
                  <th className="whitespace-nowrap px-4 py-3 text-right font-semibold">Anticipo</th>
                  <th className="whitespace-nowrap px-4 py-3 text-right font-semibold">Comisión a Luis</th>
                </tr></thead>
                <tbody className="divide-y divide-[#173c34]/10">{group.rows.map(r => <tr key={r.id} className={r.status === "cancelada" ? "bg-slate-50 text-slate-500" : "hover:bg-[#fafbf9]"}>
                  <td className="whitespace-nowrap px-4 py-3 text-xs">{displayDate(r.created_at)}</td>
                  <td className="px-4 py-3"><strong className="block max-w-[230px] truncate text-sm">{r.guest_name || "Sin nombre"}</strong><span className="mt-0.5 block text-xs text-[#173c34]/60">{r.cabinName} · {r.reservation_code || r.id.slice(0, 8)}</span>{r.status === "cancelada" && <span className="mt-1 inline-block rounded bg-red-100 px-2 py-0.5 text-[10px] font-semibold text-red-700">Cancelada · no suma</span>}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-xs">{r.check_in} — {r.check_out}</td>
                  <td className="px-4 py-3 text-xs">{SOURCE_LABELS[r.source] || r.source}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-right font-semibold tabular-nums">{money(asNumber(r.total_amount))}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-right font-semibold tabular-nums">{money(asNumber(r.paid_amount))}<span className="block text-[10px] font-normal text-[#173c34]/50">{r.payment_status === "pagado" ? "Liquidado" : r.payment_status === "anticipo" ? "Anticipo" : "Registrado"}</span></td>
                  <td className="whitespace-nowrap px-4 py-3 text-right"><span className={r.commission.status === "approved" ? "font-bold tabular-nums text-emerald-700" : r.commission.status === "pending" ? "font-bold tabular-nums text-amber-700" : "font-semibold text-[#173c34]/50"}>{money(r.commission.value)}</span><span className="block text-[10px] text-[#173c34]/55">{r.commission.status === "approved" ? "Aprobada" : r.commission.status === "pending" ? "Por aprobar" : r.commission.status === "rejected" ? "No aprobada" : r.commission.status === "canceled" ? "Cancelada" : "No aplica"}</span></td>
                </tr>)}</tbody>
                <tfoot><tr className="border-t-2 border-[#173c34]/15 bg-[#f8f6f1] font-bold">
                  <td colSpan={4} className="px-4 py-4 text-right text-xs uppercase tracking-wide">Total del mes (sin canceladas)</td>
                  <td className="whitespace-nowrap px-4 py-4 text-right tabular-nums">{money(group.total)}</td>
                  <td className="whitespace-nowrap px-4 py-4 text-right tabular-nums">{money(group.paid)}</td>
                  <td className="whitespace-nowrap px-4 py-4 text-right tabular-nums">{money(group.commission)}</td>
                </tr></tfoot>
              </table>
            </div>
          </section>)}
        </div>
        <p className="mt-6 text-xs leading-5 text-[#173c34]/60">Nota: la columna «Anticipo» muestra el importe registrado como pagado; si una reserva está liquidada, incluye el pago completo. Las reservas sin precio capturado se muestran con «—» y no se estiman. Las canceladas no suman en los totales. En Booking y Airbnb, la fecha de creación puede corresponder a la importación al sistema, no a la contratación original. Las comisiones pendientes de aprobación no equivalen a pagos efectuados.</p>
      </>}
    </main>
  </div>;
}
