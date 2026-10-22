
"use client";

import { useEffect, useState } from "react";
import { formatEthiopianDateTime } from "../lib/format";

export default function TripUpdates() {
  const [updates, setUpdates] = useState([]);
  const [connection, setConnection] = useState("Connecting...");

  useEffect(() => {
    const source = new EventSource("/api/trip-updates/stream");

    source.onopen = () => setConnection("Connected");

    source.onmessage = (event) => {
      try {
        const update = JSON.parse(event.data);

        setUpdates((current) => [update, ...current].slice(0, 8));
      } catch {
        setConnection("Could not read an update");
      }
    };

    source.onerror = () => setConnection("Reconnecting...");

    return () => source.close();
  }, []);

  return (
    <main className="itinerary-page">
      <section className="daily-schedule-section">
        <p className="eyebrow">DAY 47 · REAL-TIME DATA</p>
        <h1>Trip Status Updates</h1>

        <p>
          This demonstration uses Server-Sent Events (SSE) to stream
          simulated trip updates to your browser.
        </p>

        <p role="status">
          Connection: <strong>{connection}</strong>
        </p>

        <div className="daily-schedule-list">
          {updates.length === 0 ? (
            <p>Waiting for the first update...</p>
          ) : (
            updates.map((update) => (
              <article className="daily-schedule-card" key={update.id}>
                <div className="daily-schedule-content">
                  <h2>{update.message}</h2>
                  <p>
                    {formatEthiopianDateTime(update.timestamp)}
                  </p>
                  <small>Simulated demo event — not a confirmed trip status.</small>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
