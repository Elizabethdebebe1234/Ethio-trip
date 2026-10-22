export default function TripsLoading() {
  return (
    <main className="mx-auto max-w-6xl animate-pulse px-4 py-10">
      <div className="h-8 w-56 rounded bg-stone-200" />
      <div className="mt-3 h-4 w-80 max-w-full rounded bg-stone-200" />
      <div className="mt-8 space-y-3 rounded-2xl border p-5">
        {[1, 2, 3, 4].map((item) => <div key={item} className="h-12 rounded bg-stone-100" />)}
      </div>
      <p className="mt-4 text-sm text-stone-500">Loading trip history…</p>
    </main>
  );
}
