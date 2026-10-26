# Ethio-Trip - Ethiopian Travel Planning Application

## Project Overview

Ethio-Trip is a travel planning web application designed to help users explore destinations in Ethiopia and organize their trips. Users can browse destinations, review suggested trip durations and estimated budgets, choose accommodation, build an itinerary, and download their itinerary as a CSV report.

**Live Application:** https://ethio-trip-f7d5.vercel.app/

**GitHub Repository:** https://github.com/Elizabethdebebe1234/Ethio-trip

## Demo Login Credentials




To access the guide account, please contact me to request the guide login credentials.

**Note:** These credentials are provided for demonstration purposes only.

## Features

- Explore Ethiopian travel destinations.
- View individual destination details.
- Plan trips by selecting destinations and travel dates.
- Compare suggested trip duration with available travel dates.
- View a day-by-day itinerary.
- Select accommodation and estimate costs.
- Download itinerary information as a CSV report.
- Sign in with customer or guide roles.
- Submit trip requests with pending status.
- View interactive destination maps.
- Use responsive pages on different screen sizes.

## Technologies

- Next.js and React
- JavaScript
- Next.js App Router
- CSS
- SWR for data fetching and caching where implemented
- Leaflet and React Leaflet for interactive maps
- OpenStreetMap for map tiles
- Browser localStorage for client-side trip history where implemented
- Cookie-based session authentication
- Vercel for deployment

## Getting Started

### Requirements

- Node.js
- npm
- Git

### Installation

Clone the repository:

```bash
git clone https://github.com/Elizabethdebebe1234/Ethio-trip.git
cd Ethio-trip/ethio-trip-next
npm install
```

Create a local `.env.local` file and configure the authentication variables required by the application. Never commit real passwords or secrets.

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### Production Build

```bash
npm run build
npm run start
```

## Data and Security

See `DATA.md` for data fetching and caching, and `AUTH.md` for authentication and authorization details.

## Performance

See `PERF.md` for optimization strategies and measured results.

## Future Improvements

See `FUTURE.md` for known limitations and planned enhancements.

## Peer Review

See `REVIEW.md` for the peer code review.

## Deployment

The application is deployed on Vercel:

https://ethio-trip-f7d5.vercel.app/

## Project Status

This project was developed as a full-stack web development capstone to demonstrate routing, interactive trip planning, authentication, data handling, and deployment.
