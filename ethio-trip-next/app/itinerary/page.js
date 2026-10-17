
"use client";

import { useState } from "react";
import Link from "next/link";
import { destinations as availableDestinations } from "../../lib/destinations";

export default function ItineraryPage() {
  const [selectedDestinations, setSelectedDestinations] = useState([]);
const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");

  function addDestination(destination) {
    setSelectedDestinations((current) => {
      const alreadyAdded = current.some(
        (item) => item.id === destination.id
      );

      if (alreadyAdded) {
        return current;
      }

      return [...current, destination];
    });
  }

  function removeDestination(destinationId) {
    setSelectedDestinations((current) =>
      current.filter((item) => item.id !== destinationId)
    );
  }

  const totalDays = selectedDestinations.reduce(
    (total, destination) => total + destination.days,
    0
  );
  const plannedTripDays =
  startDate && endDate
    ? Math.max(
        0,
        Math.ceil(
          (new Date(`${endDate}T00:00:00`) -
            new Date(`${startDate}T00:00:00`)) /
            (1000 * 60 * 60 * 24)
        )
      )
    : 0;

    const hasValidDates =
  startDate && endDate && endDate > startDate;

const tripDurationMessage = !hasValidDates
  ? "Choose your departure and return dates to check your itinerary."
  : plannedTripDays < totalDays
    ? `Your selected destinations suggest ${totalDays} days, but your dates allow ${plannedTripDays} days. Consider extending your trip or removing a destination.`
    : plannedTripDays > totalDays
      ? `You have ${plannedTripDays - totalDays} extra day(s) to explore, relax, or add activities.`
      : "Perfect! Your dates match the suggested duration of your destinations.";

  const estimatedBudget = selectedDestinations.reduce(
    (total, destination) =>
      total + destination.days * destination.dailyBudget,
    0
  );

  return (
    <main className="itinerary-page">
      <section className="itinerary-hero">
        <p className="eyebrow">YOUR ETHIOPIAN ADVENTURE</p>

        <h1>Plan your journey</h1>

        <p>
          Choose your favorite destinations and start building a trip
          across Ethiopia.
        </p>

        <Link href="/destinations" className="itinerary-back-link">
          Explore all destinations
        </Link>
      </section>

       <section className="trip-dates-section">
  <h2>When are you travelling?</h2>
  <p>Choose your departure and return dates.</p>

  <div className="trip-dates-fields">
    <label>
      Departure date
      <input
        type="date"
        value={startDate}
        min={new Date().toLocaleDateString("en-CA")}
        onChange={(event) => {
          setStartDate(event.target.value);

          if (endDate && event.target.value > endDate) {
            setEndDate("");
          }
        }}
      />
    </label>

    <label>
      Return date
      <input
        type="date"
        value={endDate}
        min={startDate || new Date().toLocaleDateString("en-CA")}
        onChange={(event) => setEndDate(event.target.value)}
      />
    </label>
  </div>

  {startDate && endDate && endDate > startDate && (
  <>
    <p className="trip-dates-result">
      Your planned trip: <strong>{plannedTripDays} days</strong>
    </p>

    <p className="trip-dates-result">
      Destinations require: <strong>{totalDays} days</strong>
    </p>

    <p
      className={
        plannedTripDays < totalDays
          ? "trip-duration-message trip-duration-warning"
          : "trip-duration-message"
      }
      role="status"
    >
      {tripDurationMessage}
    </p>
  </>
)}
</section>

      <section className="itinerary-layout">
        <div className="itinerary-choices">
          <h2>Choose destinations</h2>

          <p>
            Add places you would like to visit to your itinerary.
          </p>

          {availableDestinations.map((destination) => {
            const isAdded = selectedDestinations.some(
              (item) => item.id === destination.id
            );

            return (
              <article
                className="itinerary-choice"
                key={destination.id}
              >
                <div>
                  <h3>{destination.name}</h3>

                  <p>{destination.region}</p>

                  <small>
                    {destination.days} suggested days ·{" "}
                    {destination.dailyBudget.toLocaleString()} ETB per day
                  </small>
                </div>

                <button
                  type="button"
                  onClick={() => addDestination(destination)}
                  disabled={isAdded}
                >
                  {isAdded ? "Added" : "Add to trip"}
                </button>
              </article>
            );
          })}
        </div>

        <aside className="itinerary-summary">
          <h2>Your itinerary</h2>

          {selectedDestinations.length === 0 ? (
            <p>
              Your trip is empty. Add a destination to get started.
            </p>
          ) : (
            <ul className="itinerary-selected-list">
              {selectedDestinations.map((destination, index) => (
                <li key={destination.id}>
                  <div>
                    <strong>
                      {index + 1}. {destination.name}
                    </strong>

                    <p>{destination.days} suggested days</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeDestination(destination.id)}
                    aria-label={`Remove ${destination.name}`}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="itinerary-total">
            <div>
              <span>Destinations</span>
              <strong>{selectedDestinations.length}</strong>
            </div>

            <div>
              <span>Suggested trip length</span>
              <strong>{totalDays} days</strong>
            </div>

            <div>
              <span>Estimated budget</span>
              <strong>{estimatedBudget.toLocaleString()} ETB</strong>
            </div>
          </div>

          <p className="itinerary-disclaimer">
            Budget figures are illustrative planning estimates, not live
            prices or confirmed quotations.
          </p>

          <button
            type="button"
            className="itinerary-clear-button"
            onClick={() => setSelectedDestinations([])}
            disabled={selectedDestinations.length === 0}
          >
            Clear itinerary
          </button>
        </aside>
      </section>
    </main>
  );
}
