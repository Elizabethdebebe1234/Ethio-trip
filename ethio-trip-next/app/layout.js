
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "leaflet/dist/leaflet.css";


export const metadata = {
  metadataBase: new URL("https://your-production-domain.com"),

  title: {
    template: "%s | Ethio-Trip",
    default: "Ethio-Trip | Explore Ethiopia",
  },

  description:
    "Discover Ethiopia's historic sites, beautiful landscapes, cultural experiences, and travel destinations. Plan your journey with Ethio-Trip.",

  applicationName: "Ethio-Trip",

  openGraph: {
    title: "Ethio-Trip | Explore Ethiopia",
    description:
      "Discover Ethiopia's destinations, explore local experiences, and plan your journey with Ethio-Trip.",
    type: "website",
    locale: "en_ET",
    siteName: "Ethio-Trip",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
