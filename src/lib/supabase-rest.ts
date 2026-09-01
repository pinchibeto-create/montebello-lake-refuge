const SUPABASE_URL = "https://jybfyuaxcewbecmbaibu.supabase.co";
const SUPABASE_KEY = "sb_publishable_Lc90p_iA0gGGQKHW6PvADA_SvoEa975";

export type AuthSession = {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
  user: { id: string; email?: string };
};

const SESSION_KEY = "cinco-lagos-session";

export function getStoredSession(): AuthSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function storeSession(session: AuthSession | null) {
  if (typeof window === "undefined") return;
  if (session) window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  else window.localStorage.removeItem(SESSION_KEY);
}

export async function signIn(email: string, password: string): Promise<AuthSession> {
  const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: { apikey: SUPABASE_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data?.msg || data?.error_description || "No se pudo iniciar sesión");
  storeSession(data);
  return data;
}

export async function signUp(email: string, password: string): Promise<{ session: AuthSession | null; message: string }> {
  const normalized = email.trim().toLowerCase();
  const allowed = new Set([
    "ivlu001@hotmail.com",
    "garciafredi891@gmail.com",
    "omerog@hotmail.com",
    "alondra_5_7@hotmail.com",
  ]);
  if (!allowed.has(normalized)) throw new Error("Este correo no está autorizado para el panel de Cinco Lagos.");
  if (password.length < 8) throw new Error("La contraseña debe tener al menos 8 caracteres.");

  const response = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
    method: "POST",
    headers: { apikey: SUPABASE_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ email: normalized, password }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data?.msg || data?.error_description || data?.message || "No se pudo crear la cuenta");

  if (data?.access_token) {
    storeSession(data as AuthSession);
    return { session: data as AuthSession, message: "Cuenta creada correctamente." };
  }

  return { session: null, message: "Cuenta creada. Revisa tu correo y confirma tu dirección antes de iniciar sesión." };
}

export async function resendSignupConfirmation(email: string): Promise<void> {
  const normalized = email.trim().toLowerCase();
  if (!normalized) throw new Error("Escribe tu correo primero.");
  const response = await fetch(`${SUPABASE_URL}/auth/v1/resend`, {
    method: "POST",
    headers: { apikey: SUPABASE_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ type: "signup", email: normalized }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data?.msg || data?.error_description || data?.message || "No se pudo reenviar el correo de confirmación");
}

export async function requestPasswordReset(email: string): Promise<void> {
  const normalized = email.trim().toLowerCase();
  if (!normalized) throw new Error("Escribe tu correo primero.");
  const redirectTo = typeof window === "undefined" ? "https://cabanascincolagos.com/panel" : `${window.location.origin}/panel`;
  const response = await fetch(`${SUPABASE_URL}/auth/v1/recover?redirect_to=${encodeURIComponent(redirectTo)}`, {
    method: "POST",
    headers: { apikey: SUPABASE_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ email: normalized }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data?.msg || data?.error_description || data?.message || "No se pudo enviar el correo para restablecer la contraseña");
}

export function getRecoverySessionFromUrl(): AuthSession | null {
  if (typeof window === "undefined") return null;
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  if (hash.get("type") !== "recovery") return null;
  const access_token = hash.get("access_token");
  if (!access_token) return null;
  return {
    access_token,
    refresh_token: hash.get("refresh_token") || undefined,
    expires_in: Number(hash.get("expires_in") || 0) || undefined,
    user: { id: "recovery" },
  };
}

export async function updatePassword(accessToken: string, password: string): Promise<void> {
  if (password.length < 8) throw new Error("La contraseña debe tener al menos 8 caracteres.");
  const response = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    method: "PUT",
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data?.msg || data?.error_description || data?.message || "No se pudo actualizar la contraseña");
}

export function signOutLocal() {
  storeSession(null);
}

export async function rest<T>(path: string, session: AuthSession, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });

  if (response.status === 401) {
    signOutLocal();
    throw new Error("Tu sesión venció. Vuelve a iniciar sesión.");
  }

  if (!response.ok) {
    let message = "Error al consultar Supabase";
    try {
      const data = await response.json();
      message = data?.message || data?.details || message;
    } catch {}
    throw new Error(message);
  }

  if (response.status === 204) return undefined as T;
  const text = await response.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

export async function invokeFunction<T>(name: string, session: AuthSession, body: unknown): Promise<T> {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/${name}`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (response.status === 401) {
    signOutLocal();
    throw new Error("Tu sesión venció. Vuelve a iniciar sesión.");
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data?.error || data?.message || "No se pudo ejecutar la función");
  return data as T;
}
