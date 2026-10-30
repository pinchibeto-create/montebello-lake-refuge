import { useCallback, useEffect, useState } from "react";
import { cabins, PRICE_NOTE, type Cabin } from "@/lib/cabins";
import { Lightbox } from "@/components/PhotoGallery";
import { cabinWhatsappLink } from "@/lib/site";
import { IconArrow, IconCheck, IconUsers, IconWhatsapp } from "@/components/Icons";

// Mostrar la campaña de noviembre solo desde octubre y hasta noviembre de 2026,
// tomando como referencia la zona horaria del alojamiento.
function showNovemberPromotion() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Mexico_City",
    year: "numeric",
    month: "numeric",
  }).formatToParts(new Date());
  const year = Number(parts.find((part) => part.type === "year")?.value);
  const month = Number(parts.find((part) => part.type === "month")?.value);
  return year === 2026 && (month === 10 || month === 11);
}

function CabinCard({
  cabin,
  active,
  onSelect,
  novemberPromotion,
}: {
  cabin: Cabin;
  active: boolean;
  onSelect: () => void;
  novemberPromotion: boolean;
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
          {novemberPromotion ? "Noviembre 2026:" : "Desde"} {cabin.priceFrom} MXN
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

function CabinDetail({ cabin, novemberPromotion }: { cabin: Cabin; novemberPromotion: boolean }) {
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
            {novemberPromotion ? "Noviembre 2026:" : "Desde"} {cabin.priceFrom} MXN
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
  const novemberPromotion = showNovemberPromotion();
  const [activeId, setActiveId] = useState(cabins[0].id);
  const active = cabins.find((c) => c.id === activeId) ?? cabins[0];

  const selectFromHash = useCallback((shouldScroll: boolean) => {
    const cabin = cabins.find((item) => item.hash === window.location.hash);
    if (!cabin) return;

    setActiveId(cabin.id);

    if (shouldScroll) {
      window.requestAnimationFrame(() => {
        document.getElementById("hospedaje")?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
          block: "start",
        });
      });
    }
  }, []);

  useEffect(() => {
    selectFromHash(true);

    const onLocationChange = () => selectFromHash(true);
    window.addEventListener("hashchange", onLocationChange);
    window.addEventListener("popstate", onLocationChange);

    return () => {
      window.removeEventListener("hashchange", onLocationChange);
      window.removeEventListener("popstate", onLocationChange);
    };
  }, [selectFromHash]);

  const selectCabin = (cabin: Cabin) => {
    setActiveId(cabin.id);

    if (window.location.hash !== cabin.hash) {
      window.history.pushState(null, "", cabin.hash);
    }
  };

  return (
    <div>
      {novemberPromotion && (
        <aside aria-label="Promoción de noviembre de 2026" className="mb-6 rounded-xl border border-turquoise/40 bg-forest px-5 py-5">
          <p className="text-base font-semibold text-turquoise">Precios especiales de noviembre 2026 · del 1 al 30</p>
          <p className="mt-2 text-sm text-foreground/90">Cabañas Pequeñas $750 · Cristal $1,200 · Grande $1,500 · Mayor $1,500 MXN por noche.</p>
          <p className="mt-2 text-xs text-muted-foreground">Tarifas generales sujetas a disponibilidad. Promociones adicionales para parejas elegibles se cotizan por separado. Fuera de noviembre los precios pueden variar.</p>
        </aside>
      )}
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
            novemberPromotion={novemberPromotion}
            onSelect={() => selectCabin(cabin)}
          />
        ))}
      </div>

      <p className="mt-4 text-xs text-muted-foreground">{PRICE_NOTE}</p>

      <CabinDetail key={active.id} cabin={active} novemberPromotion={novemberPromotion} />
    </div>
  );
}
