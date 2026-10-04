import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  ArrowLeft, CalendarClock, Clock3, CreditCard, ExternalLink,
  Leaf, MessageCircle, PawPrint, ShieldCheck, Wifi,
} from "lucide-react";
import { whatsappLink } from "@/lib/site";

const URL = "https://cabanascincolagos.com/politicas";
const TITLE = "Políticas de hospedaje, cambios y cancelaciones | Cinco Lagos";
const DESCRIPTION = "Consulta las condiciones de reservación, anticipos, cambios de fecha, cancelaciones, horarios, mascotas, wifi satelital y convivencia en Cabañas Cinco Lagos.";

export const Route = createFileRoute("/politicas")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "es_MX" },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: PoliciesPage,
});

const sections = [
  ["reservaciones", "Reservaciones y pagos"],
  ["cambios", "Cambios de fecha"],
  ["cancelaciones", "Cancelaciones y devoluciones"],
  ["horarios", "Llegada y salida"],
  ["mascotas", "Mascotas y animales de asistencia"],
  ["wifi", "Wifi satelital"],
  ["ocupacion", "Ocupación y visitantes"],
  ["convivencia", "Convivencia y medio ambiente"],
  ["seguridad", "Seguridad y servicios"],
  ["instalaciones", "Cuidado de instalaciones"],
  ["plataformas", "Reservas mediante plataformas"],
  ["contacto", "Dudas y privacidad"],
] as const;

function PolicySection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 border-b border-[#142f1f]/10 py-9 first:pt-0 last:border-b-0">
      <h2 className="text-2xl font-semibold leading-tight text-[#142f1f] md:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 text-[15px] leading-7 text-[#142f1f]/75">{children}</div>
    </section>
  );
}

function SummaryItem({ icon, title, detail }: { icon: ReactNode; title: string; detail: string }) {
  return <div className="rounded-2xl border border-[#142f1f]/10 bg-white p-4">
    <div className="mb-3 text-[#246f60]">{icon}</div>
    <p className="font-semibold text-[#142f1f]">{title}</p>
    <p className="mt-1 text-sm leading-6 text-[#142f1f]/65">{detail}</p>
  </div>;
}

