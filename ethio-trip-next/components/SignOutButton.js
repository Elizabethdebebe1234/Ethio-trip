
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    setLoading(true);

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Sign out failed");
      }

      router.replace("/signin");
      router.refresh();
    } catch {
      setLoading(false);
      window.alert("Unable to sign out. Please try again.");
    }
  }

  return (
    <button
      type="button"
      className="auth-submit"
      onClick={handleSignOut}
      disabled={loading}
    >
      {loading ? "Signing out..." : "Sign out"}
    </button>
  );
}
