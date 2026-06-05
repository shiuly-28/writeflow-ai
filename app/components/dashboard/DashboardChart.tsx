"use client";

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar, Legend,
} from "recharts";
import { useState } from "react";

const weeklyData = [
  { day: "Mon", words: 420, aiCalls: 4 },
  { day: "Tue", words: 890, aiCalls: 8 },
  { day: "Wed", words: 650, aiCalls: 6 },
  { day: "Thu", words: 1200, aiCalls: 12 },
  { day: "Fri", words: 980, aiCalls: 9 },
  { day: "Sat", words: 560, aiCalls: 5 },
  { day: "Sun", words: 720, aiCalls: 7 },
];

const monthlyData = [
  { day: "Week 1", words: 3200, aiCalls: 28 },
  { day: "Week 2", words: 4100, aiCalls: 35 },
  { day: "Week 3", words: 3800, aiCalls: 31 },
  { day: "Week 4", words: 5200, aiCalls: 44 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-lg">
        <p className="text-gray-500 text-xs font-medium mb-2">{label}</p>
        {payload.map((entry: any) => (
          <p key={entry.name} className="text-sm font-bold" style={{ color: entry.color }}>
            {entry.name}: <span className="text-gray-900">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function DashboardChart() {
  const [view, setView] = useState<"weekly" | "monthly">("weekly");
  const [chartType, setChartType] = useState<"area" | "bar">("area");
  const data = view === "weekly" ? weeklyData : monthlyData;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm h-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-sm font-black text-gray-900 uppercase tracking-tight">
            Activity & <span className="text-indigo-600">Performance</span>
          </h2>
          <p className="text-gray-400 text-xs mt-0.5">Words generated ও AI calls</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
            {(["area", "bar"] as const).map((type) => (
              <button key={type} onClick={() => setChartType(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                  chartType === type ? "bg-indigo-600 text-white shadow" : "text-gray-500 hover:text-gray-700"
                }`}
              >{type}</button>
            ))}
          </div>
          <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
            {(["weekly", "monthly"] as const).map((v) => (
              <button key={v} onClick={() => setView(v)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                  view === v ? "bg-indigo-600 text-white shadow" : "text-gray-500 hover:text-gray-700"
                }`}
              >{v}</button>
            ))}
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        {chartType === "area" ? (
          <AreaChart data={data}>
            <defs>
              <linearGradient id="wordsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="callsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="day" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: "12px", color: "#64748b" }} />
            <Area type="monotone" dataKey="words" name="Words" stroke="#4f46e5" strokeWidth={2.5} fill="url(#wordsGrad)" />
            <Area type="monotone" dataKey="aiCalls" name="AI Calls" stroke="#06b6d4" strokeWidth={2.5} fill="url(#callsGrad)" />
          </AreaChart>
        ) : (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="day" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: "12px", color: "#64748b" }} />
            <Bar dataKey="words" name="Words" fill="#4f46e5" radius={[4, 4, 0, 0]} />
            <Bar dataKey="aiCalls" name="AI Calls" fill="#06b6d4" radius={[4, 4, 0, 0]} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}