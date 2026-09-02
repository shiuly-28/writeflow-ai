"use client";

import { Check, ArrowUpRight } from "lucide-react";

interface FeatureSectionProps {
  isDarkMode?: boolean;
}

export default function WriteFlowFeature({ isDarkMode }: FeatureSectionProps) {
  const features = [
    "স্মার্ট এআই রাইটিং ও অটো-ড্রাফটিং",
    "এসইও অপ্টিমাইজড ও ১০০% অরিজিনাল কন্টেন্ট",
    "মাল্টি-ল্যান্ডওয়েজ ও কাস্টম টোন সাপোর্ট"
  ];

  return (
    <section 
      className={`py-20 px-4 transition-colors duration-300 ${
        isDarkMode ? "bg-slate-950 text-white" : "bg-white text-slate-900"
      }`}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* বামপাশের কন্টেন্ট সেকশন */}
          <div className="space-y-6">
            
            {/* সাব-টাইটেল উইথ লাইন */}
            <div className="flex items-center gap-3">
              <span className={`h-px w-8 ${isDarkMode ? "bg-amber-500" : "bg-amber-600"}`} />
              <span className={`text-xs font-medium tracking-wide uppercase ${
                isDarkMode ? "text-amber-400" : "text-amber-600"
              }`}>
                ০৪ - স্মার্ট কন্টেন্ট জেনারেশন
              </span>
            </div>

            {/* প্রধান হেডিং */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
              ক্লান্তিহীন রাইটিং, দ্রুততম কন্টেন্ট তৈরি।
            </h2>

            {/* বিবরণ */}
            <p className={`text-sm sm:text-base leading-relaxed max-w-xl ${
              isDarkMode ? "text-slate-400" : "text-slate-600"
            }`}>
              ব্লগ পোস্ট, সোশ্যাল মিডিয়া ক্যাপশন থেকে শুরু করে ইমেল - আপনার ব্র্যান্ডের ভয়েস ঠিক রেখে কয়েক সেকেন্ডেই নিখুঁত কন্টেন্ট জেনারেট করুন WriteFlow AI-এর মাধ্যমে।
            </p>

            {/* ফিচার চেকলিস্ট */}
            <ul className="space-y-3 pt-2">
              {features.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className={`p-1 rounded-full ${
                    isDarkMode 
                      ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" 
                      : "bg-amber-50 text-amber-600 border border-amber-200"
                  }`}>
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span className={`text-sm font-medium ${
                    isDarkMode ? "text-slate-200" : "text-slate-800"
                  }`}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>

<div className="pt-4">
  <a 
    href="https://writeflow-ai-sand.vercel.app/dashboard" // এখানে আপনার ড্যাশবোর্ডের URL দিন
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-flex items-center gap-1.5 text-sm font-semibold border-b-2 pb-1 transition-all ${
      isDarkMode 
        ? "border-amber-400 text-amber-400 hover:border-amber-300 hover:text-amber-300" 
        : "border-slate-900 text-slate-900 hover:border-amber-600 hover:text-amber-600"
    }`}
  >
    ড্যাশবোর্ড দেখুন
    <ArrowUpRight className="h-4 w-4" />
  </a> {/* এই </a> ট্যাগটি আগের উদাহরণে বাদ পড়েছিল */}
</div>

          </div>

          {/* ডানপাশের ইমেজের ড্যাশবোর্ড মকআপ */}
          <div className="relative">
            {/* ব্যাকগ্রাউন্ড গ্লো ইফেক্ট */}
            <div className={`absolute inset-0 rounded-3xl blur-2xl opacity-20 pointer-events-none -z-10 ${
              isDarkMode ? "bg-amber-500" : "bg-amber-200"
            }`} />

            <div className={`overflow-hidden rounded-2xl border shadow-2xl transition-all ${
              isDarkMode 
                ? "border-white/10 bg-slate-900/50" 
                : "border-slate-200/80 bg-slate-50"
            }`}>
              <img 
                src="https://i.postimg.cc/cLgFtzGv/Gemini-Generated-Image-hasb07hasb07hasb.jpg" 
                alt="WriteFlow AI Dashboard Mockup" 
                className="w-full h-auto object-cover rounded-2xl hover:scale-105 transition-transform duration-500 aspect-[16/10]"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}