
import Link from "next/link";
import Image from "next/image";

const stays = [
  {
    id: 1,
    name: "Traditional Ethiopian Guesthouse",
    type: "Guesthouse",
    price: 1200,
    description:
      "A welcoming stay inspired by Ethiopian hospitality and local culture.",
    image:
      "/images/hotels/guesthouse.jpg",
  },
  {
    id: 2,
    name: "Comfortable City Hotel",
    type: "City hotel",
    price: 2500,
    description:
      "A practical base for exploring the capital, restaurants, and cultural attractions.",
    image:
      "/images/hotels/city-hotel.jpg",
  },
  {
    id: 3,
    name: "Premium Highland Retreat",
    type: "Retreat",
    price: 4500,
    description:
      "A more elevated accommodation concept for a relaxing highland escape.",
    image:
      "/images/hotels/highland-retreat.jpg",
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
          Plan your journey â†’
        </Link>
      </section>

      <section className="hotels-section">
        <div className="hotels-section-heading">
          <div>
            <span className="hotels-eyebrow">STAY YOUR WAY</span>
            <h2>Accommodation ideas</h2>
          </div>

          <p>
             Prices per night in Ethiopian birr (ETB).
          
          </p>
        </div>

        <div className="hotels-grid">
          {stays.map((stay) => (
            <article className="hotel-card" key={stay.id}>
              <Image
  src={stay.image}
  alt={stay.name}
  width={1000}
  height={650}
  sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw"
  className="hotel-image"
/>

              <div className="hotel-card-content">
                <span className="hotel-type">{stay.type}</span>

                <h3>{stay.name}</h3>

                <p className="hotel-location">
                  <span aria-hidden="true">âŒ–</span> {stay.location}
                </p>

                <p className="hotel-description">
                  {stay.description}
                </p>

                <div className="hotel-card-bottom">
                  <p className="hotel-price">
                    <strong>{stay.price.toLocaleString()} ETB</strong>
                    <span>/ night Â· estimate</span>
                  </p>

                  <Link href="/itinerary" className="hotel-select-link">
                    Plan a stay â†’
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

