import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { ArrowLeft, Banknote, CalendarX2, CircleDollarSign, Clock3, RefreshCw, RotateCcw } from "lucide-react";
import { getStoredSession, rest, type AuthSession } from "../lib/supabase-rest";
import CancellationEditor from "../components/cancellation-editor";

export const Route = createFileRoute("/cancelaciones")({
  head: () => ({ meta: [{ title: "Cancelaciones y depósitos | Cinco Lagos" }, { name: "robots", content: "noindex, nofollow" }] }),
  component: CancellationsPage,
});

const OWNER = "bbc35370-eb27-4bd1-b0de-a86f60c5a54f";
const VIEWERS = new Set([OWNER, "4ed8d2da-b6ec-403c-94c7-bf7e9a67ed89", "968688b6-3797-4cc5-bc91-10aca60e53c5"]);
const CLIENT = "ef6d824e-03a9-436e-a56b-8e8032e9624a";
const money = (value: number) => new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
type Reservation = { id:string; source:string; guest_name:string|null; reservation_code:string|null; cabin_id:string; check_in:string; check_out:string; status:string; paid_amount:number|null; notes:string|null; updated_at:string };
type Cancellation = { reservation_id:string; canceled_at:string; deposit_received:number; deposit_retained:number; deposit_refunded:number; note:string|null; recorded_by:string|null };
type Cabin = { id:string; nombre:string };
type Row = Reservation & { cancellation:Cancellation|null; cabinName:string; outcome:string };
const sourceLabels: Record<string,string> = { booking:"Booking", airbnb:"Airbnb", social:"Redes",local:"Local",directa:"Directa",otro:"Otro" };
function outcome(c: Cancellation|null) {
  if (!c) return "unreviewed";
  const received = Number(c.deposit_received), retained = Number(c.deposit_retained), returned = Number(c.deposit_refunded);
  if (!received) return "none";
  if (retained === received) return "retained";
  if (returned === received) return "refunded";
  if (retained > 0 && returned > 0 && retained + returned === received) return "partial";
  return "pending";
}
const outcomeLabels: Record<string,string> = { unreviewed:"Sin aclarar", pending:"Pendiente de aclaración", none:"Sin anticipo", retained:"Depósito conservado", refunded:"Depósito devuelto", partial:"Devolución parcial" };

