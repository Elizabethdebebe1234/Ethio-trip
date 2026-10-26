
"use client";

import { useEffect, useState } from "react";

const statuses = ["Pending", "Confirmed", "Preparing", "Completed"];

export default function GuideTripRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    let active = true;

    async function loadRequests() {
      try {
        const response = await fetch("/api/trips", {
          cache: "no-store",
        });
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Could not load trip requests.");
        }

        if (active) {
          setRequests(result.requests || []);
          setMessage("");
        }
      } catch (error) {
        if (active) {
          setMessage(error.message || "Could not load trip requests.");
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

  async function handleStatusChange(requestId, newStatus) {
    setMessage("");
    setUpdatingId(requestId);

    try {
      const response = await fetch(`/api/trips/${requestId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Could not update trip status.");
      }

      setRequests((current) =>
        current.map((request) =>
          request.id === requestId ? result.request : request
        )
      );

      setMessage("Trip request status updated successfully.");
    } catch (error) {
      setMessage(error.message || "Could not update trip status.");
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <section className="guide-requests-section">
      <p className="auth-eyebrow">CUSTOMER BOOKINGS</p>
      <h2>Trip requests</h2>
      <p>
        Review customer plans and update each request as you prepare
        their journey.
      </p>

      {message && (
        <p role="status" aria-live="polite">
          {message}
        </p>
      )}

      {loading && <p role="status">Loading customer trip requests...</p>}

      {!loading && requests.length === 0 && !message && (
        <p className="guide-requests-empty">
          No trip requests have been submitted yet.
        </p>
      )}

      {!loading && requests.length === 0 && message && (
        <p className="guide-requests-empty">
          Trip requests could not be displayed. Please try refreshing the page.
        </p>
      )}

      {!loading && requests.length > 0 && (
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
                    <h3>{request.customer_email || "Customer"}</h3>
                    <p>Customer email</p>
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

                  <p>
                    <strong>Submitted:</strong>{" "}
                    {request.created_at
                      ? new Date(request.created_at).toLocaleString("en-ET")
                      : "Date unavailable"}
                  </p>
                </div>

                <label className="guide-status-label">
                  Update trip status
                  <select
                    value={status}
                    disabled={updatingId === request.id}
                    onChange={(event) =>
                      handleStatusChange(request.id, event.target.value)
                    }
                  >
                    {statuses.map((item) => (
                      <option key={item} value={item}>
                        {item === "Pending" ? "Requested" : item}
                      </option>
                    ))}
                  </select>
                </label>

                {updatingId === request.id && (
                  <p role="status">Saving status...</p>
                )}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
