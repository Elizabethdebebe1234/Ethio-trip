
import Link from "next/link";

const stays = [
  {
    id: 1,
    name: "Traditional Ethiopian Guesthouse",
    location: "Lalibela",
    type: "Guesthouse",
    price: 1200,
    description:
      "A welcoming stay inspired by Ethiopian hospitality and local culture.",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 2,
    name: "Comfortable City Hotel",
    location: "Addis Ababa",
    type: "City hotel",
    price: 2500,
    description:
      "A practical base for exploring the capital, restaurants, and cultural attractions.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 3,
    name: "Premium Highland Retreat",
    location: "Bahir Dar",
    type: "Retreat",
    price: 4500,
    description:
      "A more elevated accommodation concept for a relaxing highland escape.",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=85",
  },
];

export default function HotelsPage() {
  return (
    <main className="hotels-page">
      <section className="hotels-hero">
        <span className="hotels-eyebrow">REST, RESET, EXPLORE</span>

        <h1>Find your stay in Ethiopia</h1>

        <p>
          From welcoming guesthouses to comfortable city stays,
          discover accommodation ideas for your next journey.
        </p>

        <Link href="/itinerary" className="hotels-cta">
          Plan your journey →
        </Link>
      </section>

      <section className="hotels-section">
        <div className="hotels-section-heading">
          <div>
            <span className="hotels-eyebrow">STAY YOUR WAY</span>
            <h2>Accommodation ideas</h2>
          </div>

          <p>
            Example prices per night in Ethiopian birr (ETB).
            These are estimates, not verified hotel rates.
          </p>
        </div>

        <div className="hotels-grid">
          {stays.map((stay) => (
            <article className="hotel-card" key={stay.id}>
              <img
                src={stay.image}
                alt={stay.name}
                className="hotel-image"
              />

              <div className="hotel-card-content">
                <span className="hotel-type">{stay.type}</span>

                <h3>{stay.name}</h3>

                <p className="hotel-location">
                  <span aria-hidden="true">⌖</span> {stay.location}
                </p>

                <p className="hotel-description">
                  {stay.description}
                </p>

                <div className="hotel-card-bottom">
                  <p className="hotel-price">
                    <strong>{stay.price.toLocaleString()} ETB</strong>
                    <span>/ night · estimate</span>
                  </p>

                  <Link href="/itinerary" className="hotel-select-link">
                    Plan a stay →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
