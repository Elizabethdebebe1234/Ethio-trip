
"use client";

import Link from "next/link";

export default function DestinationsError({ reset }) {
  return (
    <main className="destinations-error">
      <div className="error-icon" aria-hidden="true">
        !
      </div>

      <h1>Something went wrong</h1>

      <p>
        We couldn't load the destinations right now.
        Please try again.
      </p>

      <div className="error-actions">
        <button type="button" onClick={() => reset()}>
          Try Again
        </button>

        <Link href="/destinations">
          Back to Destinations
        </Link>
      </div>
    </main>
  );
}
