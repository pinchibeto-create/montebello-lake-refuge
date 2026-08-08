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
          {active ? "Viendo detalles" : "Ver detalles"}
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
            className="group block w-full overflow-hidden rounded-sm bg-forest"
          >
            <img
              src={cabin.hero.url}
              alt={cabin.hero.alt}
              className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-[1.03]"
            />
          </button>

          <div className="mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {cabin.gallery.map((p, i) => (
              <button
                key={p.url}
                type="button"
                onClick={() => setOpen(i + 1)}
                className="group relative h-24 w-32 shrink-0 snap-start overflow-hidden rounded-sm bg-forest md:h-28 md:w-40"
              >
                <img
                  src={p.url}
                  alt={p.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.06]"
                />
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground md:hidden">Desliza para ver más fotos →</p>
        </div>

        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.25em] text-turquoise">{cabin.capacity}</p>
          <h3 className="mt-3 text-3xl leading-tight md:text-4xl">{cabin.name}</h3>
          <p className="mt-3 text-lg font-semibold text-turquoise">
            Desde {cabin.priceFrom} MXN
            <span className="text-sm font-normal text-muted-foreground"> por noche</span>
          </p>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">{cabin.intro}</p>

          <ul className="mt-6 grid gap-2 text-sm text-foreground/90 sm:grid-cols-2">
            {cabin.features.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-turquoise" />
                {f}
              </li>
            ))}
          </ul>

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
      <p className="text-xs text-muted-foreground md:hidden">Desliza para ver las opciones →</p>

      <div
        role="tablist"
        aria-label="Tipos de cabaña"
        className="mt-3 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] md:mt-0 md:grid md:grid-cols-4 md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden"
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