function CancellationsPage() {
  const [session,setSession] = useState<AuthSession|null>(null);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");
  const [reservations,setReservations] = useState<Reservation[]>([]);
  const [cancelInfo,setCancelInfo] = useState<Cancellation[]>([]);
  const [cabins,setCabins] = useState<Cabin[]>([]);
  const [filter,setFilter] = useState("all");
  const [search,setSearch] = useState("");
  const [editing,setEditing] = useState<Row|null>(null);
  useEffect(() => { const s = getStoredSession();setSession(s);if(s)void load(s);else setLoading(false); },[]);
  async function load(s:AuthSession) {
    setLoading(true);setError("");
    try {
      if(!VIEWERS.has(s.user.id)) throw new Error("Tu usuario no tiene acceso al reporte de cancelaciones.");
      const member=await rest<Array<{rol:string}>>("usuario_clientes?select=rol&cliente_id=eq."+CLIENT+"&usuario_id=eq."+s.user.id+"&activo=eq.true",s);
      if(!member.some(x=>x.rol==="admin"||x.rol==="operador")) throw new Error("Tu cuenta no tiene permisos para consultar este reporte.");
      const [r,d,c]=await Promise.all([
        rest<Reservation[]>("reservations?select=id,source,guest_name,reservation_code,cabin_id,check_in,check_out,status,paid_amount,notes,updated_at&cliente_id=eq."+CLIENT+"&status=eq.cancelada&order=updated_at.desc&limit=1000",s),
        rest<Cancellation[]>("reservation_cancellations?select=reservation_id,canceled_at,deposit_received,deposit_retained,deposit_refunded,note,recorded_by&cliente_id=eq."+CLIENT+"&order=canceled_at.desc&limit=1000",s),
        rest<Cabin[]>("cabins?select=id,nombre&cliente_id=eq."+CLIENT,s),
      ]);
      setReservations(r);setCancelInfo(d);setCabins(c);
    }catch(e){setError(e instanceof Error?e.message:"No se pudo cargar el reporte.");}
    finally{setLoading(false);}
  }
  const rows=useMemo<Row[]>(()=>{
    const byId=new Map(cancelInfo.map(x=>[x.reservation_id,x]));
    const byCabin=new Map(cabins.map(x=>[x.id,x.nombre]));
    return reservations.map(r=>{const c=byId.get(r.id)||null;return{...r,cancellation:c,cabinName:byCabin.get(r.cabin_id)||"Cabaña",outcome:outcome(c)};});
  },[reservations,cancelInfo,cabins]);
  const visible=useMemo(()=>rows.filter(r=>(filter==="all"||r.outcome===filter||filter==="pending"&&r.outcome==="unreviewed")&&
    [r.guest_name,r.reservation_code,r.cabinName,r.source].join(" ").toLocaleLowerCase("es-MX").includes(search.toLocaleLowerCase("es-MX"))),[rows,filter,search]);
  const retained=rows.reduce((s,r)=>s+Number(r.cancellation?.deposit_retained||0),0);
  const refunded=rows.reduce((s,r)=>s+Number(r.cancellation?.deposit_refunded||0),0);
  const unsettled=rows.filter(r=>r.outcome==="pending"||r.outcome==="unreviewed").length;
  if(!session&&!loading) return <main className="grid min-h-screen place-items-center bg-[#f4f1ea] p-5"><div className="rounded-2xl bg-white p-7"><p>Inicia sesión en el panel para consultar las cancelaciones.</p><a href="/panel" className="mt-3 block font-semibold underline">Ir al panel</a></div></main>;
  return <main className="min-h-screen bg-[#f4f1ea] text-[#173c34]">
    <header className="bg-[#123d34] px-5 py-5 text-white"><div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
      <div><p className="text-xs font-semibold uppercase tracking-wider text-white/60">Administración · Cinco Lagos</p><h1 className="mt-1 text-xl font-bold">Cancelaciones y depósitos</h1></div>
      <div className="flex flex-wrap gap-2"><a href="/panel" className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-3 py-2 text-sm"><ArrowLeft size={16}/> Panel</a>
        <a href="/ingresos" className="rounded-xl border border-white/20 px-3 py-2 text-sm">Ingresos</a><button onClick={()=>session&&void load(session)} disabled={loading} className="rounded-xl border border-white/20 p-2" aria-label="Actualizar"><RefreshCw size={17}/></button></div>
    </div></header>
    <div className="mx-auto max-w-6xl px-4 py-7">
      <p className="mb-6 text-sm text-[#173c34]/70">Registro separado del calendario: muestra qué reservas se cancelaron y cuánto dinero se conservó, devolvió o queda por aclarar. Los importes de esta pantalla no se suman nuevamente a los de las reservas vigentes.</p>
      {error&&<p role="alert" className="mb-5 rounded-xl bg-red-50 p-4 text-red-700">{error}</p>}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Cancelaciones" value={String(rows.length)} icon={<CalendarX2 size={17}/>}/>
        <Stat label="Dinero conservado" value={money(retained)} icon={<CircleDollarSign size={17}/>}/>
        <Stat label="Dinero devuelto" value={money(refunded)} icon={<RotateCcw size={17}/>}/>
        <Stat label="Sin aclarar" value={String(unsettled)} icon={<Clock3 size={17}/>}/>
      </div>
      <section className="mt-7 overflow-hidden rounded-3xl border border-[#173c34]/10 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b p-5">
          <div><h2 className="text-lg font-bold">Detalle de reservas canceladas</h2><p className="mt-1 text-xs text-[#173c34]/60">Los registros importados sin huésped ni cobro no prueban que exista un depósito retenido.</p></div>
          <div className="flex flex-wrap gap-2"><input aria-label="Buscar reserva" placeholder="Nombre o código" value={search} onChange={e=>setSearch(e.target.value)} className="rounded-xl border px-3 py-2 text-sm"/>
            <select aria-label="Filtrar cancelaciones" value={filter} onChange={e=>setFilter(e.target.value)} className="rounded-xl border bg-white px-3 py-2 text-sm">
              <option value="all">Todas</option><option value="retained">Depósito conservado</option><option value="refunded">Depósito devuelto</option>
              <option value="partial">Devolución parcial</option><option value="none">Sin anticipo</option><option value="pending">Sin aclarar / pendiente</option>
            </select></div>
        </div>
        {loading?<p className="p-8">Cargando cancelaciones…</p>:visible.length===0?<p className="p-8 text-sm">No hay registros que coincidan con estos filtros.</p>:
          <div className="divide-y divide-[#173c34]/10">{visible.map(r=><article key={r.id} className="flex flex-col gap-3 p-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0"><p className="font-bold">{r.guest_name||"Sin nombre (calendario externo)"}</p>
              <p className="mt-1 text-xs text-[#173c34]/65">#{r.reservation_code||"—"} · {r.cabinName} · {sourceLabels[r.source]||r.source}</p>
              <p className="mt-1 text-xs text-[#173c34]/60">{r.check_in} → {r.check_out}</p>
              {r.cancellation?.canceled_at?<p className="mt-1 text-xs text-[#173c34]/60">Registrada: {new Date(r.cancellation.canceled_at).toLocaleString("es-MX",{timeZone:"America/Merida"})}</p>:null}
              {r.cancellation?.note&&<p className="mt-2 text-sm">{r.cancellation.note}</p>}
              {!r.cancellation&&r.notes?.includes("Not available")&&<p className="mt-2 text-xs italic text-[#173c34]/60">Bloque importado del calendario externo; verificar antes de clasificar como cancelación real.</p>}
            </div>
            <div className="flex flex-wrap items-center gap-3 lg:justify-end">
              <div className="min-w-36 rounded-xl bg-[#f4f1ea] p-3 text-xs"><p className="font-semibold">{outcomeLabels[r.outcome]}</p>
                <p className="mt-1">Recibido: {r.cancellation?money(Number(r.cancellation.deposit_received)):"Por verificar"}</p>
                <p>Conservado: {money(Number(r.cancellation?.deposit_retained||0))}</p>
                <p>Devuelto: {money(Number(r.cancellation?.deposit_refunded||0))}</p>
              </div>
              {session?.user.id===OWNER&&<button onClick={()=>setEditing(r)} className="rounded-xl border border-[#1f8f7a] px-4 py-3 text-sm font-semibold text-[#176957]">{r.cancellation?"Editar aclaración":"Aclarar depósito"}</button>}
            </div>
          </article>)}</div>}
      </section>
      <p className="mt-5 text-xs text-[#173c34]/65"><Banknote className="mr-1 inline h-4 w-4"/> Los anticipos conservados solo cuentan cuando se registra expresamente su importe. Las cancelaciones antiguas sin datos quedan sin aclarar; no se asigna dinero de forma automática.</p>
    </div>
    {editing&&session&&<CancellationEditor session={session} reservation={editing} previous={editing.cancellation} onClose={()=>setEditing(null)} onSaved={async()=>{setEditing(null);await load(session);}}/>}
  </main>;
}
function Stat({label,value,icon}:{label:string;value:string;icon:ReactNode}) {
  return <article className="rounded-2xl border border-[#173c34]/10 bg-white p-4 shadow-sm"><div className="flex items-center gap-2 text-[#1f8f7a]">{icon}<p className="text-xs font-semibold text-[#173c34]/70">{label}</p></div><strong className="mt-3 block text-xl font-bold md:text-2xl">{value}</strong></article>;
}
