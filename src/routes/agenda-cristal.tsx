import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { addDays, addMonths, format, startOfDay, startOfMonth } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { PhotoGrid } from "@/components/PhotoGallery";
import { crystalCabinPhotos } from "@/lib/cabin-gallery-photos";
import { SITE, whatsappLink } from "@/lib/site";
import { IconWhatsapp } from "@/components/Icons";

const SUPABASE_URL = "https://jybfyuaxcewbecmbaibu.supabase.co";
const SUPABASE_KEY = "sb_publishable_Lc90p_iA0gGGQKHW6PvADA_SvoEa975";
const URL = "https://cabanascincolagos.com/agenda-cristal";
const TITLE = "Agenda Cabaña Cristal | Cinco Lagos Montebello";
const DESCRIPTION =
  "Consulta en calendario la disponibilidad de la Cabaña Cristal de Cinco Lagos en Lagunas de Montebello, Chiapas.";

type BusyRange = { check_in: string; check_out: string };
type AvailabilityResponse = { cabin: string; busy: BusyRange[] };

export const Route = createFileRoute("/agenda-cristal")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: `https://cabanascincolagos.com${crystalCabinPhotos[0].url}` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: CrystalAgendaPage,
});

function key(date: Date) {
  return format(date, "yyyy-MM-dd");
}

function isBusyNight(date: Date, busy: BusyRange[]) {
  const value = key(date);
  return busy.some((range) => value >= range.check_in && value < range.check_out);
}

function rangeHasBusyNight(from: Date, to: Date, busy: BusyRange[]) {
  for (let cursor = startOfDay(from); cursor < to; cursor = addDays(cursor, 1)) {
    if (isBusyNight(cursor, busy)) return true;
  }
  return false;
}

function fmt(date: Date) {
  return format(date, "d 'de' MMMM", { locale: es });
}

