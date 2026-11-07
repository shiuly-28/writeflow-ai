"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Bot, Sparkles } from "lucide-react";
import Image from "next/image";

interface HeroProps {
  isDarkMode: boolean;
}

const SLIDES = [
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1920&auto=format&fit=crop",
];

export default function Hero({ isDarkMode }: HeroProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden px-4 py-24">
      {/* ব্যাকগ্রাউন্ড স্লাইডার */}
      <div className="absolute inset-0 w-full h-full">
        {SLIDES.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              active === i ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
            }`}
          >
            <Image
              src={src}
              alt={`Background slide ${i + 1}`}
              fill
              priority={i === 0}
              unoptimized
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
        ))}

        {/* অতি হালকা ওভারলে (অপাসিটি কমিয়ে ডার্ক মোডে ৪০% এবং লাইট মোডে ৩০% করা হয়েছে) */}
        <div
          className={`absolute inset-0 transition-colors duration-300 ${
            isDarkMode ? "bg-slate-950/40" : "bg-white/30"
          }`}
        />
      </div>

      {/* মেইন কনটেন্ট */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* ছোট ব্যাজ */}
        <div
          className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border mb-6 text-sm font-medium backdrop-blur-md shadow-sm ${
            isDarkMode
              ? "bg-slate-900/80 border-slate-700 text-amber-300"
              : "bg-white/85 border-slate-200 text-amber-800"
          }`}
        >
          <Bot className="h-5 w-5 text-amber-500" />
          <span>AI Editor Agent: Active</span>
        </div>

        {/* হেডলাইন (ব্যাকগ্রাউন্ড স্পষ্ট থাকায় টেক্সট শ্যাডো যোগ করা হয়েছে যাতে পড়তে সুবিধা হয়) */}
        <h1
          className={`font-display text-4xl sm:text-6xl lg:text-[4rem] leading-[1.1] tracking-tight font-extrabold drop-shadow-sm ${
            isDarkMode ? "text-white" : "text-slate-950"
          }`}
        >
          Your draft, <span className="text-amber-500">edited</span> by an agent that{" "}
          <span className="relative inline-block">
            never sleeps
            <span className="absolute -bottom-1 inset-x-0 h-1.5 bg-amber-400 rounded-full" />
          </span>
          .
        </h1>

        {/* সাবটেক্সট */}
        <p
          className={`mt-7 max-w-2xl text-base sm:text-xl leading-relaxed mx-auto font-medium drop-shadow-sm ${
            isDarkMode ? "text-slate-100" : "text-slate-900"
          }`}
        >
          WriteFlow AI-এর ব্যাকগ্রাউন্ড এজেন্ট আপনার ব্লগ, সোশ্যাল ক্যাপশন আর ইমেইল কপি প্ল্যান করে, খসড়া লেখে এবং সম্পাদনা করে — আপনি শুধু অনুমোদন করবেন।
        </p>

        {/* বাটনসমূহ */}
        <div className="mt-10 flex flex-col sm:flex-row gap-5 justify-center">
          <Link
            href="/dashboard/documents/new"
            className="group inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-base font-semibold text-white justify-center transition-all shadow-lg hover:shadow-amber-500/30 hover:scale-[1.02] bg-amber-500 hover:bg-amber-600"
          >
            Start writing free
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/explore"
            className={`inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold border backdrop-blur-md transition-all ${
              isDarkMode
                ? "border-slate-600 bg-slate-900/80 text-white hover:bg-slate-800"
                : "border-slate-300 bg-white/85 text-slate-900 hover:bg-white shadow"
            }`}
          >
            Browse templates
          </Link>
        </div>

        {/* ফিচার ট্যাগ */}
        <div
          className={`mt-12 flex flex-wrap items-center gap-6 justify-center text-sm font-medium ${
            isDarkMode ? "text-slate-200" : "text-slate-900"
          }`}
        >
          <span className="flex items-center gap-2 drop-shadow-sm">
            <Sparkles className="h-4 w-4 text-amber-500" />
            No credit card required
          </span>
          <span className="flex items-center gap-2 drop-shadow-sm">
            <Sparkles className="h-4 w-4 text-amber-500" />
            5,000 free words / month
          </span>
        </div>
      </div>

      {/* নেভিগেশন ডটস */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5 z-20">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Slide ${i + 1}`}
            className="h-2 rounded-full transition-all duration-300 border border-white/60 shadow"
            style={{
              width: active === i ? "28px" : "10px",
              background: active === i ? "#f59e0b" : "rgba(255,255,255,0.7)",
            }}
          />
        ))}
      </div>
    </section>
  );
}