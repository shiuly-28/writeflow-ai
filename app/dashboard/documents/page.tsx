"use client";

import { useState } from "react";
import { FileText, Search, Plus, Filter } from "lucide-react";
import Link from "next/link";

const mockDocuments = [
  { id: 1, title: "Blog Post: AI in 2025", status: "published", words: 850, date: "2025-01-10" },
  { id: 2, title: "Email Campaign Draft", status: "draft", words: 320, date: "2025-01-09" },
  { id: 3, title: "Social Media Captions", status: "archived", words: 150, date: "2025-01-08" },
];

const statusColors: Record<string, string> = {
  published: "bg-emerald-100 text-emerald-800 border-emerald-200",
  draft: "bg-amber-100 text-amber-800 border-amber-200",
  archived: "bg-slate-100 text-slate-700 border-slate-200",
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
    <div className="bg-white min-h-screen text-slate-800 p-2">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Documents</h1>
          <p className="text-slate-600 text-sm mt-1">তোমার সব ড্রাফট ও পাবলিশড কন্টেন্ট।</p>
        </div>
       <Link
  href="/dashboard/documents/new"
  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-medium rounded-xl hover:opacity-90 transition-all"
>
  <Plus className="h-4 w-4" />
  New Document
</Link>
      </div>

      {/* Search & Filter Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Document খোঁজো..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
          />
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
          <div className="flex items-center gap-1.5 text-slate-500 mr-1 flex-shrink-0">
            <Filter className="h-4 w-4" />
            <span className="text-xs font-bold uppercase">Filter:</span>
          </div>
          {["all", "draft", "published", "archived"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all border ${
                filter === f
                  ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                  : "bg-white border-slate-200 text-slate-600 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Table / Card Container */}
      {filtered.length === 0 ? (
        <div className="bg-white border-2 border-slate-100 rounded-2xl p-12 text-center shadow-sm">
          <FileText className="h-12 w-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-600 font-medium">কোনো document পাওয়া যায়নি।</p>
          <p className="text-amber-600 text-sm font-semibold mt-1 cursor-pointer hover:underline">নতুন document তৈরি করো →</p>
        </div>
      ) : (
        <div className="bg-white border-2 border-amber-500 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-amber-50/50 border-b-2 border-amber-500/10">
                  <th className="text-xs text-slate-700 font-bold uppercase tracking-wider px-6 py-4">Title</th>
                  <th className="text-xs text-slate-700 font-bold uppercase tracking-wider px-6 py-4">Status</th>
                  <th className="text-xs text-slate-700 font-bold uppercase tracking-wider px-6 py-4">Words</th>
                  <th className="text-xs text-slate-700 font-bold uppercase tracking-wider px-6 py-4">Date</th>
                </tr>
              </thead>
                <tbody className="divide-y divide-slate-100">
                {filtered.map((doc) => (
                  <tr key={doc.id} className="hover:bg-amber-50/30 transition-all group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-amber-500 transition-transform group-hover:scale-110" />
                        <span className="text-slate-900 text-sm font-bold group-hover:text-amber-600 transition-colors">{doc.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border capitalize ${statusColors[doc.status]}`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-sm font-medium">{doc.words}</td>
                    <td className="px-6 py-4 text-slate-500 text-sm font-medium">{doc.date}</td>
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