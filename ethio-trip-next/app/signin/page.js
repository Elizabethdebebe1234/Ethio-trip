
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const [role, setRole] = useState("customer");
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function changeRole(nextRole) {
    setRole(nextRole);
    setError("");
    setMessage("");
    setMode("signin");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      if (role === "customer" && mode === "register") {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Could not create your account.");
          return;
        }

        setMessage(data.message || "Account created. Please sign in.");
        setMode("signin");
        setPassword("");
        return;
      }

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          role === "guide"
            ? { role, username, password }
            : { role, email, password }
        ),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Sign-in failed. Please try again.");
        return;
      }

      router.replace(data.redirectTo);
      router.refresh();
    } catch {
      setError("Could not connect. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <Link href="/" className="auth-brand">
          Ethio<span>Trip</span>
        </Link>

        <p className="auth-eyebrow">WELCOME TO YOUR JOURNEY</p>
        <h1>
          {role === "customer" && mode === "register"
            ? "Create your account"
            : "Sign in"}
        </h1>
        <p className="auth-description">
          {role === "guide"
            ? "Sign in to manage preparations for your guests."
            : "Access your travel plans and organize your Ethiopian adventure."}
        </p>

        <div className="auth-role-switch" aria-label="Account type">
          <button
            type="button"
            className={role === "customer" ? "selected" : ""}
            onClick={() => changeRole("customer")}
          >
            Customer
          </button>
          <button
            type="button"
            className={role === "guide" ? "selected" : ""}
            onClick={() => changeRole("guide")}
          >
            Trip guide
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {role === "guide" ? (
            <>
              <label htmlFor="username">Guide username</label>
              <input
                id="username"
                name="username"
                autoComplete="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />
            </>
          ) : (
            <>
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </>
          )}

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete={
              mode === "register" ? "new-password" : "current-password"
            }
            minLength={role === "customer" && mode === "register" ? 8 : undefined}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {error && (
            <p className="auth-error" role="alert">
              {error}
            </p>
          )}

          {message && (
            <p role="status" className="auth-description">
              {message}
            </p>
          )}

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading
              ? "Please wait..."
              : role === "guide"
                ? "Sign in as Trip guide"
                : mode === "register"
                  ? "Create account"
                  : "Sign in as Customer"}
          </button>
        </form>

        {role === "customer" && (
          <p className="auth-back">
            {mode === "signin" ? (
              <>
                New to Ethio-Trip?{" "}
                <button
                  type="button"
                  className="auth-mode-button"
                  onClick={() => {
                    setMode("register");
                    setError("");
                    setMessage("");
                  }}
                >
                  Create an account
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  className="auth-mode-button"
                  onClick={() => {
                    setMode("signin");
                    setError("");
                    setMessage("");
                  }}
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        )}

        <p className="auth-back">
          <Link href="/destinations">Explore destinations</Link>
        </p>
      </section>
    </main>
  );
}
