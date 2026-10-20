
"use client";

import { useEffect, useState } from "react";
import {
  getTripRequests,
  updateTripRequestStatus,
} from "../lib/tripRequests";

const statuses = ["Pending", "Confirmed", "Preparing", "Completed"];

export default function GuideTripRequests() {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setRequests(getTripRequests());
  }, []);

  function handleStatusChange(requestId, newStatus) {
    try {
      const updatedRequests = updateTripRequestStatus(
        requestId,
        newStatus
      );

      setRequests(updatedRequests);
      setMessage("Trip request status updated successfully.");
    } catch {
      setMessage("Could not update the request status.");
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

      {requests.length === 0 ? (
        <p className="guide-requests-empty">
          No trip requests have been submitted in this browser yet.
        </p>
      ) : (
        <div className="guide-request-list">
          {requests.map((request) => (
            <article className="guide-request-card" key={request.id}>
              <div className="guide-request-heading">
                <div>
                  <h3>
                    {request.customerName ||
                      request.username ||
                      "Customer name not saved"}
                  </h3>
                  <p>Customer / trip requester</p>
                </div>

                <span
                  className={`trip-status trip-status-${(
                    request.status || "Pending"
                  ).toLowerCase()}`}
                >
                  {request.status === "Pending"
                    ? "Requested"
                    : request.status || "Requested"}
                </span>
              </div>

              <div className="guide-request-details">
                <p>
                  <strong>Destinations:</strong>{" "}
                  {request.destinations?.length
                    ? request.destinations
                        .map((destination) => destination.name)
                        .join(", ")
                    : "No destinations listed"}
                </p>

                <p>
                  <strong>Departure:</strong>{" "}
                  {request.startDate || "Not provided"}
                </p>

                <p>
                  <strong>Return:</strong>{" "}
                  {request.endDate || "Not provided"}
                </p>

                <p>
                  <strong>Accommodation:</strong>{" "}
                  {request.accommodation || "Not selected"}
                </p>

                <p>
                  <strong>Estimated budget:</strong>{" "}
                  {Number(request.estimatedBudget || 0).toLocaleString()} ETB
                </p>

                <p>
                  <strong>Submitted:</strong>{" "}
                  {request.createdAt
                    ? new Date(request.createdAt).toLocaleString()
                    : "Date unavailable"}
                </p>
              </div>

              <label className="guide-status-label">
                Update trip status
                <select
                  value={request.status || "Pending"}
                  onChange={(event) =>
                    handleStatusChange(request.id, event.target.value)
                  }
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status === "Pending" ? "Requested" : status}
                    </option>
                  ))}
                </select>
              </label>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
