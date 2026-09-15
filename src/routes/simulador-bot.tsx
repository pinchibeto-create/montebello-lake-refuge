import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/simulador-bot")({ component: BotSimulator });

type Msg = { role: "cliente" | "bot"; text: string };

const cases = [
  "Hola, somos 2 y queremos la Cristal del 10 al 12 de octubre. ¿Cuánto cuesta?",
  "Somos 4, queremos ir este sábado. ¿Qué tienen y hay restaurante?",
  "Ya transferí el 50%, ¿ya quedó confirmada?",
  "¿Me haces descuento si deposito ahorita?",
  "Queremos la Cristal pero llevamos un perrito pequeño",
];

function BotSimulator() {
  const [messages, setMessages] = useState<Msg[]>([{ role: "bot", text: "Simulador de pruebas · no envía mensajes a WhatsApp. Escribe como si fueras un huésped." }]);
  const [input, setInput] = useState("");
  const [state, setState] = useState({ etapa: "NUEVO", personas: "—", fechas: "—", cabana: "—", pago: "no reportado", humano: "no" });
  const analysis = useMemo(() => ({ reglas: ["Disponibilidad antes de cotizar", "Tarifa desde Supabase", "No confirmar pagos sin verificar"], herramientas: ["bot_check_availability", "bot_get_rate / bot_quote_stay", "bot_find_available_segments"] }), []);

  function simulate(text: string) {
    const t = text.toLowerCase();
    const people = t.match(/(?:somos|para)\s+(\d+)/)?.[1] || state.personas;
    const cristal = t.includes("cristal");
    const payment = /transfer|deposit|pagu|comprobante/.test(t);
    const discount = /descuento|más barato|rebaja/.test(t);
    const pet = /perr|mascota|gato/.test(t);
    const relative = /hoy|mañana|sábado|domingo|fin de semana/.test(t);
    const human = payment || discount || pet;
    setState(s => ({ ...s, etapa: payment ? "PAGO_REPORTADO" : human ? "REQUIERE_HUMANO" : "RECOPILANDO_DATOS", personas: people, cabana: cristal ? "Cristal" : s.cabana, fechas: relative ? "fecha relativa → resolver al recibir" : s.fechas, pago: payment ? "reportado, NO verificado" : s.pago, humano: human ? "sí" : "no" }));
    let reply = "Entendido. Tomé los datos que ya me diste. Antes de darte disponibilidad o precio debo consultarlos en Supabase.";
    if (payment) reply = "Gracias. Ya marqué el pago como reportado, pero todavía no puedo confirmar la reservación hasta verificarlo. Voy a pasar la comprobación a una persona del equipo.";
    else if (discount) reply = "Puedo revisar disponibilidad y la tarifa vigente, pero los descuentos necesitan autorización del equipo. Te ayudo a revisarlo.";
    else if (pet) reply = "Nuestra política general es no admitir mascotas. Como es una solicitud especial, la paso con el equipo antes de prometerte una excepción.";
    else if (cristal && Number(people) > 2) reply = `La Cristal es para 2 personas, así que para ${people} buscaría una opción con capacidad suficiente antes de cotizarte.`;
    else if (relative) reply = "Sí. Primero convertiría “este sábado / hoy / mañana” a la fecha exacta según el momento en que recibí tu mensaje y después consultaría disponibilidad y tarifa.";
    setMessages(m => [...m, { role: "cliente", text }, { role: "bot", text: reply }]);
  }

  function send() { const text = input.trim(); if (!text) return; setInput(""); simulate(text); }

  return <main style={{minHeight:"100vh",background:"#f4f1e8",padding:"28px 16px",color:"#173326",fontFamily:"system-ui,sans-serif"}}>
    <div style={{maxWidth:1180,margin:"0 auto"}}>
      <header style={{marginBottom:20}}><div style={{fontSize:13,fontWeight:800,letterSpacing:1.5}}>CINCO LAGOS · LABORATORIO</div><h1 style={{fontSize:34,margin:"6px 0"}}>Simulador del recepcionista IA</h1><p style={{margin:0,opacity:.72}}>Entorno de prueba. No escribe a clientes ni crea reservas reales.</p></header>
      <div style={{display:"grid",gridTemplateColumns:"minmax(0,1.55fr) minmax(280px,.8fr)",gap:18}}>
        <section style={{background:"white",borderRadius:20,overflow:"hidden",boxShadow:"0 12px 35px #17332618"}}>
          <div style={{padding:14,background:"#173326",color:"white",fontWeight:750}}>WhatsApp simulado <span style={{float:"right",fontSize:12,opacity:.7}}>BOT NO EN VIVO</span></div>
          <div style={{height:520,overflow:"auto",padding:18,background:"#efeae2"}}>{messages.map((m,i)=><div key={i} style={{display:"flex",justifyContent:m.role==="cliente"?"flex-end":"flex-start",margin:"9px 0"}}><div style={{maxWidth:"78%",padding:"10px 13px",borderRadius:14,background:m.role==="cliente"?"#d9fdd3":"white",boxShadow:"0 1px 2px #0002",lineHeight:1.4}}>{m.text}</div></div>)}</div>
          <div style={{padding:12,display:"flex",gap:8}}><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Escribe como cliente…" style={{flex:1,border:"1px solid #d4d4cc",borderRadius:12,padding:"12px 14px",fontSize:15}}/><button onClick={send} style={{border:0,borderRadius:12,padding:"0 20px",background:"#173326",color:"white",fontWeight:800}}>Probar</button></div>
        </section>
        <aside style={{display:"grid",gap:14,alignContent:"start"}}>
          <Card title="Estado extraído">{Object.entries(state).map(([k,v])=><Row key={k} k={k} v={v}/>)}</Card>
          <Card title="Herramientas obligatorias">{analysis.herramientas.map(x=><div key={x} style={{padding:"6px 0",fontFamily:"monospace",fontSize:12}}>✓ {x}</div>)}</Card>
          <Card title="Reglas de seguridad">{analysis.reglas.map(x=><div key={x} style={{padding:"5px 0",fontSize:13}}>• {x}</div>)}</Card>
          <Card title="Casos rápidos">{cases.map(x=><button key={x} onClick={()=>simulate(x)} style={{display:"block",width:"100%",textAlign:"left",margin:"6px 0",padding:"9px",border:"1px solid #d9d7cd",borderRadius:10,background:"#faf9f5",cursor:"pointer",fontSize:12}}>{x}</button>)}</Card>
          <button onClick={()=>{setMessages([]);setState({etapa:"NUEVO",personas:"—",fechas:"—",cabana:"—",pago:"no reportado",humano:"no"})}} style={{border:"1px solid #173326",borderRadius:12,padding:11,background:"transparent",fontWeight:750}}>Reiniciar prueba</button>
        </aside>
      </div>
    </div>
  </main>;
}
function Card({title,children}:{title:string,children:React.ReactNode}){return <div style={{background:"white",borderRadius:16,padding:15,boxShadow:"0 8px 24px #17332610"}}><div style={{fontWeight:850,marginBottom:8}}>{title}</div>{children}</div>}
function Row({k,v}:{k:string,v:string}){return <div style={{display:"flex",justifyContent:"space-between",gap:12,padding:"6px 0",borderBottom:"1px solid #eee",fontSize:13}}><span style={{opacity:.6}}>{k}</span><b style={{textAlign:"right"}}>{v}</b></div>}
