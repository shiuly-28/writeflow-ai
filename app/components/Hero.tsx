"use client";

import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-slate-950 text-white px-4">
      
      {/* ব্যাকগ্রাউন্ড গ্লো ইফেক্ট */}
      <div className="absolute top-1/4 left-1/2 -z-10 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/20 blur-[120px]"></div>
      <div className="absolute top-1/3 left-1/3 -z-10 h-[250px] w-[250px] rounded-full bg-cyan-600/15 blur-[100px]"></div>

      <div className="mx-auto max-w-4xl text-center">
        {/* অ্যানিমেটেড ব্যাজ */}
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-medium text-indigo-300 backdrop-blur-md mb-6">
          <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-ping" />
          Next-Gen Agentic AI Content Workspace
        </div>

        {/* মেইন হেডলাইন */}
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
          Supercharge Your Content with{" "}
          <span className="block mt-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Autonomous AI Agents
          </span>
        </h1>

        {/* সাব-হেডলাইন */}
        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-slate-400 leading-relaxed">
          WriteFlow AI-এর ইন্টেলিজেন্ট ব্যাকগ্রাউন্ড এজেন্ট আপনার হয়ে ব্লগ পোস্ট, সোশ্যাল মিডিয়া ক্যাপশন এবং ইমেইল কপি প্ল্যান ও জেনারেট করবে স্বয়ংক্রিয়ভাবে।
        </p>

        {/* CTA বাটন */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/register"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-3.5 text-base font-semibold text-white shadow-xl shadow-indigo-500/20 hover:opacity-95 transition-all duration-200 w-full sm:w-auto justify-center"
          >
            Start Writing Free
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/explore"
            className="inline-flex items-center justify-center rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-md px-6 py-3.5 text-base font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-all w-full sm:w-auto"
          >
            Explore Templates
          </Link>
        </div>

        {/* গ্লাস মরফিজম ফ্লোটিং কার্ড */}
        <div className="mt-16 mx-auto max-w-2xl rounded-2xl border border-white/10 bg-slate-900/40 p-4 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-2 border-b border-white/5 pb-3 mb-3 text-xs text-slate-500">
            <Terminal className="h-4 w-4 text-indigo-400" />
            <span>writeflow-agent-v1.0.ts — Active</span>
          </div>
          <div className="text-left font-mono text-sm text-indigo-200/90 space-y-1">
            <p className="text-cyan-400">🚀 Prompt: "Write a high-converting email for my SaaS launch..."</p>
            <p className="text-slate-400 animate-pulse">🤖 Agent Status: Generating structured editor-ready draft...</p>
          </div>
        </div>

      </div>
    </section>
  );
}