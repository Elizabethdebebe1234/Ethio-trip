
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const destinations = [
  {
    id: "lalibela",
    name: "Lalibela",
    region: "Amhara Region",
    category: "History & Culture",
    duration: "2–3 days",
    image:
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1000&q=85",
    description:
      "Discover extraordinary rock-hewn churches and centuries of Ethiopian spiritual heritage.",
    tags: ["Rock-hewn churches", "Heritage", "Architecture"],
  },
  {
    id: "simien-mountains",
    name: "Simien Mountains",
    region: "Amhara Region",
    category: "Nature & Adventure",
    duration: "3–5 days",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=85",
    description:
      "Explore dramatic mountain landscapes, deep valleys, and unforgettable hiking trails.",
    tags: ["Hiking", "Mountains", "Wildlife"],
  },
  {
    id: "lake-tana",
    name: "Lake Tana",
    region: "Near Bahir Dar",
    category: "Nature & Adventure",
    duration: "1–2 days",
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1000&q=85",
    description:
      "Enjoy peaceful lake scenery, boat trips, and opportunities to explore historic monasteries.",
    tags: ["Lake", "Boat trips", "Monasteries"],
  },
  {
    id: "harar",
    name: "Harar Jugol",
    region: "Harari Region",
    category: "History & Culture",
    duration: "1–2 days",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=85",
    description:
      "Walk through historic alleyways, colorful markets, and a distinctive walled old city.",
    tags: ["Old town", "Markets", "Culture"],
  },
  {
    id: "danakil",
    name: "Danakil Depression",
    region: "Afar Region",
    category: "Nature & Adventure",
    duration: "3–4 days",
    image:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1000&q=85",
    description:
      "Experience striking desert landscapes, vivid mineral formations, and otherworldly scenery.",
    tags: ["Desert", "Geology", "Adventure"],
  },
  {
    id: "addis-ababa",
    name: "Addis Ababa",
    region: "Addis Ababa",
    category: "City & Food",
    duration: "1–3 days",
    image:
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1000&q=85",
    description:
      "Discover Ethiopia's capital through museums, coffee traditions, local cuisine, and city life.",
    tags: ["Coffee", "Museums", "Food"],
  },
  {
    id: "konso",
    name: "Konso Cultural Landscape",
    region: "Southern Ethiopia",
    category: "History & Culture",
    duration: "2–3 days",
    image:
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1000&q=85",
    description:
      "Learn about distinctive terraced landscapes and the living cultural heritage of Konso.",
    tags: ["Living heritage", "Landscape", "Culture"],
  },
  {
    id: "bale-mountains",
    name: "Bale Mountains",
    region: "Oromia Region",
    category: "Nature & Adventure",
    duration: "2–4 days",
    image:
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1000&q=85",
    description:
      "Explore highland scenery, forests, and remarkable opportunities for nature watching.",
    tags: ["Wildlife", "Hiking", "Highlands"],
  },
  {
    id: "gondar",
    name: "Gondar",
    region: "Amhara Region",
    category: "History & Culture",
    duration: "1–2 days",
    image:
      "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=1000&q=85",
    description:
      "Explore historic royal architecture and discover a fascinating chapter of Ethiopian history.",
    tags: ["Castles", "History", "Architecture"],
  },
];

const categories = [
  "All Destinations",
  "History & Culture",
  "Nature & Adventure",
  "City & Food",
];

export default function DestinationsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Destinations");

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
  }, [search, activeCategory]);

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

            <a className="destinations-hero-button" href="#explore">
              Explore destinations <span aria-hidden="true">↓</span>
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

        <label className="destinations-search-label" htmlFor="destination-search">
          Search destinations
        </label>

        <div className="destinations-search">
          <span aria-hidden="true">⌕</span>
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
              ×
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

        {filteredDestinations.length > 0 ? (
          <div className="destinations-grid">
            {filteredDestinations.map((destination) => (
              <article className="destination-card" key={destination.id}>
                <Link
                  href={`/destinations/${destination.id}`}
                  className="destination-image-link"
                  aria-label={`Discover ${destination.name}`}
                >
                  <div
                    className="destination-card-image"
                    style={{ backgroundImage: `url("${destination.image}")` }}
                    role="img"
                    aria-label={`Landscape representing ${destination.name}`}
                  >
                    <span className="destination-category">
                      {destination.category}
                    </span>
                    <span className="destination-image-arrow" aria-hidden="true">
                      ↗
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
                    <span>
                      <span aria-hidden="true">◷</span>{" "}
                      {destination.duration}
                    </span>

                    <Link href={`/destinations/${destination.id}`}>
                      Discover more <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="destinations-empty">
            <span aria-hidden="true">⌕</span>
            <h3>No destinations found</h3>
            <p>Try another search or choose a different category.</p>
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

          <Link href="/itinerary" className="destinations-planner-button">
            Plan my trip <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
