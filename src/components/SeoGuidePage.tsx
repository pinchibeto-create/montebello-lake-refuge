import type { Photo } from "@/lib/photos";
import { SITE, whatsappLink } from "@/lib/site";
import { IconArrow, IconCheck, IconMapPin, IconWhatsapp } from "@/components/Icons";

const logo = { url: "/images/logo/cinco-lagos-logo.jpeg" };
const BASE_URL = "https://cabanascincolagos.com";

export type SeoPageLink = {
  href: string;
  label: string;
};

export type SeoPageSection = {
  title: string;
  text: string;
  bullets?: string[];
};

export type SeoPageFaq = {
  question: string;
  answer: string;
};

export type SeoPageSource = {
  label: string;
  href: string;
};

export type SeoPageConfig = {
  path: string;
  title: string;
  description: string;
  keywords: string;
  eyebrow: string;
  heading: string;
  intro: string;
  hero: Photo;
  sections: SeoPageSection[];
  gallery: Photo[];
  faq: SeoPageFaq[];
  related: SeoPageLink[];
  sourceLinks?: SeoPageSource[];
  ctaTitle?: string;
  ctaText?: string;
  ctaMessage?: string;
};

export function makeSeoHead(config: SeoPageConfig) {
  const url = `${BASE_URL}${config.path}`;
  const image = `${BASE_URL}${config.hero.url}`;
  const faqSchema = config.faq.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: config.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }
    : null;

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: config.title,
    description: config.description,
    url,
    inLanguage: "es-MX",
    isPartOf: {
      "@type": "WebSite",
      name: "Cinco Lagos",
      url: BASE_URL,
    },
    about: {
      "@type": "LodgingBusiness",
      name: "Cinco Lagos — Cabañas Mirador 5 Lagos",
      url: BASE_URL,
      telephone: "+52 56 3884 4112",
      address: {
        "@type": "PostalAddress",
        addressLocality: "La Trinitaria",
        addressRegion: "Chiapas",
        addressCountry: "MX",
      },
    },
  };

  return {
    meta: [
      { title: config.title },
      { name: "description", content: config.description },
      { name: "keywords", content: config.keywords },
      { name: "robots", content: "index,follow,max-image-preview:large" },
      { property: "og:title", content: config.title },
      { property: "og:description", content: config.description },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "es_MX" },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { property: "og:image:alt", content: config.hero.alt },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: config.title },
      { name: "twitter:description", content: config.description },
      { name: "twitter:image", content: image },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(webPageSchema) },
      ...(faqSchema
        ? [{ type: "application/ld+json", children: JSON.stringify(faqSchema) }]
        : []),
    ],
  };
}

