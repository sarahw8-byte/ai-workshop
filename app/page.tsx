"use client";

import { FormEvent, useEffect, useState } from "react";
import { AuthError, Session, loadSession, logIn, logOut, signUp } from "./auth";

type Mode = "login" | "signup";

const MIN_PASSWORD = 8;

function friendlyError(err: unknown, mode: Mode): string {
  if (err instanceof AuthError) {
    if (err.code === "invalid_credentials" || err.code === "invalid_grant") {
      return "Wrong email or password";
    }
    if (err.code === "user_already_exists") {
      return "An account with that email already exists. Try Log in.";
    }
    return err.message;
  }
  return mode === "login" ? "Could not log in. Try again." : "Could not sign up. Try again.";
}

export default function Home() {
  const [session, setSession] = useState<Session | null>(null);
  const [checking, setChecking] = useState(true);
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    loadSession().then((s) => {
      setSession(s);
      setChecking(false);
    });
  }, []);

  function chooseMode(next: Mode) {
    setMode(next);
    setError("");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (mode === "signup" && password.length < MIN_PASSWORD) {
      setError(`Password must be at least ${MIN_PASSWORD} characters.`);
      return;
    }
    setBusy(true);
    try {
      const s = mode === "signup" ? await signUp(email, password) : await logIn(email, password);
      setSession(s);
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(friendlyError(err, mode));
    } finally {
      setBusy(false);
    }
  }

  async function handleLogOut() {
    if (!session) return;
    const old = session;
    setSession(null);
    setEmail("");
    setPassword("");
    setError("");
    setMode("login");
    await logOut(old);
  }

  return (
    <main className="auth">
      <h1>Study Tasks</h1>

      {checking ? (
        <p className="muted">Loading…</p>
      ) : session ? (
        <section className="card">
          <p>Signed in as {session.email}</p>
          <button type="button" onClick={handleLogOut}>
            Log out
          </button>
        </section>
      ) : (
        <section className="card">
          <div className="mode-buttons">
            <button
              type="button"
              className={mode === "login" ? "active" : ""}
              aria-pressed={mode === "login"}
              onClick={() => chooseMode("login")}
            >
              Log in
            </button>
            <button
              type="button"
              className={mode === "signup" ? "active" : ""}
              aria-pressed={mode === "signup"}
              onClick={() => chooseMode("signup")}
            >
              Sign up
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <label>
              Email
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              Password
              <input
                type="password"
                required
                minLength={mode === "signup" ? MIN_PASSWORD : undefined}
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            {mode === "signup" && (
              <p className="muted">At least {MIN_PASSWORD} characters.</p>
            )}
            {error && (
              <p className="error" role="alert">
                {error}
              </p>
            )}
            <button type="submit" disabled={busy}>
              {busy ? "Please wait…" : "Submit"}
            </button>
          </form>
        </section>
      )}
    </main>
  );
}
