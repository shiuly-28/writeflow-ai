"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { ArrowRight, Pin, FileText, Bot, Sparkles, PencilLine } from "lucide-react";
import Image from "next/image";

interface HeroProps {
  isDarkMode: boolean;
}

// আপনার তৈরি করা ইউনিক ছবিগুলোর পাথ এখানে বসান
const SLIDES = [
  "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=1200&h=1600&auto=format&fit=crop", // placeholder: Image 1-এর জন্য
  "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1200&auto=format&fit=crop", // placeholder: Image 2-এর জন্য
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&h=1600&auto=format&fit=crop", // placeholder: Image 3-এর জন্য
];

export default function Hero({ isDarkMode }: HeroProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden px-4 py-20 sm:py-28 bg-white dark:bg-slate-950 transition-colors duration-300">
      
      {/* ব্যানার ব্যাকগ্রাউন্ডের জন্য হালকা গ্লো ইফেক্ট */}
      <div className={`absolute top-0 right-0 w-1/2 h-1/2 blur-[120px] opacity-15 pointer-events-none -z-10 rounded-full ${
        isDarkMode ? "bg-amber-600" : "bg-amber-200"
      }`} />

      <div className="relative mx-auto max-w-6xl grid md:grid-cols-[1.1fr_1fr] gap-16 items-center">
        {/* বাম কলাম — হেডলাইন */}
        <div className="text-center md:text-left">
          
          {/* ছোট ব্যাজ */}
          <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border mb-6 text-sm font-medium ${
            isDarkMode 
              ? "bg-slate-900 border-slate-800 text-amber-300" 
              : "bg-slate-100 border-slate-200 text-amber-800 shadow-inner"
          }`}>
            <Bot className="h-5 w-5 text-amber-500" />
            <span>AI Editor Agent: Active</span>
          </div>

          <h1 className={`font-display text-4xl sm:text-5xl lg:text-[3.6rem] leading-[1.06] tracking-tight ${
            isDarkMode ? "text-white" : "text-slate-950"
          }`}>
            Your draft, <span className="text-amber-500">edited</span> by an agent that <span className="relative inline-block">never sleeps<span className="absolute -bottom-1 inset-x-0 h-1 bg-amber-400 rounded-full" /></span>.
          </h1>
          <p className={`mt-7 max-w-lg text-base sm:text-lg leading-relaxed mx-auto md:mx-0 ${
            isDarkMode ? "text-slate-400" : "text-slate-700"
          }`}>
            WriteFlow AI-এর ব্যাকগ্রাউন্ড এজেন্ট আপনার ব্লগ, সোশ্যাল ক্যাপশন আর ইমেইল কপি প্ল্যান করে, খসড়া লেখে এবং সম্পাদনা করে — আপনি শুধু অনুমোদন করবেন।
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-5 justify-center md:justify-start">
            <Link
              href="/dashboard/documents/new"
              className="group inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-base font-semibold text-white justify-center transition-all shadow-lg hover:shadow-amber-500/20 hover:scale-[1.02] bg-amber-500 hover:bg-amber-600"
            >
              Start writing free
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/explore"
              className={`inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold border transition-all hover:bg-slate-100 ${
                isDarkMode 
                  ? "border-slate-800 bg-slate-900 text-white hover:bg-slate-800" 
                  : "border-slate-200 bg-white text-slate-800 shadow-sm"
              }`}
            >
              Browse templates
            </Link>
          </div>

          <div className={`mt-12 flex items-center gap-7 justify-center md:justify-start text-sm ${isDarkMode ? "text-slate-500" : "text-slate-600"}`}>
            <span className="flex items-center gap-2.5 font-medium">
              <Sparkles className="h-4 w-4 text-amber-500" />
              No credit card required
            </span>
            <span className="flex items-center gap-2.5 font-medium">
              <Sparkles className="h-4 w-4 text-amber-500" />
              5,000 free words / month
            </span>
          </div>
        </div>

        {/* ডান কলাম — sliding photo + unique collaboration card */}
        <div className="relative pt-10 sm:pt-0">
          
          {/* ছবির slider কন্টেইনার (মকআপ স্টাইল) */}
          <div className={`relative rounded-3xl overflow-hidden shadow-2xl border ${
            isDarkMode 
              ? "border-slate-800 shadow-black/40" 
              : "border-slate-200/80 bg-slate-50"
          }`}>
            <div className="relative w-full h-[460px] sm:h-[540px]">
              {SLIDES.map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt="WriteFlow AI unique workspace view"
                  fill
                  priority={i === 0}
                  className="object-cover transition-opacity duration-1000 ease-in-out"
                  style={{ opacity: active === i ? 1 : 0 }}
                />
              ))}
              
              {/* ইমেজের উপর হালকা ডার্ক লেয়ার (যদি প্রয়োজন হয়) */}
              <div className={`absolute inset-0 ${isDarkMode ? "bg-slate-950/20" : "bg-white/5"}`} />
            </div>

            {/* slider dots */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2.5">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Slide ${i + 1}`}
                  className="h-2.5 rounded-full transition-all duration-300 border border-white/40"
                  style={{
                    width: active === i ? "24px" : "10px",
                    background: active === i ? "#f59e0b" : "rgba(255,255,255,0.7)", // var(--amber) এবং var(--sage)-এর জায়গায় সরাসরি কালার
                  }}
                />
              ))}
            </div>
          </div>

   
          {/* floating stat badge */}
          <div className={`absolute -top-7 -right-5 sm:-right-10 rounded-3xl border shadow-xl p-4 hidden sm:block ${
            isDarkMode 
              ? "bg-slate-900 border-slate-800 text-white" 
              : "bg-white border-slate-100 text-slate-950"
          }`}>
            <p className="font-display text-2xl font-extrabold leading-none">2,481</p>
            <p className={`text-xs mt-1.5 font-medium ${isDarkMode ? "text-amber-400" : "text-amber-600"}`}>
              words today
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}