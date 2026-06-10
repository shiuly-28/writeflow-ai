"use client";

import { FileText, Share2, Mail, MessageSquare, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Template {
  icon: React.ReactNode;
  title: string;
  description: string;
  category: string;
}

// টাইপস্ক্রিপ্টের জন্য Props টাইপ ডিফাইন করা
interface PopularTemplatesProps {
  isDarkMode: boolean;
}

export default function PopularTemplates({ isDarkMode }: PopularTemplatesProps) {
  const templates: Template[] = [
    { icon: <FileText className={`h-5 w-5 ${isDarkMode ? "text-amber-400" : "text-amber-600"}`} />, title: "SEO Blog Post", description: "সার্চ ইঞ্জিনে র‍্যাঙ্ক করার মতো অপ্টিমাইজড লং-ফর্ম ব্লগ পোস্ট তৈরি করুন।", category: "Blog" },
    { icon: <Share2 className={`h-5 w-5 ${isDarkMode ? "text-cyan-400" : "text-cyan-600"}`} />, title: "LinkedIn Engagement", description: "আপনার প্রফেশনাল নেটওয়ার্কের জন্য আকর্ষক এবং ভাইরাল ক্যাপশন।", category: "Social Media" },
    { icon: <Mail className={`h-5 w-5 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />, title: "Cold Email Outreach", description: "ক্লাইন্ট বা লিড কনভার্ট করার জন্য পারসুয়াসিভ ইমেইল কপি।", category: "Email" },
    { icon: <MessageSquare className={`h-5 w-5 ${isDarkMode ? "text-emerald-400" : "text-emerald-600"}`} />, title: "Facebook Ad Copy", description: "বেশি সেলস এনে দেওয়ার মতো হাই-কনভার্টিং ফেসবুক বিজ্ঞাপন কপি।", category: "Ad Copy" }
  ];

  return (
    // 💡 ডাইনামিক ব্যাকগ্রাউন্ড, টেক্সট এবং বর্ডার কালার টগল
    <section className={`py-20 px-4 border-t transition-colors duration-300 ${
      isDarkMode 
        ? "bg-slate-950 text-white border-white/5" 
        : "bg-slate-50 text-slate-900 border-slate-200"
    }`}>
      <div className="mx-auto max-w-7xl">
        
        {/* হেডার সেকশন */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
          <div>
            <h2 className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${
              isDarkMode ? "from-white to-slate-400" : "from-slate-900 to-slate-600"
            }`}>
              Popular Templates
            </h2>
            <p className={`mt-2 text-sm transition-colors ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
              আমাদের সবচেয়ে বেশি ব্যবহৃত এআই প্রম্পট টেমপ্লেটসমূহ।
            </p>
          </div>
          <Link 
            href="/explore" 
            className={`inline-flex items-center gap-1 text-sm font-medium transition-colors group ${
              isDarkMode ? "text-amber-400 hover:text-amber-300" : "text-amber-600 hover:text-amber-500"
            }`}
          >
            View All Templates 
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* ৪-কলাম কার্ড গ্রিড (blur রিমুভড এবং কালার ডাইনামিক করা হয়েছে) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((template, index) => (
            <div 
              key={index} 
              className={`flex flex-col h-full rounded-2xl border p-5 shadow-xl hover:scale-[1.02] transition-all duration-300 ${
                isDarkMode 
                  ? "border-white/10 bg-slate-900/40" 
                  : "border-slate-200/60 bg-white"
              }`}
            >
              {/* আইকন বক্স কন্টেইনার */}
              <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border ${
                isDarkMode ? "bg-slate-800 border-white/5" : "bg-slate-100 border-slate-200/60"
              }`}>
                {template.icon}
              </div>
              
              {/* ক্যাটাগরি ব্যাজ */}
              <span className={`text-[10px] uppercase font-semibold tracking-wider mb-1 transition-colors ${
                isDarkMode ? "text-amber-400" : "text-amber-600"
              }`}>
                {template.category}
              </span>
              
              <h3 className="text-lg font-semibold mb-2">{template.title}</h3>
              
              {/* ডেসক্রিপশন টেক্সট */}
              <p className={`text-xs leading-relaxed flex-grow mb-5 transition-colors ${
                isDarkMode ? "text-slate-400" : "text-slate-600"
              }`}>
                {template.description}
              </p>
              
              {/* ইউজ টেমপ্লেট বাটন */}
              <button className={`w-full rounded-xl border py-2.5 text-xs font-medium transition-all duration-200 ${
                isDarkMode 
                  ? "bg-slate-800 border-white/5 text-white hover:bg-amber-600 hover:border-amber-500" 
                  : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-amber-600 hover:border-amber-500 hover:text-white"
              }`}>
                Use Template
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}