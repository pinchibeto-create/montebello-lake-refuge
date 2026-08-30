import { createFileRoute } from "@tanstack/react-router";
const logo = { url: "/images/logo/cinco-lagos-logo.jpeg" };
import { photos } from "@/lib/photos";
import { SITE, whatsappLink } from "@/lib/site";
import { SiteHeader } from "@/components/SiteHeader";
import { PhotoGrid } from "@/components/PhotoGallery";
import { CabinChooser } from "@/components/CabinChooser";
import { AvailabilitySearch } from "@/components/AvailabilitySearch";
import { IconWhatsapp, IconFacebook, IconMapPin, IconArrow, IconLeaf, IconCheck } from "@/components/Icons";

const TITLE = "Cinco Lagos — Cabañas en Montebello, Chiapas";
const DESCRIPTION =
  "Cabañas frente a las Lagunas de Montebello, Chiapas. Cuatro formas de hospedarte con vista al lago, baño privado y terraza. Consulta disponibilidad por WhatsApp.";
const URL = "https://montebello-lake-refuge.lovable.app/";
const OG_IMAGE =
  "https://cabanascincolagos.com/images/cabana-cristal/cabana-cristal-01.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "cabañas Montebello, Lagunas de Montebello, hospedaje Chiapas, cabaña de cristal Montebello, Cinco Lagos",
      },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "es_MX" },
      { property: "og:url", content: URL },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1285" },
      { property: "og:image:height", content: "735" },
      { property: "og:image:alt", content: "Cabaña de cristal de Cinco Lagos con vista al lago en Montebello, Chiapas" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LodgingBusiness",
          name: "Cinco Lagos — Cabañas Mirador 5 Lagos",
          description: DESCRIPTION,
          url: URL,
          telephone: "+52 56 3884 4112",
          sameAs: [SITE.facebookUrl],
          address: {
            "@type": "PostalAddress",
            addressLocality: "La Trinitaria",
            addressRegion: "Chiapas",
            addressCountry: "MX",
          },
        }),
      },
    ],
  }),
  component: LandingPage,
});

const services = [
  "Vista directa al lago",
  "Baño privado en cada cabaña",
  "Agua caliente",
  "Terraza o balcón",
  "Interiores de madera",
  "Estacionamiento",
  "Zona de descanso al aire libre",
  "Entorno natural protegido",
];

const galleryPhotos = [
  photos.p27,
  photos.p22,
  photos.p11,
  photos.p25,
  photos.p10,
  photos.p23,
  photos.p26,
  photos.p28,
  photos.p24,
  photos.p05,
  photos.p12,
  photos.p02,
];

