"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({ type: null, message: "" });
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setStatus({ type: "error", message: "অনুগ্রহ করে একটি সঠিক ইমেইল এড্রেস দিন।" });
      return;
    }
    setLoading(true);
    setStatus({ type: null, message: "" });

    // সিমুলেটেড সাবস্ক্রিপশন রিকোয়েস্ট
    setTimeout(() => {
      setLoading(false);
      setStatus({ type: "success", message: "ধন্যবাদ! নিউজলেটারে সফলভাবে সাবস্ক্রাইব করা হয়েছে।" });
      setEmail("");
    }, 1500);
  };

  return (
    <footer className="bg-slate-950 text-white pt-20 pb-10 px-4">
      <div className="mx-auto max-w-7xl">
        
        {/* নিউজলেটার সেকশন */}
        <div className="max-w-3xl mx-auto text-center mb-16 border border-indigo-500/20 bg-gradient-to-b from-indigo-500/5 to-transparent p-8 rounded-2xl backdrop-blur-sm">
          <h3 className="text-xl sm:text-2xl font-bold mb-2">Stay Updated</h3>
          <p className="text-slate-400 text-xs sm:text-sm mb-6">নতুন এআই এজেন্ট রিলিজ এবং কন্টেন্ট হ্যাকস জানতে আমাদের নিউজলেটারে যুক্ত হোন।</p>
          
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow rounded-xl bg-slate-900 border border-white/10 px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-3 text-sm font-semibold hover:opacity-90 transition-all disabled:opacity-50"
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
          {status.message && (
            <p className={`mt-3 text-xs font-medium ${status.type === "success" ? "text-emerald-400" : "text-rose-400"}`}>
              {status.message}
            </p>
          )}
        </div>

        {/* ফুটার লিঙ্ক গ্রিড */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-white/5 pb-12 mb-8 text-sm">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-4">
              <Sparkles className="h-5 w-5 text-indigo-400" />
              WriteFlow AI
            </Link>
            <p className="text-slate-500 text-xs leading-relaxed max-w-xs">
              এজেন্টিক এআই চালিত কন্টেন্ট ওয়ার্কস্পেস।
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-slate-300">Product</h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li className="hover:text-white transition-colors"><Link href="/explore">Explore</Link></li>
              <li className="hover:text-white transition-colors"><Link href="/pricing">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-slate-300">Company</h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li className="hover:text-white transition-colors"><Link href="/about">About Us</Link></li>
              <li className="hover:text-white transition-colors"><Link href="/blog">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-slate-300">Legal</h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li className="hover:text-white transition-colors"><Link href="/privacy">Privacy Policy</Link></li>
              <li className="hover:text-white transition-colors"><Link href="/terms">Terms</Link></li>
            </ul>
          </div>
        </div>

        {/* ফুটার ফুটার বটম (SVG যুক্ত করা হয়েছে) */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-600">
          <div>&copy; {new Date().getFullYear()} WriteFlow AI. All rights reserved.</div>
          <div className="flex gap-4">
            
            {/* GitHub SVG */}
            <a href="#" className="hover:text-white text-slate-500 transition-colors" aria-label="GitHub">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.068.069-.068 1.005.07 1.533 1.032 1.533 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.024A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.293 2.747-1.024 2.747-1.024.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>

            {/* Twitter/X SVG */}
            <a href="#" className="hover:text-white text-slate-500 transition-colors" aria-label="Twitter">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* LinkedIn SVG */}
            <a href="#" className="hover:text-white text-slate-500 transition-colors" aria-label="LinkedIn">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>

          </div>
        </div>
      </div>
    </footer>
  );
}