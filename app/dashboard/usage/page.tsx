"use client";

import { useState, useEffect } from "react";
import { Zap, Search, Loader2 } from "lucide-react";

// টাইপস্ক্রিপ্ট ইন্টারফেস (মঙ্গোডিবি আইডির জন্য _id ব্যবহার করা হয়েছে)
interface UsageItem {
  _id: string;
  agent: string;
  prompt: string;
  tokens: number;
  createdAt: string;
}

export default function UsagePage() {
  const [usageData, setUsageData] = useState<UsageItem[]>([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // 💡 Debounce Effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // 💡 এপিআই থেকে ডেটা ফেচ করা
  useEffect(() => {
    const fetchUsageHistory = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/usage?search=${encodeURIComponent(debouncedSearch)}`);
        if (res.ok) {
          const data = await res.json();
          setUsageData(data);
        }
      } catch (error) {
        console.error("Failed to fetch usage history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsageHistory();
  }, [debouncedSearch]);

  return (
    <div className="bg-white min-h-screen text-slate-800 p-2">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">AI Usage History</h1>
        <p className="text-slate-600 text-sm mt-1">তোমার সব AI call এর ইতিহাস।</p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Agent বা prompt খোঁজো..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
        />
      </div>

      {/* States: Loading / Empty / Table */}
      {loading ? (
        <div className="bg-white border-2 border-slate-100 rounded-2xl p-24 text-center shadow-sm flex flex-col items-center justify-center gap-3">
          <Loader2 className="h-8 w-8 text-amber-500 animate-spin" />
          <p className="text-slate-500 text-sm font-medium">ইতিহাস লোড হচ্ছে...</p>
        </div>
      ) : usageData.length === 0 ? (
        <div className="bg-white border-2 border-slate-100 rounded-2xl p-12 text-center shadow-sm">
          <Zap className="h-12 w-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-600 font-medium">কোনো AI usage history নেই।</p>
        </div>
      ) : (
        <div className="bg-white border-2 border-amber-500 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-amber-50/50 border-b-2 border-amber-500/10">
                  <th className="text-xs text-slate-700 font-bold uppercase tracking-wider px-6 py-4">Date</th>
                  <th className="text-xs text-slate-700 font-bold uppercase tracking-wider px-6 py-4">Agent</th>
                  <th className="text-xs text-slate-700 font-bold uppercase tracking-wider px-6 py-4">Prompt</th>
                  <th className="text-xs text-slate-700 font-bold uppercase tracking-wider px-6 py-4">Tokens</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {usageData.map((u) => (
                  <tr key={u._id} className="hover:bg-amber-50/30 transition-all group">
                    <td className="px-6 py-4 text-slate-600 text-sm font-medium">
                      {new Date(u.createdAt).toLocaleDateString("en-US")}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-amber-100 border border-amber-200 text-amber-800 text-xs rounded-lg font-bold">
                        {u.agent}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-700 text-sm font-medium max-w-xs truncate group-hover:text-slate-900 transition-colors">
                      {u.prompt}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <Zap className="h-3.5 w-3.5 text-amber-500 fill-amber-500/20" />
                        <span className="text-slate-900 text-sm font-bold">{u.tokens}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}