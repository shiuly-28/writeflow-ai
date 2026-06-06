import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { FileText, Zap, TrendingUp, Award, RefreshCw } from "lucide-react";
import Link from "next/link";
import DashboardChart from "@/app/components/dashboard/DashboardChart";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user as any;

  const topStats = [
    { label: "Total Documents", sub: "All time", value: "12", text: "text-amber-600", bg: "bg-amber-50/60 border-amber-500/30", icon: FileText },
    { label: "Words Generated", sub: "All time", value: "8,420", text: "text-amber-700", bg: "bg-amber-50/60 border-amber-500/30", icon: TrendingUp },
    { label: "AI Calls Used", sub: "This month", value: "34", text: "text-amber-600", bg: "bg-amber-50/60 border-amber-500/30", icon: Zap },
    { label: "Current Plan", sub: "Active", value: "Free", text: "text-amber-700", bg: "bg-amber-50/60 border-amber-500/30", icon: Award },
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
    <div className="bg-white min-h-screen text-slate-800 p-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
            User <span className="text-amber-500">Overview</span>
          </h1>
          <p className="text-slate-500 text-xs mt-0.5">Welcome back, {user?.name?.split(" ")[0] || "User"}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Session Active
          </div>
          <button className="p-2 rounded-xl bg-slate-100 hover:bg-amber-50 hover:text-amber-600 transition-all text-slate-500 border border-transparent hover:border-amber-200">
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {topStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className={`${stat.bg} border-2 rounded-2xl p-5 relative overflow-hidden bg-white shadow-sm transition-all hover:shadow-md`}>
              <div className="absolute right-3 top-3 opacity-15">
                <Icon className={`h-12 w-12 ${stat.text}`} />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{stat.label}</p>
              <p className={`text-3xl font-black mt-2 text-slate-900`}>{stat.value}</p>
              <p className="text-xs text-slate-400 font-medium mt-0.5">{stat.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {secondaryStats.map((stat) => (
          <div key={stat.label} className="bg-white border-2 border-slate-100 rounded-xl p-4 shadow-sm hover:border-amber-500/20 transition-all">
            <p className="text-[11px] text-slate-500 font-bold tracking-tight">{stat.label}</p>
            <p className="text-xl font-black text-slate-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Chart + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Chart Area */}
        <div className="lg:col-span-2 bg-white rounded-2xl border-2 border-slate-100 p-2 shadow-sm">
          <DashboardChart />
        </div>

        {/* Quick Actions */}
        <div className="bg-white border-2 border-amber-500 rounded-2xl p-5 shadow-sm">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-4">Quick Actions</h3>
          <div className="space-y-2">
            {[
              { href: "/dashboard/documents", label: "My Documents", icon: FileText },
              { href: "/explore", label: "Explore Templates", icon: Zap },
              { href: "/dashboard/usage", label: "AI Usage History", icon: TrendingUp },
              { href: "/dashboard/profile", label: "My Profile", icon: Award },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 p-3 bg-amber-50/50 border border-amber-100/50 hover:border-amber-500/30 hover:bg-amber-50 rounded-xl transition-all group"
                >
                  <Icon className="h-4 w-4 text-amber-600 transition-transform group-hover:scale-110" />
                  <span className="text-sm font-bold text-slate-700 group-hover:text-amber-700">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}