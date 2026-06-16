import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  MessageCircle,
  Menu,
  X,
  Trees,
  Car,
  UtensilsCrossed,
  Mountain,
  Footprints,
  Wifi,
  Bath,
  MapPin,
  Sunrise,
  Map,
  Check,
  AlertTriangle,
  Camera,
  Waves,
  ChevronDown,
  Instagram,
  Facebook,
  Phone,
  Mail,
  Compass,
  Heart,
  Volume2,
  Users,
  Bed,
  Eye,
  Download,
  Banknote,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "Cabañas 5 Lagos de Montebello | Hospedaje frente al lago en Chiapas",
      },
      {
        name: "description",
        content:
          "Hospédate frente a Cinco Lagos en Lagunas de Montebello, Chiapas. Cabañas rodeadas de bosque, vistas naturales y reserva directa por WhatsApp.",
      },
      {
        name: "keywords",
        content:
          "Cabañas Cinco Lagos, Cabañas 5 Lagos de Montebello, Hospedaje en Lagunas de Montebello, Cabañas frente al lago en Chiapas, Cabañas en Montebello Chiapas",
      },
      {
        property: "og:title",
        content:
          "Cabañas 5 Lagos de Montebello | Hospedaje frente al lago en Chiapas",
      },
      {
        property: "og:description",
        content:
          "Despierta frente a Cinco Lagos. Cabañas rodeadas de bosque en Lagunas de Montebello, Chiapas. Reserva por WhatsApp.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: LandingPage,
});

// ============================================================
// EDITABLE CONSTANTS — replace with real values when available
// ============================================================
// 👉 Reemplaza NUMERO por el WhatsApp real, ej. "5219631234567"
const WHATSAPP_NUMBER = "52NUMERO";
const WHATSAPP_DEFAULT_MSG =
  "Hola, quiero cotizar una cabaña en 5 Lagos de Montebello";
const waLink = (msg: string = WHATSAPP_DEFAULT_MSG) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

const INSTAGRAM_URL = "https://www.instagram.com/5lagosmontebello/";
const FACEBOOK_URL = "#"; // 👉 Agregar enlace oficial de Facebook
const EMAIL = ""; // 👉 Agregar correo
const PHONE_DISPLAY = ""; // 👉 Agregar número visible
// 👉 PEGAR AQUÍ LINK REAL DE GOOGLE MAPS
const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Cinco+Lagos+Montebello+Chiapas";
const ADDRESS =
  "Carretera a Cinco Lagos Km 2, frente al lago, Santiago, 30160, Chiapas, México.";

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <WhyStay />
        <Cabanas />
        <Amenities />
        <Experiences />
        <Gallery />
        <Location />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

// ============================================================
// NAV
// ============================================================
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#inicio", label: "Inicio" },
    { href: "#por-que", label: "Por qué" },
    { href: "#cabanas", label: "Cabañas" },
    { href: "#galeria", label: "Galería" },
    { href: "#ubicacion", label: "Ubicación" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-warm-white/90 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between md:h-20">
        <a href="#inicio" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-lake-deep text-warm-white">
            <Trees className="h-5 w-5" />
          </span>
          <span
            className={`font-display text-lg font-bold tracking-tight md:text-xl ${
              scrolled ? "text-lake-deep" : "text-warm-white drop-shadow"
            }`}
          >
            Cabañas 5 Lagos
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors ${
                scrolled
                  ? "text-foreground/80 hover:text-lake-deep"
                  : "text-warm-white/90 hover:text-warm-white drop-shadow"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-whatsapp px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-whatsapp-dark min-h-12"
          >
            <MessageCircle className="h-4 w-4" />
            Reservar por WhatsApp
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menú"
            className={`grid h-11 w-11 place-items-center rounded-full lg:hidden ${
              scrolled
                ? "bg-secondary text-lake-deep"
                : "bg-white/15 text-warm-white backdrop-blur"
            }`}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-warm-white/95 backdrop-blur-md border-t border-border">
          <nav className="container-x flex flex-col py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-base font-medium text-foreground/90 hover:text-lake-deep"
              >
                {l.label}
              </a>
            ))}
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3 text-sm font-semibold text-white"
            >
              <MessageCircle className="h-4 w-4" /> Reservar por WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

