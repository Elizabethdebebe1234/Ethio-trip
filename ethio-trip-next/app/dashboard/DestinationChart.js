"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { destinationStats } from "../lib/data";

export default function DestinationChart() {
  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold text-stone-900">Destinations by region</h2>
      <p className="mb-4 text-sm text-stone-500">Illustrative destination counts</p>
      <div className="h-72 w-full" role="img" aria-label="Bar chart showing illustrative destination counts by region">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={destinationStats} margin={{ top: 10, right: 10, left: 0, bottom: 35 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="region" angle={-20} textAnchor="end" interval={0} height={55} tick={{ fontSize: 11 }} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="destinations" name="Destinations" fill="#176b4d" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
