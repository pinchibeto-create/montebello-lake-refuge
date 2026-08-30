import { useState, type FormEvent } from "react";

const SUPABASE_URL = "https://jybfyuaxcewbecmbaibu.supabase.co";
const SUPABASE_KEY = "sb_publishable_Lc90p_iA0gGGQKHW6PvADA_SvoEa975";

type LookupResult = {
  reservation: {
    code: string;
    guest_name: string | null;
    cabin: string;
    check_in: string;
    check_out: string;
    guests: number | null;
    payment_status: string;
  };
  pdf_url: string | null;
};

const payment: Record<string, string> = { pendiente: "Pendiente", anticipo: "Anticipo recibido", pagado: "Pagado" };

export function ReservationLookup() {
  const [code, setCode] = useState("");
  const [phone, setPhone] = useState("");
  const [result, setResult] = useState<LookupResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setLoading(true); setError(""); setResult(null);
    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/public-reservation-lookup`, {
        method: "POST",
        headers: { apikey: SUPABASE_KEY, "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim().toUpperCase(), phone }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "No pudimos consultar tu reservación.");
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "No pudimos consultar tu reservación.");
    } finally { setLoading(false); }
  }

  return <section id="mi-reserva" className="bg-warm-white py-20 text-forest-deep md:py-24">
    <div className="container-x">
      <div className="mx-auto max-w-3xl rounded-sm border border-forest-deep/10 bg-white p-6 shadow-sm md:p-10">
        <p className="text-xs uppercase tracking-[0.25em] text-turquoise">Tu estancia</p>
        <h2 className="mt-4 text-3xl leading-tight md:text-4xl">Ver mi reserva</h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-forest-deep/65">Ingresa el código de 5 caracteres de tu reservación y el teléfono con el que reservaste. Podrás comprobar tus fechas y volver a descargar tu confirmación.</p>

        <form onSubmit={submit} className="mt-7 grid gap-4 md:grid-cols-[1fr_1.4fr_auto] md:items-end">
          <label className="text-sm font-medium">Código de reserva
            <input required maxLength={5} value={code} onChange={e => setCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0,5))} placeholder="7K4MX" autoComplete="off" className="mt-2 w-full rounded-sm border border-forest-deep/20 bg-white px-4 py-3 font-mono text-lg font-bold uppercase tracking-[.18em] outline-none focus:border-turquoise" />
          </label>
          <label className="text-sm font-medium">Teléfono de la reservación
            <input required inputMode="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="961 123 4567" autoComplete="tel" className="mt-2 w-full rounded-sm border border-forest-deep/20 bg-white px-4 py-3 outline-none focus:border-turquoise" />
          </label>
          <button disabled={loading} className="rounded-full bg-forest-deep px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60">{loading ? "Buscando…" : "Ver reserva"}</button>
        </form>

        {error && <p role="alert" className="mt-5 rounded-sm bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

        {result && <div className="mt-7 border-t border-forest-deep/10 pt-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.18em] text-turquoise">Reservación confirmada</p>
              <p className="mt-2 font-mono text-2xl font-bold tracking-[.2em]">{result.reservation.code}</p>
              <p className="mt-3 text-lg font-semibold">{result.reservation.guest_name || "Huésped"}</p>
              <p className="mt-1 text-sm text-forest-deep/65">{result.reservation.cabin} · {result.reservation.check_in} → {result.reservation.check_out}</p>
              <p className="mt-1 text-sm text-forest-deep/65">{result.reservation.guests || "—"} huésped(es) · {payment[result.reservation.payment_status] || result.reservation.payment_status}</p>
            </div>
            {result.pdf_url ? <a href={result.pdf_url} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center justify-center rounded-full bg-turquoise px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90">Descargar PDF</a> : <p className="text-sm text-forest-deep/60">La confirmación PDF aún no está disponible.</p>}
          </div>
        </div>}
      </div>
    </div>
  </section>;
}
