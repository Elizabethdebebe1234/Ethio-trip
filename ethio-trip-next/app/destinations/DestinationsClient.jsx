"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import useSWR from "swr";
import EthiopiaMapLoader from "../../components/EthiopiaMapLoader";

const categories = [
  "All Destinations",
  "History & Culture",
  "Nature & Adventure",
  "City & Food",
];

const fetcher = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to load destinations");
  }

  return response.json();
};

export default function DestinationsPage() {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/destinations",
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(
    "All Destinations"
  );

  const destinations = (data || []).map((destination) => ({
    ...destination,
    tags: destination.tags || destination.highlights || [],
    duration: destination.duration || `${destination.days || 1} days`,
    category:
      destination.category === "Nature & Culture"
        ? "Nature & Adventure"
        : destination.category,
  }));

  const filteredDestinations = useMemo(() => {
    const query = search.trim().toLowerCase();

    return destinations.filter((destination) => {
      const matchesCategory =
        activeCategory === "All Destinations" ||
        destination.category === activeCategory;

      const searchableText = [
        destination.name,
        destination.region,
        destination.category,
        destination.description,
        ...destination.tags,
      ]
        .join(" ")
        .toLowerCase();

      return matchesCategory && searchableText.includes(query);
    });
  }, [data, search, activeCategory]);

  if (isLoading) {
    return (
      <main className="destinations-page">
        <p className="destinations-container">
          Loading destinations...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="destinations-page">
        <div className="destinations-container">
          <h2>Something went wrong</h2>
          <p>
            We could not load the destinations right now. Please try again.
          </p>
          <button type="button" onClick={() => mutate()}>
            Try Again
          </button>{" "}
          <Link href="/destinations">Back to Destinations</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="destinations-page">
      <section className="destinations-hero">
        <div className="destinations-hero-overlay">
          <div className="destinations-container">
            <span className="destinations-eyebrow">
              YOUR JOURNEY STARTS HERE
            </span>

            <h1>Discover the wonders of Ethiopia.</h1>

            <p>
              From ancient heritage to breathtaking highlands, find the
              places that make your Ethiopian journey unforgettable.
            </p>

            <a
              className="destinations-hero-button"
              href="#explore"
            >
              Explore destinations
            </a>
          </div>
        </div>
      </section>

      <section
        className="destinations-explore destinations-container"
        id="explore"
      >
        <div className="destinations-section-heading">
          <div>
            <span className="destinations-eyebrow">
              FIND YOUR NEXT ADVENTURE
            </span>

            <h2>Explore Ethiopia</h2>

            <p>
              Search places, discover experiences, and start building your
              own journey.
            </p>
          </div>

          <span className="destinations-count">
            {filteredDestinations.length}{" "}
            {filteredDestinations.length === 1 ? "place" : "places"}
          </span>
        </div>

        <label
          className="destinations-search-label"
          htmlFor="destination-search"
        >
          Search destinations
        </label>

        <div className="destinations-search">
          <input
            id="destination-search"
            type="search"
            placeholder="Try Lalibela, hiking, coffee..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          {search && (
            <button
              type="button"
              className="destinations-clear"
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              Clear
            </button>
          )}
        </div>

        <div
          className="destinations-filters"
          role="group"
          aria-label="Filter destinations by category"
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`destinations-filter ${
                activeCategory === category ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
            >
              {category}
            </button>
          ))}
        </div>

        <EthiopiaMapLoader />

        {filteredDestinations.length > 0 ? (
          <div className="destinations-grid">
            {filteredDestinations.map((destination) => (
              <article
                className="destination-card"
                key={destination.id}
              >
                <Link
                  href={`/destinations/${destination.id}`}
                  className="destination-image-link"
                  aria-label={`Discover ${destination.name}`}
                >
                  <div
                    className="destination-card-image"
                    style={{
                      backgroundImage: `url("${destination.image || ""}")`,
                    }}
                    role="img"
                    aria-label={`Landscape representing ${destination.name}`}
                  >
                    <span className="destination-category">
                      {destination.category}
                    </span>

                    <span className="destination-image-arrow">
                      View
                    </span>
                  </div>
                </Link>

                <div className="destination-card-content">
                  <span className="destination-region">
                    {destination.region}
                  </span>

                  <h3>
                    <Link href={`/destinations/${destination.id}`}>
                      {destination.name}
                    </Link>
                  </h3>

                  <p>{destination.description}</p>

                  <div className="destination-tags">
                    {destination.tags.slice(0, 2).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  <div className="destination-card-footer">
                    <span>{destination.duration}</span>

                    <Link href={`/destinations/${destination.id}`}>
                      Discover more
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="destinations-empty">
            <h3>No destinations found</h3>

            <p>
              Try another search or choose a different category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCategory("All Destinations");
              }}
            >
              Show all destinations
            </button>
          </div>
        )}
      </section>

      <section className="destinations-planner">
        <div className="destinations-container destinations-planner-inner">
          <div>
            <span className="destinations-eyebrow">
              YOUR ADVENTURE, YOUR WAY
            </span>

            <h2>Turn your inspiration into a journey.</h2>

            <p>
              Choose the places you love and start putting together your
              Ethiopian travel itinerary.
            </p>
          </div>

          <Link
            href="/itinerary"
            className="destinations-planner-button"
          >
            Plan my trip
          </Link>
        </div>
      </section>
    </main>
  );
}
