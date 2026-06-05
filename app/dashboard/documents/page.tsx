"use client";

import { useState } from "react";
import { FileText, Search, Plus, Filter } from "lucide-react";

const mockDocuments = [
  { id: 1, title: "Blog Post: AI in 2025", status: "published", words: 850, date: "2025-01-10" },
  { id: 2, title: "Email Campaign Draft", status: "draft", words: 320, date: "2025-01-09" },
  { id: 3, title: "Social Media Captions", status: "archived", words: 150, date: "2025-01-08" },
];

const statusColors: Record<string, string> = {
  published: "bg-emerald-500/20 text-emerald-400",
  draft: "bg-amber-500/20 text-amber-400",
  archived: "bg-slate-500/20 text-slate-400",
};

export default function DocumentsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = mockDocuments.filter((doc) => {
    const matchSearch = doc.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || doc.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">My Documents</h1>
          <p className="text-slate-400 text-sm mt-1">তোমার সব ড্রাফট ও পাবলিশড কন্টেন্ট।</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm font-medium rounded-xl hover:opacity-90 transition-all">
          <Plus className="h-4 w-4" />
          New Document
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Document খোঁজো..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400" />
          {["all", "draft", "published", "archived"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-xl text-xs font-medium capitalize transition-all ${
                filter === f
                  ? "bg-indigo-500 text-white"
                  : "bg-slate-900 border border-white/10 text-slate-400 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Table */}
      {filtered.length === 0 ? (
        <div className="bg-slate-900 border border-white/10 rounded-2xl p-12 text-center">
          <FileText className="h-12 w-12 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-400">কোনো document পাওয়া যায়নি।</p>
          <p className="text-slate-500 text-sm mt-1">নতুন document তৈরি করো →</p>
        </div>
      ) : (
        <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-xs text-slate-400 font-medium px-6 py-4">Title</th>
                <th className="text-left text-xs text-slate-400 font-medium px-6 py-4">Status</th>
                <th className="text-left text-xs text-slate-400 font-medium px-6 py-4">Words</th>
                <th className="text-left text-xs text-slate-400 font-medium px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((doc) => (
                <tr key={doc.id} className="border-b border-white/5 hover:bg-white/5 transition-all">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-indigo-400" />
                      <span className="text-white text-sm font-medium">{doc.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium capitalize ${statusColors[doc.status]}`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm">{doc.words}</td>
                  <td className="px-6 py-4 text-slate-400 text-sm">{doc.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}