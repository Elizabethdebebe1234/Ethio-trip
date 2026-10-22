import Link from "next/link";
import { demoTrips } from "../lib/data";
import { formatETB } from "../lib/format";

export const metadata = {
  title: "Trip History | Ethio-Trip",
  description: "Browse, sort, and review example Ethiopia travel itineraries and estimated budgets.",
};

export default async function TripsPage({ searchParams }) {
  const params = await searchParams;
  const sort = ["destination", "region", "days", "budget", "status"].includes(params?.sort) ? params.sort : "destination";
  const dir = params?.dir === "desc" ? "desc" : "asc";
  const page = Math.max(1, Number.parseInt(params?.page || "1", 10) || 1);
  const pageSize = 4;

  const sortedTrips = [...demoTrips].sort((a, b) => {
    const first = a[sort];
    const second = b[sort];
    const comparison = typeof first === "number"
      ? first - second
      : String(first).localeCompare(String(second));
    return dir === "asc" ? comparison : -comparison;
  });

  const totalPages = Math.max(1, Math.ceil(sortedTrips.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const trips = sortedTrips.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const nextDir = dir === "asc" ? "desc" : "asc";

  function sortUrl(field) {
    const direction = sort === field ? nextDir : "asc";
    return `/trips?sort=${field}&dir=${direction}&page=1`;
  }

  return (
    <main className="min-h-screen bg-[#f8f7f2] px-4 py-10 text-stone-800 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/dashboard" className="text-sm font-semibold text-emerald-800 hover:underline">← Dashboard</Link>
        <h1 className="mt-5 text-3xl font-extrabold sm:text-4xl">Trip History</h1>
        <p className="mt-2 text-stone-600">Demonstration itineraries with sortable columns and shareable page links.</p>

        {trips.length === 0 ? (
          <section className="mt-8 rounded-2xl border border-dashed border-stone-300 bg-white p-10 text-center">
            <h2 className="text-xl font-bold">No trips to display</h2>
            <p className="mt-2 text-stone-600">Create or save a trip to see it here when real trip storage is connected.</p>
          </section>
        ) : (
          <div className="mt-8 overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-sm">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <caption className="p-4 text-left text-sm text-stone-500">
                Example trip plans — page {currentPage} of {totalPages}. Select a column heading to sort.
              </caption>
              <thead className="bg-emerald-950 text-white">
                <tr>
                  {[
                    ["destination", "Destination"],
                    ["region", "Region"],
                    ["days", "Days"],
                    ["budget", "Estimated budget"],
                    ["status", "Status"],
                  ].map(([field, label]) => (
                    <th key={field} scope="col" aria-sort={sort === field ? (dir === "asc" ? "ascending" : "descending") : "none"} className="px-5 py-4 font-semibold">
                      <Link href={sortUrl(field)} className="hover:text-amber-300">
                        {label}{sort === field ? (dir === "asc" ? " ↑" : " ↓") : ""}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {trips.map((trip) => (
                  <tr key={trip.id} className="border-t border-stone-100 hover:bg-amber-50">
                    <th scope="row" className="px-5 py-4 font-semibold">{trip.destination}</th>
                    <td className="px-5 py-4">{trip.region}</td>
                    <td className="px-5 py-4">{trip.days}</td>
                    <td className="px-5 py-4 font-medium">{formatETB(trip.budget)}</td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-800">{trip.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <nav aria-label="Trip history pagination" className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-stone-600">Showing {trips.length} of {sortedTrips.length} example trips</p>
          <div className="flex gap-2">
            <Link
              aria-disabled={currentPage <= 1}
              className={`rounded-lg border px-4 py-2 ${currentPage <= 1 ? "pointer-events-none opacity-40" : "hover:bg-white"}`}
              href={`/trips?sort=${sort}&dir=${dir}&page=${Math.max(1, currentPage - 1)}`}
            >← Previous</Link>
            <span className="rounded-lg bg-emerald-950 px-4 py-2 text-white">{currentPage} / {totalPages}</span>
            <Link
              aria-disabled={currentPage >= totalPages}
              className={`rounded-lg border px-4 py-2 ${currentPage >= totalPages ? "pointer-events-none opacity-40" : "hover:bg-white"}`}
              href={`/trips?sort=${sort}&dir=${dir}&page=${Math.min(totalPages, currentPage + 1)}`}
            >Next →</Link>
          </div>
        </nav>
      </div>
    </main>
  );
}
