"use client";

import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
} from "react-leaflet";

const destinations = [
  {
    name: "Addis Ababa",
    region: "Central Ethiopia",
    position: [9.03, 38.74],
    description: "Discover Ethiopia's capital, museums, markets, and culture.",
  },
  {
    name: "Lalibela",
    region: "Amhara",
    position: [11.85, 39.60],
    description: "Explore the famous rock-hewn churches.",
  },
  {
    name: "Gondar",
    region: "Amhara",
    position: [12.60, 37.47],
    description: "Visit historic castles and royal architecture.",
  },
  {
    name: "Axum",
    region: "Tigray",
    position: [14.12, 38.72],
    description: "Discover ancient obelisks and archaeological heritage.",
  },
  {
    name: "Simien Mountains",
    region: "Amhara",
    position: [13.18, 38.07],
    description: "Explore dramatic mountain scenery and hiking trails.",
  },
  {
    name: "Bishoftu",
    region: "Oromia",
    position: [8.75, 38.98],
    description: "Enjoy beautiful crater lakes and lakeside scenery.",
  },
  {
    name: "Lake Tana",
    region: "Amhara",
    position: [11.60, 37.35],
    description: "Discover Ethiopia's largest lake and its island monasteries.",
  },
  {
    name: "Harar",
    region: "Eastern Ethiopia",
    position: [9.31, 42.12],
    description: "Explore the historic walled city and its distinctive culture.",
  },
  {
    name: "Bale Mountains",
    region: "Oromia",
    position: [6.85, 39.75],
    description: "Discover highland landscapes and wildlife.",
  },
];

export default function EthiopiaMap() {
  return (
    <section className="ethiopia-map-section">
      <div className="ethiopia-map-heading">
        <p className="ethiopia-map-eyebrow">EXPLORE THE COUNTRY</p>
        <h2>Discover Ethiopia on the Map</h2>
        <p>
          Select a marker to learn about a destination. Zoom in and move
          around the map to explore different regions.
        </p>
      </div>

      <div className="ethiopia-map-frame">
        <MapContainer
          center={[9.145, 40.489]}
          zoom={5}
          minZoom={4}
          maxZoom={12}
          scrollWheelZoom={false}
          className="ethiopia-map"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {destinations.map((destination) => (
            <CircleMarker
              key={destination.name}
              center={destination.position}
              radius={8}
              pathOptions={{
                color: "#ffffff",
                weight: 2,
                fillColor: "#c69b3c",
                fillOpacity: 1,
              }}
            >
              <Popup>
                <div className="ethiopia-map-popup">
                  <strong>{destination.name}</strong>
                  <p>{destination.region}</p>
                  <p>{destination.description}</p>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      <p className="ethiopia-map-note">
        Map data © OpenStreetMap contributors. An internet connection is
        required to load map tiles.
      </p>
    </section>
  );
}
