
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getTripRequests } from "../../../lib/tripRequests";

export default function CustomerRequestsPage() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    setRequests(getTripRequests());
  }, []);

  const statusClass = (status) =>
    `trip-status trip-status-${status.toLowerCase()}`;

  return (
    <main className="dashboard-page">
      <section className="dashboard-card">
        <p className="auth-eyebrow">YOUR TRAVEL PLANS</p>
        <h1>My trip requests</h1>
        <p>
          Review your submitted journeys and check their progress.
        </p>

        {requests.length === 0 ? (
          <div>
            <p>You haven't submitted a trip request yet.</p>
            <Link href="/itinerary" className="dashboard-link">
              Plan your trip
            </Link>
          </div>
        ) : (
          <div className="customer-request-list">
            {requests.map((request) => (
              <article className="customer-request-card" key={request.id}>
                <h2>
                  {request.destinations
                    .map((destination) => destination.name)
                    .join(", ")}
                </h2>

                <p>
                  <strong>Departure:</strong> {request.startDate}
                </p>
                <p>
                  <strong>Return:</strong> {request.endDate}
                </p>
                <p>
                  <strong>Accommodation:</strong> {request.accommodation}
                </p>
                <p>
                  <strong>Estimated budget:</strong>{" "}
                  {Number(request.estimatedBudget).toLocaleString()} ETB
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  <span className={statusClass(request.status)}>
                    {request.status}
                  </span>
                </p>

                <p className="request-note">
                  Status updates are currently stored in this browser's
                  local demo storage.
                </p>
              </article>
            ))}
          </div>
        )}

        <div className="dashboard-actions">
          <Link href="/customer" className="dashboard-link">
            Back to dashboard
          </Link>
          <Link href="/itinerary" className="dashboard-link">
            Plan another trip
          </Link>
        </div>
      </section>
    </main>
  );
}
