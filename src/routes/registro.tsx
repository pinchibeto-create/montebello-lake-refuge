import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { KeyRound, UserPlus } from "lucide-react";
import { signUp } from "../lib/supabase-rest";

export const Route = createFileRoute("/registro")({
  head: () => ({
    meta: [
      { title: "Crear acceso | Cinco Lagos" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: RegistroPage,
});

function RegistroPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    if (password !== confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    setLoading(true);
    try {
      const result = await signUp(email, password);
      setMessage(result.message);
      if (result.session) window.location.href = "/panel";
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo crear el acceso.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-[#f4f1ea] px-5 py-10 text-[#173c34]">
      <div className="w-full max-w-md rounded-3xl border border-[#173c34]/10 bg-white p-7 shadow-sm md:p-9">
        <div className="flex items-center gap-3">
          <img src="/images/logo/cinco-lagos-logo.jpeg" alt="Cinco Lagos" className="h-12 w-12 rounded-full object-cover" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1f8f7a]">Panel interno</p>
            <h1 className="text-2xl font-semibold">Crear acceso</h1>
          </div>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-[#173c34]/60">
          Registro exclusivo para las cuentas autorizadas de Cabañas Cinco Lagos. Cada persona elige su propia contraseña.
        </p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <label className="block text-sm font-medium">Correo
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" className="mt-1.5 w-full rounded-2xl border border-[#173c34]/15 px-4 py-3 outline-none focus:border-[#1f8f7a]" placeholder="correo@ejemplo.com" />
          </label>
          <label className="block text-sm font-medium">Contraseña
            <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" className="mt-1.5 w-full rounded-2xl border border-[#173c34]/15 px-4 py-3 outline-none focus:border-[#1f8f7a]" placeholder="Mínimo 8 caracteres" />
          </label>
          <label className="block text-sm font-medium">Repetir contraseña
            <input type="password" required minLength={8} value={confirm} onChange={(e) => setConfirm(e.target.value)} autoComplete="new-password" className="mt-1.5 w-full rounded-2xl border border-[#173c34]/15 px-4 py-3 outline-none focus:border-[#1f8f7a]" />
          </label>

          {error && <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</div>}
          {message && <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{message}</div>}

          <button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1f8f7a] px-5 py-3 font-semibold text-white transition hover:bg-[#187563] disabled:opacity-60">
            <UserPlus className="h-4 w-4" /> {loading ? "Creando…" : "Crear mi acceso"}
          </button>
        </form>

        <a href="/panel" className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-[#1f8f7a] hover:underline">
          <KeyRound className="h-4 w-4" /> Ya tengo cuenta: iniciar sesión
        </a>
      </div>
    </div>
  );
}