// ============================================================
// HERO
// ============================================================
function Hero() {
  const trust = [
    { icon: MapPin, label: "Ubicación frente al lago" },
    { icon: MessageCircle, label: "Reserva directa por WhatsApp" },
    { icon: Heart, label: "Ideal para parejas, familias y viajeros de naturaleza" },
  ];

  return (
    <section id="inicio" className="relative min-h-[100svh] w-full overflow-hidden">
      {/* 👉 REEMPLAZAR con foto real: amanecer frente a Cinco Lagos */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2000&q=80')",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-lake-deep/70 via-lake-deep/40 to-lake-deep/85" />

      <div className="relative z-10 container-x flex min-h-[100svh] flex-col justify-center pt-28 pb-16 text-warm-white">
        <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wide backdrop-blur">
          <MapPin className="h-3.5 w-3.5" />
          Parque Nacional Lagunas de Montebello, Chiapas
        </span>

        <h1 className="font-display text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl">
          Despierta frente a <span className="text-turquoise">Cinco Lagos</span>
        </h1>

        <p className="mt-5 max-w-2xl text-base text-warm-white/90 sm:text-lg md:text-xl">
          Cabañas frente al lago, rodeadas de bosque y tranquilidad, en uno de
          los paisajes más hermosos de Lagunas de Montebello, Chiapas.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-7 py-4 text-sm font-semibold text-white shadow-lg transition hover:bg-whatsapp-dark min-h-12 sm:text-base"
          >
            <MessageCircle className="h-5 w-5" />
            Reservar por WhatsApp
          </a>
          <a
            href="#cabanas"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-7 py-4 text-sm font-semibold text-warm-white backdrop-blur transition hover:bg-white/20 min-h-12 sm:text-base"
          >
            Ver cabañas
            <ChevronDown className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-3">
          {trust.map((t) => (
            <div
              key={t.label}
              className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-medium text-warm-white backdrop-blur"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-turquoise/25 text-turquoise">
                <t.icon className="h-4.5 w-4.5" />
              </span>
              {t.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// POR QUÉ HOSPEDARTE AQUÍ
// ============================================================
function WhyStay() {
  const reasons = [
    {
      icon: Eye,
      title: "Vista privilegiada a Cinco Lagos",
      text: "Desperta y duerme con una de las panorámicas más impresionantes del parque nacional.",
    },
    {
      icon: Volume2,
      title: "Descanso lejos del ruido",
      text: "Un entorno natural y silencioso, ideal para desconectarte de la ciudad y reconectar contigo.",
    },
    {
      icon: Compass,
      title: "Atención local y orientación",
      text: "Te ayudamos a planear tu visita por Montebello: rutas, horarios y recomendaciones locales.",
    },
    {
      icon: Mountain,
      title: "Cerca de balsas, senderos y miradores",
      text: "Kayak, paseos en balsa, caminatas y experiencias naturales a pocos minutos de tu cabaña.",
    },
  ];

  return (
    <section id="por-que" className="bg-sand py-20 md:py-28">
      <div className="container-x">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-lake">
            Por qué elegirnos
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-lake-deep sm:text-4xl md:text-5xl">
            Por qué hospedarte aquí
          </h2>
          <p className="mt-4 text-base text-foreground/70 md:text-lg">
            Más que un hospedaje, una experiencia frente a uno de los paisajes
            más hermosos de Chiapas.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="flex flex-col rounded-3xl border border-border bg-warm-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-lake-deep text-warm-white">
                <r.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-lake-deep">
                {r.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                {r.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CABAÑAS
// ============================================================
type Cabin = {
  name: string;
  img: string;
  capacity: string;
  beds: string;
  privateBath: string;
  hotWater: string;
  view: string;
  parking: string;
};

function Cabanas() {
  // 👉 Edita estos datos cuando tengas información real. Usa "Por confirmar" si falta algo.
  const cabins: Cabin[] = [
    {
      name: "Cabaña [Nombre]",
      img: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=1200&q=80",
      capacity: "Por confirmar",
      beds: "Por confirmar",
      privateBath: "Por confirmar",
      hotWater: "Por confirmar",
      view: "Vista al lago",
      parking: "Por confirmar",
    },
    {
      name: "Cabaña [Nombre]",
      img: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=1200&q=80",
      capacity: "Por confirmar",
      beds: "Por confirmar",
      privateBath: "Por confirmar",
      hotWater: "Por confirmar",
      view: "Vista al bosque",
      parking: "Por confirmar",
    },
    {
      name: "Cabaña [Nombre]",
      img: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=80",
      capacity: "Por confirmar",
      beds: "Por confirmar",
      privateBath: "Por confirmar",
      hotWater: "Por confirmar",
      view: "Terraza con vista",
      parking: "Por confirmar",
    },
  ];

  const Row = ({
    icon: Icon,
    label,
    value,
  }: {
    icon: typeof Users;
    label: string;
    value: string;
  }) => (
    <li className="flex items-start gap-2.5 text-sm text-foreground/80">
      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-turquoise/15 text-lake-deep">
        <Icon className="h-3.5 w-3.5" />
      </span>
      <span>
        <span className="font-medium text-foreground">{label}: </span>
        <span className="text-foreground/75">{value}</span>
      </span>
    </li>
  );

  return (
    <section id="cabanas" className="py-20 md:py-28">
      <div className="container-x">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-lake">
            Hospedaje
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-lake-deep sm:text-4xl md:text-5xl">
            Nuestras cabañas
          </h2>
          <p className="mt-4 text-base text-foreground/70 md:text-lg">
            Espacios cálidos, materiales naturales y vistas que abrazan al
            bosque y al lago.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cabins.map((c, i) => (
            <article
              key={i}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {/* 👉 REEMPLAZAR con foto real de la cabaña */}
                <img
                  src={c.img}
                  alt={`${c.name} en Cabañas 5 Lagos de Montebello`}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute left-4 top-4 rounded-full bg-warm-white/95 px-3 py-1 text-xs font-semibold text-lake-deep backdrop-blur">
                  {c.view}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-2xl font-bold text-lake-deep">
                  {c.name}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  <Row icon={Users} label="Capacidad" value={c.capacity} />
                  <Row icon={Bed} label="Camas" value={c.beds} />
                  <Row icon={Bath} label="Baño privado" value={c.privateBath} />
                  <Row icon={Waves} label="Agua caliente" value={c.hotWater} />
                  <Row icon={Eye} label="Vista" value={c.view} />
                  <Row icon={Car} label="Estacionamiento" value={c.parking} />
                </ul>
                <div className="mt-6 rounded-xl bg-sand px-4 py-3 text-xs font-medium text-foreground/75">
                  Tarifa: sujeta a temporada y disponibilidad.
                </div>
                <a
                  href={waLink(
                    `Hola, me interesa la ${c.name} en 5 Lagos de Montebello. ¿Me comparten capacidad, tarifa y disponibilidad?`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-lake-deep px-5 py-3 text-sm font-semibold text-warm-white transition hover:bg-lake min-h-12"
                >
                  <MessageCircle className="h-4 w-4" />
                  Cotizar capacidad
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex items-start gap-4 rounded-2xl border-l-4 border-turquoise bg-sand p-5 shadow-sm md:p-6">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-turquoise/20 text-lake-deep">
            <MessageCircle className="h-5 w-5" />
          </span>
          <p className="text-sm leading-relaxed text-foreground/80 md:text-base">
            Para darte una cotización exacta, indícanos{" "}
            <strong className="text-lake-deep">fecha de llegada</strong>,{" "}
            <strong className="text-lake-deep">fecha de salida</strong> y{" "}
            <strong className="text-lake-deep">número de personas</strong>.
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// AMENIDADES
// ============================================================
function Amenities() {
  const items = [
    { icon: Sunrise, label: "Vista al lago" },
    { icon: Trees, label: "Bosque alrededor" },
    { icon: UtensilsCrossed, label: "Restaurante" },
    { icon: Car, label: "Estacionamiento privado" },
    { icon: Wifi, label: "WiFi (según zona)" },
    { icon: Bath, label: "Baño privado" },
    { icon: Waves, label: "Agua caliente" },
    { icon: Compass, label: "Atención local" },
  ];

  return (
    <section id="amenidades" className="bg-sand py-20 md:py-28">
      <div className="container-x">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-lake">
            Amenidades
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-lake-deep sm:text-4xl md:text-5xl">
            Todo lo que necesitas para desconectarte
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {items.map((it) => (
            <div
              key={it.label}
              className="flex flex-col items-start gap-3 rounded-2xl border border-border bg-warm-white p-5 transition hover:border-turquoise/40 hover:shadow-md"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-lake-deep/5 text-lake-deep">
                <it.icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-medium text-foreground">
                {it.label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-start gap-4 rounded-2xl border-l-4 border-turquoise bg-warm-white p-5 shadow-sm md:p-6">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-turquoise/15 text-lake-deep">
            <AlertTriangle className="h-5 w-5" />
          </span>
          <div>
            <div className="font-semibold text-lake-deep">Nota importante</div>
            <p className="mt-1 text-sm leading-relaxed text-foreground/75 md:text-base">
              Estamos dentro de una zona natural protegida; la señal de celular
              e internet pueden variar. Te recomendamos descargar tu mapa antes
              de ingresar al parque.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// EXPERIENCIAS
// ============================================================
function Experiences() {
  const acts = [
    { icon: Waves, title: "Paseos en balsa tradicional" },
    { icon: Compass, title: "Kayak en zonas permitidas" },
    { icon: Footprints, title: "Senderismo y miradores" },
    { icon: Camera, title: "Fotografía de paisaje" },
    { icon: Mountain, title: "Naturaleza y avistamiento" },
    { icon: Trees, title: "Caminatas entre bosque" },
  ];

  const nearby = [
    "Lago Pojoj",
    "Lago Tziscao",
    "Lago Internacional",
    "Zona Arqueológica de Chinkultic",
    "Comitán Pueblo Mágico",
  ];

  return (
    <section
      id="experiencias"
      className="relative overflow-hidden bg-lake-deep py-20 text-warm-white md:py-28"
    >
      <div
        className="absolute inset-0 opacity-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=2000&q=80')",
        }}
        aria-hidden
      />
      <div className="relative container-x">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-turquoise">
            Experiencias
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Vive Montebello desde Cinco Lagos
          </h2>
          <p className="mt-5 text-base leading-relaxed text-warm-white/85 md:text-lg">
            Cinco Lagos es uno de los puntos más impresionantes del parque.
            Desde aquí puedes explorar lagunas conectadas, caminar por senderos
            y disfrutar de los tonos azules, verdes y turquesas que hacen famoso
            a Montebello.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {acts.map((a) => (
            <div
              key={a.title}
              className="group flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur transition hover:bg-white/10 hover:border-turquoise/50"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-turquoise/20 text-turquoise">
                <a.icon className="h-6 w-6" />
              </span>
              <span className="font-medium">{a.title}</span>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <div className="text-sm font-semibold uppercase tracking-wider text-turquoise">
            Cerca de nosotros
          </div>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {nearby.map((n) => (
              <span
                key={n}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-4 py-2 text-sm font-medium text-warm-white"
              >
                <MapPin className="h-3.5 w-3.5 text-turquoise" />
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// GALLERY
// ============================================================
function Gallery() {
  // 👉 Reemplaza cada item con la foto real correspondiente.
  const slots = [
    { label: "Fachada de las cabañas", span: "md:col-span-2 md:row-span-2" },
    { label: "Interior de cabaña" },
    { label: "Cama / habitación" },
    { label: "Baño" },
    { label: "Terraza o balcón" },
    { label: "Vista real al lago", span: "md:col-span-2" },
    { label: "Restaurante o comedor" },
    { label: "Camino de llegada" },
    { label: "Actividades / paisaje cercano" },
  ];

  return (
    <section id="galeria" className="py-20 md:py-28">
      <div className="container-x">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-lake">
            Galería
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-lake-deep sm:text-4xl md:text-5xl">
            Momentos en Cinco Lagos
          </h2>
          <p className="mt-4 text-base text-foreground/70 md:text-lg">
            Las fotos reales del lugar ayudan a elegir mejor tu cabaña.
            Escríbenos si quieres ver disponibilidad actual.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 md:auto-rows-[180px]">
          {slots.map((s, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-2xl border-2 border-dashed border-lake/30 bg-sand ${
                s.span ?? ""
              }`}
            >
              <div className="absolute inset-0 grid place-items-center p-4 text-center">
                <div>
                  <span className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-lake-deep/10 text-lake-deep">
                    <Camera className="h-5 w-5" />
                  </span>
                  <div className="mt-2 text-xs font-semibold uppercase tracking-wide text-lake-deep">
                    {s.label}
                  </div>
                  <div className="mt-1 text-[11px] text-muted-foreground">
                    Reemplazar con foto real
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href={waLink("Hola, ¿me pueden compartir fotos actuales y disponibilidad?")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-sm font-semibold text-white transition hover:bg-whatsapp-dark min-h-12"
          >
            <MessageCircle className="h-4 w-4" />
            Pedir fotos por WhatsApp
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-warm-white px-6 py-3 text-sm font-semibold text-lake-deep transition hover:border-lake-deep min-h-12"
          >
            <Instagram className="h-4 w-4" />
            Ver Instagram
          </a>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// LOCATION
// ============================================================
function Location() {
  return (
    <section id="ubicacion" className="bg-sand py-20 md:py-28">
      <div className="container-x">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-lake">
            Ubicación
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-lake-deep sm:text-4xl md:text-5xl">
            Cómo llegar a Cabañas 5 Lagos
          </h2>
          <p className="mt-4 flex items-start gap-2 text-base text-foreground/80">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-lake-deep" />
            <span>{ADDRESS}</span>
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-5">
            <div className="rounded-2xl border border-border bg-warm-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-lake-deep text-warm-white">
                  <Download className="h-5 w-5" />
                </span>
                <h3 className="font-display text-xl font-bold text-lake-deep">
                  Descarga el mapa antes de llegar
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-foreground/75 md:text-base">
                Te recomendamos descargar el mapa antes de llegar, ya que la
                señal puede variar dentro del parque.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-warm-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-lake-deep text-warm-white">
                  <Banknote className="h-5 w-5" />
                </span>
                <h3 className="font-display text-xl font-bold text-lake-deep">
                  Lleva efectivo
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-foreground/75 md:text-base">
                En la zona puede no haber cajeros cercanos ni terminal bancaria
                disponible.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-warm-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-lake-deep text-warm-white">
                  <Compass className="h-5 w-5" />
                </span>
                <h3 className="font-display text-xl font-bold text-lake-deep">
                  Rutas recomendadas
                </h3>
              </div>
              <ul className="mt-3 space-y-2 text-sm text-foreground/75 md:text-base">
                <li>
                  <strong className="text-lake-deep">Desde Comitán:</strong>{" "}
                  rumbo a La Trinitaria y señalamientos a Lagunas de Montebello.
                </li>
                <li>
                  <strong className="text-lake-deep">
                    Desde San Cristóbal:
                  </strong>{" "}
                  salida hacia Comitán y luego al parque nacional.
                </li>
                <li>
                  <strong className="text-lake-deep">
                    Transporte público:
                  </strong>{" "}
                  opciones desde Comitán hasta la zona de lagos.
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-warm-white shadow-sm">
            <div className="relative flex-1 min-h-[320px] bg-lake-deep/5">
              {/* 👉 Opcional: reemplazar con <iframe> embebido de Google Maps */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-90"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80')",
                }}
                aria-hidden
              />
              <div className="absolute inset-0 grid place-items-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-warm-white text-lake-deep shadow-2xl animate-pulse">
                  <MapPin className="h-7 w-7" />
                </span>
              </div>
            </div>
            <div className="space-y-3 p-6">
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-lake-deep px-6 py-4 text-sm font-semibold text-warm-white transition hover:bg-lake min-h-12 md:text-base"
              >
                <Map className="h-5 w-5" />
                Abrir ubicación en Google Maps
              </a>
              <p className="text-center text-xs text-muted-foreground">
                👉 Pega aquí el link real:{" "}
                <code className="rounded bg-sand px-1.5 py-0.5 text-[11px]">
                  GOOGLE_MAPS_URL
                </code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FAQ
// ============================================================
function FAQItem({
  q,
  a,
  defaultOpen = false,
}: {
  q: string;
  a: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border last:border-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left min-h-12"
        aria-expanded={open}
      >
        <span className="font-display text-base font-semibold text-lake-deep md:text-lg">
          {q}
        </span>
        <span
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full bg-secondary text-lake-deep transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          <ChevronDown className="h-5 w-5" />
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100 pb-5" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-sm leading-relaxed text-foreground/75 md:text-base">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

function FAQ() {
  const items = [
    {
      q: "¿Dónde están ubicadas las cabañas?",
      a: "En Carretera a Cinco Lagos Km 2, frente al lago, en Santiago, Chiapas, dentro del entorno del Parque Nacional Lagunas de Montebello.",
    },
    {
      q: "¿Cómo puedo reservar?",
      a: "La reserva se realiza directamente por WhatsApp. Te confirmamos disponibilidad, tarifa y método de depósito o transferencia.",
    },
    {
      q: "¿Qué datos necesito enviar para cotizar?",
      a: "Fecha de llegada, fecha de salida y número de personas. Con eso podemos darte una cotización exacta.",
    },
    {
      q: "¿Hay internet o señal celular?",
      a: "La señal es variable porque estamos dentro de una zona natural. Recomendamos descargar mapas e información importante antes de llegar.",
    },
    {
      q: "¿Hay estacionamiento?",
      a: "Consulta disponibilidad o política vigente antes de reservar.",
    },
    {
      q: "¿Hay restaurante?",
      a: "Consulta disponibilidad o política vigente antes de reservar.",
    },
    {
      q: "¿Aceptan mascotas?",
      a: "Consulta disponibilidad o política vigente antes de reservar.",
    },
    {
      q: "¿Hay agua caliente?",
      a: "Consulta disponibilidad o política vigente antes de reservar.",
    },
    {
      q: "¿Se puede nadar en los lagos?",
      a: "Solo en las zonas permitidas por las autoridades del Parque Nacional y siguiendo las indicaciones de los guías locales. Está prohibido el uso de bloqueadores químicos en el agua.",
    },
    {
      q: "¿Qué ropa debo llevar?",
      a: "Ropa cómoda y abrigadora, chamarra ligera o impermeable, calzado para senderismo, repelente amigable con el ambiente y efectivo.",
    },
    {
      q: "¿Aceptan pago por transferencia?",
      a: "Consulta disponibilidad o política vigente antes de reservar.",
    },
    {
      q: "¿Emiten factura?",
      a: "Consulta disponibilidad o política vigente antes de reservar.",
    },
    {
      q: "¿Cuál es el horario de entrada y salida?",
      a: "Consulta disponibilidad o política vigente antes de reservar.",
    },
    {
      q: "¿Cuál es la política de cancelación?",
      a: "Consulta disponibilidad o política vigente antes de reservar.",
    },
  ];

  return (
    <section id="faq" className="py-20 md:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-lake">
            Preguntas frecuentes
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-lake-deep sm:text-4xl md:text-5xl">
            ¿Tienes dudas? Aquí te ayudamos
          </h2>
          <p className="mt-4 text-base text-foreground/70">
            Si no encuentras tu respuesta, escríbenos por WhatsApp y con gusto
            te orientamos.
          </p>
          <a
            href={waLink("Hola, tengo una pregunta sobre Cabañas 5 Lagos de Montebello.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-sm font-semibold text-white transition hover:bg-whatsapp-dark min-h-12"
          >
            <MessageCircle className="h-4 w-4" />
            Pregúntanos
          </a>
        </div>
        <div className="rounded-3xl border border-border bg-card p-2 md:p-6 shadow-sm">
          {items.map((it, i) => (
            <FAQItem key={it.q} q={it.q} a={it.a} defaultOpen={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FINAL CTA
// ============================================================
function FinalCTA() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?auto=format&fit=crop&w=2000&q=80')",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-lake-deep/80" />
      <div className="relative container-x py-24 md:py-32 text-center text-warm-white">
        <h2 className="mx-auto max-w-3xl font-display text-3xl font-bold leading-tight sm:text-4xl md:text-6xl">
          Reserva tu descanso frente a{" "}
          <span className="text-turquoise">Cinco Lagos</span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base text-warm-white/85 md:text-lg">
          Escríbenos por WhatsApp con tu fecha de llegada, salida y número de
          personas para enviarte una cotización personalizada.
        </p>
        <div className="mt-10 flex justify-center">
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 rounded-full bg-whatsapp px-8 py-5 text-base font-bold text-white shadow-2xl transition hover:bg-whatsapp-dark sm:text-lg min-h-12"
          >
            <span className="absolute inset-0 rounded-full bg-whatsapp animate-ping opacity-40" />
            <MessageCircle className="relative h-6 w-6" />
            <span className="relative">Cotizar por WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-lake-deep text-warm-white">
      <div className="container-x grid gap-10 py-16 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-turquoise text-lake-deep">
              <Trees className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-bold">
              Cabañas 5 Lagos de Montebello
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-warm-white/75">
            Refugio natural frente a Cinco Lagos, dentro del Parque Nacional
            Lagunas de Montebello, Chiapas.
          </p>
          <p className="mt-4 flex items-start gap-2 text-sm text-warm-white/75">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-turquoise" />
            {ADDRESS}
          </p>
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-turquoise hover:underline"
          >
            <Map className="h-4 w-4" />
            Ver en Google Maps
          </a>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-turquoise">
            Explorar
          </div>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[
              ["#inicio", "Inicio"],
              ["#por-que", "Por qué hospedarte"],
              ["#cabanas", "Cabañas"],
              ["#galeria", "Galería"],
              ["#ubicacion", "Ubicación"],
              ["#faq", "Preguntas frecuentes"],
            ].map(([h, l]) => (
              <li key={h}>
                <a href={h} className="text-warm-white/80 hover:text-turquoise">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-turquoise">
            Contacto & redes
          </div>
          <div className="mt-4 space-y-2.5 text-sm text-warm-white/80">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-turquoise"
            >
              <MessageCircle className="h-4 w-4 text-turquoise" />
              WhatsApp:{" "}
              <span className="font-medium">
                {PHONE_DISPLAY || "[Agregar número]"}
              </span>
            </a>
            <a
              href={EMAIL ? `mailto:${EMAIL}` : "#"}
              className="flex items-center gap-2 hover:text-turquoise"
            >
              <Mail className="h-4 w-4 text-turquoise" />
              Correo:{" "}
              <span className="font-medium">{EMAIL || "[Agregar correo]"}</span>
            </a>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-turquoise"
            >
              <Facebook className="h-4 w-4 text-turquoise" />
              Facebook:{" "}
              <span className="font-medium">
                {FACEBOOK_URL !== "#" ? FACEBOOK_URL : "[Agregar enlace oficial]"}
              </span>
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-turquoise"
            >
              <Instagram className="h-4 w-4 text-turquoise" />
              Instagram: <span className="font-medium">@5lagosmontebello</span>
            </a>
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-turquoise"
            >
              <Map className="h-4 w-4 text-turquoise" />
              Google Maps: <span className="font-medium">Abrir ubicación</span>
            </a>
            {PHONE_DISPLAY && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-turquoise" />
                <span>{PHONE_DISPLAY}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-6 text-xs text-warm-white/60 md:flex-row md:items-center md:justify-between">
          <div>
            © {year} Cabañas 5 Lagos de Montebello. Todos los derechos
            reservados.
          </div>
          <div className="max-w-xl md:text-right">
            Todas las tarifas, servicios y disponibilidad están sujetos a
            confirmación directa vía WhatsApp.
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================================
// FLOATING WHATSAPP
// ============================================================
function FloatingWhatsApp() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Reservar por WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-white shadow-2xl transition hover:bg-whatsapp-dark md:h-16 md:w-16"
    >
      <span className="absolute inset-0 rounded-full bg-whatsapp animate-ping opacity-60" />
      <MessageCircle className="relative h-7 w-7" />
    </a>
  );
}
