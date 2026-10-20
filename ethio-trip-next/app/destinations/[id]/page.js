
import Link from "next/link";
import { notFound } from "next/navigation";

const destinations = [
  {
    id: "lalibela",
    name: "Lalibela",
    region: "Amhara Region, Northern Ethiopia",
    category: "History & Culture",
    duration: "2–3 days",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlBAnVIdcBS7Kmy4wobnoTVYdCwz_i8JNLq-laUpBiyg&s=10",
    intro:
      "Step into one of Ethiopia's most remarkable historic destinations, known for its extraordinary rock-hewn churches and enduring spiritual traditions.",
    highlights: [
      "Explore the famous rock-hewn churches",
      "Discover Ethiopian Orthodox heritage",
      "Experience traditional food and local markets",
      "Learn about the town's history with a local guide",
    ],
    bestFor: "History, architecture, culture, and heritage",
    travelTip:
      "Allow time to explore respectfully and check local access arrangements before visiting religious sites.",
  },
  {
    id: "simien-mountains",
    name: "Simien Mountains",
    region: "Amhara Region, Northern Ethiopia",
    category: "Nature & Adventure",
    duration: "3–5 days",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnf0bB3cnAQGqZxqDr3cbF9TJhMLGhkuw_sqLEijd2CA&s=10",
    intro:
      "Discover spectacular mountain scenery, dramatic cliffs, highland trails, and remarkable wildlife in one of Ethiopia's best-known natural landscapes.",
    highlights: [
      "Take guided hikes through mountain scenery",
      "Look for endemic wildlife with a knowledgeable guide",
      "Enjoy sweeping views across the highlands",
      "Experience nights in mountain communities or camps",
    ],
    bestFor: "Hiking, landscapes, photography, and wildlife",
    travelTip:
      "High-altitude hikes require preparation. Arrange suitable transport, a local guide, and warm clothing.",
  },
  {
    id: "lake-tana",
    name: "Lake Tana",
    region: "Near Bahir Dar, Amhara Region",
    category: "Nature & Culture",
    duration: "1–2 days",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaQVwBB767dNsUXjA7PKfEgoPDBH0ikLgVD2yWV0S5uw&s=10",
    intro:
      "Slow down beside Ethiopia's largest lake, where waterside communities, birdlife, and historic monasteries create a memorable travel experience.",
    highlights: [
      "Explore the lake by boat with a local operator",
      "Learn about historic monasteries on the lake's islands",
      "Watch birds and enjoy the lakeside scenery",
      "Visit Bahir Dar's markets and waterfront",
    ],
    bestFor: "Relaxation, culture, nature, and boat trips",
    travelTip:
      "Confirm boat availability and monastery visiting arrangements locally, especially during religious events.",
  },
  {
    id: "harar",
    name: "Harar Jugol",
    region: "Harari Region, Eastern Ethiopia",
    category: "History & Culture",
    duration: "1–2 days",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRbixl9TUGDnsOe3Phs24vHN6RZvbC6aX9GX50hf3aWQ&s=10",
    intro:
      "Explore a distinctive historic walled city with colorful streets, lively markets, and a rich tradition of culture and trade.",
    highlights: [
      "Walk through the historic old city's narrow streets",
      "Visit local markets and traditional homes",
      "Discover Harari crafts and food traditions",
      "Learn about the city's long trading history",
    ],
    bestFor: "Architecture, history, photography, and food",
    travelTip:
      "Respect local customs and ask permission before photographing people or private spaces.",
  },
  {
    id: "danakil-depression",
    name: "Danakil Depression",
    region: "Afar Region, Northeastern Ethiopia",
    category: "Nature & Adventure",
    duration: "3–4 days",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHeyhPZEcdGb6CgPDP5AKW1x7l4YffDj0Hz8wrIRff7g&s=10",
    intro:
      "Encounter dramatic desert terrain and striking geological formations in one of the world's most extreme environments.",
    highlights: [
      "See remarkable desert and volcanic landscapes",
      "Learn about the region's geology",
      "Experience Afar culture with local guidance",
      "Photograph unusual colors and terrain",
    ],
    bestFor: "Adventure, geology, and landscape photography",
    travelTip:
      "Conditions can be extremely hot and remote. Use a reputable local operator and check current safety and access advice before travelling.",
  },
  {
    id: "addis-ababa",
    name: "Addis Ababa",
    region: "Addis Ababa, Central Ethiopia",
    category: "City & Food",
    duration: "1–3 days",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwkahZR7SzQLiAkpiBg0PnNtaETvd4zEso3soU73fkuw&s=10",
    intro:
      "Discover Ethiopia's capital through its museums, coffee traditions, food culture, markets, and energetic city life.",
    highlights: [
      "Explore museums and cultural landmarks",
      "Experience Ethiopian coffee traditions",
      "Taste local dishes at restaurants",
      "Discover markets, galleries, and neighborhoods",
    ],
    bestFor: "Food, coffee, museums, and city exploration",
    travelTip:
      "Allow extra time for city traffic and check opening times before visiting museums and attractions.",
  },
  {
    id: "konso",
    name: "Konso Cultural Landscape",
    region: "Southern Ethiopia",
    category: "History & Culture",
    duration: "2–3 days",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWDE_JGou7PkyQ5zoLBj8GTZJuVVcBbi5aEVSNuuvvPA&s=10",
    intro:
      "Learn about a distinctive cultural landscape shaped by generations of community knowledge, stone terraces, and local traditions.",
    highlights: [
      "Discover traditional terraced landscapes",
      "Learn about local architecture and community history",
      "Explore the area's agricultural heritage",
      "Arrange respectful visits with local guides",
    ],
    bestFor: "Living heritage, cultural learning, and landscapes",
    travelTip:
      "Plan transport ahead and seek local guidance to visit communities respectfully.",
  },
  {
    id: "bale-mountains",
    name: "Bale Mountains",
    region: "Oromia Region, Southeastern Ethiopia",
    category: "Nature & Adventure",
    duration: "2–4 days",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2T6bEwJKG0UIZ9KUiNN3wjwaDNhe8XaDBzS61FeqEeg&s",
    intro:
      "Explore Ethiopian highlands, open moorlands, forests, and habitats known for distinctive wildlife and beautiful walking routes.",
    highlights: [
      "Explore highland trails and scenic viewpoints",
      "Look for wildlife with a local guide",
      "Discover forests and mountain habitats",
      "Enjoy photography and nature walks",
    ],
    bestFor: "Nature, hiking, wildlife, and photography",
    travelTip:
      "Weather changes quickly at higher elevations. Prepare layers, suitable footwear, and a local transport plan.",
  },
  {
    id: "gondar",
    name: "Gondar",
    region: "Amhara Region, Northern Ethiopia",
    category: "History & Culture",
    duration: "1–2 days",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPuv7LaVv3ixhEXRMQFFsaLVJWLQ0pmjDIAL7_RKeS5w&s=10",
    intro:
      "Discover historic royal architecture and monuments that tell the story of an important period in Ethiopian history.",
    highlights: [
      "Explore the historic royal enclosure",
      "Discover the city's distinctive architecture",
      "Learn about Ethiopian royal history",
      "Enjoy local cuisine and the surrounding highlands",
    ],
    bestFor: "History, architecture, culture, and photography",
    travelTip:
      "Consider a local guide to better understand the history of the city's monuments.",
  },
];

