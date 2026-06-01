"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    { question: "WriteFlow AI কীভাবে কাজ করে?", answer: "এটি একটি এজেন্টিক এআই প্ল্যাটফর্ম। আপনি শুধু টপিক বা প্রম্পট দিয়ে কাজ শুরু করলে, ব্যাকগ্রাউন্ড এজেন্ট স্বয়ংক্রিয়ভাবে পুরো কন্টেন্ট রিসার্চ, স্ট্রাকচারিং এবং রাইটিং সম্পন্ন করে দেয়।" },
    { question: "আমি কি ফ্রি অ্যাকাউন্ট দিয়ে শুরু করতে পারব?", answer: "হ্যাঁ, ফ্রি অ্যাকাউন্টে আপনি প্রতি মাসে ৫,০০০ শব্দ সম্পূর্ণ ফ্রিতে জেনারেট করতে পারবেন এবং বেসিক টেমপ্লেটগুলো অ্যাক্সেস করতে পারবেন।" },
    { question: "জেনারেট করা কন্টেন্টের কপিরাইট কার থাকবে?", answer: "WriteFlow AI দিয়ে জেনারেট করা সমস্ত কন্টেন্টের শতভাগ মালিকানা আপনার। আপনি এটি যেকোনো বাণিজ্যিক বা ব্যক্তিগত কাজে ব্যবহার করতে পারবেন।" },
  ];

  return (
    <section className="py-20 bg-slate-950 text-white px-4 border-t border-white/5">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="rounded-xl border border-white/10 bg-slate-900/20 overflow-hidden transition-all">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left font-medium text-sm sm:text-base hover:bg-slate-900/50 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-indigo-400" : ""}`} />
                </button>
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-40 border-t border-white/5" : "max-h-0"}`}>
                  <p className="p-5 text-xs sm:text-sm text-slate-400 leading-relaxed bg-slate-950/40">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}