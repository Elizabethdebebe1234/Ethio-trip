# 🇪🇹 Ethio-Trip — Discover Ethiopia

**Explore Ethiopia. Plan your journey. Experience its heritage.**

Ethio-Trip is a Next.js tourism web application designed to help travelers discover Ethiopia's beautiful destinations, explore cultural and historical attractions, and plan memorable trips.

## 🌐 Live Demo

**[Visit Ethio-Trip](https://ethio-trip-coral.vercel.app/)**

## ✨ Features

- **Destination Explorer:** Discover Ethiopian destinations, including Lalibela, the Simien Mountains, Lake Tana, Harar, the Danakil Depression, Addis Ababa, Konso, the Bale Mountains, and Gondar.
- **Destination Search and Filtering:** Explore destinations by category and find places of interest.
- **Destination Details:** Learn about destinations, highlights, and travel recommendations.
- **Trip Planning:** Plan trips using destination information, estimated durations, and daily budgets.
- **Responsive Design:** Browse the application on desktop, tablet, and mobile devices.
- **API Integration:** Load destination data through Next.js API routes.
- **Ethiopian Identity:** A travel experience inspired by Ethiopia's cultural heritage, history, and natural beauty.
- **User-Friendly Interface:** Clear navigation and destination cards make exploring easier.

## 🛠️ Technologies Used

- **Next.js** — React framework for web applications
- **React** — Component-based user interfaces
- **JavaScript** — Application functionality
- **CSS** — Layout, styling, and responsive design
- **SWR** — Client-side data fetching and revalidation
- **Next.js API Routes** — Destination data endpoints
- **Git and GitHub** — Version control and source code management
- **Vercel** — Deployment and hosting

## 📍 Featured Destinations

| Destination | Category |
|---|---|
| Lalibela | History & Culture |
| Simien Mountains | Nature & Adventure |
| Lake Tana | Nature & Culture |
| Harar | History & Culture |
| Danakil Depression | Nature & Adventure |
| Addis Ababa | City & Food |
| Konso Cultural Landscape | History & Culture |
| Bale Mountains | Nature & Adventure |
| Gondar | History & Culture |

## 🚀 Run Locally

### Prerequisites

- Node.js
- npm
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Elizabethdebebe1234/Ethio-trip.git
   ```

2. Navigate to the Next.js application directory:

   ```bash
   cd Ethio-trip/ethio-trip-next
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the application in your browser:

   ```text
   http://localhost:3000
   ```

### Production Build

To verify that the application can be built for production, run:

```bash
npm run build
```

To start the production server locally:

```bash
npm run start
```

## 📂 Project Structure

```text
ethio-trip-next/
├── app/
│   ├── api/
│   │   └── destinations/
│   │       └── route.js
│   ├── destinations/
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── lib/
│   └── destinations.js
├── public/
├── README.md
├── AUTH.md
├── DATA.md
├── PERF.md
└── package.json
```

*Note: The structure above highlights the main files and folders; your application may contain additional routes and components.*

## 🧩 API Endpoint

The destination API returns the destination data used by the application.

```text
GET /api/destinations
```

When running locally, visit:

[http://localhost:3000/api/destinations](http://localhost:3000/api/destinations)

## 🎯 Project Objectives

- Promote Ethiopian tourism through an accessible digital experience.
- Make discovering destinations and planning trips easier.
- Apply modern frontend development techniques using Next.js and React.
- Demonstrate reusable components, API-based data fetching, responsive design, and deployment.
- Build a portfolio-quality capstone project.

## 🔮 Future Improvements

- User registration and secure authentication.
- Save favorite destinations and personalized itineraries.
- Persist trip plans across sessions and devices.
- Add hotel recommendations and transport information.
- Integrate maps and route planning.
- Connect to a database for persistent user and trip data.
- Add automated tests and improve accessibility.

## 👩‍💻 Developer

**Elizabeth Debebe**

- GitHub: [Elizabethdebebe1234](https://github.com/Elizabethdebebe1234)
- Project Repository: [Ethio-Trip](https://github.com/Elizabethdebebe1234/Ethio-trip)
- Live Demo: [ethio-trip-coral.vercel.app](https://ethio-trip-coral.vercel.app/)

---

*Ethio-Trip — Discover the beauty, history, culture, and landscapes of Ethiopia.* 🇪🇹
