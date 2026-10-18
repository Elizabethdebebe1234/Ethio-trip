
import Link from "next/link";


const destinations = [
  {
    id: "Lalibela",
    name: "Lalibela",
    region: "Amhara Region",
    category: "History & Culture",
    description:
      "Discover extraordinary rock-hewn churches and centuries of Ethiopian heritage.",
    image:
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "Simien-mountains",
    name: "Simien-mountains",
    region: "Northern Ethiopia",
    category: "Nature & Adventure",
    description:
      "Explore dramatic mountain peaks, breathtaking trails, and unique wildlife.",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "Lake-tana",
    name: "Lake-tana",
    region: "Bahir Dar, Amhara",
    category: "Nature & Culture",
    description:
      "Experience peaceful lake scenery, historic monasteries, and local life.",
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=85",
  },
];

const experiences = [
  {
    icon: "✦",
    title: "Cultural heritage",
    description:
      "Explore ancient architecture, traditions, local crafts, and living history.",
  },
  {
    icon: "⌁",
    title: "Nature & adventure",
    description:
      "Discover mountains, lakes, wildlife, and remarkable landscapes.",
  },
  {
    icon: "◇",
    title: "Food & local life",
    description:
      "Experience Ethiopian cuisine, coffee ceremonies, and welcoming communities.",
  },
];

export default function HomePage() {
  return (
    <main>
      

      <section className="hero">
        <div className="hero-shade" />

        <div className="hero-content">
          <div className="hero-label">
            <span className="hero-label-dot" />
            YOUR NEXT GREAT ADVENTURE
          </div>

          <h1>
            Ethiopia is calling.
            <br />
            <span>Come find your story.</span>
          </h1>

          <p className="hero-description">
            From ancient wonders to extraordinary landscapes, discover
            Ethiopia your way. Find your destinations, embrace the culture,
            and create a journey worth remembering.
          </p>

          <div className="hero-actions">
            <Link href="#destinations" className="button-primary">
              Explore Ethiopia <span aria-hidden="true">→</span>
            </Link>
            <Link href="/itinerary" className="button-outline">
              Build my itinerary
            </Link>
          </div>

          <div className="hero-note">
            <span className="hero-note-line" />
            A land of origins, history, and unforgettable experiences
          </div>
        </div>

        <div className="hero-side-note">
          <span>09°01&apos; N</span>
          <span className="side-note-divider" />
          <span>ETHIOPIA · EAST AFRICA</span>
        </div>
      </section>

      <section className="intro-strip" aria-label="Discover Ethio-Trip">
        <p>
          <span className="gold-dot" />
          ONE COUNTRY, COUNTLESS STORIES
        </p>
        <p>Culture. Nature. History. Adventure.</p>
      </section>

      <section className="destinations-section" id="destinations">
        <div className="section-heading">
          <div>
            <p className="eyebrow">PLACES THAT STAY WITH YOU</p>
            <h2>
              Discover the extraordinary<span>.</span>
            </h2>
            <p className="section-description">
              Start with a few of Ethiopia&apos;s remarkable places. Your next
              favorite destination might be closer than you think.
            </p>
          </div>

          <Link href="/destinations" className="text-link">
            View all destinations <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="destination-grid">
          {destinations.map((destination, index) => (
            <article className="destination-card" key={destination.name}>
              <Link
                href={`/destinations/${destination.id}`}
                className="destination-image-link"
                aria-label={`Explore ${destination.name}`}
              >
                <div
                  className="destination-image"
                  style={{ backgroundImage: `url("${destination.image}")` }}
                  role="img"
                  aria-label={`${destination.name} landscape`}
                />
                <span className="destination-number">
                  0{index + 1}
                </span>
                <span className="destination-arrow" aria-hidden="true">
                  ↗
                </span>
              </Link>

              <div className="destination-info">
                <p className="destination-category">
                  {destination.category}
                </p>
                <h3>{destination.name}</h3>
                <p className="destination-region">
                  <span aria-hidden="true">⌖</span> {destination.region}
                </p>
                <p className="destination-description">
                  {destination.description}
                </p>
                <Link
                  href={`/destinations/${index + 1}`}
                  className="destination-link"
                >
                  Discover this place <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="experiences-section" id="experiences">
        <div className="experiences-heading">
          <p className="eyebrow">TRAVEL YOUR WAY</p>
          <h2>
            More than a destination.
            <br />
            <span>A feeling.</span>
          </h2>
          <p>
            Whether you love history, seek the outdoors, or travel for food
            and culture, there&apos;s a side of Ethiopia waiting for you.
          </p>
        </div>

        <div className="experience-grid">
          {experiences.map((experience) => (
            <article className="experience-card" key={experience.title}>
              <span className="experience-icon" aria-hidden="true">
                {experience.icon}
              </span>
              <h3>{experience.title}</h3>
              <p>{experience.description}</p>
              <Link href="/destinations" className="experience-link">
                Find your experience <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="planner-banner">
        <div>
          <p className="eyebrow">YOUR ADVENTURE, YOUR WAY</p>
          <h2>Dream it. Plan it. Experience Ethiopia.</h2>
          <p>
            Start putting your travel ideas together and create a journey
            that reflects what you love.
          </p>
        </div>
        <Link href="/itinerary" className="button-primary">
          Start planning <span aria-hidden="true">→</span>
        </Link>
      </section>

      
    </main>
  );
}
