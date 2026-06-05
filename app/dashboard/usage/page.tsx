"use client";

import { useState } from "react";
import { Zap, Search } from "lucide-react";

const mockUsage = [
  { id: 1, date: "2025-01-10", agent: "Content Draft", prompt: "Write a blog about AI trends...", tokens: 850 },
  { id: 2, date: "2025-01-09", agent: "Rewrite & Tone", prompt: "Make this more formal...", tokens: 320 },
  { id: 3, date: "2025-01-08", agent: "Chat Assistant", prompt: "Help me outline my article...", tokens: 210 },
];

export default function UsagePage() {
  const [search, setSearch] = useState("");

  const filtered = mockUsage.filter((u) =>
    u.prompt.toLowerCase().includes(search.toLowerCase()) ||
    u.agent.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">AI Usage History</h1>
        <p className="text-slate-400 text-sm mt-1">তোমার সব AI call এর ইতিহাস।</p>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
        <input
          type="text"
          placeholder="Agent বা prompt খোঁজো..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-900 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="bg-slate-900 border border-white/10 rounded-2xl p-12 text-center">
          <Zap className="h-12 w-12 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-400">কোনো AI usage history নেই।</p>
        </div>
      ) : (
        <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-xs text-slate-400 font-medium px-6 py-4">Date</th>
                <th className="text-left text-xs text-slate-400 font-medium px-6 py-4">Agent</th>
                <th className="text-left text-xs text-slate-400 font-medium px-6 py-4">Prompt</th>
                <th className="text-left text-xs text-slate-400 font-medium px-6 py-4">Tokens</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="border-b border-white/5 hover:bg-white/5 transition-all">
                  <td className="px-6 py-4 text-slate-400 text-sm">{u.date}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-indigo-500/20 text-indigo-400 text-xs rounded-lg font-medium">
                      {u.agent}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-300 text-sm max-w-xs truncate">{u.prompt}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <Zap className="h-3.5 w-3.5 text-amber-400" />
                      <span className="text-white text-sm font-medium">{u.tokens}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}