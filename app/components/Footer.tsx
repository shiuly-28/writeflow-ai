"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

interface FooterProps {
  isDarkMode: boolean;
}

export default function Footer({ isDarkMode }: FooterProps) {
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

    setTimeout(() => {
      setLoading(false);
      setStatus({ type: "success", message: "ধন্যবাদ! সফলভাবে সাবস্ক্রাইব করা হয়েছে।" });
      setEmail("");
    }, 1500);
  };

  return (
    <footer className={`pt-20 pb-10 px-4 transition-colors duration-300 ${
      isDarkMode ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-900"
    }`}>
      <div className="mx-auto max-w-7xl">
        
        {/* 💡 ৪-কলামের মেইন ফুটার গ্রিড (স্ক্রিনশটের লেআউট অনুযায়ী) */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b ${
          isDarkMode ? "border-white/5" : "border-slate-200"
        }`}>
          
          {/* ১ম কলাম: ব্র্যান্ড লোগো, ডেসক্রিপশন ও সোশ্যাল আইকন */}
          <div className="flex flex-col gap-4">
            <Link href="/" className={`flex items-center gap-2 text-lg font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r ${
              isDarkMode ? "from-indigo-400 to-cyan-400" : "from-indigo-600 to-cyan-600"
            }`}>
              <Sparkles className={`h-5 w-5 ${isDarkMode ? "text-indigo-400" : "text-indigo-600"}`} />
              WriteFlow AI
            </Link>
            <p className={`text-xs leading-relaxed max-w-xs ${isDarkMode ? "text-slate-500" : "text-slate-500"}`}>
              এজেন্টিক এআই চালিত কন্টেন্ট ওয়ার্কস্পেস। কানেক্টিং দ্য ওয়ার্ল্ড থ্রু অটোমেশন।
            </p>
            
            {/* সোশ্যাল আইকনসমূহ (লোগোর নিচে প্লেসড) */}
            <div className="flex gap-4 mt-2">
              <a href="#" className={`transition-colors ${isDarkMode ? "text-slate-500 hover:text-white" : "text-slate-400 hover:text-indigo-600"}`} aria-label="GitHub">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.068.069-.068 1.005.07 1.533 1.032 1.533 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.024A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.293 2.747-1.024 2.747-1.024.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
              <a href="#" className={`transition-colors ${isDarkMode ? "text-slate-500 hover:text-white" : "text-slate-400 hover:text-indigo-600"}`} aria-label="Twitter">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className={`transition-colors ${isDarkMode ? "text-slate-500 hover:text-white" : "text-slate-400 hover:text-indigo-600"}`} aria-label="LinkedIn">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* ২য় কলাম: Platform লিঙ্কসমূহ */}
          <div>
            <h4 className={`text-xs font-bold uppercase tracking-wider mb-4 ${isDarkMode ? "text-white" : "text-slate-900"}`}>Platform</h4>
            <ul className={`space-y-3 text-sm ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
              <li><Link href="/about" className={`transition-colors ${isDarkMode ? "hover:text-white" : "hover:text-indigo-600"}`}>About Us</Link></li>
              <li><Link href="/explore" className={`transition-colors ${isDarkMode ? "hover:text-white" : "hover:text-indigo-600"}`}>How It Works</Link></li>
              <li><Link href="/faq" className={`transition-colors ${isDarkMode ? "hover:text-white" : "hover:text-indigo-600"}`}>FAQ</Link></li>
            </ul>
          </div>

          {/* ৩য় কলাম: Resources লিঙ্কসমূহ */}
          <div>
            <h4 className={`text-xs font-bold uppercase tracking-wider mb-4 ${isDarkMode ? "text-white" : "text-slate-900"}`}>Resources</h4>
            <ul className={`space-y-3 text-sm ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
              <li><Link href="/blog" className={`transition-colors ${isDarkMode ? "hover:text-white" : "hover:text-indigo-600"}`}>Blogs</Link></li>
              <li><Link href="/contact" className={`transition-colors ${isDarkMode ? "hover:text-white" : "hover:text-indigo-600"}`}>Contact</Link></li>
              <li><Link href="/creators" className={`transition-colors ${isDarkMode ? "hover:text-white" : "hover:text-indigo-600"}`}>Creators</Link></li>
            </ul>
          </div>

          {/* ৪র্থ কলাম: STAY CONNECTED (নিউজলেটার সেকশনটি এখানে ইন্টিগ্রেট করা হয়েছে) */}
          <div className="flex flex-col gap-3">
            <h4 className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? "text-white" : "text-slate-900"}`}>Stay Connected</h4>
            <p className={`text-xs leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
              Stay informed about cultural stories and discoveries. More to come.
            </p>
            
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2.5 mt-2 w-full">
              <div className="relative w-full">
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full rounded-lg border px-3.5 py-2.5 text-sm focus:outline-none transition-all ${
                    isDarkMode 
                      ? "bg-slate-900 border-white/10 text-white placeholder-slate-500 focus:border-indigo-500" 
                      : "bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-indigo-600"
                  }`}
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className={`w-full rounded-lg py-2.5 text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-50 text-white bg-gradient-to-r ${
                  isDarkMode ? "from-indigo-500 to-cyan-500 hover:opacity-90" : "from-orange-500 to-amber-500 hover:opacity-95 shadow-sm"
                }`}
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </form>

            {status.message && (
              <p className={`text-[11px] font-medium mt-1 ${status.type === "success" ? "text-emerald-500" : "text-rose-500"}`}>
                {status.message}
              </p>
            )}
          </div>

        </div>

        {/* 💡 ফুটার বটম: কপিরাইট বামে এবং লিগ্যাল লিঙ্কসমূহ ডান পাশে হরাইজন্টাল লাইনে */}
        <div className={`flex flex-col lg:flex-row justify-between items-center gap-6 pt-8 text-xs ${
          isDarkMode ? "text-slate-600" : "text-slate-500"
        }`}>
          {/* কপিরাইট নোটিশ */}
          <div>
            &copy; {new Date().getFullYear()}{" "}
            <span className={isDarkMode ? "text-slate-400" : "text-slate-700 font-medium"}>WriteFlow AI</span>
            &reg;. All rights reserved.
          </div>
          
          {/* লিগ্যাল লিঙ্কসমূহ (পাশাপাশি বিন্যাস) */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-medium">
            <Link href="/terms" className={`transition-colors ${isDarkMode ? "hover:text-white" : "hover:text-slate-900"}`}>Boost & PPC terms & condition</Link>
            <Link href="/terms" className={`transition-colors ${isDarkMode ? "hover:text-white" : "hover:text-slate-900"}`}>Creator Terms & Condition</Link>
            <Link href="/privacy" className={`transition-colors ${isDarkMode ? "hover:text-white" : "hover:text-slate-900"}`}>Advertising Policy</Link>
            <Link href="/privacy" className={`transition-colors ${isDarkMode ? "hover:text-white" : "hover:text-slate-900"}`}>Privacy Policy</Link>
            <Link href="/terms" className={`transition-colors ${isDarkMode ? "hover:text-white" : "hover:text-slate-900"}`}>Terms & Conditions</Link>
            <Link href="/privacy" className={`transition-colors ${isDarkMode ? "hover:text-white" : "hover:text-slate-900"}`}>Cookie Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}