export function SeoGuidePage({ config }: { config: SeoPageConfig }) {
  const bookingLink = whatsappLink(
    config.ctaMessage ?? "Hola, quiero consultar disponibilidad en Cinco Lagos.",
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-forest-deep/90 backdrop-blur-md">
        <div className="container-x flex h-16 items-center justify-between gap-4 md:h-20">
          <a href="/" className="flex items-center gap-3" aria-label="Ir a la página principal de Cinco Lagos">
            <img
              src={logo.url}
              alt="Cinco Lagos — Cabañas en Montebello, Chiapas"
              className="h-10 w-10 rounded-sm object-cover md:h-11 md:w-11"
            />
            <span className="hidden leading-tight sm:block">
              <span className="block text-sm font-semibold uppercase tracking-[0.2em]">Cinco Lagos</span>
              <span className="block text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Montebello · Chiapas
              </span>
            </span>
          </a>

          <nav aria-label="Navegación" className="hidden items-center gap-6 lg:flex">
            <a href="/#hospedaje" className="text-sm text-foreground/80 transition hover:text-turquoise">Cabañas</a>
            <a href="/que-hacer-lagunas-de-montebello" className="text-sm text-foreground/80 transition hover:text-turquoise">Qué hacer</a>
            <a href="/como-llegar-a-lagunas-de-montebello" className="text-sm text-foreground/80 transition hover:text-turquoise">Cómo llegar</a>
          </nav>

          <a
            href={bookingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-turquoise px-4 py-2 text-xs font-semibold text-primary-foreground transition hover:opacity-90 md:text-sm"
          >
            <IconWhatsapp className="h-4 w-4" />
            <span className="hidden sm:inline">Consultar disponibilidad</span>
            <span className="sm:hidden">Reservar</span>
          </a>
        </div>
      </header>

      <main>
        <section className="relative flex min-h-[72svh] items-end overflow-hidden pt-16 md:min-h-[78svh] md:pt-20">
          <img src={config.hero.url} alt={config.hero.alt} className="absolute inset-0 h-full w-full object-cover" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/65 to-forest-deep/20" />
          <div className="container-x relative pb-14 pt-24 md:pb-20">
            <p className="text-xs uppercase tracking-[0.28em] text-turquoise">{config.eyebrow}</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.02] md:text-6xl lg:text-7xl">{config.heading}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/90 md:text-xl">{config.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={bookingLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-turquoise px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
                <IconWhatsapp className="h-5 w-5" /> Consulta tus fechas
              </a>
              <a href="/#hospedaje" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/15 px-6 py-3 text-sm text-white backdrop-blur-sm transition hover:bg-white/10">
                Ver las cabañas <IconArrow className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <section className="container-x py-16 md:py-24">
          <div className="grid gap-12 md:grid-cols-[0.78fr_1.5fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-turquoise">Cinco Lagos</p>
              <h2 className="mt-4 text-3xl leading-tight md:text-4xl">Una visita con más tiempo para mirar</h2>
              <p className="mt-5 flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                <IconMapPin className="mt-0.5 h-5 w-5 shrink-0 text-turquoise" />
                {SITE.address}
              </p>
            </div>
            <div className="grid gap-8">
              {config.sections.map((section) => (
                <article key={section.title} className="border-b border-border pb-8 last:border-b-0">
                  <h2 className="text-2xl font-semibold md:text-3xl">{section.title}</h2>
                  <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">{section.text}</p>
                  {section.bullets?.length ? (
                    <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                      {section.bullets.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm leading-6 text-foreground/90">
                          <IconCheck className="mt-1 h-4 w-4 shrink-0 text-turquoise" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-forest py-16 md:py-24">
          <div className="container-x">
            <header className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.25em] text-turquoise">Fotografías reales</p>
              <h2 className="mt-4 text-3xl leading-tight md:text-4xl">Así se ve Cinco Lagos</h2>
              <p className="mt-4 text-base text-muted-foreground">Las imágenes de esta página corresponden al alojamiento y su entorno; no usamos renders para mostrarte la experiencia.</p>
            </header>
            <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">
              {config.gallery.map((photo, index) => (
                <img
                  key={`${photo.url}-${index}`}
                  src={photo.url}
                  alt={photo.alt}
                  loading="lazy"
                  className={`w-full rounded-sm object-cover ${index === 0 ? "col-span-2 aspect-[2/1] md:col-span-2" : "aspect-square"}`}
                />
              ))}
            </div>
          </div>
        </section>

        {config.faq.length ? (
          <section className="container-x py-16 md:py-24">
            <div className="grid gap-10 md:grid-cols-[0.8fr_1.5fr]">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-turquoise">Preguntas frecuentes</p>
                <h2 className="mt-4 text-3xl leading-tight md:text-4xl">Antes de venir</h2>
              </div>
              <div className="divide-y divide-border border-y border-border">
                {config.faq.map((item) => (
                  <article key={item.question} className="py-6">
                    <h3 className="text-lg font-semibold">{item.question}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.answer}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {config.sourceLinks?.length ? (
          <section className="container-x pb-8">
            <div className="rounded-sm border border-border bg-forest p-6 md:p-8">
              <p className="text-xs uppercase tracking-[0.22em] text-turquoise">Información oficial para tu viaje</p>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">Horarios, cuotas y condiciones de acceso pueden cambiar. Antes de salir, consulta las fuentes oficiales.</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {config.sourceLinks.map((source) => (
                  <a key={source.href} href={source.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm transition hover:bg-foreground/10">
                    {source.label} <IconArrow className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="container-x py-16 md:py-20">
          <p className="text-xs uppercase tracking-[0.25em] text-turquoise">También puede ayudarte</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {config.related.map((link) => (
              <a key={link.href} href={link.href} className="group flex items-center justify-between gap-4 border-b border-border py-4 text-base transition hover:text-turquoise">
                {link.label}
                <IconArrow className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
              </a>
            ))}
          </div>
        </section>

        <section className="bg-turquoise py-16 text-primary-foreground md:py-24">
          <div className="container-x grid items-center gap-8 md:grid-cols-[1.4fr_auto]">
            <div>
              <h2 className="text-3xl font-semibold leading-tight md:text-5xl">{config.ctaTitle ?? "Quédate frente al lago"}</h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-primary-foreground/80">{config.ctaText ?? "Dinos tus fechas y cuántas personas viajan. Te compartimos las opciones disponibles por WhatsApp."}</p>
            </div>
            <a href={bookingLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-forest-deep px-6 py-3 text-sm font-semibold text-foreground transition hover:opacity-90">
              <IconWhatsapp className="h-5 w-5" /> Consultar disponibilidad
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-forest-deep py-12">
        <div className="container-x grid gap-8 md:grid-cols-3">
          <div>
            <img src={logo.url} alt="Logotipo de Cinco Lagos" className="h-14 w-14 rounded-sm object-cover" />
            <p className="mt-4 text-sm text-muted-foreground">{SITE.slogan}</p>
          </div>
          <div className="text-sm text-muted-foreground">
            <p className="font-semibold text-foreground">Cinco Lagos</p>
            <p className="mt-2">{SITE.address}</p>
            <p className="mt-2">WhatsApp: {SITE.phoneDisplay}</p>
          </div>
          <div className="text-sm text-muted-foreground">
            <a href="/" className="block transition hover:text-turquoise">Inicio</a>
            <a href="/#hospedaje" className="mt-2 block transition hover:text-turquoise">Cabañas</a>
            <a href={SITE.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 block transition hover:text-turquoise">Google Maps</a>
          </div>
        </div>
      </footer>

      <a href={bookingLink} target="_blank" rel="noopener noreferrer" aria-label="Consultar disponibilidad por WhatsApp" className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-warm-white shadow-lg transition hover:bg-whatsapp-dark">
        <IconWhatsapp className="h-7 w-7" />
      </a>
    </div>
  );
}
