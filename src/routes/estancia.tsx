import { createFileRoute } from "@tanstack/react-router";
import { useState, type ComponentType } from "react";
import {
  BedDouble,
  Bird,
  Camera,
  Check,
  Clock3,
  Compass,
  Copy,
  ExternalLink,
  Footprints,
  Home,
  Map,
  MessageCircle,
  Utensils,
  Waves,
  Wifi,
} from "lucide-react";
import { IconArrow, IconLeaf, IconMapPin, IconWhatsapp } from "@/components/Icons";
import { photos } from "@/lib/photos";
import { SITE, whatsappLink } from "@/lib/site";

const logo = { url: "/images/logo/cinco-lagos-logo.jpeg" };

const TITLE = "Tu estancia en Cinco Lagos — Guía del huésped";
const DESCRIPTION =
  "Guía para huéspedes de Cinco Lagos en Montebello, Chiapas: qué hacer, explorar, comer, información de tu cabaña y ayuda durante tu estancia.";
const URL = "https://cabanascincolagos.com/estancia";
const OG_IMAGE = "https://cabanascincolagos.com/images/general/cinco-lagos-vista-01.png";

export const Route = createFileRoute("/estancia")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "noindex,follow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "es_MX" },
      { property: "og:url", content: URL },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: StayGuidePage,
});

type QuickAction = {
  href: string;
  label: string;
  detail: string;
  icon: ComponentType<{ className?: string }>;
};

const quickActions: QuickAction[] = [
  { href: "#que-hacer", label: "Qué hacer", detail: "Ideas para hoy", icon: Compass },
  { href: "#mi-cabana", label: "Mi cabaña", detail: "Fotos y detalles", icon: Home },
  { href: "#wifi", label: "Wi-Fi", detail: "Conéctate", icon: Wifi },
  { href: "#comer", label: "Comer", detail: "Sabores de la zona", icon: Utensils },
  { href: "#explorar", label: "Explorar", detail: "Lagos y miradores", icon: Map },
  { href: "#ayuda", label: "Necesito ayuda", detail: "Habla con nosotros", icon: MessageCircle },
];

const moods = [
  {
    label: "Quiero descansar",
    text: "Quédate junto al lago, disfruta la terraza y deja que el paisaje marque el ritmo.",
    href: "#descansar",
  },
  {
    label: "Quiero explorar",
    text: "Combina lagos, miradores y senderos para conocer mejor Montebello.",
    href: "#explorar",
  },
  {
    label: "Quiero aventura",
    text: "Busca actividades en el agua y recorridos al aire libre según disponibilidad local.",
    href: "#aventura",
  },
  {
    label: "Quiero conocer Montebello",
    text: "Paisaje, fotografía, aves, comida local y tiempo para mirar con calma.",
    href: "#montebello",
  },
];

const activities = [
  {
    eyebrow: "Sin salir de Cinco Lagos",
    title: "Ver cambiar el lago",
    text: "Reserva un momento temprano o al final de la tarde. La luz, las nubes y el bosque hacen que el agua se vea distinta a lo largo del día.",
    icon: Waves,
    id: "descansar",
  },
  {
    eyebrow: "Agua",
    title: "Recorrer el lago",
    text: "En el Parque Nacional hay actividades acuáticas como kayak y recorridos en embarcación. Consulta disponibilidad y condiciones directamente con prestadores autorizados de la zona.",
    icon: Compass,
    id: "aventura",
  },
  {
    eyebrow: "Bosque",
    title: "Caminar entre lagos",
    text: "Los senderos y miradores permiten disfrutar el bosque con otra perspectiva. Lleva calzado cómodo y evita salir de los caminos habilitados.",
    icon: Footprints,
  },
  {
    eyebrow: "Naturaleza",
    title: "Fotografiar Montebello",
    text: "Agua, niebla, reflejos, vegetación y madera cambian mucho con la luz. Las primeras y últimas horas del día suelen ofrecer escenas especialmente tranquilas.",
    icon: Camera,
  },
  {
    eyebrow: "Escucha antes de mirar",
    title: "Observar aves",
    text: "Camina despacio, mantén distancia y evita reproducir sonidos para atraer fauna. El silencio también forma parte de la experiencia.",
    icon: Bird,
    id: "montebello",
  },
];

