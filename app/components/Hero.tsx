"use client";

import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";

interface HeroProps {
  isDarkMode: boolean;
}

export default function Hero({ isDarkMode }: HeroProps) {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-4">
      
      {/* ব্যাকগ্রাউন্ড গ্লো ইফেক্ট (ডার্ক এবং লাইট মোড অনুসারে ডাইনামিক অপাসিটি) */}
      <div className={`absolute top-1/4 left-1/2 -z-10 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500 ${
        isDarkMode ? "bg-amber-500/10 blur-[120px]" : "bg-amber-500/5 blur-[100px]"
      }`}></div>
      <div className={`absolute top-1/3 left-1/3 -z-10 h-[250px] w-[250px] rounded-full transition-all duration-500 ${
        isDarkMode ? "bg-amber-500/10 blur-[100px]" : "bg-amber-500/5 blur-[80px]"
      }`}></div>

      <div className="mx-auto max-w-4xl text-center">
     

        {/* মেইন হেডлайн (ক্লিয়ার গ্রাডিয়েন্ট টেক্সট) */}
        <h1 className={`text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r transition-all ${
          isDarkMode ? "from-white via-slate-200 to-slate-400" : "from-slate-900 via-slate-800 to-slate-600"
        }`}>
          Supercharge Your Content with{" "}
          <span className={`block mt-2 ${
            isDarkMode ? "from-amber-400 via-purple-400 to-amber-400" : "from-amber-600 via-purple-600 to-amber-600"
          }`}>
            Autonomous AI Agents
          </span>
        </h1>

        {/* সাব-হেডлайн */}
        <p className={`mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed transition-colors ${
          isDarkMode ? "text-slate-400" : "text-slate-600"
        }`}>
          WriteFlow AI-এর ইন্টেলিজেন্ট ব্যাকগ্রাউন্ড এজেন্ট আপনার হয়ে ব্লগ পোস্ট, সোশ্যাল মিডিয়া ক্যাপশন এবং ইমেইল কপি প্ল্যান ও জেনারেট করবে স্বয়ংক্রিয়ভাবে।
        </p>

        {/* CTA বাটন */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/dashboard/documents/new"
            className={`group inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold text-white shadow-xl transition-all duration-200 w-full sm:w-auto justify-center bg-gradient-to-r ${
              isDarkMode ? "from-amber-500 to-amber-500 shadow-amber-500/20" : "from-amber-600 to-amber-600 shadow-amber-600/10"
            } hover:opacity-95`}
          >
            Start Writing Free
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/explore"
            className={`inline-flex items-center justify-center rounded-xl px-6 py-3.5 text-base font-semibold transition-all w-full sm:w-auto border ${
              isDarkMode 
                ? "border-slate-800 bg-slate-900/50 text-slate-300 hover:bg-slate-800 hover:text-white" 
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 shadow-sm"
            }`}
          >
            Explore Templates
          </Link>
        </div>

        {/* ফ্লোটিং কার্ড (blur ছাড়া) */}
        <div className={`mt-16 mx-auto max-w-2xl rounded-2xl border p-4 shadow-2xl transition-all ${
          isDarkMode ? "border-white/10 bg-slate-900/40" : "border-slate-200/60 bg-white shadow-md"
        }`}>
          <div className={`flex items-center gap-2 border-b pb-3 mb-3 text-xs ${
            isDarkMode ? "border-white/5 text-slate-500" : "border-slate-100 text-slate-400"
          }`}>
            <Terminal className={`h-4 w-4 ${isDarkMode ? "text-amber-400" : "text-amber-600"}`} />
            <span>writeflow-agent-v1.0.ts — Active</span>
          </div>
          <div className="text-left font-mono text-sm space-y-1">
            <p className={`${isDarkMode ? "text-amber-400" : "text-amber-600 font-medium"}`}>🚀 Prompt: "Write a high-converting email for my SaaS launch..."</p>
            <p className={`animate-pulse ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>🤖 Agent Status: Generating structured editor-ready draft...</p>
          </div>
        </div>

      </div>
    </section>
  );
}