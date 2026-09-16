import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { getStoredSession, invokeFunction, rest, type AuthSession } from "../lib/supabase-rest";

export const Route = createFileRoute("/modo-sombra")({
  head: () => ({ meta: [{ title: "Modo sombra WhatsApp | Cinco Lagos" }, { name: "robots", content: "noindex, nofollow" }] }),
  component: ShadowMode,
});

type Membership={cliente_id:string;rol:string};
type Trace={tool:string;args:Record<string,unknown>;result:unknown};
type State={id:string;guest_phone:string|null;guest_name:string|null;stage:string;check_in:string|null;check_out:string|null;adults:number|null;children:number|null;babies:number|null;preferred_cabin_type:string|null;trip_reason:string|null;payment_reported:boolean;payment_verified:boolean;bot_enabled:boolean;human_takeover:boolean;last_customer_message_at:string|null;last_bot_message_at:string|null;updated_at:string};
type Log={id:string;conversation_state_id:string;direction:"inbound"|"shadow_outbound"|"system";body:string;status:string;model:string|null;trace:Trace[];created_at:string};
type ShadowResult={shadow?:boolean;sent?:boolean;suppressed?:boolean;reason?:string;reply?:string;trace?:Trace[];memory_patch?:Record<string,unknown>;conversation_state_id?:string;state?:State;model?:string;duplicate?:boolean;error?:string;detail?:string};

