"use client";

import { PenLine, RefreshCw, Users2 } from "lucide-react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  accent: string;
  accentSoft: string;
  tag: string;
}

interface FeaturesProps {
  isDarkMode: boolean;
}

export default function Features({ isDarkMode }: FeaturesProps) {
  const features: Feature[] = [
    {
      icon: <PenLine className="h-5 w-5" />,
      title: "AI Drafting Agent",
      description:
        "শুধু টপিক আর টোন সিলেক্ট করুন, আমাদের ব্যাকগ্রাউন্ড এজেন্ট স্বয়ংক্রিয়ভাবে রেডি-টু-পাবলিশ কন্টেন্ট ড্রাফট করে দেবে।",
      accent: "var(--amber)",
      accentSoft: "var(--amber-soft)",
      tag: "01 — draft",
    },
    {
      icon: <RefreshCw className="h-5 w-5" />,
      title: "Tone Rewriting",
      description:
        "যেকোনো টেক্সটকে এক ক্লিকে ফরমাল, ক্যাজুয়াল কিংবা পারসুয়াসিভ টোনে রূপান্তর করুন নিমেষেই।",
      accent: "var(--redline)",
      accentSoft: "var(--redline-soft)",
      tag: "02 — rewrite",
    },
    {
      icon: <Users2 className="h-5 w-5" />,
      title: "Team Collaboration",
      description:
        "একই ওয়ার্কস্পেসে পুরো টিম একসাথে রিয়েল-টাইমে কন্টেন্ট review, edit এবং publish করার সুবিধা।",
      accent: "var(--sage)",
      accentSoft: "var(--sage-soft)",
      tag: "03 — collaborate",
    },
  ];

  return (
    <section
      className="py-20 px-4"
    
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-xl mb-14">
          <p className="font-mono text-xs mb-3 tracking-wide" style={{ color: "var(--ink-soft)" }}>
            / capabilities
          </p>
          <h2 className="font-display text-3xl sm:text-4xl leading-tight">
            Powering your entire content workflow
          </h2>
          <p className="mt-4 text-base leading-relaxed" style={{ color: "var(--ink-soft)" }}>
            WriteFlow AI-এর এজেন্টগুলো আপনার কন্টেন্ট ক্রিয়েশনের গতি বাড়িয়ে দেবে ১০ গুণ।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group flex flex-col h-full p-7 rounded-sm border transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "var(--paper-raised)",
                borderColor: "var(--line)",
                borderTop: `3px solid ${feature.accent}`,
                boxShadow: "0 1px 2px rgba(28,35,49,0.04)",
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <div
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
                  style={{ background: feature.accentSoft, color: feature.accent }}
                >
                  {feature.icon}
                </div>
                <span
                  className="font-mono text-[11px] tracking-wide"
                  style={{ color: feature.accent }}
                >
                  {feature.tag}
                </span>
              </div>

              <h3 className="font-display text-xl mb-3">{feature.title}</h3>

              <p className="text-sm leading-relaxed flex-grow" style={{ color: "var(--ink-soft)" }}>
                {feature.description}
              </p>

              <div
                className="mt-6 h-px w-0 group-hover:w-full transition-all duration-500"
                style={{ background: feature.accent }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}