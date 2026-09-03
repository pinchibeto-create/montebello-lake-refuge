import { useEffect } from "react";

type Session={access_token:string;user:{id:string;email?:string}};
type Row={reservation_code:string;source:string;added_by_name:string|null};
const URL="https://jybfyuaxcewbecmbaibu.supabase.co";
const KEY="sb_publishable_Lc90p_iA0gGGQKHW6PvADA_SvoEa975";
function auth(){try{return JSON.parse(localStorage.getItem("cinco-lagos-session")||"null") as Session|null}catch{return null}}
function actor(email?:string){const e=(email||"").toLowerCase();if(e==="pinchibeto@gmail.com")return "Luis";if(e==="ivlu001@hotmail.com"||e==="garciafredi891@gmail.com")return "Fredi";if(e==="omerog@hotmail.com")return "Omero";if(e==="alondra_5_7@hotmail.com")return "Alondra";return null}
function label(r:Row){return r.source==="booking"?"Booking":r.source==="airbnb"?"Airbnb":r.added_by_name||"Manual"}
async function request(path:string,s:Session,init?:RequestInit){return fetch(`${URL}/rest/v1/${path}`,{...init,headers:{apikey:KEY,Authorization:`Bearer ${s.access_token}`,"Content-Type":"application/json",...(init?.headers||{})}})}

export default function DesktopReservationActor(){
 useEffect(()=>{
  if(location.pathname!=="/panel"||matchMedia("(max-width: 767px)").matches)return;
  const s=auth();if(!s)return;
  let rows:Row[]=[];let stopped=false;
  const scan=()=>{
   if(stopped)return;
   for(const r of rows){
    const wanted=label(r);
    for(const p of [...document.querySelectorAll("p")]){
     if(p.textContent?.trim()!==`#${r.reservation_code}`)continue;
     const card=p.parentElement;if(!card)continue;
     const spans=[...card.querySelectorAll("span")];
     const sourceSpan=spans.find(x=>["Redes","Local","Directa","Otro","Manual"].includes(x.textContent?.trim()||""));
     if(sourceSpan)sourceSpan.textContent=wanted;
    }
    for(const el of [...document.querySelectorAll("div")]){
     if(el.textContent?.trim()!==r.reservation_code)continue;
     const modal=el.closest(".fixed");if(!modal)continue;
     const origin=[...modal.querySelectorAll("p")].find(x=>x.textContent?.trim()==="Origen");
     const value=origin?.parentElement?.querySelectorAll("p")[1];if(value)value.textContent=wanted;
    }
   }
  };
  (async()=>{
   const who=actor(s.user.email);
   if(who)await request(`reservations?created_by=eq.${s.user.id}&added_by_name=is.null&source=not.in.(booking,airbnb)`,s,{method:"PATCH",headers:{Prefer:"return=minimal"},body:JSON.stringify({added_by_name:who})});
   const res=await request("reservations?select=reservation_code,source,added_by_name&status=in.(pendiente,confirmada)",s);
   if(res.ok){rows=await res.json();scan()}
  })().catch(()=>{});
  const observer=new MutationObserver(scan);observer.observe(document.body,{subtree:true,childList:true});
  return()=>{stopped=true;observer.disconnect()};
 },[]);
 return null;
}
