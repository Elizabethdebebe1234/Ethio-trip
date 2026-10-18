
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <Link href="/" className="footer-brand">
        Ethio<span>Trip</span>
      </Link>

      <p>Discover Ethiopia. Travel with purpose. Collect stories.</p>

      <div className="footer-bottom">
        <span>© 2026 Ethio-Trip</span>
        <span>Made with care in Ethiopia ♡</span>
      </div>
    </footer>
  );
}
