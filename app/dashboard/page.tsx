import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { FileText, Zap, TrendingUp, Award, RefreshCw } from "lucide-react";
import Link from "next/link";
import DashboardChart from "@/app/components/dashboard/DashboardChart";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user as any;

  const topStats = [
    { label: "Total Documents", sub: "All time", value: "12", bg: "bg-indigo-600", icon: FileText },
    { label: "Words Generated", sub: "All time", value: "8,420", bg: "bg-emerald-500", icon: TrendingUp },
    { label: "AI Calls Used", sub: "This month", value: "34", bg: "bg-blue-500", icon: Zap },
    { label: "Current Plan", sub: "Active", value: "Free", bg: "bg-violet-500", icon: Award },
  ];

  const secondaryStats = [
    { label: "Documents This Month", value: "3" },
    { label: "Words This Week", value: "1,240" },
    { label: "Templates Used", value: "5" },
    { label: "Drafts Saved", value: "8" },
    { label: "Published", value: "4" },
    { label: "Archived", value: "0" },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
            User <span className="text-indigo-600">Overview</span>
          </h1>
          <p className="text-gray-400 text-xs mt-0.5">Welcome back, {user?.name?.split(" ")[0]}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-emerald-500 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Session Active
          </div>
          <button className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all">
            <RefreshCw className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Top Stat Cards */}
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

      {/* Chart + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <DashboardChart />
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight mb-4">Quick Actions</h3>
          <div className="space-y-2">
            {[
              { href: "/dashboard/documents", label: "My Documents", icon: FileText, color: "text-indigo-600", bg: "bg-indigo-50 hover:bg-indigo-100" },
              { href: "/explore", label: "Explore Templates", icon: Zap, color: "text-emerald-600", bg: "bg-emerald-50 hover:bg-emerald-100" },
              { href: "/dashboard/usage", label: "AI Usage History", icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50 hover:bg-blue-100" },
              { href: "/dashboard/profile", label: "My Profile", icon: Award, color: "text-violet-600", bg: "bg-violet-50 hover:bg-violet-100" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 p-3 ${item.bg} rounded-xl transition-all`}
                >
                  <Icon className={`h-4 w-4 ${item.color}`} />
                  <span className={`text-sm font-semibold ${item.color}`}>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}