
export default function DestinationsLoading() {
  return (
    <main className="destinations-loading">
      <div className="loading-spinner" aria-hidden="true"></div>

      <h1>Discover Ethiopia</h1>

      <p>
        Preparing amazing destinations for your next adventure...
      </p>

      <div
        className="loading-progress"
        role="status"
        aria-live="polite"
      >
        Loading destinations
      </div>
    </main>
  );
}
