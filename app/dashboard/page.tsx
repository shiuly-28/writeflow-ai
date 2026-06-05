import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { FileText, Zap, TrendingUp, Award } from "lucide-react";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user as any;

  const stats = [
    {
      label: "Total Documents",
      value: "0",
      icon: FileText,
      color: "text-indigo-400",
      bg: "bg-indigo-500/10",
    },
    {
      label: "Words Generated",
      value: "0",
      icon: TrendingUp,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
    },
    {
      label: "AI Calls Used",
      value: "0",
      icon: Zap,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
    {
      label: "Current Plan",
      value: "Free",
      icon: Award,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">
          Welcome back, {user?.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          এখানে তোমার সব কন্টেন্ট ম্যানেজ করতে পারবে।
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-slate-900 border border-white/10 rounded-2xl p-5"
            >
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-slate-400 text-xs mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
        <h2 className="text-white font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          
            href="/dashboard/documents"
            className="flex items-center gap-3 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl hover:bg-indigo-500/20 transition-all"
          >
            <FileText className="h-5 w-5 text-indigo-400" />
            <span className="text-white text-sm font-medium">New Document</span>
          </a>
          
            href="/explore"
            className="flex items-center gap-3 p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl hover:bg-cyan-500/20 transition-all"
          >
            <Zap className="h-5 w-5 text-cyan-400" />
            <span className="text-white text-sm font-medium">Explore Templates</span>
          </a>
          
            href="/dashboard/profile"
            className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl hover:bg-emerald-500/20 transition-all"
          >
            <Award className="h-5 w-5 text-emerald-400" />
            <span className="text-white text-sm font-medium">Upgrade Plan</span>
          </a>
        </div>
      </div>
    </div>
  );
}