const timePlans = [
  {
    time: "1 hora",
    title: "Quédate en Cinco Lagos",
    text: "Terraza, una caminata corta por el entorno y un rato frente al agua.",
  },
  {
    time: "Una mañana",
    title: "Lagos + mirador",
    text: "Sal temprano, visita algunos lagos y un mirador, y regresa con tiempo para descansar.",
  },
  {
    time: "Una tarde",
    title: "Agua + calma",
    text: "Busca una actividad acuática disponible y vuelve a la cabaña antes de terminar el día.",
  },
  {
    time: "Todo el día",
    title: "Descubre Montebello",
    text: "Combina senderos, lagos, comida local, fotografía y un mirador sin intentar verlo todo de prisa.",
  },
];

const places = [
  {
    title: "Parque Nacional Lagunas de Montebello",
    text: "El punto de partida para explorar lagos, senderos, miradores y paisaje protegido.",
    maps: "https://www.google.com/maps/search/?api=1&query=Parque+Nacional+Lagunas+de+Montebello+Chiapas",
  },
  {
    title: "Mirador Cinco Lagos",
    text: "Una vista amplia del conjunto de lagos y del bosque de la zona.",
    maps: "https://www.google.com/maps/search/?api=1&query=Mirador+Cinco+Lagos+Montebello+Chiapas",
  },
  {
    title: "Lagos de Colores",
    text: "Una referencia útil para seguir explorando distintos paisajes dentro de Montebello.",
    maps: "https://www.google.com/maps/search/?api=1&query=Lagos+de+Colores+Montebello+Chiapas",
  },
];

const cabinLinks = [
  { name: "Cabañas pequeñas", detail: "Hasta 5 personas", href: "/#cabana-pequena" },
  { name: "Cabaña de cristal", detail: "2 personas", href: "/#cabana-cristal" },
  { name: "Cabaña grande", detail: "Hasta 8 personas", href: "/#cabana-grande" },
  { name: "Cabaña mayor", detail: "Hasta 8 personas", href: "/#cabana-mayor" },
];

