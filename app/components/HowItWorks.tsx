"use client";

import { Cpu, Check } from "lucide-react";

interface HowItWorksProps {
  isDarkMode: boolean;
}

export default function HowItWorks({ isDarkMode }: HowItWorksProps) {
  return (
    <section
      className={`relative py-20 px-4 overflow-hidden transition-colors duration-300 ${
        isDarkMode ? "bg-slate-950" : "bg-white"
      }`}
    >
      {/* Background Soft amber Radial Glow */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] blur-[140px] pointer-events-none rounded-full ${
          isDarkMode ? "bg-amber-500/10" : "bg-amber-300/30"
        }`}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span
            className={`inline-block text-xs font-medium px-4 py-1.5 rounded-full mb-4 ${
              isDarkMode ? "bg-amber-500/10 text-amber-400" : "bg-amber-100 text-amber-500"
            }`}
          >
            process
          </span>
          <h2
            className={`text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 ${
              isDarkMode ? "text-white" : "text-slate-600"
            }`}
          >
            Idea to Published, in Four Steps
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
            অটোমেটেড উপায়ে কন্টেন্ট তৈরি করুন এবং সরাসরি পাবলিশ করুন। আপনার আইডিয়াগুলোকে বাস্তব কন্টেন্টে পরিণত করার সবচেয়ে দ্রুততম উপায়।
          </p>
        </div>

        {/* 2x2 Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* STEP 1: Pick Template */}
          <div
            className={`relative overflow-hidden backdrop-blur-xl border rounded-3xl p-8 shadow-sm transition-all duration-300 min-h-[300px] flex flex-col md:flex-row items-center gap-6 ${
              isDarkMode
                ? "bg-slate-900/60 border-white/10 hover:shadow-xl hover:shadow-amber-500/10"
                : "bg-white/70 border-amber-100 hover:shadow-xl hover:shadow-amber-500/5"
            }`}
          >
            <div
              className={`w-full md:w-1/2 border rounded-2xl p-4 shadow-inner relative overflow-hidden ${
                isDarkMode ? "bg-slate-800/60 border-white/10" : "bg-slate-50 border-slate-200/80"
              }`}
            >
              <div className="space-y-2 opacity-40">
                <div className={`h-3 rounded w-3/4 ${isDarkMode ? "bg-slate-500" : "bg-slate-300"}`}></div>
                <div className={`h-3 rounded w-1/2 ${isDarkMode ? "bg-slate-600" : "bg-slate-200"}`}></div>
                <div className={`h-3 rounded w-5/6 ${isDarkMode ? "bg-slate-600" : "bg-slate-200"}`}></div>
              </div>
              {/* Floating Menu Mockup */}
              <div
                className={`mt-3 border rounded-xl p-3 shadow-lg space-y-1.5 text-[10px] font-medium ${
                  isDarkMode ? "bg-slate-900 border-white/10 text-slate-300" : "bg-white border-slate-200 text-slate-600"
                }`}
              >
                <div className={`p-1.5 rounded font-semibold ${isDarkMode ? "bg-amber-500/15 text-amber-400" : "bg-amber-50 text-amber-600"}`}>
                  Templates
                </div>
                <div className="p-1">Business Template</div>
                <div className="p-1">Book Outline</div>
              </div>
            </div>

            <div className="w-full md:w-1/2 space-y-3">
              <span
                className={`inline-block text-[10px] font-semibold uppercase px-2.5 py-1 rounded-full ${
                  isDarkMode ? "bg-amber-500/10 text-amber-400" : "bg-amber-100 text-amber-500"
                }`}
              >
                process
              </span>
              <h3 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>Pick Template</h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                আপনার ক্যাটাগরি অনুযায়ী একটি রেডিমেড এআই টেমপ্লেট বেছে নিন।
              </p>
            </div>
          </div>

          {/* STEP 2: AI Generates */}
          <div
            className={`relative overflow-hidden backdrop-blur-xl border rounded-3xl p-8 shadow-sm transition-all duration-300 min-h-[300px] flex flex-col md:flex-row items-center gap-6 ${
              isDarkMode
                ? "bg-slate-900/60 border-white/10 hover:shadow-xl hover:shadow-amber-500/10"
                : "bg-white/70 border-amber-100 hover:shadow-xl hover:shadow-amber-500/5"
            }`}
          >
            <div className="w-full md:w-1/2 flex items-center justify-center p-4">
              <div
                className={`relative p-6 rounded-2xl border flex flex-col items-center justify-center shadow-sm ${
                  isDarkMode ? "bg-amber-500/10 border-amber-500/20" : "bg-amber-100/60 border-amber-200"
                }`}
              >
                <div className="bg-amber-600 text-white p-3 rounded-xl shadow-md mb-2">
                  <Cpu className="w-8 h-8" />
                </div>
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                    isDarkMode ? "text-amber-400 bg-slate-900 border-amber-500/30" : "text-amber-500 bg-white border-amber-200"
                  }`}
                >
                  AI
                </span>
              </div>
            </div>

            <div className="w-full md:w-1/2 space-y-3">
              <span
                className={`inline-block text-[10px] font-semibold uppercase px-2.5 py-1 rounded-full ${
                  isDarkMode ? "bg-amber-500/10 text-amber-400" : "bg-amber-100 text-amber-500"
                }`}
              >
                process
              </span>
              <h3 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>AI Generates</h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                ব্যাকগ্রাউন্ড এজেন্ট স্বয়ংক্রিয়ভাবে কন্টেন্ট অপ্টিমাইজড নেটিভ মার্জিনে তৈরি করবে।
              </p>
            </div>
          </div>

          {/* STEP 3: Enter Topic */}
          <div
            className={`relative overflow-hidden backdrop-blur-xl border rounded-3xl p-8 shadow-sm transition-all duration-300 min-h-[300px] flex flex-col md:flex-row items-center gap-6 ${
              isDarkMode
                ? "bg-slate-900/60 border-white/10 hover:shadow-xl hover:shadow-amber-500/10"
                : "bg-white/70 border-amber-100 hover:shadow-xl hover:shadow-amber-500/5"
            }`}
          >
            <div className="w-full md:w-1/2 space-y-3 order-2 md:order-1">
              <span
                className={`inline-block text-[10px] font-semibold uppercase px-2.5 py-1 rounded-full ${
                  isDarkMode ? "bg-amber-500/10 text-amber-400" : "bg-amber-100 text-amber-500"
                }`}
              >
                process
              </span>
              <h3 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>Enter Topic</h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                আপনার টপিক, কি-ওয়ার্ড এবং টার্গেট অডিয়েন্স ইনপুট দিন।
              </p>
            </div>

            {/* Input Form Mockup */}
            <div
              className={`w-full md:w-1/2 border rounded-2xl p-4 shadow-md space-y-3 order-1 md:order-2 ${
                isDarkMode ? "bg-slate-900 border-white/10" : "bg-white border-slate-200"
              }`}
            >
              {["টপিক", "কি-ওয়ার্ড", "টার্গেট অডিয়েন্স"].map((label) => (
                <div key={label}>
                  <label className={`text-[11px] font-medium block mb-1 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                    {label}
                  </label>
                  <div className={`h-7 border rounded-lg w-full ${isDarkMode ? "bg-slate-800 border-white/10" : "bg-slate-50 border-slate-200"}`}></div>
                </div>
              ))}
            </div>
          </div>

          {/* STEP 4: Edit & Publish */}
          <div
            className={`relative overflow-hidden backdrop-blur-xl border rounded-3xl p-8 shadow-sm transition-all duration-300 min-h-[300px] flex flex-col md:flex-row items-center gap-6 ${
              isDarkMode
                ? "bg-slate-900/60 border-white/10 hover:shadow-xl hover:shadow-amber-500/10"
                : "bg-white/70 border-amber-100 hover:shadow-xl hover:shadow-amber-500/5"
            }`}
          >
            <div className="w-full md:w-1/2 space-y-3 order-2 md:order-1">
              <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center">
                <Check className="w-5 h-5" />
              </div>
              <h3 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>Edit &amp; Publish</h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                স্মার্ট এডিটরে ফাইনাল টাচ দিয়ে সরাসরি পাবলিশ বা এক্সপোর্ট করুন।
              </p>
            </div>

            {/* Document Editor Mockup */}
            <div
              className={`w-full md:w-1/2 border rounded-2xl p-4 shadow-md space-y-2 order-1 md:order-2 ${
                isDarkMode ? "bg-slate-900 border-white/10" : "bg-white border-slate-200"
              }`}
            >
              <div className={`flex justify-between items-center border-b pb-2 ${isDarkMode ? "border-white/10" : ""}`}>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-400"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                </div>
                <span className="bg-amber-600 text-white text-[10px] px-2 py-0.5 rounded-md font-semibold">
                  Publish
                </span>
              </div>
              <div className="space-y-1.5 opacity-60">
                <div className={`h-2 rounded w-full ${isDarkMode ? "bg-slate-600" : "bg-slate-300"}`}></div>
                <div className={`h-2 rounded w-5/6 ${isDarkMode ? "bg-slate-700" : "bg-slate-200"}`}></div>
                <div className={`h-2 rounded w-4/6 ${isDarkMode ? "bg-slate-700" : "bg-slate-200"}`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}