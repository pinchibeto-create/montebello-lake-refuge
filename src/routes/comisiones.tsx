import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { ArrowLeft, ChevronDown, ChevronUp, LogOut, RefreshCw, Wallet, CalendarDays } from "lucide-react";
import { getStoredSession, rest, signOutLocal, type AuthSession } from "../lib/supabase-rest";

export const Route = createFileRoute("/comisiones")({
  head: () => ({ meta: [{ title: "Panel de comisiones | Cinco Lagos" }, { name: "robots", content: "noindex, nofollow" }] }),
  component: CommissionsPage,
});
const OWNER = "bbc35370-eb27-4bd1-b0de-a86f60c5a54f";
const CLIENT = "ef6d824e-03a9-436e-a56b-8e8032e9624a";
type Reservation = { id:string; created_by:string|null; added_by_name:string|null; created_at:string; reservation_code:string|null; source:string; status:string; payment_status:string; guest_name:string|null; check_in:string; check_out:string; cabin_id:string; };
type Cabin = {id:string;nombre:string;cabin_type_id:string};
type Kind = {id:string;nombre:string};
type Review = {reservation_id:string;decision:"approved"|"rejected";commission_amount:number;note:string|null;reviewed_at:string};
type Deposit = {id:string;month_start:string;amount:number;reference:string|null;deposited_on:string};
const money=(n:number)=>new Intl.NumberFormat("es-MX",{style:"currency",currency:"MXN",maximumFractionDigits:2}).format(n);
const monthOf=(date:string)=>new Intl.DateTimeFormat("en-CA",{timeZone:"America/Merida",year:"numeric",month:"2-digit"}).format(new Date(date)).replace(/\//g,"-");
function monthKey(date:string){const d=new Date(date);const y=new Intl.DateTimeFormat("en-US",{timeZone:"America/Merida",year:"numeric"}).format(d);const m=new Intl.DateTimeFormat("en-US",{timeZone:"America/Merida",month:"2-digit"}).format(d);return y+"-"+m}
function displayDate(date:string){return new Intl.DateTimeFormat("es-MX",{timeZone:"America/Merida",day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"}).format(new Date(date))}
function nights(a:string,b:string){return Math.max(0,Math.round((Date.parse(b+"T12:00:00Z")-Date.parse(a+"T12:00:00Z"))/86400000))}
function amount(kind:string){return kind==="Grande"||kind==="Mayor"?100:kind==="Cristal"||kind==="Pequeña"?50:0}
function CommissionsPage(){
 const [session,setSession]=useState<AuthSession|null>(null);
 const [loading,setLoading]=useState(true),[saving,setSaving]=useState(""),[error,setError]=useState(""),[notice,setNotice]=useState("");
 const [records,setRecords]=useState<Reservation[]>([]),[cabins,setCabins]=useState<Cabin[]>([]),[types,setTypes]=useState<Kind[]>([]),[reviews,setReviews]=useState<Review[]>([]),[deposits,setDeposits]=useState<Deposit[]>([]);
 const [open,setOpen]=useState<string[]>([]),[filter,setFilter]=useState("all"),[search,setSearch]=useState("");
 const [payMonth,setPayMonth]=useState(""),[payAmount,setPayAmount]=useState(""),[payReference,setPayReference]=useState("");
 useEffect(()=>{const s=getStoredSession();setSession(s);if(s)void load(s);else setLoading(false)},[]);
 async function load(s:AuthSession){
  setLoading(true);setError("");
  try{
   if(s.user.id!==OWNER)throw new Error("Este panel es exclusivo del administrador Luis.");
   const member=await rest<Array<{rol:string;activo:boolean}>>("usuario_clientes?select=rol,activo&cliente_id=eq."+CLIENT+"&usuario_id=eq."+OWNER+"&activo=eq.true",s);
   if(!member.some(x=>x.rol==="admin"))throw new Error("Sin permisos de administración para Cinco Lagos.");
   const [r,c,t,v,p]=await Promise.all([
    rest<Reservation[]>("reservations?select=id,created_by,added_by_name,created_at,reservation_code,source,status,payment_status,guest_name,check_in,check_out,cabin_id&cliente_id=eq."+CLIENT+"&created_by=eq."+OWNER+"&added_by_name=eq.Luis&source=in.(social,local,directa,otro)&order=created_at.desc&limit=10000",s),
    rest<Cabin[]>("cabins?select=id,nombre,cabin_type_id&cliente_id=eq."+CLIENT,s),
    rest<Kind[]>("cabin_types?select=id,nombre&cliente_id=eq."+CLIENT,s),
    rest<Review[]>("commission_reviews?select=reservation_id,decision,commission_amount,note,reviewed_at&cliente_id=eq."+CLIENT,s),
    rest<Deposit[]>("commission_deposits?select=id,month_start,amount,reference,deposited_on&cliente_id=eq."+CLIENT+"&order=deposited_on.desc",s)
   ]);
   setRecords(r);setCabins(c);setTypes(t);setReviews(v);setDeposits(p);
   if(!open.length){setOpen([...new Set(r.map(x=>monthKey(x.created_at)))].slice(0,1));}
  }catch(e){setError(e instanceof Error?e.message:"No fue posible cargar los datos");}finally{setLoading(false);}
 }
 const withInfo=useMemo(()=>records.map(r=>{const cabin=cabins.find(c=>c.id===r.cabin_id);const kind=types.find(t=>t.id===cabin?.cabin_type_id)?.nombre||"";const review=reviews.find(v=>v.reservation_id===r.id);return {...r,cabin:cabin?.nombre||"Sin cabaña",kind,amount:review?.commission_amount??amount(kind),review,month:monthKey(r.created_at)}}).filter(r=>r.amount>0),[records,cabins,types,reviews]);
 const months=useMemo(()=>[...new Set(withInfo.map(r=>r.month))].sort().reverse(),[withInfo]);
 const approved=withInfo.filter(r=>r.review?.decision==="approved").reduce((s,r)=>s+r.amount,0);
 const deposited=deposits.reduce((s,d)=>s+Number(d.amount),0);
 const balance=approved-deposited;
 async function reviewReservation(r:typeof withInfo[number],approve:boolean){
  if(!session||saving)return;
  if(approve&&r.status==="cancelada"){setError("Una reserva cancelada no se puede aprobar.");return}
  setSaving(r.id);setError("");setNotice("");
  try{
   const note=approve?null:(window.prompt("Motivo de no aprobación (opcional):",r.review?.note||"")??r.review?.note??null);
   const body={reservation_id:r.id,cliente_id:CLIENT,decision:approve?"approved":"rejected",commission_amount:r.amount,note};
   if(r.review)await rest("commission_reviews?reservation_id=eq."+r.id,session,{method:"PATCH",headers:{Prefer:"return=minimal"},body:JSON.stringify({decision:body.decision,note})});
   else await rest("commission_reviews",session,{method:"POST",headers:{Prefer:"return=minimal"},body:JSON.stringify(body)});
   await load(session);setNotice("Comisión actualizada.");
  }catch(e){setError(e instanceof Error?e.message:"No se pudo guardar la revisión")}finally{setSaving("")}
 }
 async function registerDeposit(e:FormEvent){
  e.preventDefault();if(!session||saving)return;const value=Number(payAmount);
  const m=withInfo.filter(r=>r.month===payMonth),a=m.filter(r=>r.review?.decision==="approved").reduce((s,r)=>s+r.amount,0),p=deposits.filter(d=>d.month_start===payMonth+"-01").reduce((s,d)=>s+Number(d.amount),0);
  if(!Number.isFinite(value)||value<=0||value>a-p){setError("El depósito debe ser mayor que cero y no superar el saldo aprobado de ese mes.");return}
  setSaving("deposit");setError("");
  try{await rest("commission_deposits",session,{method:"POST",headers:{Prefer:"return=minimal"},body:JSON.stringify({cliente_id:CLIENT,month_start:payMonth+"-01",amount:value,reference:payReference.trim()||null,created_by:OWNER})});setPayAmount("");setPayReference("");setPayMonth("");await load(session);setNotice("Depósito registrado correctamente.")}
  catch(e){setError(e instanceof Error?e.message:"No se pudo registrar el depósito")}finally{setSaving("")}
 }
 if(!session)return <div className="grid min-h-screen place-items-center bg-[#f4f1ea] text-[#173c34]"><div className="rounded-3xl bg-white p-8"><h1 className="text-xl font-semibold">Inicia sesión para continuar</h1><a href="/panel" className="mt-4 block text-emerald-700 underline">Ir al panel de acceso</a></div></div>;
 const monthly=months.map(month=>{const all=withInfo.filter(r=>r.month===month),items=all.filter(r=>(filter==="all"||filter==="approved"&&r.review?.decision==="approved"||filter==="rejected"&&r.review?.decision==="rejected"||filter==="unreviewed"&&!r.review)&&((r.guest_name||"")+" "+(r.reservation_code||"")+" "+r.cabin).toLowerCase().includes(search.toLowerCase())),sum=all.reduce((s,r)=>s+r.amount,0),ok=all.filter(r=>r.review?.decision==="approved").reduce((s,r)=>s+r.amount,0),paid=deposits.filter(d=>d.month_start===month+"-01").reduce((s,d)=>s+Number(d.amount),0);return {month,all,items,sum,ok,paid}});
 return <div className="min-h-screen bg-[#f4f1ea] text-[#173c34]"><header className="bg-[#123d34] text-white"><div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4"><div className="flex items-center gap-3"><img src="/images/logo/cinco-lagos-logo.jpeg" className="h-11 w-11 rounded-full object-cover" alt="Cinco Lagos"/><div><p className="text-[10px] uppercase tracking-[.2em] text-white/60">Administración / Luis</p><h1 className="text-lg font-semibold">Panel de comisiones</h1></div></div><div className="flex items-center gap-2"><a href="/panel" className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-3 py-2 text-xs md:text-sm"><ArrowLeft size={16}/> Reservaciones</a><button onClick={()=>void load(session)} title="Actualizar" className="rounded-xl p-2"><RefreshCw size={18}/></button><button onClick={()=>{signOutLocal();location.href="/panel"}} title="Cerrar sesión" className="rounded-xl p-2"><LogOut size={18}/></button></div></div></header>
 <main className="mx-auto max-w-6xl space-y-6 px-4 py-8">
 <div><p className="text-sm text-[#2f7668]">Comisiones por mes de contratación · hora de Chiapas</p><h2 className="mt-1 text-3xl font-semibold">Control de pagos a Luis</h2><p className="mt-2 text-sm text-[#173c34]/60">Cada reserva aparece en el mes en que se creó, independientemente de su fecha de hospedaje. Las nuevas comisiones comienzan sin revisión.</p></div>
 {error&&<p role="alert" className="rounded-2xl bg-red-50 p-4 text-sm text-red-800">{error}</p>}{notice&&<p role="status" className="rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800">{notice}</p>}
 <section className="grid grid-cols-2 gap-3 md:grid-cols-4">{[{title:"Potencial",val:money(withInfo.reduce((s,r)=>s+r.amount,0))},{title:"Aprobado",val:money(approved)},{title:"Depósitos registrados",val:money(deposited)},{title:"Por depositar",val:money(balance)}].map(c=><div key={c.title} className="rounded-2xl bg-white p-4 shadow-sm"><p className="text-xs text-[#173c34]/60">{c.title}</p><p className="mt-2 text-xl font-bold tabular-nums md:text-2xl">{c.val}</p></div>)}</section>
 <div className="flex flex-wrap items-center gap-3"><label className="sr-only" htmlFor="filter-commissions">Filtrar estado</label><select id="filter-commissions" value={filter} onChange={e=>setFilter(e.target.value)} className="rounded-xl border bg-white px-4 py-3 text-sm"><option value="all">Todas</option><option value="unreviewed">Sin revisar</option><option value="approved">Aprobadas</option><option value="rejected">No aprobadas</option></select><input aria-label="Buscar reserva o huésped" placeholder="Buscar huésped, cabaña o código…" value={search} onChange={e=>setSearch(e.target.value)} className="min-w-[220px] flex-1 rounded-xl border bg-white px-4 py-3 text-sm"/></div>
 {loading?<p className="rounded-2xl bg-white p-8 text-center">Cargando comisiones…</p>:monthly.length===0?<p className="rounded-2xl bg-white p-8">No hay reservas de Luis registradas.</p>:monthly.map(({month,all,items,sum,ok,paid})=><section key={month} className="overflow-hidden rounded-3xl border border-[#173c34]/10 bg-white shadow-sm"><button className="flex w-full flex-wrap items-center justify-between gap-3 bg-[#f8f6f1] px-5 py-5 text-left" onClick={()=>setOpen(old=>old.includes(month)?old.filter(x=>x!==month):[...old,month])}><div className="flex items-center gap-2"><CalendarDays size={19} className="text-[#1f8f7a]"/><h3 className="font-bold capitalize">{new Intl.DateTimeFormat("es-MX",{month:"long",year:"numeric"}).format(new Date(month+"-15T12:00:00"))}</h3><span className="text-xs text-[#173c34]/60">({all.length} reservas)</span></div><div className="flex flex-wrap items-center gap-3 text-xs"><span>Potencial <b>{money(sum)}</b></span><span>Aprobado <b>{money(ok)}</b></span><span>Depositado <b>{money(paid)}</b></span><span>Saldo <b>{money(ok-paid)}</b></span>{open.includes(month)?<ChevronUp size={18}/>:<ChevronDown size={18}/>}</div></button>
 {open.includes(month)&&<div className="divide-y">{items.length===0?<p className="p-6 text-sm">Sin coincidencias para este filtro.</p>:items.map(r=><div key={r.id} className="flex flex-col gap-3 px-5 py-4 lg:flex-row lg:items-center lg:justify-between"><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><strong className="text-sm">{r.guest_name||"Sin nombre"}</strong><span className="text-xs text-[#173c34]/50">{r.reservation_code||r.id.slice(0,8)}</span><span className="rounded-full bg-[#e5f2eb] px-2 py-1 text-[10px] font-semibold">{r.cabin}</span>{r.status==="cancelada"&&<span className="rounded-full bg-red-100 px-2 py-1 text-[10px] text-red-700">Cancelada</span>}</div><p className="mt-1 text-xs text-[#173c34]/65">Contratada: {displayDate(r.created_at)} · Hospedaje: {r.check_in} → {r.check_out} ({nights(r.check_in,r.check_out)} noches)</p><p className="mt-1 text-xs text-[#173c34]/60">{r.payment_status} · {r.source}{r.review?.note?" · Nota: "+r.review.note:""}</p></div><div className="flex items-center justify-between gap-4 lg:justify-end"><strong className="text-lg tabular-nums">{money(r.amount)}</strong><div className="flex items-center gap-2"><span className="text-xs">{!r.review?"Sin revisar":r.review.decision==="approved"?"Aprobada":"No aprobada"}</span><button type="button" role="switch" aria-label={"Aprobar comisión de "+(r.guest_name||r.cabin)} aria-checked={r.review?.decision==="approved"} disabled={!!saving||r.status==="cancelada"&&r.review?.decision!=="approved"} onClick={()=>void reviewReservation(r,r.review?.decision!=="approved")} className={`relative h-8 w-14 rounded-full transition disabled:cursor-not-allowed disabled:opacity-50 ${r.review?.decision==="approved"?"bg-[#1f8f7a]":"bg-slate-300"}`}><span className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-all ${r.review?.decision==="approved"?"left-7":"left-1"}`}/></button></div></div></div>)}</div>}</section>)}
 <section className="rounded-3xl border border-[#173c34]/10 bg-white p-5 shadow-sm md:p-7"><div className="flex items-center gap-2"><Wallet className="text-[#1f8f7a]"/><h3 className="text-xl font-semibold">Registrar depósito</h3></div><p className="mt-2 text-sm text-[#173c34]/60">Solo se permiten depósitos hasta el saldo aprobado de cada mes. Los pagos permanecen en el historial.</p><form onSubmit={registerDeposit} className="mt-5 grid gap-3 md:grid-cols-4"><select aria-label="Mes del depósito" required value={payMonth} onChange={e=>setPayMonth(e.target.value)} className="rounded-xl border p-3 text-sm"><option value="">Seleccionar mes</option>{monthly.filter(m=>m.ok>m.paid).map(m=><option key={m.month} value={m.month}>{m.month} · saldo {money(m.ok-m.paid)}</option>)}</select><input aria-label="Importe del depósito" type="number" required min="0.01" step="0.01" placeholder="Importe MXN" value={payAmount} onChange={e=>setPayAmount(e.target.value)} className="rounded-xl border p-3 text-sm"/><input aria-label="Referencia del depósito" placeholder="Referencia (opcional)" value={payReference} onChange={e=>setPayReference(e.target.value)} className="rounded-xl border p-3 text-sm"/><button disabled={!!saving||!payMonth} className="rounded-xl bg-[#1f8f7a] p-3 text-sm font-semibold text-white disabled:opacity-50">{saving==="deposit"?"Guardando…":"Registrar depósito"}</button></form><h4 className="mt-7 text-sm font-semibold">Historial de depósitos</h4>{deposits.length===0?<p className="mt-2 text-sm text-[#173c34]/60">Todavía no se han registrado depósitos.</p>:<div className="mt-3 divide-y">{deposits.map(d=><div key={d.id} className="flex flex-wrap justify-between gap-2 py-3 text-sm"><span>{d.month_start.slice(0,7)} · {d.deposited_on} {d.reference?"· "+d.reference:""}</span><strong>{money(Number(d.amount))}</strong></div>)}</div>}</section>
 </main></div>;
}
