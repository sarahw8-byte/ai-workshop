// Talks to Supabase's sign-in service directly over the web, using plain
// fetch calls, so the site does not need an extra library for slice 1.
// The signed-in session is kept in the browser's localStorage, which is
// what lets a person close the tab and still be signed in when they return.

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";
const STORAGE_KEY = "study-tasks-session";

export type Session = {
  accessToken: string;
  refreshToken: string;
  expiresAt: number; // seconds since 1970, when the access token stops working
  email: string;
};

export class AuthError extends Error {
  constructor(
    message: string,
    public code: string,
  ) {
    super(message);
  }
}

type TokenResponse = {
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
  expires_at?: number;
  user?: { email?: string };
  error_code?: string;
  error?: string;
  msg?: string;
  error_description?: string;
};

async function callAuth(
  path: string,
  body: object,
  accessToken?: string,
): Promise<TokenResponse> {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new AuthError("The site is missing its Supabase settings.", "config");
  }
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    apikey: SUPABASE_KEY,
  };
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`;

  let res: Response;
  try {
    res = await fetch(`${SUPABASE_URL}/auth/v1/${path}`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
  } catch {
    throw new AuthError("Could not reach the server. Try again.", "network");
  }

  const data: TokenResponse = await res.json().catch(() => ({}));
  if (!res.ok) {
    const code = data.error_code ?? data.error ?? "unknown";
    const message = data.msg ?? data.error_description ?? "Something went wrong.";
    throw new AuthError(message, code);
  }
  return data;
}

function toSession(data: TokenResponse, fallbackEmail = ""): Session {
  if (!data.access_token || !data.refresh_token) {
    throw new AuthError("Sign-in did not return a session.", "no_session");
  }
  const expiresAt =
    data.expires_at ?? Math.floor(Date.now() / 1000) + (data.expires_in ?? 3600);
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt,
    email: data.user?.email ?? fallbackEmail,
  };
}

function save(session: Session) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

function clear() {
  window.localStorage.removeItem(STORAGE_KEY);
}

export async function signUp(email: string, password: string) {
  const data = await callAuth("signup", { email, password });
  const session = toSession(data, email);
  save(session);
  return session;
}

export async function logIn(email: string, password: string) {
  const data = await callAuth("token?grant_type=password", { email, password });
  const session = toSession(data, email);
  save(session);
  return session;
}

export async function logOut(session: Session) {
  clear();
  // Tell Supabase too, so the old session cannot be reused. If this fails,
  // the person is still logged out on this device.
  await callAuth("logout", {}, session.accessToken).catch(() => {});
}

// Called when the page opens. Returns the saved session, refreshing it first
// if its access token has expired, or null if nobody is signed in.
export async function loadSession(): Promise<Session | null> {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  let saved: Session;
  try {
    saved = JSON.parse(raw);
  } catch {
    clear();
    return null;
  }

  const now = Math.floor(Date.now() / 1000);
  if (saved.expiresAt - 60 > now) return saved;

  try {
    const data = await callAuth("token?grant_type=refresh_token", {
      refresh_token: saved.refreshToken,
    });
    const session = toSession(data, saved.email);
    save(session);
    return session;
  } catch (err) {
    // Only forget the session if Supabase rejected it, not if the network
    // is down for a moment.
    if (!(err instanceof AuthError && err.code === "network")) clear();
    return null;
  }
}
