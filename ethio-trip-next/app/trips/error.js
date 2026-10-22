"use client";

export default function TripsError({ error, reset }) {
  return (
    <main className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-2xl font-bold">We could not load trip history</h1>
      <p className="mt-3 text-stone-600">Please try again. Your other Ethio-Trip pages may still be available.</p>
      <button onClick={() => reset()} className="mt-6 rounded-xl bg-emerald-900 px-5 py-3 font-semibold text-white hover:bg-emerald-800">
        Try again
      </button>
      {process.env.NODE_ENV === "development" && error?.message ? (
        <p className="mt-4 break-words text-left text-xs text-red-700">{error.message}</p>
      ) : null}
    </main>
  );
}
