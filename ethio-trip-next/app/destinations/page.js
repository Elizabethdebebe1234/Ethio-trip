import DestinationsClient from "./DestinationsClient";

export const metadata = {
  title: "Destinations",
  description:
    "Explore Ethiopia's historical sites, natural wonders, cultural experiences, and travel destinations.",
  alternates: {
    canonical: "/destinations",
  },
};

export default function DestinationsPage() {
  return <DestinationsClient />;
}