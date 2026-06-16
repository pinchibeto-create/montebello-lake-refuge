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
  Tv,
  Bath,
  MapPin,
  Sunrise,
  Home,
  Map,
  Check,
  AlertTriangle,
  Camera,
  Bike,
  Fish,
  Waves,
  ChevronDown,
  Instagram,
  Facebook,
  Phone,
  Mail,
  Compass,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cabañas 5 Lagos de Montebello — Hospedaje frente al lago en Chiapas" },
      {
        name: "description",
        content:
          "Cabañas frente a Cinco Lagos, dentro del Parque Nacional Lagunas de Montebello, Chiapas. Refugio natural con vista al lago, restaurante y senderos. Reserva por WhatsApp.",
      },
      { property: "og:title", content: "Cabañas 5 Lagos de Montebello" },
      {
        property: "og:description",
        content:
          "Despierta frente a Cinco Lagos. Cabañas rodeadas de bosque en Lagunas de Montebello, Chiapas.",
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
const WHATSAPP_NUMBER = "YOUR_NUMBER_HERE"; // e.g. "5219631234567"
const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_NUMBER}`;
const INSTAGRAM_URL = "https://www.instagram.com/5lagosmontebello/";
const FACEBOOK_URL = "#"; // placeholder
const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Cinco+Lagos+Montebello+Chiapas";
const ADDRESS = "Carretera a Cinco Lagos Km 2, frente al lago, Santiago, 30160, Chiapas, México.";

const waLink = (msg: string) => `${WHATSAPP_BASE}?text=${encodeURIComponent(msg)}`;

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <Story />
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
    { href: "#cabanas", label: "Cabañas" },
    { href: "#amenidades", label: "Amenidades" },
    { href: "#experiencias", label: "Experiencias" },
    { href: "#ubicacion", label: "Ubicación" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-warm-white/80 backdrop-blur-md border-b border-border shadow-sm"
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
            href={waLink("Hola, me gustaría reservar en Cabañas 5 Lagos de Montebello.")}
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
              scrolled ? "bg-secondary text-lake-deep" : "bg-white/15 text-warm-white backdrop-blur"
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
              href={waLink("Hola, me gustaría reservar en Cabañas 5 Lagos de Montebello.")}
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
  const chips = [
    { icon: Trees, label: "Frente al Lago" },
    { icon: Car, label: "Estacionamiento Privado" },
    { icon: UtensilsCrossed, label: "Restaurante" },
    { icon: Footprints, label: "Senderismo" },
    { icon: Mountain, label: "Vista a la Montaña" },
  ];

  return (
    <section
      id="inicio"
      className="relative min-h-[100svh] w-full overflow-hidden"
    >
      {/* REPLACE WITH REAL IMAGE PATH — breathtaking misty dawn over Cinco Lagos */}
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
          Cabañas rodeadas de bosque, vistas naturales y la tranquilidad del Parque Nacional
          Lagunas de Montebello.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={waLink("Hola, quiero información y disponibilidad para Cabañas 5 Lagos.")}
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

        <div className="mt-12 flex flex-wrap gap-2 sm:gap-3">
          {chips.map((c) => (
            <span
              key={c.label}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-2 text-xs font-medium text-warm-white backdrop-blur sm:text-sm"
            >
              <c.icon className="h-4 w-4 text-turquoise" />
              {c.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// STORY
// ============================================================
function Story() {
  return (
    <section className="bg-sand py-20 md:py-28">
      <div className="container-x grid gap-10 md:grid-cols-2 md:gap-16 items-center">
        <div className="relative">
          <div className="aspect-[4/5] overflow-hidden rounded-3xl shadow-xl">
            {/* REPLACE WITH REAL IMAGE PATH — cabin exterior / lakefront */}
            <img
              src="https://images.unsplash.com/photo-1518398046578-8cca57782e17?auto=format&fit=crop&w=1200&q=80"
              alt="Cabaña frente al lago en Cinco Lagos, Montebello"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute -bottom-6 -right-4 hidden md:flex items-center gap-2 rounded-2xl bg-lake-deep px-5 py-4 text-warm-white shadow-2xl">
            <Sunrise className="h-6 w-6 text-turquoise" />
            <div>
              <div className="text-xs uppercase tracking-wider opacity-80">Refugio natural</div>
              <div className="font-display text-lg">Cinco Lagos, Chiapas</div>
            </div>
          </div>
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-lake">
            Nuestro refugio
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-lake-deep sm:text-4xl md:text-5xl">
            Un descanso auténtico entre bosque y lagos de colores
          </h2>
          <p className="mt-6 text-base leading-relaxed text-foreground/80 md:text-lg">
            Cabañas 5 Lagos de Montebello es un refugio natural ubicado frente a una de las
            vistas más hermosas del Parque Nacional Lagunas de Montebello. Aquí puedes descansar
            lejos del ruido, despertar con el canto de las aves, caminar entre bosque y disfrutar
            de la cercanía con los lagos de colores que hacen único a este destino de Chiapas.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { v: "100%", l: "Natural" },
              { v: "5", l: "Lagos" },
              { v: "365", l: "Días al año" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border border-border bg-warm-white p-4 text-center">
                <div className="font-display text-2xl font-bold text-lake-deep md:text-3xl">
                  {s.v}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CABAÑAS
// ============================================================
function Cabanas() {
  const cabins = [
    {
      title: "Cabaña Vista al Lago",
      img: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=1200&q=80",
      badge: "Más solicitada",
      features: ["Baño privado", "TV", "Toallas", "Área de descanso", "Estacionamiento"],
    },
    {
      title: "Cabaña Familiar",
      img: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=1200&q=80",
      badge: "Ideal para familias",
      features: ["Baño privado", "TV", "Toallas", "Minibar", "Estacionamiento"],
    },
    {
      title: "Cabaña con Terraza",
      img: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=80",
      badge: "Vista panorámica",
      features: ["Baño privado", "TV", "Toallas", "Balcón / Terraza", "Estacionamiento"],
    },
  ];

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
            Espacios cálidos, materiales naturales y vistas que abrazan al bosque y al lago.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cabins.map((c) => (
            <article
              key={c.title}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {/* REPLACE WITH REAL IMAGE PATH — cabin interior/exterior */}
                <img
                  src={c.img}
                  alt={`${c.title} en Cabañas 5 Lagos de Montebello`}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute left-4 top-4 rounded-full bg-warm-white/95 px-3 py-1 text-xs font-semibold text-lake-deep backdrop-blur">
                  {c.badge}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-2xl font-bold text-lake-deep">{c.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {c.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-foreground/80">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-turquoise/15 text-lake-deep">
                        <Check className="h-3 w-3" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 rounded-xl bg-sand px-4 py-3 text-xs text-foreground/70">
                  Tarifas sujetas a temporada y disponibilidad.
                </div>
                <a
                  href={waLink(`Hola, me interesa la ${c.title}. ¿Me comparten capacidad y disponibilidad?`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-lake-deep px-5 py-3 text-sm font-semibold text-warm-white transition hover:bg-lake min-h-12"
                >
                  <MessageCircle className="h-4 w-4" />
                  Cotizar capacidad por WhatsApp
                </a>
              </div>
            </article>
          ))}
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
    { icon: Home, label: "Jardín & Terraza" },
    { icon: UtensilsCrossed, label: "Restaurante" },
    { icon: Car, label: "Estacionamiento privado" },
    { icon: Wifi, label: "WiFi (según zona)" },
    { icon: Bath, label: "Baño privado" },
    { icon: Tv, label: "TV" },
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
              <span className="text-sm font-medium text-foreground">{it.label}</span>
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
              Estamos dentro de una zona natural protegida; la señal de celular e internet pueden
              variar. Te recomendamos descargar tu mapa y comprobantes antes de ingresar al parque.
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
    { icon: Fish, title: "Nado y pesca (zonas reguladas)" },
    { icon: Bike, title: "Ciclismo" },
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
            Cinco Lagos es uno de los puntos más impresionantes del parque. Desde aquí puedes
            explorar lagunas conectadas, caminar por senderos y disfrutar de los tonos azules,
            verdes y turquesas que hacen famoso a Montebello.
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
  // REPLACE WITH REAL IMAGE PATHS — Fachada, Interiores, Vista al lago, Terraza, Restaurante, Senderos, Amanecer
  const images = [
    {
      src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
      alt: "Vista al lago en Cinco Lagos Montebello",
      span: "md:col-span-2 md:row-span-2",
    },
    {
      src: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=900&q=80",
      alt: "Fachada de cabaña de madera",
    },
    {
      src: "https://images.unsplash.com/photo-1520637836862-4d197d17c55a?auto=format&fit=crop&w=900&q=80",
      alt: "Interior cálido de cabaña",
    },
    {
      src: "https://images.unsplash.com/photo-1500964757637-c85e8a162699?auto=format&fit=crop&w=900&q=80",
      alt: "Amanecer entre montañas de Montebello",
    },
    {
      src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=80",
      alt: "Terraza con vista al bosque",
    },
    {
      src: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80",
      alt: "Senderos del Parque Nacional Lagunas de Montebello",
      span: "md:col-span-2",
    },
  ];

  return (
    <section className="py-20 md:py-28">
      <div className="container-x">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-lake">
            Galería
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-lake-deep sm:text-4xl md:text-5xl">
            Momentos en Cinco Lagos
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 md:auto-rows-[200px]">
          {images.map((img, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-2xl group ${img.span ?? ""}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-lake-deep/40 to-transparent opacity-0 transition group-hover:opacity-100" />
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Inspírate también en nuestro{" "}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-lake-deep underline-offset-4 hover:underline"
          >
            Instagram @5lagosmontebello
          </a>
          .
        </p>
      </div>
    </section>
  );
}

// ============================================================
// LOCATION
// ============================================================
function Location() {
  const routes = [
    {
      title: "Desde Comitán",
      text: "Tomar rumbo a La Trinitaria y seguir señalamientos hacia Lagunas de Montebello.",
    },
    {
      title: "Desde San Cristóbal de Las Casas",
      text: "Salir hacia Comitán, continuar a La Trinitaria y después al Parque Nacional.",
    },
    {
      title: "Transporte público",
      text: "Opciones desde Comitán hacia la zona de lagos y uso de mototaxis locales.",
    },
  ];

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
            {routes.map((r) => (
              <div
                key={r.title}
                className="rounded-2xl border border-border bg-warm-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-lake-deep text-warm-white">
                    <Compass className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-xl font-bold text-lake-deep">{r.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-foreground/75 md:text-base">
                  {r.text}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-warm-white shadow-sm">
            <div className="relative flex-1 min-h-[320px] bg-lake-deep/5">
              {/* Map placeholder — REPLACE with embedded Google Map iframe if desired */}
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
            <div className="p-6">
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-lake-deep px-6 py-4 text-sm font-semibold text-warm-white transition hover:bg-lake min-h-12 md:text-base"
              >
                <Map className="h-5 w-5" />
                Abrir ubicación en Google Maps
              </a>
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
function FAQItem({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border last:border-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left min-h-12"
        aria-expanded={open}
      >
        <span className="font-display text-lg font-semibold text-lake-deep md:text-xl">{q}</span>
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
          <p className="text-sm leading-relaxed text-foreground/75 md:text-base">{a}</p>
        </div>
      </div>
    </div>
  );
}

function FAQ() {
  const items = [
    {
      q: "¿Dónde están ubicadas las cabañas?",
      a: "Estamos en Carretera a Cinco Lagos Km 2, justo frente al lago, en la comunidad de Santiago, Chiapas, dentro del entorno del Parque Nacional.",
    },
    {
      q: "¿Cómo puedo reservar?",
      a: "Puedes reservar directamente haciendo clic en nuestros botones de WhatsApp. Te confirmaremos disponibilidad, tarifa y el proceso de depósito/transferencia.",
    },
    {
      q: "¿Hay internet o señal celular?",
      a: "Al ser una zona natural y boscosa, la señal es variable. Contamos con WiFi intermitente en áreas comunes. Recomendamos descargar mapas e información importante previamente.",
    },
    {
      q: "¿Hay estacionamiento y restaurante?",
      a: "Sí, contamos con estacionamiento privado para huéspedes y servicio de restaurante (se sugiere consultar horarios y disponibilidad al hacer check-in).",
    },
    {
      q: "¿Se puede nadar en los lagos?",
      a: "Solo en las zonas específicamente permitidas por las autoridades del Parque Nacional y siguiendo las indicaciones de los guías locales. Está prohibido el uso de bloqueadores químicos en el agua.",
    },
    {
      q: "¿Qué ropa debo llevar?",
      a: "Recomendamos chamarra ligera o impermeable, calzado cómodo para senderismo, repelente de insectos amigable con el ambiente y efectivo (no hay cajeros en la zona).",
    },
    {
      q: "¿Aceptan mascotas / Emiten factura?",
      a: "Por favor, consulta directamente nuestras políticas vigentes y disponibilidad de comprobantes fiscales vía WhatsApp antes de consolidar tu reserva.",
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
            Si no encuentras tu respuesta, escríbenos por WhatsApp y con gusto te orientamos.
          </p>
          <a
            href={waLink("Hola, tengo una pregunta sobre Cabañas 5 Lagos.")}
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
          Reserva tu descanso frente a <span className="text-turquoise">Cinco Lagos</span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base text-warm-white/85 md:text-lg">
          Escríbenos y cotiza tu cabaña según fecha, número de personas y tipo de estancia.
        </p>
        <div className="mt-10 flex justify-center">
          <a
            href={waLink("Hola, quiero cotizar una estancia en Cabañas 5 Lagos.")}
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
            <span className="font-display text-lg font-bold">Cabañas 5 Lagos</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-warm-white/75">
            Refugio natural frente a Cinco Lagos, dentro del Parque Nacional Lagunas de
            Montebello, Chiapas.
          </p>
          <p className="mt-4 flex items-start gap-2 text-sm text-warm-white/75">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-turquoise" />
            {ADDRESS}
          </p>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-turquoise">
            Explorar
          </div>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[
              ["#inicio", "Inicio"],
              ["#cabanas", "Cabañas"],
              ["#amenidades", "Amenidades"],
              ["#experiencias", "Experiencias"],
              ["#ubicacion", "Ubicación"],
              ["#faq", "FAQ"],
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
          <div className="mt-4 flex gap-3">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/20 transition hover:border-turquoise hover:text-turquoise"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/20 transition hover:border-turquoise hover:text-turquoise"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href={waLink("Hola, quiero información.")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/20 transition hover:border-turquoise hover:text-turquoise"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
          </div>
          <div className="mt-5 space-y-2 text-sm text-warm-white/75">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-turquoise" />
              <span>WhatsApp: por confirmar</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-turquoise" />
              <span>Correo: por confirmar</span>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-6 text-xs text-warm-white/60 md:flex-row md:items-center md:justify-between">
          <div>© {year} Cabañas 5 Lagos de Montebello. Todos los derechos reservados.</div>
          <div className="max-w-xl md:text-right">
            Sitio informativo. Todas las tarifas, servicios y disponibilidad están sujetos a
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
      href={waLink("Hola, quiero información sobre Cabañas 5 Lagos.")}
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
