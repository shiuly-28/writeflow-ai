"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, LineChart, Line,
  PieChart, Pie, Cell, Legend,
} from "recharts";

const dailyAI = [
  { day: "Mon", calls: 12 },
  { day: "Tue", calls: 28 },
  { day: "Wed", calls: 19 },
  { day: "Thu", calls: 35 },
  { day: "Fri", calls: 22 },
  { day: "Sat", calls: 8 },
  { day: "Sun", calls: 15 },
];

const signups = [
  { week: "Week 1", users: 3 },
  { week: "Week 2", users: 7 },
  { week: "Week 3", users: 5 },
  { week: "Week 4", users: 12 },
];

const contentTypes = [
  { name: "Blog Posts", value: 45 },
  { name: "Social Media", value: 30 },
  { name: "Email Copy", value: 15 },
  { name: "Ad Copy", value: 10 },
];

const COLORS = ["#4f46e5", "#06b6d4", "#10b981", "#f59e0b"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-lg">
        <p className="text-gray-500 text-xs font-medium mb-1">{label}</p>
        {payload.map((entry: any) => (
          <p key={entry.name} className="text-sm font-bold" style={{ color: entry.color }}>
            {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AdminCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Bar Chart — Daily AI Usage */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
        <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight mb-1">
          Daily AI <span className="text-amber-500">Usage</span>
        </h3>
        <p className="text-gray-400 text-xs mb-4">এই সপ্তাহের AI calls</p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={dailyAI}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="day" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="calls" fill="#4f46e5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart — User Signups */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
        <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight mb-1">
          User <span className="text-emerald-600">Signups</span>
        </h3>
        <p className="text-gray-400 text-xs mb-4">মাসিক নতুন ইউজার</p>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={signups}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="week" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="users" stroke="#10b981" strokeWidth={2.5} dot={{ fill: "#10b981", r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart — Content Types */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
        <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight mb-1">
          Content <span className="text-amber-600">Types</span>
        </h3>
        <p className="text-gray-400 text-xs mb-4">কন্টেন্ট টাইপ breakdown</p>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={contentTypes} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
              {contentTypes.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: "11px" }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}