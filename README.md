# Ethio-Trip — Ethiopian Travel Planning Application 🇪🇹

## 🌍 Project Overview

**Ethio-Trip** is an interactive Ethiopian tourism and travel planning web application built to help travelers discover destinations across Ethiopia and organize personalized journeys in one place.

Users can explore destinations, review suggested trip durations and estimated budgets, choose accommodation, build day-by-day itineraries, view interactive maps, submit trip requests, and download itinerary information as CSV reports.

🔗 **Live Application:** [https://ethio-trip-coral.vercel.app/](https://ethio-trip-coral.vercel.app/)

💻 **GitHub Repository:** [https://github.com/Elizabethdebebe1234/Ethio-trip](https://github.com/Elizabethdebebe1234/Ethio-trip)

## 🔐 Demo Access

Ethio-Trip supports customer and trip guide roles.

To request demonstration credentials for the trip guide area, please contact the project developer directly.

**Security note:** Demo credentials are provided privately and should not be published in this repository.

## ✨ Features

- Explore Ethiopian travel destinations and their details.
- Plan trips by selecting destinations and travel dates.
- Review suggested trip durations and estimated budgets.
- Generate day-by-day itineraries.
- Select accommodation and estimate travel costs.
- Download itinerary information as a CSV report.
- Sign in using customer or guide roles.
- Submit trip requests and track their status.
- Explore destinations using interactive maps.
- Navigate responsive pages across different screen sizes.
- Access customer and guide areas with role-based authorization.

## 🛠️ Technologies

- **Next.js** — React framework and application routing.
- **React** — Component-based user interface development.
- **JavaScript** — Application logic and interactivity.
- **Next.js App Router** — File-system-based routing and page layouts.
- **CSS** — Responsive styling and visual design.
- **SWR** — Data fetching and caching where implemented.
- **Leaflet and React Leaflet** — Interactive maps.
- **OpenStreetMap** — Map tiles.
- **Supabase** — Authentication and data services where configured.
- **Browser localStorage** — Client-side trip history where implemented.
- **Cookie-based sessions** — Session management and authentication.
- **Vercel** — Production deployment and hosting.

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- Git

### Installation

Clone the repository:

```bash
git clone https://github.com/Elizabethdebebe1234/Ethio-trip.git
```

Navigate to the Next.js application directory:

```bash
cd Ethio-trip/ethio-trip-next
```

Install dependencies:

```bash
npm install
```

### Environment Configuration

Create a `.env.local` file in the Next.js application directory and configure the environment variables required by the application.

Use the variable names documented in the project configuration and authentication documentation. Obtain your own credentials from the relevant service providers.

**Never commit `.env.local`, passwords, API secrets, or private authentication credentials to GitHub.**

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

Build the application:

```bash
npm run build
```

Start the production server locally:

```bash
npm run start
```

## 🔒 Data and Security

See [`DATA.md`](./DATA.md) for data handling, fetching, and caching details.

See [`AUTH.md`](./AUTH.md) for authentication, session management, and authorization details.

## ⚡ Performance and SEO

See [`PERF.md`](./PERF.md) for performance optimization, metadata, and related implementation details.

## 🔮 Future Improvements

See [`FUTURE.md`](./FUTURE.md) for known limitations and planned enhancements.

## 📝 Peer Review

See [`REVIEW.md`](./REVIEW.md) for the project's peer code review.

## ☁️ Deployment

Ethio-Trip is deployed on Vercel.

**Visit the live application:**  
https://ethio-trip-coral.vercel.app/

## 🎓 Project Background

Ethio-Trip was developed as a full-stack web development capstone project, representing approximately 50 days of learning, development, testing, debugging, and continuous improvement.

The project demonstrates practical application of modern web development concepts, including routing, reusable components, authentication, role-based access, data fetching, interactive maps, travel planning, CSV exports, responsive design, and deployment.

Built with a passion for technology and a vision to make exploring Ethiopia easier. 🇪🇹