function StayGuidePage() {
  const guestHelpLink = whatsappLink(
    "Hola, estoy hospedado en Cinco Lagos y necesito ayuda con mi estancia.",
  );

  return (
    <div className="min-h-screen bg-[#f6f5ef] text-[#142f1f] selection:bg-[#142f1f] selection:text-white">
      <header className="sticky top-0 z-50 border-b border-[#142f1f]/10 bg-[#f6f5ef]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-20 md:px-8">
          <a href="/" className="flex items-center gap-3" aria-label="Volver a Cinco Lagos">
            <img
              src={logo.url}
              alt="Cinco Lagos · Cabañas · Montebello · Chiapas"
              className="h-11 w-11 rounded-sm object-cover md:h-12 md:w-12"
            />
            <span className="leading-tight">
              <span className="block text-xs font-semibold uppercase tracking-[0.22em]">Cinco Lagos</span>
              <span className="mt-0.5 hidden text-[9px] uppercase tracking-[0.2em] text-[#142f1f]/60 sm:block">
                Tu guía de estancia
              </span>
            </span>
          </a>
          <a
            href={guestHelpLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#142f1f] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#1c4130]"
          >
            <IconWhatsapp className="h-4 w-4" />
            Ayuda
          </a>
        </div>
      </header>

      <main>
        <section className="relative min-h-[68svh] overflow-hidden bg-[#142f1f] text-white md:min-h-[74svh]">
          <img
            src={photos.p01.url}
            alt={photos.p01.alt}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#142f1f] via-[#142f1f]/65 to-[#142f1f]/15" />
          <div className="relative mx-auto flex min-h-[68svh] max-w-6xl items-end px-5 pb-12 pt-24 md:min-h-[74svh] md:px-8 md:pb-18">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/75">
                Cabañas · Montebello · Chiapas
              </p>
              <h1 className="mt-4 max-w-2xl text-5xl font-semibold leading-[0.98] md:text-7xl">
                Tu estancia empieza aquí
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85 md:text-xl">
                Todo lo que necesitas para disfrutar Cinco Lagos, encontrar qué hacer y pedir ayuda cuando la necesites.
              </p>
              <p className="mt-8 text-sm italic tracking-wide text-white/75">La vista es parte del viaje.</p>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto -mt-6 max-w-6xl px-5 md:-mt-10 md:px-8">
          <div className="grid grid-cols-2 gap-3 rounded-3xl bg-white p-3 shadow-[0_20px_70px_rgba(20,47,31,0.13)] sm:grid-cols-3 md:p-4">
            {quickActions.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="group rounded-2xl border border-[#142f1f]/10 p-4 transition hover:-translate-y-0.5 hover:border-[#142f1f]/25 hover:bg-[#f6f5ef] md:p-5"
                >
                  <Icon className="h-5 w-5 text-[#142f1f]" />
                  <span className="mt-3 block text-sm font-semibold md:text-base">{item.label}</span>
                  <span className="mt-1 block text-xs text-[#142f1f]/58">{item.detail}</span>
                </a>
              );
            })}
          </div>
        </section>

        <section id="que-hacer" className="scroll-mt-24 py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <SectionHeading
              eyebrow="Hoy en Cinco Lagos"
              title="¿Qué te gustaría hacer hoy?"
              text="No necesitas completar una lista. Elige el tipo de día que quieres tener y empieza por ahí."
            />
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {moods.map((mood, index) => (
                <a
                  key={mood.label}
                  href={mood.href}
                  className="group flex min-h-44 flex-col justify-between rounded-3xl border border-[#142f1f]/12 bg-white p-6 transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(20,47,31,0.10)] md:p-8"
                >
                  <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#142f1f]/45">0{index + 1}</span>
                  <div className="mt-8">
                    <h3 className="text-2xl font-semibold leading-tight">{mood.label}</h3>
                    <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#142f1f]/65 md:text-base">{mood.text}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">
                      Ver idea <IconArrow className="h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#142f1f] py-20 text-white md:py-28">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <SectionHeading
              dark
              eyebrow="No te vayas sin..."
              title="Cinco formas de vivir Montebello"
              text="Ideas sencillas para disfrutar el agua y el bosque sin convertir el viaje en una carrera."
            />
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {activities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <article
                    key={activity.title}
                    id={activity.id}
                    className="scroll-mt-24 rounded-3xl border border-white/12 bg-white/[0.055] p-6 md:p-7"
                  >
                    <Icon className="h-6 w-6 text-[#cdbf9f]" />
                    <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50">{activity.eyebrow}</p>
                    <h3 className="mt-2 text-2xl font-semibold">{activity.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-white/68">{activity.text}</p>
                  </article>
                );
              })}
            </div>
            <p className="mt-7 max-w-3xl text-xs leading-relaxed text-white/48">
              Algunas actividades dependen del clima, horarios, condiciones del parque y disponibilidad de prestadores locales. Confirma antes de salir.
            </p>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <SectionHeading
              eyebrow="Hazlo a tu ritmo"
              title="¿Cuánto tiempo tienes?"
              text="Una estancia buena no depende de hacer más cosas, sino de elegir bien qué cabe en tu día."
            />
            <div className="mt-10 grid gap-4 lg:grid-cols-4">
              {timePlans.map((plan) => (
                <article key={plan.time} className="rounded-3xl bg-white p-6 shadow-[0_10px_35px_rgba(20,47,31,0.06)]">
                  <Clock3 className="h-5 w-5" />
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#142f1f]/48">{plan.time}</p>
                  <h3 className="mt-2 text-xl font-semibold">{plan.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#142f1f]/64">{plan.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="comer" className="scroll-mt-24 border-y border-[#142f1f]/10 bg-white py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-[1fr_1.05fr] md:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#142f1f]/50">Sabores de Montebello</p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">Prueba algo de la región</h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[#142f1f]/65">
                Una opción tradicional son los chinculguajes: preparaciones de tortilla hechas a mano con frijol y quesillo que forman parte de la cocina local de la zona.
              </p>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#142f1f]/55">
                Para recomendaciones de lugares específicos, pregúntanos por WhatsApp. Preferimos sugerirte opciones que conozcamos antes que llenar la guía con negocios al azar.
              </p>
              <a
                href={guestHelpLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#142f1f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1c4130]"
              >
                <IconWhatsapp className="h-4 w-4" />
                Preguntar dónde comer
              </a>
            </div>
            <div className="overflow-hidden rounded-3xl bg-[#142f1f]">
              <img
                src={photos.p22.url}
                alt="Terraza de Cinco Lagos con vista directa al lago"
                loading="lazy"
                className="aspect-[4/3] h-full w-full object-cover opacity-90"
              />
            </div>
          </div>
        </section>

        <section id="explorar" className="scroll-mt-24 py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <SectionHeading
              eyebrow="Explora cerca"
              title="Tres referencias para empezar"
              text="Úsalas como punto de partida. La mejor ruta dependerá del tiempo, el clima y lo que te apetezca hacer."
            />
            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {places.map((place) => (
                <article key={place.title} className="flex flex-col rounded-3xl border border-[#142f1f]/12 bg-white p-6 md:p-7">
                  <IconMapPin className="h-6 w-6" />
                  <h3 className="mt-6 text-2xl font-semibold leading-tight">{place.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[#142f1f]/64">{place.text}</p>
                  <a
                    href={place.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 inline-flex items-center gap-2 text-sm font-semibold"
                  >
                    Abrir en Maps <ExternalLink className="h-4 w-4" />
                  </a>
                </article>
              ))}
            </div>
            <div className="mt-8 rounded-3xl bg-[#e9eee9] p-6 md:flex md:items-center md:justify-between md:gap-8 md:p-8">
              <div className="max-w-2xl">
                <h3 className="text-xl font-semibold">Información oficial del área protegida</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#142f1f]/62">
                  Consulta también la información de CONANP para conocer recomendaciones y actividades del Parque Nacional Lagunas de Montebello.
                </p>
              </div>
              <a
                href="https://descubreanp.conanp.gob.mx/es/conanp/ANP?suri=96"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex shrink-0 items-center gap-2 rounded-full border border-[#142f1f]/20 px-5 py-3 text-sm font-semibold transition hover:bg-white md:mt-0"
              >
                Ver CONANP <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <section id="mi-cabana" className="scroll-mt-24 bg-[#142f1f] py-20 text-white md:py-28">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <SectionHeading
              dark
              eyebrow="Mi cabaña"
              title="Encuentra la tuya"
              text="Abre directamente las fotografías, capacidad y características de la cabaña en la que te hospedas."
            />
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {cabinLinks.map((cabin) => (
                <a
                  key={cabin.name}
                  href={cabin.href}
                  className="group rounded-3xl border border-white/12 bg-white/[0.055] p-6 transition hover:bg-white/[0.09]"
                >
                  <BedDouble className="h-5 w-5 text-[#cdbf9f]" />
                  <h3 className="mt-5 text-xl font-semibold">{cabin.name}</h3>
                  <p className="mt-2 text-sm text-white/55">{cabin.detail}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                    Ver mi cabaña <IconArrow className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </a>
              ))}
            </div>
            <a href="/#mi-reserva" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white/82">
              Consultar mi reserva <IconArrow className="h-4 w-4" />
            </a>
          </div>
        </section>

        <WifiSection guestHelpLink={guestHelpLink} />

        <section className="border-y border-[#142f1f]/10 bg-white py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <IconLeaf className="mx-auto h-7 w-7" />
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-[#142f1f]/50">Para estar a gusto</p>
              <h2 className="mt-3 text-4xl font-semibold md:text-5xl">Cuidemos este lugar</h2>
              <p className="mt-5 text-base leading-relaxed text-[#142f1f]/65">
                Estás dentro de un entorno natural protegido. Ayúdanos a conservar el silencio, el agua y el bosque durante tu estancia.
              </p>
            </div>
            <div className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2">
              {[
                "Mantén un volumen moderado y disfruta la tranquilidad del entorno.",
                "No dejes residuos en el agua ni en senderos o áreas verdes.",
                "Respeta flora, fauna y caminos habilitados.",
                "Cuida el mobiliario y evita fumar dentro de la cabaña.",
                "No se permiten mascotas; si tienes una situación especial, escríbenos.",
                "Antes de salir, revisa tus pertenencias y sigue las indicaciones para la entrega de llaves.",
              ].map((rule) => (
                <div key={rule} className="flex gap-3 rounded-2xl bg-[#f6f5ef] p-4 text-sm leading-relaxed text-[#142f1f]/68">
                  <Check className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="ayuda" className="scroll-mt-24 py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <div className="overflow-hidden rounded-[2rem] bg-[#142f1f] text-white">
              <div className="grid md:grid-cols-[1fr_0.85fr]">
                <div className="p-7 md:p-12">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/50">¿Necesitas algo?</p>
                  <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">Estamos para ayudarte</h2>
                  <p className="mt-5 max-w-xl text-base leading-relaxed text-white/68">
                    Si algo de tu cabaña no funciona, tienes una duda o necesitas una recomendación, escríbenos directamente.
                  </p>
                  <a
                    href={guestHelpLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#142f1f] transition hover:bg-[#f6f5ef]"
                  >
                    <IconWhatsapp className="h-5 w-5" />
                    WhatsApp · {SITE.phoneDisplay}
                  </a>
                </div>
                <div className="relative min-h-72">
                  <img src={photos.p23.url} alt={photos.p23.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#142f1f]/55 to-transparent md:from-[#142f1f]/30" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#142f1f]/10 bg-[#f0efe8] pb-28 pt-12 md:pb-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 md:flex-row md:items-end md:justify-between md:px-8">
          <div>
            <img src={logo.url} alt="Logotipo de Cinco Lagos" className="h-16 w-16 rounded-sm object-cover" />
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em]">Cinco Lagos</p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#142f1f]/48">Cabañas · Montebello · Chiapas</p>
          </div>
          <div className="text-sm text-[#142f1f]/60 md:text-right">
            <a href="/" className="font-semibold text-[#142f1f] hover:underline">Volver a la página principal</a>
            <p className="mt-3">{SITE.address}</p>
            <p className="mt-1">La vista es parte del viaje.</p>
          </div>
        </div>
      </footer>

      <a
        href={guestHelpLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Pedir ayuda por WhatsApp"
        className="fixed bottom-4 left-4 right-4 z-50 flex items-center justify-center gap-2 rounded-full bg-[#142f1f] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_12px_35px_rgba(20,47,31,0.28)] md:left-auto md:right-6 md:w-auto"
      >
        <IconWhatsapp className="h-5 w-5" />
        Necesito ayuda
      </a>
    </div>
  );
}

function WifiSection({ guestHelpLink }: { guestHelpLink: string }) {
  const [copied, setCopied] = useState(false);
  const wifiPassword = "";

  const copyPassword = async () => {
    if (!wifiPassword || typeof navigator === "undefined" || !navigator.clipboard) return;
    await navigator.clipboard.writeText(wifiPassword);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section id="wifi" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-8 rounded-[2rem] bg-[#e9eee9] p-7 md:grid-cols-[0.85fr_1.15fr] md:items-center md:p-12">
          <div>
            <Wifi className="h-8 w-8" />
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.24em] text-[#142f1f]/48">Wi-Fi</p>
            <h2 className="mt-3 text-4xl font-semibold md:text-5xl">Conéctate</h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-[#142f1f]/65">
              La red y la contraseña están indicadas dentro de tu cabaña. Si no encuentras la información o tienes problemas para conectarte, escríbenos y te ayudamos.
            </p>
            {wifiPassword ? (
              <button
                type="button"
                onClick={copyPassword}
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#142f1f]/20 bg-white px-5 py-3 text-sm font-semibold"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Contraseña copiada" : "Copiar contraseña"}
              </button>
            ) : (
              <a
                href={guestHelpLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#142f1f]/20 bg-white px-5 py-3 text-sm font-semibold transition hover:border-[#142f1f]/35"
              >
                <IconWhatsapp className="h-4 w-4" />
                Pedir datos de Wi-Fi
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  text,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  text: string;
  dark?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${dark ? "text-white/50" : "text-[#142f1f]/50"}`}>
        {eyebrow}
      </p>
      <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">{title}</h2>
      <p className={`mt-5 max-w-2xl text-base leading-relaxed ${dark ? "text-white/65" : "text-[#142f1f]/65"}`}>
        {text}
      </p>
    </div>
  );
}