function LandingPage() {
  return (
    <div id="inicio" className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* 1 — Hero */}
      <section className="relative flex min-h-[92svh] items-end overflow-hidden">
        <img
          src={photos.p01.url}
          alt={photos.p01.alt}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/55 to-forest-deep/15"
        />
        <div className="container-x relative pb-16 pt-28 md:pb-24">
          <p className="text-xs uppercase tracking-[0.3em] text-turquoise">
            {SITE.tagline}
          </p>
          <h1 className="mt-5 max-w-3xl text-5xl leading-[0.95] font-semibold md:text-7xl lg:text-8xl">
            Cinco Lagos
          </h1>
          <p className="mt-6 max-w-xl text-xl text-foreground/90 md:text-2xl">
            {SITE.slogan}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-turquoise px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              <IconWhatsapp className="h-5 w-5" />
              Consulta disponibilidad
            </a>
            <a
              href="#hospedaje"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm text-foreground transition hover:bg-foreground/10"
            >
              Ver cabañas
              <IconArrow className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 1b — Buscador de disponibilidad */}
      <section id="disponibilidad" className="container-x relative z-10 -mt-8 md:-mt-20">
        <AvailabilitySearch variant="hero" />
      </section>

      {/* 2 — Intro editorial */}
      <section className="container-x py-20 text-center md:py-28">
        <p className="mx-auto max-w-3xl text-2xl leading-relaxed text-foreground/90 md:text-4xl md:leading-[1.35]">
          Despertar con el lago enfrente, respirar bosque y no tener prisa.
          Cinco Lagos es un lugar para quedarse quieto y mirar el agua cambiar
          de color a lo largo del día.
        </p>
      </section>

      {/* 3 — Cuatro formas de hospedarte */}
      <section id="hospedaje" className="container-x pb-8">
        <header className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-turquoise">Hospedaje</p>
          <h2 className="mt-4 text-4xl leading-tight md:text-5xl">Elige tu cabaña</h2>
          <p className="mt-4 text-base text-muted-foreground">
            Cuatro opciones frente al lago. Toca una para ver sus fotos, su
            capacidad y sus características. Todas cuentan con baño privado.
          </p>
        </header>

        <div className="mt-10">
          <CabinChooser />
        </div>
      </section>


      {/* 3b — Buscador repetido */}
      <section className="container-x py-14 md:py-20">
        <AvailabilitySearch variant="section" className="bg-forest" />
      </section>



      {/* 4 — Galería inmersiva */}
      <section id="galeria" className="bg-forest py-20 md:py-28">
        <div className="container-x">
          <header className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-turquoise">Galería</p>
            <h2 className="mt-4 text-4xl leading-tight md:text-5xl">El lugar, en imágenes</h2>
            <p className="mt-4 text-base text-muted-foreground">
              Fotografías reales del complejo. Toca cualquier imagen para verla
              en grande.
            </p>
          </header>
          <div className="mt-10">
            <PhotoGrid
              photos={galleryPhotos}
              className="grid grid-cols-2 gap-3 md:grid-cols-4"
              aspect="aspect-square"
            />
          </div>
        </div>
      </section>

      {/* 5 — Servicios */}
      <section id="servicios" className="container-x py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-[1fr_1.2fr]">
          <header>
            <p className="text-xs uppercase tracking-[0.25em] text-turquoise">Servicios</p>
            <h2 className="mt-4 text-4xl leading-tight md:text-5xl">
              Lo esencial, bien hecho
            </h2>
          </header>
          <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {services.map((s) => (
              <li key={s} className="flex items-start gap-3 border-b border-border pb-4 text-base">
                <IconCheck className="mt-1 h-4 w-4 shrink-0 text-turquoise" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6 — Ubicación */}
      <section id="ubicacion" className="bg-forest py-20 md:py-28">
        <div className="container-x grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-turquoise">Ubicación</p>
            <h2 className="mt-4 text-4xl leading-tight md:text-5xl">
              Lagunas de Montebello
            </h2>
            <p className="mt-5 flex items-start gap-2 text-base text-muted-foreground">
              <IconMapPin className="mt-1 h-5 w-5 shrink-0 text-turquoise" />
              {SITE.address}
            </p>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
              Dentro del Parque Nacional Lagunas de Montebello, en la frontera
              sur de Chiapas. Se llega por carretera desde Comitán de
              Domínguez rumbo a La Trinitaria y luego por el camino de los
              lagos.
            </p>
            <a
              href={SITE.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm transition hover:bg-foreground/10"
            >
              Ver en Google Maps
              <IconArrow className="h-4 w-4" />
            </a>
          </div>
          <div className="overflow-hidden rounded-sm">
            <img
              src={photos.p27.url}
              alt={photos.p27.alt}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 7 — Visita responsable */}
      <section className="container-x py-20 md:py-24">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
          <IconLeaf className="h-8 w-8 text-turquoise" />
          <h2 className="text-3xl leading-tight md:text-4xl">Visita responsable</h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Estás en un área natural protegida. Te pedimos llevarte tu basura,
            cuidar el silencio del bosque, no dejar residuos en el agua y
            respetar la flora y fauna del lugar. El paisaje se conserva entre
            todos.
          </p>
        </div>
      </section>

      {/* 8 — CTA final */}
      <section className="bg-turquoise py-20 text-primary-foreground md:py-28">
        <div className="container-x grid items-center gap-10 md:grid-cols-[1.4fr_auto]">
          <div>
            <h2 className="text-4xl leading-tight md:text-5xl">
              La vista te está esperando
            </h2>
            <p className="mt-4 max-w-lg text-base text-primary-foreground/80">
              Escríbenos por WhatsApp y te decimos qué cabañas están libres en
              las fechas que quieres.
            </p>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-forest-deep px-6 py-3 text-sm font-semibold text-foreground transition hover:opacity-90"
            >
              <IconWhatsapp className="h-5 w-5" />
              Consulta disponibilidad · {SITE.phoneDisplay}
            </a>
          </div>
          <figure className="justify-self-start rounded-sm bg-warm-white p-4 md:justify-self-end">
            <img
              src={photos.p29.url}
              alt="Código QR para consultar disponibilidad"
              loading="lazy"
              className="h-32 w-32 object-contain"
            />
            <figcaption className="mt-2 text-center text-[11px] text-forest-deep">
              Escanea para escribirnos
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-forest-deep py-14">
        <div className="container-x grid gap-10 md:grid-cols-3">
          <div>
            <img
              src={logo.url}
              alt="Logotipo de Cinco Lagos"
              className="h-16 w-16 rounded-sm object-cover"
            />
            <p className="mt-4 text-sm text-muted-foreground">{SITE.slogan}</p>
          </div>
          <div className="text-sm text-muted-foreground">
            <h3 className="text-xs uppercase tracking-[0.25em] text-turquoise">Contacto</h3>
            <p className="mt-4">WhatsApp: {SITE.phoneDisplay}</p>
            <p className="mt-2">{SITE.address}</p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Escríbenos por WhatsApp"
                className="rounded-full border border-border p-2 transition hover:bg-foreground/10"
              >
                <IconWhatsapp className="h-4 w-4" />
              </a>
              <a
                href={SITE.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en Facebook"
                className="rounded-full border border-border p-2 transition hover:bg-foreground/10"
              >
                <IconFacebook className="h-4 w-4" />
              </a>
            </div>
          </div>
          <nav aria-label="Secciones" className="text-sm text-muted-foreground">
            <h3 className="text-xs uppercase tracking-[0.25em] text-turquoise">Secciones</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#hospedaje" className="transition hover:text-turquoise">Hospedaje</a></li>
              <li><a href="#galeria" className="transition hover:text-turquoise">Galería</a></li>
              <li><a href="#servicios" className="transition hover:text-turquoise">Servicios</a></li>
              <li><a href="#ubicacion" className="transition hover:text-turquoise">Ubicación</a></li>
            </ul>
          </nav>
        </div>
        <div className="container-x mt-10 border-t border-border pt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Cinco Lagos · Cabañas Mirador 5 Lagos, Montebello, Chiapas.
        </div>
      </footer>

      {/* WhatsApp flotante */}
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Consulta disponibilidad por WhatsApp"
        className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-warm-white shadow-lg transition hover:bg-whatsapp-dark"
      >
        <IconWhatsapp className="h-7 w-7" />
      </a>
    </div>
  );
}
