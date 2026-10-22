import Link from "next/link";

export const metadata = {
  title: "Discover Ethiopia",
  description:
    "Plan your Ethiopian adventure. Explore historic sites, cultural attractions, and breathtaking destinations.",
  alternates: {
    canonical: "/",
  },
};

const destinations = [
  {
    id: "lalibela",
    name: "Lalibela",
    region: "Amhara Region",
    category: "History & Culture",
    description:
      "Discover extraordinary rock-hewn churches and centuries of Ethiopian heritage.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlBAnVIdcBS7Kmy4wobnoTVYdCwz_i8JNLq-laUpBiyg&s=10",
  },
  {
    id: "simien-mountains",
    name: "Simien-mountains",
    region: "Northern Ethiopia",
    category: "Nature & Adventure",
    description:
      "Explore dramatic mountain peaks, breathtaking trails, and unique wildlife.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnf0bB3cnAQGqZxqDr3cbF9TJhMLGhkuw_sqLEijd2CA&s=10",
  },
  {
    id: "lake-tana",
    name: "Lake-tana",
    region: "Bahir Dar, Amhara",
    category: "Nature & Culture",
    description:
      "Experience peaceful lake scenery, historic monasteries, and local life.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaQVwBB767dNsUXjA7PKfEgoPDBH0ikLgVD2yWV0S5uw&s=10",
  },
];

const experiences = [
  {
    icon: "*",
    title: "Cultural heritage",
    description:
      "Explore ancient architecture, traditions, local crafts, and living history.",
  },
  {
    icon: "+",
    title: "Nature & adventure",
    description:
      "Discover mountains, lakes, wildlife, and remarkable landscapes.",
  },
  {
    icon: "O",
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
              Explore Ethiopia <span aria-hidden="true">-&gt;</span>
            </Link>

            <Link href="/itinerary" className="button-outline">
              Build my itinerary
            </Link>

            <Link href="/dashboard" className="button-dashboard">
              View Dashboard
            </Link>
          </div>

          <div className="hero-note">
            <span className="hero-note-line" />
            A land of origins, history, and unforgettable experiences
          </div>
        </div>

        <div className="hero-side-note">
          <span>09 degrees 01 minutes N</span>
          <span className="side-note-divider" />
          <span>ETHIOPIA - EAST AFRICA</span>
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
            View all destinations <span aria-hidden="true">-&gt;</span>
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
                  -
                </span>
              </Link>

              <div className="destination-info">
                <p className="destination-category">
                  {destination.category}
                </p>
                <h3>{destination.name}</h3>
                <p className="destination-region">
                  <span aria-hidden="true">Location:</span> {destination.region}
                </p>
                <p className="destination-description">
                  {destination.description}
                </p>
                <Link
                  href={`/destinations/${destination.id}`}
                  className="destination-link"
                >
                  Discover this place <span aria-hidden="true">-&gt;</span>
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
                Find your experience <span aria-hidden="true">-&gt;</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="travel-tools-section" id="travel-tools">
        <div className="travel-tools-heading">
          <p className="eyebrow">PLAN WITH CONFIDENCE</p>
          <h2>
            Your travel tools<span>.</span>
          </h2>
          <p>
            Discover destinations, follow trip updates, and prepare a
            personalized Ethiopian adventure.
          </p>
        </div>

        <div className="travel-tools-grid">
          <article className="travel-tool-card">
            <span className="travel-tool-icon" aria-hidden="true">
              Location
            </span>
            <h3>Explore Destinations</h3>
            <p>
              Browse remarkable places, regions, and experiences across Ethiopia.
            </p>
            <Link href="/destinations" className="travel-tool-link">
              Discover places <span aria-hidden="true">-&gt;</span>
            </Link>
          </article>

          <article className="travel-tool-card">
            <span className="travel-tool-icon" aria-hidden="true">
              Updates
            </span>
            <h3>Live Trip Updates</h3>
            <p>
              Watch a demonstration of real-time trip messages powered by SSE.
            </p>
            <Link href="/trip-updates" className="travel-tool-link">
              View live updates <span aria-hidden="true">-&gt;</span>
            </Link>
          </article>

          <article className="travel-tool-card">
            <span className="travel-tool-icon" aria-hidden="true">
              Plan
            </span>
            <h3>Build Your Itinerary</h3>
            <p>
              Select destinations, organize your journey, and estimate your budget.
            </p>
            <Link href="/itinerary" className="travel-tool-link">
              Start planning <span aria-hidden="true">-&gt;</span>
            </Link>
          </article>

          <article className="travel-tool-card">
            <span className="travel-tool-icon" aria-hidden="true">
              Export
            </span>
            <h3>Export Your Report</h3>
            <p>
              Prepare your itinerary and export your travel plan as a CSV file.
            </p>
            <Link href="/itinerary" className="travel-tool-link">
              Open itinerary planner <span aria-hidden="true">-&gt;</span>
            </Link>
          </article>
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
          Start planning <span aria-hidden="true">-&gt;</span>
        </Link>
      </section>
    </main>
  );
}