import { createFileRoute } from "@tanstack/react-router";
import {
  Bot,
  Database,
  LockKeyhole,
  MessageCircle,
  ShieldCheck,
  Trash2,
  UserRoundCheck,
} from "lucide-react";
import { IconWhatsapp } from "@/components/Icons";
import { SITE, whatsappLink } from "@/lib/site";

const TITLE = "Política de privacidad | Cinco Lagos";
const DESCRIPTION =
  "Aviso de privacidad de Cabañas Cinco Lagos: datos que recopilamos, uso de WhatsApp, reservas, automatización, derechos de privacidad y eliminación de datos.";
const URL = "https://cabanascincolagos.com/politica-de-privacidad";

export const Route = createFileRoute("/politica-de-privacidad")({
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
  component: PrivacyPolicyPage,
});

const updatedAt = "22 de septiembre de 2026";

function Section({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-[#142f1f]/10 py-9 first:border-t-0 first:pt-0">
      <h2 className="text-2xl font-semibold leading-tight text-[#142f1f] md:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 text-[15px] leading-7 text-[#142f1f]/72">{children}</div>
    </section>
  );
}

function PrivacyPolicyPage() {
  const privacyWhatsapp = whatsappLink(
    "Hola, quiero hacer una solicitud relacionada con mis datos personales y privacidad en Cinco Lagos.",
  );
  const deletionWhatsapp = whatsappLink(
    "Hola, solicito la eliminación de mis datos personales asociados a Cinco Lagos. Por favor indíquenme los pasos para verificar mi identidad y atender la solicitud.",
  );

  return (
    <div className="min-h-screen bg-[#f6f5ef] text-[#142f1f]">
      <header className="sticky top-0 z-40 border-b border-[#142f1f]/10 bg-[#f6f5ef]/92 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-20 md:px-8">
          <a href="/" className="flex items-center gap-3" aria-label="Volver a Cinco Lagos">
            <img
              src="/images/logo/cinco-lagos-logo.jpeg"
              alt="Cinco Lagos · Cabañas · Montebello · Chiapas"
              className="h-11 w-11 rounded-sm object-cover md:h-12 md:w-12"
            />
            <span>
              <span className="block text-xs font-semibold uppercase tracking-[0.22em]">Cinco Lagos</span>
              <span className="mt-0.5 hidden text-[9px] uppercase tracking-[0.2em] text-[#142f1f]/55 sm:block">
                Privacidad
              </span>
            </span>
          </a>
          <a
            href={privacyWhatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#142f1f] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#1c4130]"
          >
            <IconWhatsapp className="h-4 w-4" />
            Contacto
          </a>
        </div>
      </header>

      <main>
        <section className="bg-[#142f1f] px-5 py-16 text-white md:py-24">
          <div className="mx-auto max-w-5xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/55">
              Aviso de privacidad integral
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.03] md:text-6xl">
              Política de privacidad de Cinco Lagos
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-7 text-white/70 md:text-lg">
              Explicamos de forma clara qué información utilizamos cuando consultas, reservas o te comunicas con nosotros por WhatsApp y otros canales digitales.
            </p>
            <p className="mt-8 text-xs uppercase tracking-[0.18em] text-white/45">
              Última actualización · {updatedAt}
            </p>
          </div>
        </section>

        <section className="px-5 py-10 md:px-8 md:py-16">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[260px_1fr]">
            <aside className="h-fit rounded-3xl border border-[#142f1f]/10 bg-white p-5 lg:sticky lg:top-28">
              <ShieldCheck className="h-7 w-7" />
              <p className="mt-4 text-sm font-semibold">Accesos rápidos</p>
              <nav className="mt-4 space-y-1 text-sm text-[#142f1f]/65">
                <a className="block rounded-xl px-3 py-2 hover:bg-[#f6f5ef]" href="#datos">Datos que tratamos</a>
                <a className="block rounded-xl px-3 py-2 hover:bg-[#f6f5ef]" href="#finalidades">Para qué los usamos</a>
                <a className="block rounded-xl px-3 py-2 hover:bg-[#f6f5ef]" href="#whatsapp-ia">WhatsApp e IA</a>
                <a className="block rounded-xl px-3 py-2 hover:bg-[#f6f5ef]" href="#terceros">Proveedores</a>
                <a className="block rounded-xl px-3 py-2 hover:bg-[#f6f5ef]" href="#derechos">Tus derechos</a>
                <a className="block rounded-xl px-3 py-2 hover:bg-[#f6f5ef]" href="#eliminacion-de-datos">Eliminar datos</a>
              </nav>
            </aside>

            <article className="rounded-[2rem] border border-[#142f1f]/10 bg-white p-6 shadow-[0_14px_50px_rgba(20,47,31,0.05)] md:p-10">
              <Section title="1. Responsable del tratamiento">
                <p>
                  <strong className="text-[#142f1f]">Cinco Lagos · Cabañas Mirador 5 Lagos</strong> es responsable del tratamiento de los datos personales utilizados para brindar información, atención y servicios de hospedaje.
                </p>
                <p>
                  Ubicación: {SITE.address}. Para temas relacionados con privacidad puedes comunicarte por WhatsApp al <strong className="text-[#142f1f]">{SITE.phoneDisplay}</strong>.
                </p>
              </Section>

              <Section id="datos" title="2. Datos personales que podemos tratar">
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    ["Identificación y contacto", "Nombre, número telefónico y datos que compartas al comunicarte con nosotros."],
                    ["Reserva y estancia", "Fechas, número de huéspedes, cabaña de interés, solicitudes y datos necesarios para gestionar la reservación."],
                    ["Conversaciones", "Mensajes enviados por WhatsApp u otros canales, así como el historial necesario para conservar el contexto de atención."],
                    ["Operación", "Código o estado de reserva, reporte de pago, horarios y datos relacionados con la atención antes, durante y después de la estancia."],
                    ["Datos técnicos", "Identificadores de mensajes, fecha y hora, estado de entrega y registros técnicos necesarios para operar y proteger nuestros sistemas."],
                  ].map(([name, text]) => (
                    <div key={name} className="rounded-2xl bg-[#f6f5ef] p-4">
                      <p className="font-semibold text-[#142f1f]">{name}</p>
                      <p className="mt-1 text-sm leading-6">{text}</p>
                    </div>
                  ))}
                </div>
                <p>
                  No solicitamos de forma habitual datos personales sensibles. Te recomendamos no enviar contraseñas, NIP, números completos de tarjetas u otra información financiera innecesaria por WhatsApp.
                </p>
              </Section>

              <Section id="finalidades" title="3. Finalidades del tratamiento">
                <ul className="space-y-2">
                  <li>• Responder consultas sobre cabañas, características, fotografías, ubicación, servicios y políticas.</li>
                  <li>• Consultar disponibilidad y elaborar cotizaciones con base en las fechas solicitadas.</li>
                  <li>• Gestionar solicitudes de reserva, seguimiento, cambios y atención relacionada con la estancia.</li>
                  <li>• Dar seguimiento a reportes de pago y canalizarlos a revisión humana cuando corresponda.</li>
                  <li>• Brindar atención por WhatsApp antes, durante y después del hospedaje.</li>
                  <li>• Prevenir abuso, resolver fallas técnicas, mantener la seguridad y mejorar la calidad de la atención.</li>
                </ul>
                <p>
                  No vendemos datos personales ni los utilizamos para comercializarlos a terceros.
                </p>
              </Section>

              <Section id="whatsapp-ia" title="4. WhatsApp y asistencia automatizada">
                <div className="flex gap-4 rounded-2xl bg-[#e9eee9] p-5">
                  <Bot className="mt-1 h-6 w-6 shrink-0" />
                  <div>
                    <p>
                      Parte de la atención por WhatsApp puede apoyarse en sistemas automatizados e inteligencia artificial para interpretar una consulta, conservar contexto y preparar una respuesta.
                    </p>
                    <p className="mt-3">
                      La automatización está diseñada para apoyar tareas como información general, disponibilidad, precios y selección de fotografías. Los pagos, excepciones importantes, reclamaciones y situaciones que requieren criterio humano pueden ser revisados por una persona.
                    </p>
                  </div>
                </div>
                <p>
                  El uso de automatización no elimina tu derecho a solicitar atención humana. Puedes pedirlo directamente en la conversación.
                </p>
              </Section>

              <Section id="terceros" title="5. Proveedores tecnológicos y transferencias">
                <p>
                  Para operar nuestros canales digitales podemos utilizar proveedores tecnológicos que procesan información por cuenta de Cinco Lagos. Entre ellos pueden encontrarse <strong className="text-[#142f1f]">Meta/WhatsApp</strong> para mensajería, <strong className="text-[#142f1f]">Supabase</strong> para infraestructura y bases de datos, <strong className="text-[#142f1f]">OpenAI</strong> para funciones de asistencia automatizada y proveedores de alojamiento del sitio web.
                </p>
                <p>
                  Algunos proveedores pueden procesar información en infraestructura ubicada fuera de México. Su tratamiento se realiza conforme a sus términos, medidas de seguridad y acuerdos aplicables, y nosotros procuramos compartir únicamente la información necesaria para prestar el servicio.
                </p>
              </Section>

              <Section title="6. Conservación y seguridad">
                <div className="flex gap-4">
                  <LockKeyhole className="mt-1 h-6 w-6 shrink-0" />
                  <div className="space-y-3">
                    <p>
                      Conservamos la información durante el tiempo razonablemente necesario para atender la consulta o reserva, prestar el servicio, resolver aclaraciones y cumplir obligaciones aplicables.
                    </p>
                    <p>
                      Aplicamos medidas técnicas y administrativas razonables para reducir riesgos de acceso no autorizado, pérdida, alteración o uso indebido. Ningún sistema conectado a Internet puede garantizar seguridad absoluta.
                    </p>
                  </div>
                </div>
              </Section>

              <Section id="derechos" title="7. Acceso, rectificación, cancelación, oposición y revocación">
                <div className="flex gap-4">
                  <UserRoundCheck className="mt-1 h-6 w-6 shrink-0" />
                  <div className="space-y-3">
                    <p>
                      Puedes solicitar acceso a tus datos, corrección de información inexacta, cancelación o eliminación cuando proceda, oponerte a determinados usos o revocar tu consentimiento cuando sea aplicable.
                    </p>
                    <p>
                      Envía tu solicitud por WhatsApp indicando tu nombre, número relacionado con la conversación, el derecho que deseas ejercer y una descripción clara de tu solicitud. Podemos pedir información razonable para verificar que la solicitud corresponde a la persona titular de los datos.
                    </p>
                  </div>
                </div>
                <a
                  href={privacyWhatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#142f1f]/15 px-5 py-3 text-sm font-semibold text-[#142f1f] transition hover:bg-[#f6f5ef]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Hacer una solicitud de privacidad
                </a>
              </Section>

              <Section id="eliminacion-de-datos" title="8. Eliminación de datos">
                <div className="flex gap-4 rounded-2xl border border-[#142f1f]/10 p-5">
                  <Trash2 className="mt-1 h-6 w-6 shrink-0" />
                  <div>
                    <p>
                      Puedes solicitar que eliminemos los datos personales asociados a tus conversaciones y atención con Cinco Lagos cuando su conservación ya no sea necesaria o exista fundamento para atender la solicitud.
                    </p>
                    <p className="mt-3">
                      Para solicitarlo, utiliza el botón siguiente. Incluye el número telefónico asociado a la conversación y cualquier dato que nos permita localizar el registro. Después de verificar tu identidad, atenderemos la solicitud conforme a las obligaciones y plazos aplicables.
                    </p>
                  </div>
                </div>
                <a
                  href={deletionWhatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#142f1f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1c4130]"
                >
                  <IconWhatsapp className="h-4 w-4" />
                  Solicitar eliminación de datos
                </a>
                <p className="text-sm">
                  Podremos conservar información mínima cuando sea necesaria para cumplir obligaciones legales, resolver disputas, proteger la seguridad o acreditar operaciones legítimas.
                </p>
              </Section>

              <Section title="9. Menores de edad">
                <p>
                  Nuestros canales de reserva están dirigidos a personas adultas. No buscamos recopilar deliberadamente datos personales de niñas, niños o adolescentes directamente a través del bot o del formulario de contacto. La información sobre menores que formen parte de una estancia debe ser proporcionada por una persona adulta responsable y limitarse a lo necesario para la reserva.
                </p>
              </Section>

              <Section title="10. Cambios a esta política">
                <p>
                  Podemos actualizar esta política para reflejar cambios operativos, tecnológicos o normativos. La versión vigente estará disponible siempre en esta misma URL e indicará su fecha de última actualización.
                </p>
              </Section>

              <Section title="11. Contacto">
                <div className="rounded-2xl bg-[#142f1f] p-6 text-white">
                  <Database className="h-6 w-6 text-white/80" />
                  <p className="mt-4 font-semibold">Cinco Lagos · Cabañas Mirador 5 Lagos</p>
                  <p className="mt-2 text-sm leading-6 text-white/65">{SITE.address}</p>
                  <p className="mt-1 text-sm text-white/65">WhatsApp: {SITE.phoneDisplay}</p>
                  <a
                    href={privacyWhatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#142f1f]"
                  >
                    <IconWhatsapp className="h-4 w-4" />
                    Contactar
                  </a>
                </div>
              </Section>
            </article>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#142f1f]/10 bg-[#f0efe8] py-10">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 text-sm text-[#142f1f]/60 md:flex-row md:items-center md:justify-between md:px-8">
          <p>© {new Date().getFullYear()} Cinco Lagos · Montebello, Chiapas.</p>
          <a href="/" className="font-semibold text-[#142f1f] hover:underline">
            Volver a la página principal
          </a>
        </div>
      </footer>
    </div>
  );
}
