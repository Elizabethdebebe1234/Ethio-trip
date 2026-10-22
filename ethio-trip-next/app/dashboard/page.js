import DestinationChart from "./DestinationChart";
import BudgetChart from "./BudgetChart";
import { demoTrips } from "../lib/data";
import { formatETB } from "../lib/format";
import Link from "next/link";

export const metadata = {
  title: "Travel Dashboard | Ethio-Trip",
  description: "Review example travel plans, destination regions, and estimated trip budgets in Ethiopia.",
};

export default function DashboardPage() {
  const totalBudget = demoTrips.reduce((sum, trip) => sum + trip.budget, 0);
  const averageBudget = Math.round(totalBudget / demoTrips.length);

  const cards = [
    { label: "Example trip plans", value: demoTrips.length },
    { label: "Regions represented", value: new Set(demoTrips.map((trip) => trip.region)).size },
    { label: "Combined example budget", value: formatETB(totalBudget) },
    { label: "Average budget per trip", value: formatETB(averageBudget) },
  ];

  return (
    <main className="min-h-screen bg-[#f8f7f2] px-4 py-10 text-stone-800 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Link href="/" className="text-sm font-semibold text-emerald-800 hover:underline">← Back to home</Link>
        <div className="mb-8 mt-5">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-700">Ethio-Trip insights</p>
          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">Travel Dashboard</h1>
          <p className="mt-2 max-w-2xl text-stone-600">
            Explore example travel budgets and destination summaries. These figures are sample data for demonstrating dashboard features.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <article key={card.label} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-stone-500">{card.label}</p>
              <p className="mt-3 text-2xl font-extrabold text-emerald-900">{card.value}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <DestinationChart />
          <BudgetChart />
        </div>

        <div className="mt-8 rounded-2xl bg-emerald-950 p-6 text-white sm:flex sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold">Review trip plans</h2>
            <p className="mt-1 text-sm text-emerald-100">Sort and browse the example itinerary list.</p>
          </div>
          <Link href="/trips" className="mt-4 inline-block rounded-xl bg-amber-400 px-5 py-3 font-bold text-emerald-950 hover:bg-amber-300 sm:mt-0">
            View trip history →
          </Link>
        </div>
      </div>
    </main>
  );
}
