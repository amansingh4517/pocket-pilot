import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { api, signIn, signOut, token } from "./api";
import { Workspace } from "./workspace";
import "./style.css";

import { Brand } from "./Brand";

function Access({ onLogin, notice }) {
  const [register, mode] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function submit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    data.email = data.email.trim().toLowerCase();
    if (register) data.name = data.name.trim();
    setBusy(true);
    setError("");
    try {
      const user = await api("auth/" + (register ? "register" : "login"), {
        method: "POST",
        body: data,
      });
      signIn(user.token);
      onLogin(user);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="access">
      <aside className="cover">
        <Brand />
        <div className="cover-copy">
          <p className="eyebrow">Student finance tracker</p>
          <h1>
            Where did my
            <br />
            <em>money go?</em>
          </h1>
          <p>Track your pocket money and see which purchases felt worth it.</p>
        </div>
        <div className="art" aria-hidden="true">
          <div className="note">
            <b>Pocket money</b>
            <span>✦</span>
          </div>
          <div className="wallet">
            <i />
            <strong>p.</strong>
          </div>
        </div>
      </aside>
      <section className="access-form">
        <div>
          <p className="eyebrow">Your account</p>
          <h2>{register ? "Create an account" : "Welcome back"}</h2>
          <p>
            {register
              ? "Start your personal spending journal."
              : "Sign in to your spending journal."}
          </p>
          <form key={register} onSubmit={submit}>
            {register && (
              <label>
                Name
                <input
                  name="name"
                  autoComplete="name"
                  required
                  minLength="2"
                  maxLength="20"
                />
              </label>
            )}
            <label>
              Email address
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                name="password"
                placeholder={
                  register ? "At least 6 characters" : "Enter your password"
                }
                minLength={register ? 6 : undefined}
                autoComplete={register ? "new-password" : "current-password"}
                required
              />
            </label>
            {(error || notice) && <p role="alert">{error || notice}</p>}
            <button disabled={busy}>
              {busy ? "Please wait…" : register ? "Create account" : "Sign in"}
            </button>
          </form>
          <p className="switch">
            {register ? "Already registered? " : "New to PocketPilot? "}
            <button
              className="link"
              disabled={busy}
              onClick={() => {
                mode(!register);
                setError("");
              }}
            >
              {register ? "Sign in" : "Create an account"}
            </button>
          </p>
        </div>
      </section>
    </main>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(Boolean(token()));
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  useEffect(() => {
    function expired() {
      setUser(null);
      setNotice("Your session expired. Please sign in again.");
    }
    window.addEventListener("session-expired", expired);
    return () => window.removeEventListener("session-expired", expired);
  }, []);
  useEffect(() => {
    if (!checking) return;
    api("auth/me")
      .then(setUser)
      .catch((e) => {
        if (token()) setError(e.message);
      })
      .finally(() => setChecking(false));
  }, [checking]);
  if (checking || error)
    return (
      <main className="status">
        <Brand />
        <p role="status">{error || "Opening your journal…"}</p>
        {error && (
          <button
            onClick={() => {
              setError("");
              setChecking(true);
            }}
          >
            Retry
          </button>
        )}
      </main>
    );
  return user ? (
    <Workspace
      user={user}
      onLogout={() => {
        signOut();
        setNotice("");
        setUser(null);
      }}
    />
  ) : (
    <Access notice={notice} onLogin={setUser} />
  );
}

createRoot(document.getElementById("root")).render(<App />);
