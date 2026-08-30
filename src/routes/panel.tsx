import { createFileRoute } from "@tanstack/react-router";
import {
  BedDouble,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  LogOut,
  Plus,
  Settings,
} from "lucide-react";

export const Route = createFileRoute("/panel")({
  head: () => ({
    meta: [
      { title: "Panel de reservaciones | Cinco Lagos" },
      {
        name: "description",
        content: "Panel interno de ocupación y reservaciones de Cabañas Cinco Lagos.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: PanelPage,
});

type CabinStatus = {
  name: string;
  status: "Disponible" | "Ocupada";
  source?: "Airbnb" | "Booking" | "Redes" | "Local";
  guest?: string;
  until?: string;
};

const cabins: CabinStatus[] = [
  {
    name: "Pequeña 1",
    status: "Ocupada",
    source: "Airbnb",
    guest: "Reservación externa",
    until: "31 ago",
  },
  {
    name: "Pequeña 2",
    status: "Ocupada",
    source: "Booking",
    guest: "Reservación externa",
    until: "30 ago",
  },
  { name: "Pequeña 3", status: "Disponible" },
  { name: "Pequeña 4", status: "Disponible" },
  { name: "Cristal", status: "Disponible" },
  {
    name: "Grande",
    status: "Ocupada",
    source: "Local",
    guest: "Huésped local",
    until: "1 sep",
  },
  { name: "Mayor", status: "Disponible" },
];

const sourceStyles: Record<NonNullable<CabinStatus["source"]>, string> = {
  Airbnb: "bg-rose-100 text-rose-800",
  Booking: "bg-blue-100 text-blue-800",
  Redes: "bg-violet-100 text-violet-800",
  Local: "bg-amber-100 text-amber-900",
};

function PanelPage() {
  const occupied = cabins.filter((c) => c.status === "Ocupada").length;
  const available = cabins.length - occupied;

  return (
    <div className="min-h-screen bg-[#f4f1ea] text-[#173c34]">
      <header className="border-b border-[#173c34]/10 bg-[#123d34] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <img
              src="/images/logo/cinco-lagos-logo.jpeg"
              alt="Cinco Lagos"
              className="h-11 w-11 rounded-full object-cover ring-1 ring-white/20"
            />
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-white/60">Panel interno</p>
              <h1 className="text-lg font-semibold">Cinco Lagos</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="hidden items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white/90 transition hover:bg-white/10 sm:flex"
            >
              <CircleUserRound className="h-4 w-4" />
              Alberto
            </button>
            <button
              type="button"
              aria-label="Configuración"
              className="rounded-full p-2.5 text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <Settings className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Cerrar sesión"
              className="rounded-full p-2.5 text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-7 md:px-8 md:py-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-[#2f7668]">Sábado, 29 de agosto de 2026</p>
            <h2 className="mt-1 text-3xl font-semibold tracking-tight md:text-4xl">
              Ocupación de cabañas
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-[#173c34]/60 md:text-base">
              Vista operativa de las siete unidades. Los datos mostrados aquí son de demostración
              mientras conectamos el panel con Supabase.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1f8f7a] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#187563]"
          >
            <Plus className="h-4 w-4" />
            Nueva reservación
          </button>
        </div>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <MetricCard label="Ocupadas" value={`${occupied} / ${cabins.length}`} detail="Cabañas con huésped" />
          <MetricCard label="Disponibles" value={`${available} / ${cabins.length}`} detail="Listas para reservar" />
          <MetricCard label="Llegadas hoy" value="0" detail="Pendiente de conectar" />
        </section>

        <section className="mt-8 overflow-hidden rounded-3xl border border-[#173c34]/10 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-[#173c34]/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between md:px-7">
            <div className="flex items-center gap-3">
              <CalendarDays className="h-5 w-5 text-[#1f8f7a]" />
              <div>
                <h3 className="font-semibold">Estado actual</h3>
                <p className="text-xs text-[#173c34]/50">29 de agosto de 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Día anterior"
                className="rounded-xl border border-[#173c34]/10 p-2 transition hover:bg-[#f4f1ea]"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="rounded-xl border border-[#173c34]/10 px-4 py-2 text-sm font-medium transition hover:bg-[#f4f1ea]"
              >
                Hoy
              </button>
              <button
                type="button"
                aria-label="Día siguiente"
                className="rounded-xl border border-[#173c34]/10 p-2 transition hover:bg-[#f4f1ea]"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="divide-y divide-[#173c34]/8">
            {cabins.map((cabin) => (
              <div
                key={cabin.name}
                className="grid gap-3 px-5 py-4 transition hover:bg-[#f8f6f1] sm:grid-cols-[180px_140px_1fr_auto] sm:items-center md:px-7"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#e6f0ec] text-[#176a5a]">
                    <BedDouble className="h-4 w-4" />
                  </span>
                  <span className="font-semibold">{cabin.name}</span>
                </div>

                <div>
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      cabin.status === "Disponible"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {cabin.status}
                  </span>
                </div>

                <div className="min-w-0">
                  {cabin.status === "Ocupada" ? (
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                      {cabin.source ? (
                        <span className={`rounded-md px-2 py-1 text-xs font-semibold ${sourceStyles[cabin.source]}`}>
                          {cabin.source}
                        </span>
                      ) : null}
                      <span className="truncate text-[#173c34]/70">{cabin.guest}</span>
                    </div>
                  ) : (
                    <span className="text-sm text-[#173c34]/45">Sin reservación activa</span>
                  )}
                </div>

                <div className="text-sm font-medium text-[#173c34]/60">
                  {cabin.until ? `Hasta ${cabin.until}` : "—"}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-dashed border-[#1f8f7a]/35 bg-[#e9f3ef] p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1f8f7a]">Siguiente conexión</p>
          <h3 className="mt-2 text-xl font-semibold">Supabase + autenticación</h3>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#173c34]/65">
            Este primer panel está aislado de la página pública. El siguiente paso es sustituir los
            datos de demostración por las siete cabañas reales, reservaciones y usuarios del cliente
            Cinco Lagos dentro del Supabase compartido.
          </p>
        </section>
      </main>
    </div>
  );
}

function MetricCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <article className="rounded-3xl border border-[#173c34]/10 bg-white p-5 shadow-sm md:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#173c34]/45">{label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-tight">{value}</p>
      <p className="mt-1 text-sm text-[#173c34]/50">{detail}</p>
    </article>
  );
}
