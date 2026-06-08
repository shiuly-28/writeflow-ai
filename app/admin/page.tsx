import { Users, FileText, Zap, DollarSign, TrendingUp, RefreshCw } from "lucide-react";
import AdminCharts from "@/app/components/dashboard/AdminCharts";

export default function AdminPage() {
  const topStats = [
    { label: "Total Users", sub: "All time", value: "2", bg: "bg-amber-500", icon: Users },
    { label: "Total Documents", sub: "All time", value: "0", bg: "bg-emerald-500", icon: FileText },
    { label: "AI Calls Today", sub: "Today", value: "0", bg: "bg-blue-500", icon: Zap },
    { label: "Monthly Revenue", sub: "This month", value: "$0", bg: "bg-violet-500", icon: DollarSign },
  ];

  const secondaryStats = [
    { label: "New Users Today", value: "0" },
    { label: "Active Users", value: "2" },
    { label: "Pro Users", value: "0" },
    { label: "Team Users", value: "0" },
    { label: "Total AI Calls", value: "0" },
    { label: "Avg Tokens/Call", value: "0" },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
            Admin <span className="text-amber-500">Overview</span>
          </h1>
          <p className="text-gray-400 text-xs mt-0.5">প্ল্যাটফর্মের সব কিছু এখান থেকে ম্যানেজ করো।</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-emerald-500 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            System Online
          </div>
          <button className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all">
            <RefreshCw className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {topStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className={`${stat.bg} rounded-2xl p-5 text-white relative overflow-hidden`}>
              <div className="absolute right-3 top-3 opacity-20">
                <Icon className="h-12 w-12" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider opacity-80">{stat.label}</p>
              <p className="text-3xl font-black mt-2">{stat.value}</p>
              <p className="text-xs opacity-70 mt-0.5">{stat.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {secondaryStats.map((stat) => (
          <div key={stat.label} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <p className="text-xs text-gray-400 font-medium">{stat.label}</p>
            <p className="text-xl font-black text-gray-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <AdminCharts />
    </div>
  );
}