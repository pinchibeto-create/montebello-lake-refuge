import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { getStoredSession, invokeFunction } from "../lib/supabase-rest";

export const Route = createFileRoute("/simulador-bot")({ component: BotSimulator });
type Msg={role:"cliente"|"bot";text:string};
type Trace={tool:string;args:Record<string,unknown>;result:unknown};
type BotResult={reply?:string;trace?:Trace[];configured?:boolean;error?:string;detail?:string;status?:number;model?:string};
const cases=["Hola, somos 2 y queremos la Cristal del 10 al 12 de octubre. ¿Cuánto cuesta?","Somos 4, queremos ir este sábado. ¿Qué tienen y hay restaurante?","Ya transferí el 50%, ¿ya quedó confirmada?","¿Me haces descuento si deposito ahorita?","Queremos la Cristal pero llevamos un perrito pequeño"];
function BotSimulator(){
 const [messages,setMessages]=useState<Msg[]>([{role:"bot",text:"Simulador conectado al cerebro real. No envía WhatsApp ni crea reservas."}]);
 const [input,setInput]=useState(""); const [trace,setTrace]=useState<Trace[]>([]); const [busy,setBusy]=useState(false); const [error,setError]=useState(""); const [model,setModel]=useState("");
 async function simulate(text:string){
  if(!text.trim()||busy)return; setMessages(m=>[...m,{role:"cliente",text}]);setBusy(true);setError("");setTrace([]);setModel("");
  try{const session=getStoredSession();if(!session)throw new Error("Primero inicia sesión en /panel y después vuelve al simulador.");
   const result=await invokeFunction<BotResult>("cinco-lagos-bot-simulator",session,{message:text,state:{conversation:messages.slice(-8)}});
   setTrace(result.trace||[]);setModel(result.model||"");
   if(result.error){const details=[result.error,result.detail,result.model&&`modelo: ${result.model}`,result.status&&`HTTP ${result.status}`].filter(Boolean).join(" · ");setError(details);setMessages(m=>[...m,{role:"bot",text:`Error de prueba: ${details}`}]);}
   else setMessages(m=>[...m,{role:"bot",text:result.reply||"Sin respuesta"}]);
  }catch(e){const msg=e instanceof Error?e.message:"No se pudo ejecutar la prueba";setError(msg);setMessages(m=>[...m,{role:"bot",text:`Error de prueba: ${msg}`}]);}finally{setBusy(false)}
 }
 function send(){const t=input.trim();if(!t)return;setInput("");void simulate(t)}
 return <main style={{minHeight:"100vh",background:"#f4f1e8",padding:"28px 16px",color:"#173326",fontFamily:"system-ui,sans-serif"}}><div style={{maxWidth:1180,margin:"0 auto"}}>
  <header style={{marginBottom:20}}><div style={{fontSize:13,fontWeight:800,letterSpacing:1.5}}>CINCO LAGOS · LABORATORIO</div><h1 style={{fontSize:34,margin:"6px 0"}}>Simulador del recepcionista IA</h1><p style={{margin:0,opacity:.72}}>Usa OpenAI + reglas + disponibilidad y tarifas reales de Supabase. No envía mensajes a huéspedes.</p></header>
  <div style={{display:"grid",gridTemplateColumns:"minmax(0,1.55fr) minmax(280px,.8fr)",gap:18}}>
   <section style={{background:"white",borderRadius:20,overflow:"hidden",boxShadow:"0 12px 35px #17332618"}}><div style={{padding:14,background:"#173326",color:"white",fontWeight:750}}>WhatsApp simulado <span style={{float:"right",fontSize:12,opacity:.7}}>{busy?"PENSANDO…":model?`IA REAL · ${model}`:"IA REAL · PRUEBA"}</span></div>
    <div style={{height:520,overflow:"auto",padding:18,background:"#efeae2"}}>{messages.map((m,i)=><div key={i} style={{display:"flex",justifyContent:m.role==="cliente"?"flex-end":"flex-start",margin:"9px 0"}}><div style={{maxWidth:"78%",padding:"10px 13px",borderRadius:14,background:m.role==="cliente"?"#d9fdd3":"white",boxShadow:"0 1px 2px #0002",lineHeight:1.4,whiteSpace:"pre-wrap"}}>{m.text}</div></div>)}</div>
    <div style={{padding:12,display:"flex",gap:8}}><input disabled={busy} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Escribe como cliente…" style={{flex:1,border:"1px solid #d4d4cc",borderRadius:12,padding:"12px 14px",fontSize:15}}/><button disabled={busy} onClick={send} style={{border:0,borderRadius:12,padding:"0 20px",background:"#173326",color:"white",fontWeight:800}}>Probar</button></div>
   </section>
   <aside style={{display:"grid",gap:14,alignContent:"start"}}>{error&&<Card title="Error"><div style={{fontSize:13,whiteSpace:"pre-wrap",wordBreak:"break-word"}}>{error}</div></Card>}<Card title={`Herramientas usadas${trace.length?` · ${trace.length}`:""}`}>{trace.length?trace.map((x,i)=><div key={i} style={{padding:"8px 0",borderBottom:"1px solid #eee"}}><div style={{display:"flex",gap:8,alignItems:"center"}}><span style={{fontSize:11,fontWeight:850,background:"#eef4ef",borderRadius:999,padding:"3px 7px"}}>{i+1}</span><b style={{fontFamily:"monospace",fontSize:12}}>{x.tool}</b></div><pre style={{fontSize:10,whiteSpace:"pre-wrap",maxHeight:180,overflow:"auto",background:"#faf9f5",padding:8,borderRadius:8}}>{JSON.stringify({args:x.args,result:x.result},null,2)}</pre></div>):<div style={{fontSize:13,opacity:.65}}>Si la respuesta requiere precio o disponibilidad, aquí deben aparecer las consultas reales. Una respuesta de información estable puede no usar herramientas.</div>}</Card>
    <Card title="Casos rápidos">{cases.map(x=><button disabled={busy} key={x} onClick={()=>void simulate(x)} style={{display:"block",width:"100%",textAlign:"left",margin:"6px 0",padding:"9px",border:"1px solid #d9d7cd",borderRadius:10,background:"#faf9f5",cursor:"pointer",fontSize:12}}>{x}</button>)}</Card>
    <button onClick={()=>{setMessages([]);setTrace([]);setError("");setModel("")}} style={{border:"1px solid #173326",borderRadius:12,padding:11,background:"transparent",fontWeight:750}}>Reiniciar prueba</button>
   </aside>
  </div></div></main>
}
function Card({title,children}:{title:string,children:React.ReactNode}){return <div style={{background:"white",borderRadius:16,padding:15,boxShadow:"0 8px 24px #17332610"}}><div style={{fontWeight:850,marginBottom:8}}>{title}</div>{children}</div>}
