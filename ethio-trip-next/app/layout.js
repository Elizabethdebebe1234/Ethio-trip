
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Ethio-Trip | Explore Ethiopia",
  description:
    "Discover Ethiopia's destinations, explore local experiences, and plan your journey with Ethio-Trip.",
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
