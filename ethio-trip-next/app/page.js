import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <header className="navbar">
        <div className="logo">🇪🇹 Ethio-Trip</div>

        <nav>
          <Link href="/">Home</Link>
          <Link href="/destinations">Destinations</Link>
          <Link href="/hotels">Hotels</Link>
          <Link href="/itinerary">My Trip</Link>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">DISCOVER ETHIOPIA</p>

          <h1>
            Your Journey Through
            <br />
            Ethiopia Starts Here 🇪🇹
          </h1>

          <p className="hero-text">
            Discover breathtaking destinations, traditional culture, beautiful
            hotels, and unforgettable experiences across Ethiopia.
          </p>

          <div className="hero-buttons">
            <Link href="/destinations" className="primary-button">
              Explore Destinations
            </Link>

            <Link href="/itinerary" className="secondary-button">
              Plan My Trip
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">📍</div>

          <h2>Explore Destinations</h2>

          <p>
            Discover amazing places including Lalibela, Gondar, Axum, and more.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🏨</div>

          <h2>Find Hotels</h2>

          <p>
            Explore accommodation options for different destinations and
            budgets.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🗓️</div>

          <h2>Plan Your Journey</h2>

          <p>Create an itinerary and organize your Ethiopian adventure.</p>
        </div>
      </section>

      <section className="about">
        <div>
          <p className="eyebrow">EXPERIENCE ETHIOPIA</p>

          <h2>
            One Country.
            <br />
            Endless Experiences.
          </h2>
        </div>

        <p>
          From the ancient rock-hewn churches of Lalibela to the breathtaking
          landscapes of the Simien Mountains, Ethiopia offers travelers a unique
          combination of history, culture, nature, and adventure.
        </p>
      </section>

      <footer>
        <h2>🇪🇹 Ethio-Trip</h2>

        <p>
          Explore Ethiopia. Plan your journey. Create unforgettable memories.
        </p>

        <p className="copyright">© 2026 Ethio-Trip. All rights reserved.</p>
      </footer>
    </main>
  );
}