function PoliciesPage() {
  return <div className="min-h-screen bg-[#f6f5ef] text-[#142f1f]">
    <header className="sticky top-0 z-40 border-b border-[#142f1f]/10 bg-[#f6f5ef]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-5 md:h-20 md:px-8">
        <a href="/" className="flex items-center gap-3" aria-label="Volver al inicio de Cinco Lagos">
          <img src="/images/logo/cinco-lagos-logo.jpeg" alt="Logotipo Cinco Lagos" className="h-11 w-11 rounded-sm object-cover md:h-12 md:w-12" />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] sm:text-sm">Cinco Lagos</span>
        </a>
        <a href="/" className="inline-flex items-center gap-2 text-xs font-medium hover:underline sm:text-sm"><ArrowLeft className="h-4 w-4" /> Volver al inicio</a>
      </div>
    </header>

    <main>
      <section className="bg-[#142f1f] px-5 py-16 text-white md:py-24">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/60">Tu estancia · Información importante</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.05] md:text-6xl">Políticas de reservación y hospedaje</h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-white/75 md:text-lg">Queremos que tu experiencia comience con información clara. Conoce nuestras condiciones de reservación, cambios, cancelaciones y convivencia antes de confirmar tu estancia.</p>
          <p className="mt-8 text-xs uppercase tracking-[0.18em] text-white/50">Última actualización · 3 de octubre de 2026</p>
        </div>
      </section>

      <section aria-labelledby="resumen-politicas" className="px-5 py-10 md:px-8 md:py-14">
        <div className="mx-auto max-w-5xl">
          <h2 id="resumen-politicas" className="mb-5 text-2xl font-semibold md:text-3xl">Lo esencial, antes de reservar</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <SummaryItem icon={<CreditCard className="h-6 w-6" />} title="Anticipo del 50%" detail="Tu reservación queda confirmada después de verificar el pago y enviarte la confirmación." />
            <SummaryItem icon={<CalendarClock className="h-6 w-6" />} title="Cambios: mínimo 24 h" detail="Solicítalos antes de la llegada original. Sujetos a disponibilidad y diferencia tarifaria." />
            <SummaryItem icon={<ShieldCheck className="h-6 w-6" />} title="Cancelaciones: 72 h" detail="Avísanos con tres días de anticipación. El anticipo de una cancelación voluntaria no es reembolsable, salvo derechos legales aplicables." />
            <SummaryItem icon={<Clock3 className="h-6 w-6" />} title="Entrada y salida" detail="Check-in desde las 2:00 p. m.; check-out a las 12:00 p. m. Se solicita llegar antes de las 9:00 p. m." />
            <SummaryItem icon={<PawPrint className="h-6 w-6" />} title="Sin mascotas" detail="Actualmente no admitimos mascotas; se respetan los derechos relativos a animales de asistencia." />
            <SummaryItem icon={<Wifi className="h-6 w-6" />} title="Wifi satelital gratuito" detail="La estabilidad y velocidad pueden variar por el clima, la saturación o las condiciones de la red." />
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-8 md:pb-24">
        <div className="mx-auto grid max-w-5xl items-start gap-8 lg:grid-cols-[245px_1fr]">
          <aside className="rounded-3xl border border-[#142f1f]/10 bg-white p-5 lg:sticky lg:top-28">
            <p className="text-sm font-semibold">En esta página</p>
            <nav aria-label="Índice de políticas" className="mt-3 space-y-1">
              {sections.map(([id, title]) => <a key={id} href={"#" + id} className="block rounded-lg px-3 py-2 text-sm text-[#142f1f]/65 transition hover:bg-[#f6f5ef] hover:text-[#142f1f]">{title}</a>)}
            </nav>
          </aside>
          <article className="rounded-3xl border border-[#142f1f]/10 bg-white px-5 py-2 md:px-9 md:py-3">
            <PolicySection id="reservaciones" title="1. Reservaciones y pagos">
              <p>Para confirmar una reservación directa, solicitamos un anticipo equivalente al <strong>50% del costo total del hospedaje</strong>. La reservación únicamente se considera confirmada cuando el pago ha sido verificado y administración ha enviado la confirmación correspondiente.</p>
              <p>El saldo restante se cubrirá conforme a las indicaciones comunicadas al reservar. Las tarifas pueden variar por temporada, fecha y tipo de cabaña; se respetará la tarifa expresamente confirmada al contratar.</p>
            </PolicySection>
            <PolicySection id="cambios" title="2. Cambios de fecha">
              <p>Las solicitudes de modificación deben realizarse con <strong>al menos 24 horas de anticipación respecto a la llegada originalmente programada</strong>.</p>
              <p>Los cambios están sujetos a disponibilidad y, en su caso, al ajuste de tarifa entre las fechas. Enviar una solicitud no significa que el cambio esté autorizado: será válido únicamente cuando administración lo confirme expresamente. Las solicitudes fuera del plazo pueden ser rechazadas.</p>
            </PolicySection>
            <PolicySection id="cancelaciones" title="3. Cancelaciones, devoluciones y no presentación">
              <p>Solicitamos notificar las cancelaciones con <strong>al menos 72 horas (tres días) de anticipación</strong> a la llegada programada.</p>
              <p>En reservaciones directas, el anticipo del 50% es <strong>no reembolsable ante una cancelación voluntaria del huésped</strong>, conforme a las condiciones informadas antes de contratar y sin perjuicio de los derechos previstos por la legislación aplicable. Avisar con 72 horas no implica, por sí mismo, la devolución del anticipo.</p>
              <p>La no presentación sin aviso (<em>no-show</em>) o la salida anticipada por decisión personal tampoco genera automáticamente la devolución de noches no utilizadas, siempre que el servicio convenido se encuentre disponible.</p>
              <p>Si Cinco Lagos no pudiera prestar el hospedaje por causas imputables al establecimiento, atenderemos la situación ofreciendo las soluciones y devoluciones que correspondan conforme a la legislación de protección al consumidor. Las circunstancias extraordinarias serán revisadas individualmente.</p>
            </PolicySection>
            <PolicySection id="horarios" title="4. Horarios de entrada y salida">
              <ul className="list-disc space-y-2 pl-5"><li><strong>Entrada:</strong> a partir de las 2:00 p. m.</li><li><strong>Salida:</strong> 12:00 p. m., observando la tolerancia prevista por la normativa aplicable.</li><li>Solicitamos llegar antes de las 9:00 p. m. Si prevés llegar más tarde, comunícate previamente con administración para revisar las posibilidades de recepción.</li></ul>
              <p>La entrada anticipada o salida posterior al horario establecido dependen de la disponibilidad y deben consultarse con administración.</p>
            </PolicySection>
            <PolicySection id="mascotas" title="5. Mascotas y animales de asistencia">
              <p>Por las características de nuestras instalaciones, actualmente <strong>no admitimos mascotas</strong>. Esta restricción no limita los derechos de acceso de personas con discapacidad acompañadas de animales de asistencia, conforme a las disposiciones aplicables.</p>
            </PolicySection>
            <PolicySection id="wifi" title="6. Wifi satelital gratuito">
              <p>Ofrecemos conexión <strong>wifi satelital gratuita</strong> como servicio complementario para nuestros huéspedes.</p>
              <p>Debido al entorno natural y a las características de la tecnología satelital, la velocidad y estabilidad pueden variar por cuestiones climáticas, técnicas o saturación de la red. No podemos prometer una velocidad fija ni conectividad ininterrumpida para videollamadas extensas o actividades profesionales que dependan de internet estable.</p>
              <p>Si experimentas alguna dificultad, comunícala a nuestro personal para que podamos revisar el servicio y brindarte el apoyo que esté a nuestro alcance.</p>
            </PolicySection>
            <PolicySection id="ocupacion" title="7. Ocupación, menores y visitantes">
              <p>Cada cabaña tiene una capacidad máxima indicada durante la reservación. El número de huéspedes debe coincidir con el confirmado. Los bebés no se consideran para el conteo tarifario; las condiciones de hospedaje de niñas y niños se informarán según las características y capacidad segura de cada cabaña.</p>
              <p>El ingreso de visitantes o personas adicionales no registradas requiere autorización previa de administración y puede estar sujeto a cargos y límites de ocupación.</p>
            </PolicySection>
            <PolicySection id="convivencia" title="8. Convivencia y conservación del entorno">
              <p>Cinco Lagos está pensado para descansar y disfrutar de la naturaleza. Te pedimos mantener un volumen moderado y respetar especialmente el horario de descanso sugerido de <strong>10:00 p. m. a 8:00 a. m.</strong>; las fiestas y actividades que perturben a otros huéspedes requieren autorización expresa.</p>
              <ul className="list-disc space-y-2 pl-5"><li>No dejes basura ni residuos en el lago ni en áreas verdes.</li><li>Respeta la vegetación, la fauna, el mobiliario y la privacidad de otros visitantes.</li><li>Realiza fogatas y utiliza asadores únicamente en áreas autorizadas, siguiendo las indicaciones del personal.</li><li>Evita fumar dentro de las cabañas; consulta las áreas exteriores habilitadas.</li></ul>
            </PolicySection>
            <PolicySection id="seguridad" title="9. Seguridad, lago y servicios">
              <p>El complejo se encuentra en un entorno natural, con pendientes, vegetación, superficies que pueden estar húmedas y cercanía al lago. Camina con precaución, especialmente de noche y durante las lluvias. Las personas adultas responsables deben supervisar en todo momento a los menores de edad, especialmente cerca del agua.</p>
              <p>Las actividades acuáticas solo podrán realizarse donde estén expresamente permitidas y siguiendo las recomendaciones de seguridad correspondientes.</p>
              <p>Por nuestra ubicación, pueden existir interrupciones ajenas a la operación directa del alojamiento, por ejemplo en servicios públicos. Ante una falla de electricidad, agua o conectividad, avisa a administración para que podamos revisarla, dar seguimiento e informarte de las soluciones disponibles, sin limitar tus derechos como consumidor.</p>
            </PolicySection>
            <PolicySection id="instalaciones" title="10. Cuidado de instalaciones y objetos olvidados">
              <p>Utiliza adecuadamente el mobiliario, equipamiento y espacios comunes. Reporta al llegar cualquier desperfecto que observes. Los daños causados por uso indebido o negligencia podrán dar lugar a cargos adicionales razonables, comunicados y debidamente justificados.</p>
              <p>Si olvidaste algún objeto, contáctanos lo antes posible. Revisaremos si fue localizado y acordaremos contigo las opciones para recuperarlo o enviarlo.</p>
            </PolicySection>
            <PolicySection id="plataformas" title="11. Reservaciones por Booking, Airbnb u otros canales">
              <p>Cuando la reservación se realice mediante una plataforma externa, consulta también las condiciones de pago, modificación y cancelación mostradas y aceptadas en ese canal. No se modifican automáticamente las condiciones específicas de una reservación hecha a través de terceros.</p>
            </PolicySection>
            <PolicySection id="contacto" title="12. Dudas, cambios y privacidad">
              <p>Si necesitas hacer una consulta sobre tu estancia, un cambio de fecha o una cancelación, comunícate directamente con administración mediante nuestro canal oficial de WhatsApp. Solicita y conserva la confirmación escrita de cualquier modificación autorizada.</p>
              <p>El tratamiento de los datos personales de nuestros huéspedes se explica en la <a href="/politica-de-privacidad" className="font-semibold text-[#236d5d] underline underline-offset-4">política de privacidad</a> que ya forma parte de este sitio.</p>
              <a href={whatsappLink("Hola, tengo una duda sobre las políticas de hospedaje de Cinco Lagos.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#142f1f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#25523d]"><MessageCircle className="h-4 w-4" /> Consultar por WhatsApp <ExternalLink className="h-3.5 w-3.5" /></a>
            </PolicySection>
          </article>
        </div>
      </section>
    </main>
    <footer className="border-t border-[#142f1f]/10 px-5 py-8 text-sm text-[#142f1f]/70 md:px-8">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4"><span className="flex items-center gap-2"><Leaf className="h-4 w-4" /> Cinco Lagos · Montebello, Chiapas</span><div className="flex flex-wrap gap-5"><a className="hover:underline" href="/">Inicio</a><a className="hover:underline" href="/politica-de-privacidad">Política de privacidad</a></div></div>
    </footer>
  </div>;
}
