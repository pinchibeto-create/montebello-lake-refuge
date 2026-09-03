const SUPABASE_URL = "https://jybfyuaxcewbecmbaibu.supabase.co";
const SUPABASE_KEY = "sb_publishable_Lc90p_iA0gGGQKHW6PvADA_SvoEa975";
const AUTH_REDIRECT_URL = "https://cabanascincolagos.com/panel";

export type AuthSession = {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
  expires_at?: number;
  user: { id: string; email?: string };
};

const SESSION_KEY = "cinco-lagos-session";
const REQUEST_TIMEOUT_MS = 12000;

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

async function fetchWithTimeout(url: string, init: RequestInit = {}, timeoutMs = REQUEST_TIMEOUT_MS): Promise<Response> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("La conexión tardó demasiado. Intenta recargar el panel.");
    }
    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
}

async function refreshSession(session: AuthSession): Promise<AuthSession | null> {
  if (!session.refresh_token) return null;
  try {
    const response = await fetchWithTimeout(`${SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`, {
      method: "POST",
      headers: { apikey: SUPABASE_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: session.refresh_token }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data?.access_token) return null;
    const refreshed = data as AuthSession;
    Object.assign(session, refreshed);
    storeSession(session);
    return session;
  } catch {
    return null;
  }
}

export async function signIn(email: string, password: string): Promise<AuthSession> {
  const response = await fetchWithTimeout(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
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
    "pinchibeto@gmail.com",
    "garciafredi891@gmail.com",
    "omerog@hotmail.com",
    "alondra_5_7@hotmail.com",
  ]);
  if (!allowed.has(normalized)) throw new Error("Este correo no está autorizado para el panel de Cinco Lagos.");
  if (password.length < 8) throw new Error("La contraseña debe tener al menos 8 caracteres.");

  const response = await fetchWithTimeout(`${SUPABASE_URL}/auth/v1/signup?redirect_to=${encodeURIComponent(AUTH_REDIRECT_URL)}`, {
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
  const response = await fetchWithTimeout(`${SUPABASE_URL}/auth/v1/resend?redirect_to=${encodeURIComponent(AUTH_REDIRECT_URL)}`, {
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
  const response = await fetchWithTimeout(`${SUPABASE_URL}/auth/v1/recover?redirect_to=${encodeURIComponent(AUTH_REDIRECT_URL)}`, {
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
  const response = await fetchWithTimeout(`${SUPABASE_URL}/auth/v1/user`, {
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

async function authorizedFetch(url: string, session: AuthSession, init: RequestInit = {}, retry = true): Promise<Response> {
  const response = await fetchWithTimeout(url, {
    ...init,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });

  if (response.status === 401 && retry) {
    const refreshed = await refreshSession(session);
    if (refreshed) return authorizedFetch(url, refreshed, init, false);
  }
  return response;
}

export async function rest<T>(path: string, session: AuthSession, init: RequestInit = {}): Promise<T> {
  const response = await authorizedFetch(`${SUPABASE_URL}/rest/v1/${path}`, session, init);

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
  const response = await authorizedFetch(`${SUPABASE_URL}/functions/v1/${name}`, session, {
    method: "POST",
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