import { useState } from "react";
import { cabins, PRICE_NOTE, type Cabin } from "@/lib/cabins";
import { Lightbox } from "@/components/PhotoGallery";
import { cabinWhatsappLink } from "@/lib/site";
import { IconArrow, IconCheck, IconUsers, IconWhatsapp } from "@/components/Icons";

function CabinCard({
  cabin,
  active,
  onSelect,
}: {
  cabin: Cabin;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      id={`tab-${cabin.id}`}
      aria-selected={active}
      aria-controls={`panel-${cabin.id}`}
      onClick={onSelect}
      className={`group relative w-full overflow-hidden rounded-sm border text-left transition sm:w-auto ${
        active
          ? "border-turquoise bg-forest shadow-lg"
          : "border-border bg-forest/40 hover:border-turquoise/60 hover:bg-forest/70"
      }`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-forest">
        <img
          src={cabin.hero.url}
          alt={cabin.hero.alt}
          width={cabin.hero.w}
          height={cabin.hero.h}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
        />
        <span
          aria-hidden
          className={`absolute inset-0 transition ${active ? "bg-forest-deep/0" : "bg-forest-deep/35"}`}
        />
        {active && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-turquoise px-3 py-1 text-[11px] font-semibold text-primary-foreground">
            <IconCheck className="h-3 w-3" />
            Seleccionada
          </span>
        )}
        {cabin.badge && !active && (
          <span className="absolute left-3 top-3 rounded-full bg-forest-deep/85 px-3 py-1 text-[11px] font-semibold text-foreground backdrop-blur-sm">
            {cabin.badge}
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg leading-tight">{cabin.name}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
          <IconUsers className="h-3.5 w-3.5 shrink-0 text-turquoise" />
          {cabin.capacity}
        </p>
        <p className="mt-3 text-sm font-semibold text-turquoise">
          Desde {cabin.priceFrom} MXN
          <span className="font-normal text-muted-foreground"> / noche</span>
        </p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-foreground/80 transition group-hover:gap-2.5">
          {active ? "Viendo fotos y detalles" : "Ver fotos y detalles"}
          <IconArrow className="h-3.5 w-3.5" />
        </span>
      </div>
    </button>
  );
}

function CabinDetail({ cabin }: { cabin: Cabin }) {
  const gallery = [cabin.hero, ...cabin.gallery];
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div
      role="tabpanel"
      id={`panel-${cabin.id}`}
      aria-labelledby={`tab-${cabin.id}`}
      className="mt-8 border-t border-border pt-8 md:mt-12 md:pt-12"
    >
      <div className="grid gap-8 md:grid-cols-[1.15fr_1fr] md:gap-12">
        <div className="min-w-0">
          <button
            type="button"
            onClick={() => setOpen(0)}
            aria-label={`Ver foto principal de ${cabin.name} en grande`}
            className="group block w-full overflow-hidden rounded-sm bg-forest"
          >
            <img
              src={cabin.hero.url}
              alt={cabin.hero.alt}
              width={cabin.hero.w}
              height={cabin.hero.h}
              className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-[1.03]"
            />
          </button>

          <div className="mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {cabin.gallery.map((p, i) => (
              <button
                key={`${p.url}-${i}`}
                type="button"
                onClick={() => setOpen(i + 1)}
                aria-label={`Abrir foto ${i + 2} de ${cabin.name}`}
                className="group relative h-24 w-32 shrink-0 snap-start overflow-hidden rounded-sm bg-forest md:h-28 md:w-40"
              >
                <img
                  src={p.url}
                  alt={p.alt}
                  width={p.w}
                  height={p.h}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.06]"
                />
              </button>
            ))}
          </div>

          <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground md:hidden">Desliza para ver más fotos →</p>
            <button
              type="button"
              onClick={() => setOpen(0)}
              className="text-xs font-medium text-turquoise underline-offset-4 transition hover:underline"
            >
              Ver todas las fotos ({gallery.length})
            </button>
          </div>
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs uppercase tracking-[0.25em] text-turquoise">{cabin.capacity}</p>
            {cabin.badge && (
              <span className="rounded-full border border-turquoise/40 px-2.5 py-1 text-[11px] font-medium text-turquoise">
                {cabin.badge}
              </span>
            )}
          </div>

          <h3 className="mt-3 text-3xl leading-tight md:text-4xl">{cabin.name}</h3>
          <p className="mt-2 text-base font-medium text-foreground/90">{cabin.tagline}</p>
          <p className="mt-3 text-lg font-semibold text-turquoise">
            Desde {cabin.priceFrom} MXN
            <span className="text-sm font-normal text-muted-foreground"> por noche</span>
          </p>
          <p className="mt-4 max-w-md text-base leading-relaxed text-foreground/90">{cabin.intro}</p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">{cabin.description}</p>

          <div className="mt-7 border-t border-border pt-6">
            <h4 className="text-sm font-semibold text-foreground">Así se distribuye</h4>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
              {cabin.distribution.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-turquoise" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-7 border-t border-border pt-6">
            <h4 className="text-sm font-semibold text-foreground">Lo que encontrarás</h4>
            <ul className="mt-3 grid gap-2 text-sm text-foreground/90 sm:grid-cols-2">
              {cabin.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-turquoise" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <a
            href={cabinWhatsappLink(cabin.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-turquoise px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            <IconWhatsapp className="h-5 w-5" />
            Consultar disponibilidad
          </a>
        </div>
      </div>

      <Lightbox photos={gallery} index={open} onClose={() => setOpen(null)} onIndexChange={setOpen} />
    </div>
  );
}

export function CabinChooser() {
  const [activeId, setActiveId] = useState(cabins[0].id);
  const active = cabins.find((c) => c.id === activeId) ?? cabins[0];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Tipos de cabaña"
        className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4"
      >
        {cabins.map((cabin) => (
          <CabinCard
            key={cabin.id}
            cabin={cabin}
            active={cabin.id === activeId}
            onSelect={() => setActiveId(cabin.id)}
          />
        ))}
      </div>

      <p className="mt-4 text-xs text-muted-foreground">{PRICE_NOTE}</p>

      <CabinDetail key={active.id} cabin={active} />
    </div>
  );
}
