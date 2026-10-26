
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CustomerRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;

    async function loadRequests() {
      try {
        const response = await fetch("/api/trips", {
          cache: "no-store",
        });
        const result = await response.json();

        if (!response.ok) {
          if (response.status === 401) {
            window.location.href = "/signin";
            return;
          }
          throw new Error(result.error || "Could not load trip requests.");
        }

        if (active) {
          setRequests(result.requests || []);
          setMessage("");
        }
      } catch (error) {
        if (active) {
          setMessage(error.message || "Could not load your trip requests.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadRequests();

    return () => {
      active = false;
    };
  }, []);

  function formatDate(value) {
    if (!value) return "Not provided";

    return new Date(`${value.slice(0, 10)}T00:00:00`).toLocaleDateString(
      "en-ET",
      { year: "numeric", month: "short", day: "numeric" }
    );
  }

  function formatDateTime(value) {
    if (!value) return "Date unavailable";
    return new Date(value).toLocaleString("en-ET");
  }

  return (
    <main className="dashboard-page">
      <section className="dashboard-card">
        <p className="auth-eyebrow">YOUR TRAVEL PLANS</p>
        <h1>My trip requests</h1>
        <p>Review your submitted journeys and check their progress.</p>

        {loading && <p role="status">Loading your trip requests...</p>}

        {!loading && message && (
          <p role="alert">{message}</p>
        )}

        {!loading && !message && requests.length === 0 && (
          <div>
            <p>You have not submitted any trip requests yet.</p>
            <Link href="/itinerary">Plan your first trip</Link>
          </div>
        )}

        {!loading && !message && requests.length > 0 && (
          <div className="guide-request-list">
            {requests.map((request) => {
              const status = request.status || "Pending";
              const destinations = Array.isArray(request.destinations)
                ? request.destinations
                : [];

              return (
                <article className="guide-request-card" key={request.id}>
                  <div className="guide-request-heading">
                    <div>
                      <h2>Trip request</h2>
                      <p>Submitted {formatDateTime(request.created_at)}</p>
                    </div>

                    <span
                      className={`trip-status trip-status-${status.toLowerCase()}`}
                    >
                      {status === "Pending" ? "Requested" : status}
                    </span>
                  </div>

                  <div className="guide-request-details">
                    <p>
                      <strong>Destinations:</strong>{" "}
                      {destinations.length
                        ? destinations.map((item) => item.name).join(", ")
                        : "No destinations listed"}
                    </p>

                    <p>
                      <strong>Departure:</strong>{" "}
                      {formatDate(request.start_date)}
                    </p>

                    <p>
                      <strong>Return:</strong>{" "}
                      {formatDate(request.end_date)}
                    </p>

                    <p>
                      <strong>Accommodation:</strong>{" "}
                      {request.accommodation || "Not selected"}
                    </p>

                    <p>
                      <strong>Accommodation nights:</strong>{" "}
                      {request.accommodation_nights || 1}
                    </p>

                    <p>
                      <strong>Estimated budget:</strong>{" "}
                      {Number(request.estimated_budget || 0).toLocaleString()} ETB
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <p>
          <Link href="/customer">Back to customer dashboard</Link>
          {" · "}
          <Link href="/itinerary">Plan another trip</Link>
        </p>
      </section>
    </main>
  );
}
