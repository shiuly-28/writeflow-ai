"use client";

import { FileText, Share2, Mail, MessageSquare, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Template {
  icon: React.ReactNode;
  title: string;
  description: string;
  category: string;
  accent: string;
  accentSoft: string;
  stat: string;
  statLabel: string;
  preview: string[];
}

interface PopularTemplatesProps {
  isDarkMode: boolean;
}

export default function PopularTemplates({ isDarkMode }: PopularTemplatesProps) {
  const router = useRouter();

  const templates: Template[] = [
    {
      icon: <FileText className="h-4 w-4" />,
      title: "SEO Blog Post",
      description: "সার্চ ইঞ্জিনে র‍্যাঙ্ক করার মতো অপ্টিমাইজড লং-ফর্ম ব্লগ পোস্ট তৈরি করুন।",
      category: "Blog",
      accent: "var(--amber)",
      accentSoft: "var(--amber-soft)",
      stat: "2.4k",
      statLabel: "words avg",
      preview: ["The Complete Guide to...", "Introduction paragraph draft", "██████ ████ ████"],
    },
    {
      icon: <Share2 className="h-4 w-4" />,
      title: "LinkedIn Engagement",
      description: "আপনার প্রফেশনাল নেটওয়ার্কের জন্য আকর্ষক এবং ভাইরাল ক্যাপশন।",
      category: "Social Media",
      accent: "var(--sage)",
      accentSoft: "var(--sage-soft)",
      stat: "94%",
      statLabel: "engagement",
      preview: ["🚀 Big announcement:", "██████ ████████ ██", "#growth #startup"],
    },
    {
      icon: <Mail className="h-4 w-4" />,
      title: "Cold Email Outreach",
      description: "ক্লাইন্ট বা লিড কনভার্ট করার জন্য পারসুয়াসিভ ইমেইল কপি।",
      category: "Email",
      accent: "var(--redline)",
      accentSoft: "var(--redline-soft)",
      stat: "38%",
      statLabel: "reply rate",
      preview: ["Subject: Quick question", "Hi {{first_name}},", "████ ██████ ████"],
    },
    {
      icon: <MessageSquare className="h-4 w-4" />,
      title: "Facebook Ad Copy",
      description: "বেশি সেলস এনে দেওয়ার মতো হাই-কনভার্টিং ফেসবুক বিজ্ঞাপন কপি।",
      category: "Ad Copy",
      accent: "var(--amber)",
      accentSoft: "var(--amber-soft)",
      stat: "3.1x",
      statLabel: "avg ROAS",
      preview: ["Limited time offer 🔥", "████████ ████ ███", "Shop now →"],
    },
  ];

  const handleUseTemplate = () => router.push("/dashboard");

  return (
    <section
      className="py-20 px-4 border-t"
     
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
          <div>
            <p className="font-mono text-xs mb-3 tracking-wide" style={{ color: "var(--ink-soft)" }}>
              / template shelf
            </p>
            <h2 className="font-display text-3xl sm:text-4xl leading-tight">
              Pull a template off the shelf
            </h2>
          </div>
          <Link
            href="/explore"
            className="group inline-flex items-center gap-1 text-sm font-medium"
            style={{ color: "var(--redline)" }}
          >
            View all
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {templates.map((template) => (
            <div
              key={template.title}
              className="relative rounded-2xl border p-6 overflow-hidden group"
              style={{ background: template.accentSoft, borderColor: "var(--line)" }}
            >
              {/* header row */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full"
                    style={{ background: "var(--paper-raised)", color: template.accent }}
                  >
                    {template.icon}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wide" style={{ color: "var(--ink-soft)" }}>
                    {template.category}
                  </span>
                </div>
                <Sparkles className="h-4 w-4" style={{ color: template.accent }} />
              </div>

              <h3 className="font-display text-xl mb-2" style={{ color: "var(--ink)" }}>
                {template.title}
              </h3>
              <p className="text-xs leading-relaxed mb-5 max-w-[85%]" style={{ color: "var(--ink-soft)" }}>
                {template.description}
              </p>

              {/* mini preview mockup, floating stat badge — screenshot reference style */}
              <div className="relative mt-2">
                <div
                  className="rounded-xl border p-4 shadow-sm transition-transform duration-300 group-hover:-translate-y-1"
                  style={{ background: "var(--paper-raised)", borderColor: "var(--line)" }}
                >
                  {template.preview.map((line, i) => (
                    <div
                      key={i}
                      className="h-2 rounded-full mb-2 last:mb-0 font-mono text-[9px] flex items-center px-2 overflow-hidden whitespace-nowrap"
                      style={{
                        background: i === 0 ? "transparent" : "var(--line)",
                        color: "var(--ink-soft)",
                        opacity: i === 0 ? 1 : 0.5,
                        height: i === 0 ? "auto" : "6px",
                      }}
                    >
                      {i === 0 ? line : ""}
                    </div>
                  ))}
                </div>

                <div
                  className="absolute -bottom-3 -right-3 rounded-full border shadow-md px-3 py-1.5"
                  style={{ background: "var(--ink)", borderColor: "var(--ink)" }}
                >
                  <p className="font-display text-sm leading-none text-white">{template.stat}</p>
                  <p className="text-[8px] font-mono mt-0.5" style={{ color: template.accent }}>
                    {template.statLabel}
                  </p>
                </div>
              </div>

              <button
                onClick={handleUseTemplate}
                className="mt-8 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium transition-transform group-hover:gap-2.5"
                style={{ background: "var(--ink)", color: "var(--paper)" }}
              >
                Use template
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}