export default async function DestinationDetailPage({ params }) {
  const { id } = await params;
  const destination = destinations.find((place) => place.id === id);

  if (!destination) {
    notFound();
  }

  return (
    <main className="destination-detail-page">
      <section
        className="destination-detail-hero"
        style={{ backgroundImage: `url("${destination.image}")` }}
      >
        <div className="destination-detail-shade">
          <div className="destination-detail-container">
            <Link href="/destinations" className="destination-back-link">
              <span aria-hidden="true">←</span> All destinations
            </Link>

            <p className="destination-detail-category">
              {destination.category}
            </p>

            <h1>{destination.name}</h1>

            <p className="destination-detail-location">
              <span aria-hidden="true">⌖</span> {destination.region}
            </p>

            <p className="destination-detail-intro">{destination.intro}</p>

            <div className="destination-detail-actions">
              <Link
                href={`/itinerary?destination=${destination.id}`}
                className="destination-detail-primary"
              >
                Add to my trip <span aria-hidden="true">→</span>
              </Link>

              <span className="destination-duration">
                <span aria-hidden="true">◷</span> Suggested stay:{" "}
                {destination.duration}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="destination-detail-content destination-detail-container">
        <div className="destination-detail-main">
          <p className="destinations-eyebrow">MAKE IT MEMORABLE</p>
          <h2>Things to discover</h2>
          <p className="destination-detail-lead">
            Make the most of your visit with experiences that connect you
            with the place, its people, and its history.
          </p>

          <div className="destination-highlights">
            {destination.highlights.map((highlight, index) => (
              <article className="destination-highlight" key={highlight}>
                <span className="destination-highlight-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p>{highlight}</p>
              </article>
            ))}
          </div>
        </div>

        <aside className="destination-detail-sidebar">
          <p className="destinations-eyebrow">PLAN YOUR VISIT</p>
          <h3>Before you go</h3>

          <div className="destination-fact">
            <span>Suggested duration</span>
            <strong>{destination.duration}</strong>
          </div>

          <div className="destination-fact">
            <span>Experience type</span>
            <strong>{destination.category}</strong>
          </div>

          <div className="destination-travel-tip">
            <span aria-hidden="true">✦</span>
            <p>{destination.travelTip}</p>
          </div>

          <Link
            href={`/itinerary?destination=${destination.id}`}
            className="destination-sidebar-link"
          >
            Plan a visit <span aria-hidden="true">→</span>
          </Link>
        </aside>
      </section>

      <section className="destination-detail-bottom">
        <div className="destination-detail-container">
          <p className="destinations-eyebrow">KEEP EXPLORING</p>
          <h2>Your next Ethiopian story awaits.</h2>
          <p>
            Discover more destinations and find the places that belong in
            your journey.
          </p>
          <Link href="/destinations" className="destination-detail-primary">
            Explore all destinations <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
