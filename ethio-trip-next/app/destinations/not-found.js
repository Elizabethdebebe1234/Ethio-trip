"use client";
import Link from "next/link";

export default function DestinationNotFound() {
  return (
    <main className="destination-not-found">
      <div className="not-found-number">404</div>

      <h1>Destination Not Found</h1>

      <p>
        We couldn't find that destination. It may not exist
        or the link may be incorrect.
      </p>

      <Link href="/destinations" className="not-found-button">
        Explore Destinations
      </Link>

      <Link href="/" className="not-found-home">
        Return to Home
      </Link>
    </main>
  );
}
