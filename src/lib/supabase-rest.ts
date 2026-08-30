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
  const allowed = new Set(["ivlu001@hotmail.com", "fredy@gmail.com", "omerog@hotmail.com"]);
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
