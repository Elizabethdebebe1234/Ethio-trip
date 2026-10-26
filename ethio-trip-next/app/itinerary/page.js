
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import destinations from "../../lib/destinations";
import { availableDestinations } from "../../lib/destinations";


export default function ItineraryPage() {
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const router = useRouter();

const [submissionMessage, setSubmissionMessage] = useState("");
const [isSubmitting, setIsSubmitting] = useState(false);

const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");

const [selectedAccommodation, setSelectedAccommodation] = useState("");
const [accommodationNights, setAccommodationNights] = useState(1);

const accommodations = [
  {
    id: "guesthouse",
    name: "Traditional Ethiopian Guesthouse",
    type: "Guesthouse",
    pricePerNight: 1200,
  },
  {
    id: "standard-hotel",
    name: "Comfortable City Hotel",
    type: "Standard hotel",
    pricePerNight: 2500,
  },
  {
    id: "premium-hotel",
    name: "Premium Hotel",
    type: "Premium hotel",
    pricePerNight: 4500,
  },
];

const chosenAccommodation = accommodations.find(
  (place) => place.id === selectedAccommodation
);

const accommodationCost = chosenAccommodation
  ? chosenAccommodation.pricePerNight * accommodationNights
  : 0;

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


function downloadItineraryCSV() {
  if (selectedDestinations.length === 0) {
    setSubmissionMessage("Please add at least one destination before downloading your report.");
    return;
  }

  const escapeCSV = (value) =>
    `"${String(value ?? "").replace(/"/g, '""')}"`;

  const rows = [
    [
      "Destination",
      "Region",
      "Suggested Days",
      "Daily Budget (ETB)",
      "Accommodation",
      "Departure Date",
      "Return Date",
    ],
    ...selectedDestinations.map((destination) => [
      destination.name,
      destination.region,
      destination.days,
      destination.dailyBudget,
      chosenAccommodation?.name || "Not selected",
      startDate || "",
      endDate || "",
    ]),
  ];

  const csv = rows
    .map((row) => row.map(escapeCSV).join(","))
    .join("\r\n");

  const blob = new Blob(["\uFEFF" + csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "ethio-trip-itinerary.csv";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);

  setSubmissionMessage("Your itinerary CSV report has been downloaded.");
}


  async function handleSubmitTrip() {
  setSubmissionMessage("");

  if (selectedDestinations.length === 0) {
    setSubmissionMessage("Please add at least one destination.");
    return;
  }

  if (!hasValidDates) {
    setSubmissionMessage(
      "Please choose valid departure and return dates."
    );
    return;
  }

  setIsSubmitting(true);

  try {
    const response = await fetch("/api/auth/session", {
      cache: "no-store",
    });

    if (!response.ok) {
      setSubmissionMessage("Unable to verify your sign-in. Please try again.");
      return;
    }

    const session = await response.json();

    if (!session.authenticated || session.role !== "customer") {
      router.push("/signin");
      return;
    }

    const saveResponse = await fetch("/api/trips", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    startDate,
    endDate,
    destinations: selectedDestinations.map((destination) => ({
      id: destination.id,
      name: destination.name,
      days: destination.days,
    })),
    accommodation: chosenAccommodation
      ? chosenAccommodation.name
      : "Not selected",
    accommodationNights,
    estimatedBudget: totalEstimatedBudget,
  }),
});

const result = await saveResponse.json();

if (!saveResponse.ok) {
  setSubmissionMessage(
    result.error || "Could not save your trip request."
  );
  return;
}

    setRequestSubmitted(true);

    setSubmissionMessage(
      "Your trip request has been submitted with Pending status."
    );
  } catch {
    setSubmissionMessage(
      "Could not submit your trip request. Please try again."
    );
  } finally {
    setIsSubmitting(false);
  }
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

      
const dailySchedule = selectedDestinations.reduce(
  (days, destination) => {
    const startingDay = days.length;

    const destinationDays = Array.from(
      { length: destination.days },
      (_, index) => {
        const dayNumber = startingDay + index + 1;

        let dateLabel = "";

        if (startDate) {
          const date = new Date(`${startDate}T00:00:00`);
          date.setDate(date.getDate() + dayNumber - 1);

          dateLabel = date.toLocaleDateString("en-ET", {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric",
          });
        }

        const highlights = destination.highlights || [];

        return {
          id: `${destination.id}-day-${index + 1}`,
          dayNumber,
          destinationName: destination.name,
          dateLabel,
          activity:
            highlights[index % Math.max(highlights.length, 1)] ||
            "Explore the destination at your own pace.",
        };
      }
    );

    return [...days, ...destinationDays];
  },
  []
);


  const estimatedBudget = selectedDestinations.reduce(
    (total, destination) =>
      total + destination.days * destination.dailyBudget,
    0
  );
  const totalEstimatedBudget = estimatedBudget + accommodationCost;

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

        <Link href="hotels" className="itinerary-back-link">
          Explore Hotels
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
         
         
<section className="daily-schedule-section">
  <div className="daily-schedule-heading">
    <p className="eyebrow">YOUR TRAVEL PLAN</p>
    <h2>Day-by-day itinerary</h2>
    <p>
      Your selected destinations organized into a suggested daily plan.
    </p>
  </div>

  {dailySchedule.length === 0 ? (
    <p className="daily-schedule-empty">
      Add destinations below to create your daily travel schedule.
    </p>
  ) : (
    <div className="daily-schedule-list">
      {dailySchedule.map((day) => (
        <article className="daily-schedule-card" key={day.id}>
          <div className="daily-schedule-number">
            <span>DAY</span>
            <strong>{day.dayNumber}</strong>
          </div>

          <div className="daily-schedule-content">
            {day.dateLabel && (
              <p className="daily-schedule-date">{day.dateLabel}</p>
            )}

            <h3>{day.destinationName}</h3>

            <p>{day.activity}</p>
          </div>
        </article>
      ))}
    </div>
  )}

  <p className="daily-schedule-note">
    Activities are suggestions. Travel time between destinations is not
    included in this schedule yet.
  </p>