function ShadowMode(){
  const [session,setSession]=useState<AuthSession|null>(null);
  const [membership,setMembership]=useState<Membership|null>(null);
  const [phone,setPhone]=useState("5638844112");
  const [name,setName]=useState("Cliente prueba");
  const [message,setMessage]=useState("Hola, somos 2 y queremos la Cristal para este sábado. ¿Cuánto cuesta?");
  const [result,setResult]=useState<ShadowResult|null>(null);
  const [states,setStates]=useState<State[]>([]);
  const [logs,setLogs]=useState<Log[]>([]);
  const [selected,setSelected]=useState<string|null>(null);
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState("");

  useEffect(()=>{const s=getStoredSession();setSession(s);if(s) void resolveMembership(s)},[]);
  useEffect(()=>{if(session&&membership) void loadStates(session,membership)},[session,membership]);
  useEffect(()=>{if(session&&selected) void loadLogs(session,selected)},[session,selected]);

  async function resolveMembership(s:AuthSession){
    try{
      const ms=await rest<Membership[]>(`usuario_clientes?select=cliente_id,rol&usuario_id=eq.${s.user.id}&activo=eq.true`,s);
      for(const m of ms){const c=await rest<Array<{slug:string}>>(`clientes?select=slug&id=eq.${m.cliente_id}`,s);if(c[0]?.slug==="cinco-lagos"){setMembership(m);return;}}
      setError("Tu cuenta no tiene acceso a Cinco Lagos.");
    }catch(e){setError(e instanceof Error?e.message:"No se pudo verificar el acceso");}
  }
  async function loadStates(s:AuthSession,m:Membership){
    try{const rows=await rest<State[]>(`bot_conversation_state?select=id,guest_phone,guest_name,stage,check_in,check_out,adults,children,babies,preferred_cabin_type,trip_reason,payment_reported,payment_verified,bot_enabled,human_takeover,last_customer_message_at,last_bot_message_at,updated_at&cliente_id=eq.${m.cliente_id}&channel=eq.whatsapp&order=updated_at.desc&limit=30`,s);setStates(rows);if(!selected&&rows[0])setSelected(rows[0].id);}catch(e){setError(e instanceof Error?e.message:"No se pudo cargar la memoria");}
  }
  async function loadLogs(s:AuthSession,stateId:string){
    try{const rows=await rest<Log[]>(`bot_message_log?select=id,conversation_state_id,direction,body,status,model,trace,created_at&conversation_state_id=eq.${stateId}&order=created_at.asc&limit=100`,s);setLogs(rows);}catch(e){setError(e instanceof Error?e.message:"No se pudieron cargar los mensajes");}
  }
  async function run(){
    if(!session||!membership||busy)return;
    setBusy(true);setError("");setResult(null);
    try{
      const r=await invokeFunction<ShadowResult>("cinco-lagos-whatsapp-shadow",session,{phone,name: name||undefined,message});
      setResult(r);
      if(r.conversation_state_id)setSelected(r.conversation_state_id);
      await loadStates(session,membership);
      if(r.conversation_state_id)await loadLogs(session,r.conversation_state_id);
    }catch(e){setError(e instanceof Error?e.message:"No se pudo ejecutar el modo sombra");}
    finally{setBusy(false);}
  }

  const current=useMemo(()=>states.find(s=>s.id===selected)||result?.state||null,[states,selected,result]);
  if(!session)return <ScreenMessage title="Inicia sesión primero" body="Abre /panel, inicia sesión y después vuelve a /modo-sombra."/>;
  if(!membership)return <ScreenMessage title="Verificando acceso" body={error||"Comprobando tu cuenta de Cinco Lagos…"}/>;

  return <main className="min-h-screen bg-[#f4f1ea] text-[#173c34]">
    <header className="bg-[#123d34] text-white"><div className="mx-auto flex max-w-[1450px] items-center justify-between px-5 py-4"><div><p className="text-xs uppercase tracking-[.22em] text-white/60">Cinco Lagos · laboratorio</p><h1 className="text-xl font-semibold">Modo sombra de WhatsApp</h1></div><div className="rounded-full bg-amber-300 px-4 py-2 text-xs font-extrabold text-amber-950">NO ENVÍA MENSAJES</div></div></header>
    <div className="mx-auto max-w-[1450px] p-4 md:p-8">
      <div className="mb-5 flex flex-wrap gap-2"><a href="/panel" className="rounded-xl border bg-white px-4 py-2 text-sm font-semibold">← Panel</a><a href="/simulador-bot" className="rounded-xl border bg-white px-4 py-2 text-sm font-semibold">Simulador sin memoria por teléfono</a></div>
      {error&&<div className="mb-5 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-800">{error}</div>}
      <div className="grid gap-5 xl:grid-cols-[360px_minmax(0,1fr)_360px]">
        <section className="rounded-3xl bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">Entrada simulada</h2><p className="mt-1 text-xs text-[#173c34]/55">Usa un teléfono fijo para comprobar que recuerda la conversación entre mensajes.</p>
          <label className="mt-5 block text-xs font-bold uppercase tracking-wide">Teléfono</label><input value={phone} onChange={e=>setPhone(e.target.value)} className="mt-1 w-full rounded-xl border px-3 py-3" placeholder="10 dígitos"/>
          <label className="mt-4 block text-xs font-bold uppercase tracking-wide">Nombre</label><input value={name} onChange={e=>setName(e.target.value)} className="mt-1 w-full rounded-xl border px-3 py-3"/>
          <label className="mt-4 block text-xs font-bold uppercase tracking-wide">Mensaje del huésped</label><textarea value={message} onChange={e=>setMessage(e.target.value)} rows={6} className="mt-1 w-full rounded-xl border px-3 py-3"/>
          <button disabled={busy||!phone.trim()||!message.trim()} onClick={()=>void run()} className="mt-4 w-full rounded-xl bg-[#173c34] px-4 py-3 font-bold text-white disabled:opacity-50">{busy?"Generando borrador…":"Procesar en modo sombra"}</button>
          <p className="mt-3 text-[11px] leading-5 text-[#173c34]/50">La función guarda el mensaje y el borrador en Supabase. No existe una llamada de envío a WhatsApp en esta etapa.</p>
        </section>

        <section className="space-y-5">
          <div className="rounded-3xl bg-white p-5 shadow-sm"><div className="flex items-center justify-between gap-3"><h2 className="text-lg font-semibold">Borrador de respuesta</h2>{result&&<span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">sent = {String(result.sent??false)}</span>}</div>
            {result?.suppressed?<div className="mt-4 rounded-2xl bg-amber-50 p-4 text-sm">Respuesta omitida: {result.reason}</div>:<div className="mt-4 min-h-28 whitespace-pre-wrap rounded-2xl bg-[#efeae2] p-4 text-[15px] leading-6">{result?.reply||"Aquí aparecerá lo que la IA habría contestado al huésped."}</div>}
            {result?.memory_patch&&Object.keys(result.memory_patch).length>0&&<div className="mt-4"><h3 className="text-xs font-bold uppercase tracking-wide text-[#173c34]/55">Memoria actualizada</h3><pre className="mt-2 overflow-auto rounded-xl bg-[#f7f6f2] p-3 text-xs">{JSON.stringify(result.memory_patch,null,2)}</pre></div>}
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm"><h2 className="text-lg font-semibold">Conversación persistente</h2><p className="mt-1 text-xs text-[#173c34]/50">Mensajes guardados para este número.</p><div className="mt-4 max-h-[430px] overflow-auto rounded-2xl bg-[#efeae2] p-3">{logs.length===0?<div className="p-4 text-sm text-[#173c34]/50">Sin mensajes todavía.</div>:logs.map(l=><div key={l.id} className={`my-2 flex ${l.direction==="inbound"?"justify-end":"justify-start"}`}><div className={`max-w-[84%] rounded-2xl px-3 py-2 text-sm shadow-sm ${l.direction==="inbound"?"bg-[#d9fdd3]":"bg-white"}`}><div className="whitespace-pre-wrap">{l.body}</div><div className="mt-1 text-[9px] uppercase tracking-wide opacity-45">{l.direction} · {l.status}</div></div></div>)}</div></div>

          <div className="rounded-3xl bg-white p-5 shadow-sm"><h2 className="text-lg font-semibold">Herramientas usadas</h2>{!result?.trace?.length?<p className="mt-3 text-sm text-[#173c34]/50">Una respuesta estable puede no usar herramientas. Precio y disponibilidad sí deben dejar traza.</p>:<div className="mt-3 space-y-2">{result.trace.map((t,i)=><details key={i} className="rounded-xl border p-3"><summary className="cursor-pointer text-sm font-bold">{i+1}. {t.tool}</summary><pre className="mt-2 overflow-auto text-[10px]">{JSON.stringify({args:t.args,result:t.result},null,2)}</pre></details>)}</div>}</div>
        </section>

        <aside className="space-y-5">
          <div className="rounded-3xl bg-white p-5 shadow-sm"><h2 className="text-lg font-semibold">Memoria del huésped</h2>{!current?<p className="mt-3 text-sm text-[#173c34]/50">Selecciona una conversación.</p>:<dl className="mt-4 space-y-2 text-sm">{Object.entries({Nombre:current.guest_name,Teléfono:current.guest_phone,Etapa:current.stage,Entrada:current.check_in,Salida:current.check_out,Adultos:current.adults,Niños:current.children,Bebés:current.babies,Cabaña:current.preferred_cabin_type,Motivo:current.trip_reason,"Pago reportado":current.payment_reported?"Sí":"No","Pago verificado":current.payment_verified?"Sí":"No","Toma humana":current.human_takeover?"Sí":"No"}).map(([k,v])=><div key={k} className="flex justify-between gap-3 border-b py-2 last:border-0"><dt className="text-[#173c34]/55">{k}</dt><dd className="text-right font-semibold">{v==null||v===""?"—":String(v)}</dd></div>)}</dl>}</div>
          <div className="rounded-3xl bg-white p-5 shadow-sm"><h2 className="text-lg font-semibold">Conversaciones recientes</h2><div className="mt-3 max-h-[520px] space-y-2 overflow-auto">{states.map(s=><button key={s.id} onClick={()=>setSelected(s.id)} className={`w-full rounded-2xl border p-3 text-left ${selected===s.id?"border-[#1f8f7a] bg-[#edf7f3]":"bg-white"}`}><div className="font-semibold">{s.guest_name||"Sin nombre"}</div><div className="mt-1 text-xs text-[#173c34]/55">{s.guest_phone||"Sin teléfono"} · {s.stage}</div><div className="mt-1 text-[10px] text-[#173c34]/40">{new Date(s.updated_at).toLocaleString("es-MX")}</div></button>)}{states.length===0&&<p className="text-sm text-[#173c34]/50">Todavía no hay conversaciones.</p>}</div></div>
        </aside>
      </div>
    </div>
  </main>
}

function ScreenMessage({title,body}:{title:string;body:string}){return <main className="grid min-h-screen place-items-center bg-[#f4f1ea] p-5 text-[#173c34]"><div className="max-w-md rounded-3xl bg-white p-8 shadow-sm"><h1 className="text-2xl font-semibold">{title}</h1><p className="mt-3 text-sm leading-6 text-[#173c34]/65">{body}</p><a href="/panel" className="mt-6 inline-block rounded-xl bg-[#173c34] px-5 py-3 text-sm font-bold text-white">Ir al panel</a></div></main>}
