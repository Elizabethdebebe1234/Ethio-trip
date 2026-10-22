"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { spendingByDay } from "../lib/data";
import { formatETB } from "../lib/format";

export default function BudgetChart() {
  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold text-stone-900">Illustrative travel spending</h2>
      <p className="mb-4 text-sm text-stone-500">Example budget allocation by travel day (ETB)</p>
      <div className="h-72 w-full" role="img" aria-label="Line chart showing example spending by travel day in Ethiopian birr">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={spendingByDay} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip formatter={(value) => formatETB(Number(value))} />
            <Line type="monotone" dataKey="budget" name="Budget" stroke="#b7791f" strokeWidth={3} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
