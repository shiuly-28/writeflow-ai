"use client";

import { useState, useEffect } from "react";
import { Search, Star, Filter, Zap, ArrowRight, FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Template {
  id: number;
  title: string;
  description: string;
  category: string;
  rating: number;
  usageCount: number;
  tone: string;
  image: string;
}

const categories = ["All", "Blog", "Social Media", "Email", "Ad Copy"];
const sortOptions = ["Most Popular", "Highest Rated", "Newest"];

const categoryColors: Record<string, string> = {
  Blog: "bg-amber-100 text-amber-700",
  "Social Media": "bg-pink-100 text-pink-700",
  Email: "bg-emerald-100 text-emerald-700",
  "Ad Copy": "bg-amber-100 text-amber-700",
};

export default function ExplorePage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Most Popular");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const perPage = 8;

  useEffect(() => {
    const fetchTemplates = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/templates");
        if (res.ok) {
          const data = await res.json();
          setTemplates(data);
        }
      } catch (error) {
        console.error("Failed to fetch templates:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  const filtered = templates
    .filter((t) => {
      const matchSearch =
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === "All" || t.category === category;
      return matchSearch && matchCategory;
    })
    .sort((a, b) => {
      if (sort === "Most Popular") return b.usageCount - a.usageCount;
      if (sort === "Highest Rated") return b.rating - a.rating;
      return b.id - a.id;
    });

  const paginated = filtered.slice(0, page * perPage);
  const hasMore = paginated.length < filtered.length;

  const SkeletonCard = () => (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 animate-pulse">
      <div className="w-12 h-12 bg-gray-200 rounded-xl mb-4" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-3 bg-gray-200 rounded w-full mb-4" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-amber-600 to-amber-500 py-16 px-4">
        <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors tracking-widest uppercase"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-black text-white mb-4">
            Explore Templates
          </h1>
          <p className="text-white/80 text-lg mb-8">
            AI-powered templates দিয়ে কন্টেন্ট লেখা শুরু করো
          </p>

          {/* Search */}
          <div className="relative max-w-xl mx-auto p-5">
            <Search className="absolute left-4  top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Template খোঁজো..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full bg-white rounded-2xl  p-8  pr-8 py-4 text-sm focus:outline-none shadow-lg"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 mt-4">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setCategory(cat); setPage(1); }}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  category === cat
                    ? "bg-amber-600 text-white shadow-md"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-amber-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
            >
              {sortOptions.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="text-gray-500 text-sm mb-6">
          {filtered.length} টি template পাওয়া গেছে
        </p>

        {/* Template Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-400 text-lg">কোনো template পাওয়া যায়নি।</p>
            <p className="text-gray-300 text-sm mt-1">অন্য keyword দিয়ে খোঁজো।</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {paginated.map((template) => (
                <div
                  key={template.id}
                  className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-amber-200 transition-all group"
                >
                  {/* Icon */}
                  <div className="text-4xl mb-4">{template.image}</div>

                  {/* Category */}
                  <span className={`px-2 py-1 rounded-lg text-xs font-bold ${categoryColors[template.category]}`}>
                    {template.category}
                  </span>

                  {/* Title & Description */}
                  <h3 className="text-gray-900 font-bold text-sm mt-3 mb-1 group-hover:text-amber-600 transition-colors">
                    {template.title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed mb-4">
                    {template.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                      <span className="text-xs font-bold text-gray-700">{template.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="h-3.5 w-3.5 text-amber-400" />
                      <span className="text-xs text-gray-400">{template.usageCount.toLocaleString()}</span>
                    </div>
                  </div>
                  

                  {/* Button */}

                <div className="flex gap-3 ">
                    <Link
                  href={`/templates/${template.id}`}
                   className="w-full flex items-center justify-center gap-2 py-2.5 bg-gray-50 border border-gray-200 text-gray-600 text-xs font-semibold rounded-xl hover:bg-gray-100 transition-all"
                    >
                  <FileText className="h-3.5 w-3.5" />
                  View Details
                </Link>
                  <Link
                    href={`/dashboard/documents/new?template=${template.id}&type=${encodeURIComponent(template.category)}&tone=${template.tone}`}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 text-white text-xs font-semibold rounded-xl hover:opacity-90 transition-all"
                  >
                    Use Template
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setPage(page + 1)}
                  className="px-8 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-semibold text-gray-600 hover:border-amber-300 hover:text-amber-600 transition-all"
                >
                  আরো দেখাও
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}