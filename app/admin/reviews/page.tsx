"use client";

import { useState } from "react";
import { Star, Check, X, Zap } from "lucide-react";

interface Review {
  id: number;
  user: string;
  email: string;
  template: string;
  rating: number;
  comment: string;
  status: "pending" | "approved" | "rejected";
  date: string;
}

const initialReviews: Review[] = [
  { id: 1, user: "Shiuly", email: "shulybd1245@gmail.com", template: "Blog Post Writer", rating: 5, comment: "Amazing tool! Saved me hours of work.", status: "pending", date: "2025-06-05" },
  { id: 2, user: "Demo User", email: "user@writeflow.com", template: "Social Media Caption", rating: 4, comment: "Very helpful for social media content.", status: "pending", date: "2025-06-04" },
  { id: 3, user: "John Doe", email: "john@example.com", template: "Email Newsletter", rating: 3, comment: "Good but could be better.", status: "approved", date: "2025-06-03" },
];

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [summary, setSummary] = useState("");
  const [summarizing, setSummarizing] = useState(false);
  const [filter, setFilter] = useState("all");

  const filtered = reviews.filter((r) => filter === "all" || r.status === filter);

  const updateStatus = (id: number, status: "approved" | "rejected") => {
    setReviews(reviews.map((r) => r.id === id ? { ...r, status } : r));
  };

  const handleSummarize = async () => {
    setSummarizing(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSummary("• সামগ্রিকভাবে ইউজাররা WriteFlow AI তে সন্তুষ্ট এবং এটি তাদের কাজ সহজ করছে।\n• Blog Post ও Social Media template গুলো সবচেয়ে বেশি positive review পেয়েছে।\n• কিছু ইউজার আরো বেশি customization চান — এটি উন্নত করার সুযোগ আছে।");
    setSummarizing(false);
  };

  const renderStars = (rating: number) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} className={`h-3.5 w-3.5 ${s <= rating ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}`} />
      ))}
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
            Manage <span className="text-amber-600">Reviews</span>
          </h1>
          <p className="text-gray-400 text-xs mt-0.5">সব review দেখো এবং approve/reject করো।</p>
        </div>
        <button
          onClick={handleSummarize}
          disabled={summarizing}
          className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white text-sm font-semibold rounded-xl hover:bg-amber-600 transition-all disabled:opacity-50"
        >
          <Zap className="h-4 w-4" />
          {summarizing ? "Summarizing..." : "AI Summarise"}
        </button>
      </div>

      {/* AI Summary */}
      {summary && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6">
          <h3 className="text-sm font-black text-amber-800 mb-2 flex items-center gap-2">
            <Zap className="h-4 w-4" /> AI Summary
          </h3>
          {summary.split("\n").map((line, i) => (
            <p key={i} className="text-sm text-amber-700 mb-1">{line}</p>
          ))}
        </div>
      )}

      {/* Filter */}
      <div className="flex gap-2 mb-6">
        {["all", "pending", "approved", "rejected"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
              filter === f ? "bg-amber-600 text-white" : "bg-white border border-gray-200 text-gray-500 hover:text-gray-700"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Reviews */}
      <div className="space-y-3">
        {filtered.map((review) => (
          <div key={review.id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {review.user[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{review.user}</p>
                  <p className="text-xs text-gray-400">{review.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {renderStars(review.rating)}
                    <span className="text-xs text-gray-400">· {review.template}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{review.comment}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                  review.status === "approved" ? "bg-emerald-100 text-emerald-700" :
                  review.status === "rejected" ? "bg-rose-100 text-rose-700" :
                  "bg-amber-100 text-amber-700"
                }`}>
                  {review.status}
                </span>
                {review.status === "pending" && (
                  <>
                    <button onClick={() => updateStatus(review.id, "approved")} className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-all">
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                    </button>
                    <button onClick={() => updateStatus(review.id, "rejected")} className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 transition-all">
                      <X className="h-3.5 w-3.5 text-rose-500" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}