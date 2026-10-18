
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const [role, setRole] = useState("customer");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, username, password }),
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
        <h1>Sign in</h1>
        <p className="auth-description">
          Access your travel plans or manage preparations for your guests.
        </p>

        <div className="auth-role-switch" aria-label="Account type">
          <button
            type="button"
            className={role === "customer" ? "selected" : ""}
            onClick={() => setRole("customer")}
          >
            Customer
          </button>
          <button
            type="button"
            className={role === "guide" ? "selected" : ""}
            onClick={() => setRole("guide")}
          >
            Trip guide
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            autoComplete="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete={
              role === "customer" ? "current-password" : "current-password"
            }
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {error && (
            <p className="auth-error" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : `Sign in as ${role === "guide" ? "Trip guide" : "Customer"}`}
          </button>
        </form>

        <p className="auth-back">
          New to Ethio-Trip?{" "}
          <Link href="/destinations">Explore destinations</Link>
        </p>
      </section>
    </main>
  );
}