function CrystalAgendaPage() {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [month, setMonth] = useState(() => startOfMonth(new Date()));
  const [busy, setBusy] = useState<BusyRange[]>([]);
  const [arrival, setArrival] = useState<Date | undefined>();
  const [departure, setDeparture] = useState<Date | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("Toca una fecha disponible para elegir tu llegada.");

  useEffect(() => {
    const controller = new AbortController();
    const from = key(startOfMonth(addMonths(month, -1)));
    const to = key(startOfMonth(addMonths(month, 2)));

    setLoading(true);
    setError("");

    fetch(`${SUPABASE_URL}/functions/v1/public-crystal-availability?from=${from}&to=${to}`, {
      headers: { apikey: SUPABASE_KEY },
      signal: controller.signal,
    })
      .then(async (response) => {
        const data = (await response.json()) as AvailabilityResponse & { error?: string };
        if (!response.ok) throw new Error(data.error || "No pudimos cargar la disponibilidad.");
        return data;
      })
      .then((data) => setBusy(data.busy ?? []))
      .catch((err) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "No pudimos cargar la disponibilidad.");
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [month]);

  const isOccupied = (date: Date) => isBusyNight(date, busy);
  const isInSelection = (date: Date) => {
    if (!arrival) return false;
    const t = startOfDay(date).getTime();
    const a = startOfDay(arrival).getTime();
    if (!departure) return t === a;
    const d = startOfDay(departure).getTime();
    return t >= a && t <= d;
  };

  const onDayClick = (date: Date) => {
    const clicked = startOfDay(date);
    if (clicked < today) return;

    if (!arrival || departure) {
      if (isOccupied(clicked)) {
        setNotice("Esa noche está ocupada. Elige una fecha sin color para tu llegada.");
        return;
      }
      setArrival(clicked);
      setDeparture(undefined);
      setNotice("Ahora elige tu fecha de salida.");
      return;
    }

    if (clicked <= arrival) {
      if (isOccupied(clicked)) {
        setNotice("Esa noche está ocupada. Elige otra fecha de llegada.");
        return;
      }
      setArrival(clicked);
      setDeparture(undefined);
      setNotice("Ahora elige tu fecha de salida.");
      return;
    }

    if (rangeHasBusyNight(arrival, clicked, busy)) {
      setNotice("Ese periodo cruza una noche ocupada. Elige otra fecha de salida.");
      return;
    }

    setDeparture(clicked);
    setNotice(`${fmt(arrival)} al ${fmt(clicked)} · listo para consultar por WhatsApp.`);
  };

  const selectedMessage =
    arrival && departure
      ? `Hola, vi en la agenda de Cinco Lagos que la Cabaña Cristal aparece disponible del ${fmt(arrival)} al ${fmt(departure)}. Quisiera consultar la reservación para 2 personas.`
      : "Hola, estoy consultando la agenda de la Cabaña Cristal de Cinco Lagos y quisiera información para reservarla para 2 personas.";

  const featured = crystalCabinPhotos.slice(1, 5);

  return (
    <div className="min-h-screen bg-warm-white text-forest-deep">
      <header className="border-b border-forest-deep/10 bg-forest-deep text-white">
        <div className="container-x flex h-16 items-center justify-between gap-4 md:h-20">
          <a href="/" className="flex items-center gap-3">
            <img
              src="/images/logo/cinco-lagos-logo.jpeg"
              alt="Cinco Lagos"
              className="h-10 w-10 rounded-sm object-cover md:h-11 md:w-11"
            />
            <span>
              <span className="block text-sm font-semibold uppercase tracking-[0.2em]">Cinco Lagos</span>
              <span className="block text-[10px] uppercase tracking-[0.22em] text-white/60">Montebello · Chiapas</span>
            </span>
          </a>
          <a
            href={whatsappLink(selectedMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-turquoise px-4 py-2 text-xs font-semibold text-primary-foreground transition hover:opacity-90 md:text-sm"
          >
            <IconWhatsapp className="h-4 w-4" />
            Consultar
          </a>
        </div>
      </header>

      <main>
        <section className="container-x pt-8 md:pt-12">
          <div className="relative overflow-hidden rounded-3xl bg-forest-deep">
            <img
              src={crystalCabinPhotos[0].url}
              alt={crystalCabinPhotos[0].alt}
              className="h-[42svh] min-h-[360px] w-full object-cover md:h-[58vh] md:min-h-[520px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-10">
              <p className="text-xs uppercase tracking-[0.28em] text-turquoise">Cinco Lagos · Montebello</p>
              <h1 className="mt-3 text-4xl leading-none md:text-6xl">Cabaña Cristal</h1>
              <p className="mt-4 max-w-xl text-base text-white/85 md:text-lg">
                Una experiencia frente al lago para dos personas. Consulta aquí sus fechas disponibles.
              </p>
            </div>
          </div>
        </section>

        <section className="container-x py-12 md:py-16">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.25em] text-turquoise">Disponibilidad en vivo</p>
              <h2 className="mt-3 text-3xl md:text-4xl">Consulta la agenda de Cabaña Cristal</h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-forest-deep/65 md:text-base">
                Los días en rojo están ocupados. Los días sin color están disponibles. El día de salida vuelve a quedar disponible para una nueva llegada.
              </p>
            </div>

            <div className="mt-8 rounded-3xl border border-forest-deep/10 bg-white p-4 shadow-sm md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-forest-deep/10 pb-4">
                <div className="flex items-center gap-5 text-sm">
                  <span className="inline-flex items-center gap-2"><span className="h-4 w-4 rounded-sm border border-forest-deep/15 bg-white" />Disponible</span>
                  <span className="inline-flex items-center gap-2"><span className="h-4 w-4 rounded-sm bg-red-600" />Ocupada</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setMonth(startOfMonth(new Date()));
                    setArrival(undefined);
                    setDeparture(undefined);
                    setNotice("Toca una fecha disponible para elegir tu llegada.");
                  }}
                  className="rounded-full border border-forest-deep/15 px-4 py-2 text-xs font-semibold transition hover:bg-forest-deep/5"
                >
                  Hoy
                </button>
              </div>

              <div className="relative mt-4 flex justify-center">
                {loading && <div className="absolute inset-0 z-10 grid place-items-center rounded-2xl bg-white/70 text-sm font-medium backdrop-blur-[1px]">Actualizando agenda…</div>}
                <Calendar
                  mode="single"
                  locale={es}
                  month={month}
                  onMonthChange={setMonth}
                  onDayClick={onDayClick}
                  disabled={{ before: today }}
                  showOutsideDays={false}
                  modifiers={{
                    occupied: isOccupied,
                    chosen: isInSelection,
                    arrival: (date) => !!arrival && key(date) === key(arrival),
                    departure: (date) => !!departure && key(date) === key(departure),
                  }}
                  modifiersClassNames={{
                    occupied: "[&>button]:!bg-red-600 [&>button]:!text-white [&>button]:hover:!bg-red-700",
                    chosen: "[&>button]:ring-2 [&>button]:ring-forest-deep/45 [&>button]:ring-inset",
                    arrival: "[&>button]:font-bold",
                    departure: "[&>button]:font-bold",
                  }}
                  className="w-full max-w-2xl bg-white p-0 text-forest-deep [--cell-size:clamp(2.45rem,9vw,4.5rem)]"
                  classNames={{
                    root: "w-full",
                    month: "w-full",
                    today: "bg-transparent font-bold text-forest-deep",
                    outside: "text-forest-deep/25",
                    disabled: "text-forest-deep/25 opacity-40",
                    weekday: "text-forest-deep/45 flex-1 select-none rounded-md text-[0.72rem] font-semibold uppercase",
                  }}
                />
              </div>

              {error ? (
                <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
              ) : (
                <p className="mt-4 min-h-[1.5rem] text-center text-sm font-medium text-forest-deep/70">{notice}</p>
              )}

              <div className="mt-5 flex flex-col items-center gap-3 border-t border-forest-deep/10 pt-5">
                {arrival && departure && (
                  <p className="text-center text-base font-semibold">
                    {fmt(arrival)} → {fmt(departure)}
                  </p>
                )}
                <a
                  href={whatsappLink(selectedMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-turquoise px-6 py-3.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 sm:w-auto"
                >
                  <IconWhatsapp className="h-5 w-5" />
                  {arrival && departure ? "Consultar estas fechas por WhatsApp" : "Consultar Cabaña Cristal por WhatsApp"}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-forest-deep py-14 text-white md:py-20">
          <div className="container-x">
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-xs uppercase tracking-[0.25em] text-turquoise">La experiencia</p>
              <h2 className="mt-3 text-3xl md:text-4xl">Dormir junto al lago</h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/65 md:text-base">
                Dos paredes de cristal, baño privado y una vista directa a la laguna desde el interior.
              </p>
            </div>
            <div className="mx-auto mt-8 max-w-5xl">
              <PhotoGrid photos={featured} className="grid grid-cols-2 gap-3 md:grid-cols-4" aspect="aspect-[4/3]" />
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-2 text-sm text-white/80">
              {["2 personas", "Dos paredes de cristal", "Vista directa al lago", "Baño privado"].map((item) => (
                <span key={item} className="rounded-full border border-white/15 px-4 py-2">{item}</span>
              ))}
            </div>
            <div className="mt-8 text-center">
              <a href="/#cabana-cristal" className="inline-flex rounded-full border border-white/20 px-6 py-3 text-sm font-semibold transition hover:bg-white/10">
                Ver todas las fotos de la cabaña
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-forest-deep/10 bg-warm-white py-8">
        <div className="container-x flex flex-col gap-2 text-center text-xs text-forest-deep/55 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <span>© {new Date().getFullYear()} Cinco Lagos · Montebello, Chiapas</span>
          <span>WhatsApp: {SITE.phoneDisplay}</span>
        </div>
      </footer>
    </div>
  );
}
