
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [session, setSession] = useState(null);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const isActive = (href) => pathname === href;

  useEffect(() => {
    let cancelled = false;

    async function checkSession() {
      try {
        const response = await fetch("/api/auth/session", {
          cache: "no-store",
        });
        const data = await response.json();

        if (!cancelled) {
          setSession(data.authenticated ? { role: data.role } : null);
        }
      } catch {
        if (!cancelled) setSession(null);
      } finally {
        if (!cancelled) setSessionChecked(true);
      }
    }

    checkSession();

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  async function handleSignOut() {
    setSigningOut(true);

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Sign out failed");
      }

      setSession(null);
      router.replace("/signin");
      router.refresh();
    } catch {
      window.alert("Unable to sign out. Please try again.");
    } finally {
      setSigningOut(false);
    }
  }

  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="Ethio-Trip home">
        <span className="brand-mark" aria-hidden="true">E</span>
        <span>
          Ethio<span className="brand-accent">Trip</span>
          <small>YOUR ETHIOPIAN JOURNEY</small>
        </span>
      </Link>

      <nav className="main-nav" aria-label="Main navigation">
        <Link
          href="/"
          className={`nav-link ${isActive("/") ? "active" : ""}`}
        >
          Home
        </Link>

        <Link
          href="/destinations"
          className={`nav-link ${
            pathname.startsWith("/destinations") ? "active" : ""
          }`}
        >
          Destinations
        </Link>

        <Link href="/#experiences" className="nav-link">
          Experiences
        </Link>

        
<Link
  href="/trip-updates"
  className={`nav-link ${
    isActive("/trip-updates") ? "active" : ""
  }`}
>
  Trip Updates
</Link>


        <Link
          href="/hotels"
          className={`nav-link ${isActive("/hotels") ? "active" : ""}`}
        >
          Stays
        </Link>
      </nav>

      <div className="header-actions">
        {sessionChecked && session ? (
          <>
            <Link
              href={session.role === "guide" ? "/guide" : "/customer"}
              className="header-signin"
            >
              My {session.role === "guide" ? "Guide Dashboard" : "Account"}
            </Link>

            <button
              type="button"
              className="header-signin"
              onClick={handleSignOut}
              disabled={signingOut}
            >
              {signingOut ? "Signing out..." : "Sign out"}
            </button>
          </>
        ) : sessionChecked ? (
          <Link href="/signin" className="header-signin">
            Sign in
          </Link>
        ) : null}

        <Link href="/itinerary" className="header-cta">
          Plan your trip <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </header>
  );
}
