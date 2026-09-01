"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Pin } from "lucide-react";

interface HeroProps {
  isDarkMode: boolean;
}

const SLIDES = ["/hero-photo-1.jpg", "/hero-photo-2.jpg", "/hero-photo-3.jpg"];

export default function Hero({ isDarkMode }: HeroProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="relative overflow-hidden px-4 py-20 sm:py-28"
      
    >
      <div className="relative mx-auto max-w-6xl grid md:grid-cols-[1.1fr_1fr] gap-16 items-center">
        {/* বাম কলাম — হেডলাইন */}
        <div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.6rem] leading-[1.06] tracking-tight">
            Your draft, edited by an agent that never sleeps.
          </h1>
          <p
            className="mt-6 max-w-md text-base sm:text-lg leading-relaxed"
            style={{ color: "var(--ink-soft)" }}
          >
            WriteFlow AI-এর ব্যাকগ্রাউন্ড এজেন্ট আপনার ব্লগ, সোশ্যাল ক্যাপশন আর ইমেইল কপি প্ল্যান করে, খসড়া লেখে এবং সম্পাদনা করে — আপনি শুধু অনুমোদন করবেন।
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-4">
            <Link
              href="/dashboard/documents/new"
              className="group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-base font-medium text-white justify-center transition-transform hover:scale-[1.02]
               bg-amber-500 hover:bg-amber-700"
             
            >
              Start writing free
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/explore"
              className="inline-flex items-center justify-center rounded-full px-6 py-3.5 text-base font-medium border transition-colors hover:opacity-70"
              style={{ borderColor: "var(--line)" }}
            >
              Browse templates
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-6 text-sm" style={{ color: "var(--ink-soft)" }}>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--sage)" }} />
              No credit card required
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--sage)" }} />
              5,000 free words / month
            </span>
          </div>
        </div>

        {/* ডান কলাম — sliding photo + manuscript card collage */}
        <div className="relative">
          {/* ছবির slider */}
          <div
            className="relative rounded-sm overflow-hidden shadow-xl hero-photo-anim"
            style={{ border: "1px solid var(--line)" }}
          >
            <div className="relative w-full h-[420px] sm:h-[480px]">
              {SLIDES.map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt="WriteFlow AI editorial workspace"
                  fill
                  priority={i === 0}
                  className="object-cover transition-opacity duration-1000 ease-in-out"
                  style={{ opacity: active === i ? 1 : 0 }}
                />
              ))}
              <div
                className="absolute inset-0"
                style={{ background: isDarkMode ? "rgba(20,23,31,0.35)" : "rgba(28,35,49,0.08)" }}
              />
            </div>

            {/* slider dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Slide ${i + 1}`}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: active === i ? "18px" : "8px",
                    background: active === i ? "var(--amber)" : "rgba(255,255,255,0.6)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* manuscript card — ফটোর উপর pin করা */}
         

          {/* floating stat badge */}
          <div
            className="absolute -top-6 -right-4 sm:-right-8 rounded-full border shadow-lg px-4 py-2.5 hidden sm:block hero-badge-anim"
            style={{ background: "var(--ink)", borderColor: "var(--ink)" }}
          >
            <p className="font-display text-base leading-none text-white">2,481</p>
            <p className="text-[10px] font-mono mt-1" style={{ color: "var(--amber)" }}>
              words today
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}