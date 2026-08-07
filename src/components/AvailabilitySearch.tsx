import * as React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { availabilityWhatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";
import {
  IconCabin,
  IconCalendar,
  IconMinus,
  IconPlus,
  IconUsers,
  IconWhatsapp,
} from "@/components/Icons";

type CabinOption = { id: string; label: string; max: number };

const CABIN_OPTIONS: CabinOption[] = [
  { id: "cabanas-pequenas", label: "Cabañas pequeñas", max: 5 },
  { id: "cabana-cristal", label: "Cabaña de cristal", max: 2 },
  { id: "cabana-grande", label: "Cabaña grande", max: 8 },
  { id: "cabana-mayor", label: "Cabaña mayor", max: 8 },
];

const startOfToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

const fmt = (d: Date) => format(d, "d 'de' MMMM yyyy", { locale: es });

function FieldShell({
  icon,
  label,
  children,
  error,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div className="min-w-0 flex-1">
      <div
        className={cn(
          "rounded-2xl bg-warm-white px-4 py-3 text-forest-deep shadow-sm ring-1 ring-forest-deep/10 transition focus-within:ring-2 focus-within:ring-turquoise",
          error && "ring-2 ring-destructive",
        )}
      >
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-forest-deep/60">
          <span className="shrink-0 text-forest-deep/70">{icon}</span>
          {label}
        </div>
        <div className="mt-1">{children}</div>
      </div>
      {error ? (
        <p className="mt-1.5 px-1 text-xs text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const valueClass =
  "w-full truncate bg-transparent text-left text-[15px] font-medium text-forest-deep outline-none";
const placeholderClass = "text-forest-deep/45";

export function AvailabilitySearch({
  variant = "section",
  className,
}: {
  variant?: "hero" | "section";
  className?: string;
}) {
  const [arrival, setArrival] = React.useState<Date | undefined>();
  const [departure, setDeparture] = React.useState<Date | undefined>();
  const [cabinId, setCabinId] = React.useState<string>("");
  const [guests, setGuests] = React.useState<number>(1);
  const [notice, setNotice] = React.useState<string>("");
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [openArrival, setOpenArrival] = React.useState(false);
  const [openDeparture, setOpenDeparture] = React.useState(false);

  const cabin = CABIN_OPTIONS.find((c) => c.id === cabinId);
  const maxGuests = cabin?.max ?? 8;

  const handleCabinChange = (id: string) => {
    setCabinId(id);
    const next = CABIN_OPTIONS.find((c) => c.id === id);
    setErrors((e) => ({ ...e, cabin: "", guests: "" }));
    if (next && guests > next.max) {
      setGuests(next.max);
      setNotice(`Esta cabaña permite hasta ${next.max} personas.`);
    } else {
      setNotice("");
    }
  };

  const changeGuests = (delta: number) => {
    const next = guests + delta;
    if (next < 1) return;
    if (next > maxGuests) {
      setNotice(`Esta cabaña permite hasta ${maxGuests} personas.`);
      return;
    }
    setNotice("");
    setGuests(next);
    setErrors((e) => ({ ...e, guests: "" }));
  };

  const submit = () => {
    const next: Record<string, string> = {};
    if (!arrival) next.arrival = "Selecciona tu fecha de llegada.";
    if (!departure) next.departure = "Selecciona tu fecha de salida.";
    if (!cabin) next.cabin = "Selecciona el tipo de cabaña.";
    if (!guests || guests < 1) next.guests = "Indica cuántas personas se hospedarán.";
    if (arrival && departure && departure.getTime() <= arrival.getTime()) {
      next.departure = "Selecciona una fecha de salida posterior a la llegada.";
    }
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    window.open(
      availabilityWhatsappLink({
        arrival: fmt(arrival!),
        departure: fmt(departure!),
        cabin: cabin!.label,
        guests,
      }),
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <section
      aria-labelledby={`disponibilidad-${variant}`}
      className={cn(
        "rounded-3xl bg-forest-deep/95 p-5 shadow-2xl ring-1 ring-warm-white/12 backdrop-blur md:p-7",
        className,
      )}
    >
      <header className="max-w-2xl">
        <h2
          id={`disponibilidad-${variant}`}
          className="text-2xl leading-tight md:text-3xl"
        >
          Consulta disponibilidad
        </h2>
        <p className="mt-2 text-sm text-muted-foreground md:text-base">
          Elige tu fecha, cabaña y número de personas. Te responderemos por
          WhatsApp.
        </p>
      </header>

      <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-start lg:gap-2.5">
        {/* Llegada */}
        <FieldShell
          icon={<IconCalendar className="h-4 w-4" />}
          label="Fecha de llegada"
          error={errors.arrival}
        >
          <Popover open={openArrival} onOpenChange={setOpenArrival}>
            <PopoverTrigger asChild>
              <button type="button" className={valueClass}>
                <span className={arrival ? "" : placeholderClass}>
                  {arrival ? fmt(arrival) : "Agregar fecha"}
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="w-auto border-forest-deep/10 bg-warm-white p-0 text-forest-deep"
            >
              <Calendar
                mode="single"
                locale={es}
                selected={arrival}
                onSelect={(d) => {
                  setArrival(d);
                  setErrors((e) => ({ ...e, arrival: "" }));
                  if (d && departure && departure.getTime() <= d.getTime()) {
                    setDeparture(undefined);
                  }
                  setOpenArrival(false);
                }}
                disabled={{ before: startOfToday() }}
                className="pointer-events-auto p-3"
              />
            </PopoverContent>
          </Popover>
        </FieldShell>

        {/* Salida */}
        <FieldShell
          icon={<IconCalendar className="h-4 w-4" />}
          label="Fecha de salida"
          error={errors.departure}
        >
          <Popover open={openDeparture} onOpenChange={setOpenDeparture}>
            <PopoverTrigger asChild>
              <button type="button" className={valueClass}>
                <span className={departure ? "" : placeholderClass}>
                  {departure ? fmt(departure) : "Agregar fecha"}
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="w-auto border-forest-deep/10 bg-warm-white p-0 text-forest-deep"
            >
              <Calendar
                mode="single"
                locale={es}
                selected={departure}
                onSelect={(d) => {
                  setDeparture(d);
                  setErrors((e) => ({ ...e, departure: "" }));
                  setOpenDeparture(false);
                }}
                disabled={{
                  before: arrival
                    ? new Date(arrival.getTime() + 86400000)
                    : startOfToday(),
                }}
                className="pointer-events-auto p-3"
              />
            </PopoverContent>
          </Popover>
        </FieldShell>

        {/* Cabaña */}
        <FieldShell
          icon={<IconCabin className="h-4 w-4" />}
          label="Tipo de cabaña"
          error={errors.cabin}
>
          <Select value={cabinId} onValueChange={handleCabinChange}>
            <SelectTrigger className="h-auto w-full border-0 bg-transparent p-0 text-[15px] font-medium text-forest-deep shadow-none focus:ring-0 data-[placeholder]:text-forest-deep/45">
              <SelectValue placeholder="Elegir cabaña" />
            </SelectTrigger>
            <SelectContent className="border-forest-deep/10 bg-warm-white text-forest-deep">
              {CABIN_OPTIONS.map((c) => (
                <SelectItem key={c.id} value={c.id} className="focus:bg-forest-deep/8">
                  {c.label} — {c.max === 2 ? "2 personas" : `hasta ${c.max} personas`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FieldShell>

        {/* Personas */}
        <FieldShell
          icon={<IconUsers className="h-4 w-4" />}
          label="Personas"
          error={errors.guests}
        >
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => changeGuests(-1)}
              disabled={guests <= 1}
              aria-label="Quitar una persona"
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-forest-deep/8 text-forest-deep transition hover:bg-forest-deep/15 disabled:opacity-35"
            >
              <IconMinus className="h-3.5 w-3.5" />
            </button>
            <span className="text-[15px] font-semibold text-forest-deep">{guests}</span>
            <button
              type="button"
              onClick={() => changeGuests(1)}
              disabled={guests >= maxGuests}
              aria-label="Agregar una persona"
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-forest-deep/8 text-forest-deep transition hover:bg-forest-deep/15 disabled:opacity-35"
            >
              <IconPlus className="h-3.5 w-3.5" />
            </button>
          </div>
        </FieldShell>

        <button
          type="button"
          onClick={submit}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-turquoise px-6 py-4 text-sm font-semibold text-primary-foreground shadow-lg transition hover:opacity-90 lg:w-auto lg:self-stretch lg:py-0"
        >
          <IconWhatsapp className="h-5 w-5" />
          <span className="lg:max-w-[9rem] lg:text-left">
            Checar disponibilidad por WhatsApp
          </span>
        </button>
      </div>

      <p aria-live="polite" className="mt-3 min-h-[1.25rem] text-xs text-turquoise">
        {notice}
      </p>
      <p className="text-xs text-muted-foreground">
        La disponibilidad se confirma directamente por WhatsApp. Servicios
        sujetos a disponibilidad.
      </p>
    </section>
  );
}