</section>


<section className="accommodation-section">
  <p className="eyebrow">YOUR PLACE TO STAY</p>
  <h2>Choose your accommodation</h2>
  <p>
    Select one stay for your trip and estimate the total accommodation cost.
  </p>

  <div className="accommodation-options">
    {accommodations.map((place) => (
      <article
        className={`accommodation-card ${
          selectedAccommodation === place.id ? "accommodation-selected" : ""
        }`}
        key={place.id}
      >
        <div>
          <h3>{place.name}</h3>
          <p>{place.type}</p>
          <strong>
            {place.pricePerNight.toLocaleString()} ETB
          </strong>
          <span> per night</span>
        </div>

        <button
          type="button"
          onClick={() => setSelectedAccommodation(place.id)}
          aria-pressed={selectedAccommodation === place.id}
        >
          {selectedAccommodation === place.id ? "Selected" : "Choose stay"}
        </button>
      </article>
    ))}
  </div>

  <div className="accommodation-nights">
    <label htmlFor="accommodation-nights">
      Number of nights
    </label>

    <input
      id="accommodation-nights"
      type="number"
      min="1"
      max="365"
      value={accommodationNights}
      onChange={(event) => {
        const value = Number(event.target.value);

        if (value >= 1 && value <= 365) {
          setAccommodationNights(value);
        }
      }}
    />
  </div>

  <div className="accommodation-total">
    <span>Estimated accommodation cost</span>
    <strong>
      {accommodationCost.toLocaleString()} ETB
    </strong>
  </div>

  <p className="accommodation-disclaimer">
    These are sample planning prices, not live rates or confirmed reservations.
  </p>
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
              <strong>
  {totalEstimatedBudget.toLocaleString()} ETB
</strong>
            </div>
          </div>

          <p className="itinerary-disclaimer">
            Budget figures are illustrative planning estimates, not live
            prices or confirmed quotations.
          </p>

         <div className="trip-submit-row">
  <button
    type="button"
    className="trip-submit-button"
    onClick={handleSubmitTrip}
    disabled={isSubmitting || requestSubmitted}
  >
    {requestSubmitted
      ? "Request Submitted"
      : isSubmitting
        ? "Submitting..."
        : "Submit Trip Request"}
  </button>

  {hasValidDates && selectedDestinations.length > 0 &&
    plannedTripDays < totalDays && (
      <p className="trip-duration-warning" role="status">
        {tripDurationMessage}
      </p>
    )}
</div>


<div className="itinerary-action-buttons">
  <button
    type="button"
    className="trip-submit-button"
    onClick={downloadItineraryCSV}
    disabled={selectedDestinations.length === 0}
  >
    Download CSV Report
  </button>

  {/* Keep your existing Submit Trip Request button here */}
</div>


{submissionMessage && (
  <p role="status" aria-live="polite">
    {submissionMessage}
  </p>
)}

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
