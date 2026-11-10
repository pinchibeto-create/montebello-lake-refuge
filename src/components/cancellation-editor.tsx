import { useState, type FormEvent } from "react";
import { X } from "lucide-react";
import { rest, type AuthSession } from "../lib/supabase-rest";

type Cancellation = { deposit_received: number; deposit_retained: number; deposit_refunded: number; note: string | null };
type Choice = "retained" | "refunded" | "partial" | "none" | "pending";
type Props = {
  session: AuthSession;
  reservation: { id: string; guest_name: string | null; reservation_code: string | null; paid_amount: number | null };
  previous?: Cancellation | null;
  onClose: () => void;
  onSaved: () => void | Promise<void>;
};
const money = (value: number) => new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", minimumFractionDigits: 2 }).format(value);

function initialChoice(v?: Cancellation | null): Choice {
  if (!v) return "pending";
  const received = Number(v.deposit_received);
  const retained = Number(v.deposit_retained);
  const refunded = Number(v.deposit_refunded);
  if (received === 0) return "none";
  if (retained === received) return "retained";
  if (refunded === received) return "refunded";
  if (retained > 0 && refunded > 0 && retained + refunded === received) return "partial";
  return "pending";
}

export default function CancellationEditor({ session, reservation, previous, onClose, onSaved }: Props) {
  const [received, setReceived] = useState(String(previous?.deposit_received ?? reservation.paid_amount ?? 0));
  const [choice, setChoice] = useState<Choice>(initialChoice(previous));
  const [partialRetained, setPartialRetained] = useState(String(previous?.deposit_retained ?? ""));
  const [note, setNote] = useState(previous?.note || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const deposit = Number(received);
  const part = Number(partialRetained);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    if (!Number.isFinite(deposit) || deposit < 0 || received.trim() === "") {
      setError("Escriba un anticipo recibido válido."); return;
    }
    if (choice === "none" && deposit !== 0) {
      setError("Para «Sin anticipo», el importe recibido debe ser $0."); return;
    }
    if ((choice === "retained" || choice === "refunded" || choice === "partial") && deposit <= 0) {
      setError("Indique primero cuánto dinero se recibió."); return;
    }
    if (choice === "partial" && (!Number.isFinite(part) || !(part > 0 && part < deposit))) {
      setError("El importe conservado debe ser mayor que cero y menor que el anticipo recibido."); return;
    }
    const retained = choice === "retained" ? deposit : choice === "partial" ? part : 0;
    const refunded = choice === "refunded" ? deposit : choice === "partial" ? deposit - part : 0;
    if (!window.confirm("¿Confirmar la cancelación y el registro financiero? La cabaña quedará disponible, pero el historial de reserva y sus importes se conservarán.")) return;
    setSaving(true);
    try {
      await rest<void>("rpc/register_cinco_lagos_cancellation", session, {
        method: "POST", body: JSON.stringify({
          p_reservation_id: reservation.id,
          p_deposit_received: deposit,
          p_deposit_retained: retained,
          p_deposit_refunded: refunded,
          p_note: note.trim() || null,
        }),
      });
      await onSaved();
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo registrar la cancelación.");
    } finally { setSaving(false); }
  }

  return <div className="fixed inset-0 z-[160] grid place-items-center bg-black/60 p-4">
    <form onSubmit={submit} className="max-h-[93vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white p-6 text-[#173c34] shadow-xl">
      <div className="flex items-start justify-between gap-3">
        <div><p className="text-xs font-bold uppercase tracking-widest text-[#1f8f7a]">Historial y depósito</p>
          <h2 className="mt-2 text-2xl font-bold">{previous ? "Aclarar dinero de cancelación" : "Cancelar reservación"}</h2>
          <p className="mt-1 text-sm text-[#173c34]/70">{reservation.guest_name || "Reservación"} · #{reservation.reservation_code || "Sin código"}</p>
        </div>
        <button type="button" onClick={onClose} className="rounded-xl border p-2" aria-label="Cerrar"><X size={18}/></button>
      </div>
      <p className="mt-5 rounded-xl bg-[#eaf6f1] p-3 text-sm">La cancelación libera las fechas, pero conserva la ficha original para rendición de cuentas. El anticipo registrado en la reserva era de {money(Number(reservation.paid_amount || 0))}.</p>
      <label className="mt-5 block text-sm font-semibold">Anticipo realmente recibido (MXN)
        <input type="number" min="0" step="0.01" value={received} onChange={e => setReceived(e.target.value)} className="mt-2 w-full rounded-xl border p-3" required />
      </label>
      <label className="mt-4 block text-sm font-semibold">¿Qué pasó con ese dinero?
        <select value={choice} onChange={e => setChoice(e.target.value as Choice)} className="mt-2 w-full rounded-xl border bg-white p-3">
          <option value="pending">Pendiente de aclaración</option>
          <option value="retained">Se conservó todo el anticipo</option>
          <option value="refunded">Se devolvió todo el anticipo</option>
          <option value="partial">Se conservó una parte y se devolvió otra</option>
          <option value="none">No se recibió ningún anticipo</option>
        </select>
      </label>
      {choice === "partial" && <label className="mt-4 block text-sm font-semibold">Importe que se conservó
        <input type="number" min="0.01" step="0.01" value={partialRetained} onChange={e => setPartialRetained(e.target.value)} className="mt-2 w-full rounded-xl border p-3" required />
        <span className="mt-1 block text-xs font-normal text-[#173c34]/65">Importe a devolver / devuelto: {Number.isFinite(deposit - part) ? money(Math.max(0, deposit - part)) : "—"}</span>
      </label>}
      <label className="mt-4 block text-sm font-semibold">Motivo / aclaración (opcional)
        <textarea value={note} onChange={e => setNote(e.target.value)} rows={3} placeholder="Ej.: canceló fuera de plazo y se conservó el anticipo." className="mt-2 w-full rounded-xl border p-3"/>
      </label>
      {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <div className="mt-6 flex flex-wrap justify-end gap-3"><button type="button" onClick={onClose} className="rounded-xl border px-5 py-3 text-sm font-semibold">Volver</button>
        <button type="submit" disabled={saving} className="rounded-xl bg-[#176957] px-5 py-3 text-sm font-semibold text-white disabled:opacity-50">{saving ? "Guardando..." : previous ? "Guardar aclaración" : "Confirmar cancelación"}</button></div>
    </form>
  </div>;
}
