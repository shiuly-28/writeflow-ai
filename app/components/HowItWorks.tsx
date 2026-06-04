"use client";

import { ClipboardList, MessageSquare, Cpu, CheckCircle } from "lucide-react";

interface Step {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

// টাইপস্ক্রিপ্টের জন্য Props টাইপ ডিফাইন করা
interface HowItWorksProps {
  isDarkMode: boolean;
}

export default function HowItWorks({ isDarkMode }: HowItWorksProps) {
  const steps: Step[] = [
    { number: "01", icon: <ClipboardList className={`h-5 w-5 ${isDarkMode ? "text-indigo-400" : "text-indigo-600"}`} />, title: "Pick Template", description: "আপনার ক্যাটাগরি অনুযায়ী একটি রেডিমেড এআই টেমপ্লেট বেছে নিন।" },
    { number: "02", icon: <MessageSquare className={`h-5 w-5 ${isDarkMode ? "text-indigo-400" : "text-indigo-600"}`} />, title: "Enter Topic", description: "আপনার টপিক, কি-ওয়ার্ড এবং টার্গেট অডিয়েন্স ইনপুট দিন।" },
    { number: "03", icon: <Cpu className={`h-5 w-5 ${isDarkMode ? "text-indigo-400" : "text-indigo-600"}`} />, title: "AI Generates", description: "ব্যাকগ্রাউন্ড এজেন্ট স্বয়ংক্রিয়ভাবে কন্টেন্ট অপ্টিমাইজড করে তৈরি করবে।" },
    { number: "04", icon: <CheckCircle className={`h-5 w-5 ${isDarkMode ? "text-indigo-400" : "text-indigo-600"}`} />, title: "Edit & Publish", description: "স্মার্ট এডিটরে ফাইনাল টাচ দিয়ে সরাসরি পাবলিশ বা এক্সপোর্ট করুন।" }
  ];

  return (
    // 💡 ডাইনামিক ব্যাকগ্রাউন্ড, টেক্সট এবং বর্ডার কালার টগল
    <section className={`py-20 px-4 border-t transition-colors duration-300 ${
      isDarkMode 
        ? "bg-slate-950 text-white border-white/5" 
        : "bg-slate-50 text-slate-900 border-slate-200"
    }`}>
      <div className="mx-auto max-w-7xl">
        
        {/* টপ হেডার সেকশন */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className={`text-3xl font-bold sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r ${
            isDarkMode ? "from-white to-slate-400" : "from-slate-900 to-slate-600"
          }`}>
            How It Works
          </h2>
          <p className={`mt-4 transition-colors ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
            আইডিয়া থেকে পাবলিশ — মাত্র ৪টি সহজ ধাপে আপনার কন্টেন্ট রেডি করুন।
          </p>
        </div>

        {/* স্টেপ ফ্লো গ্রিড (blur রিমুভড এবং থিম ক্লাস যোগ করা হয়েছে) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`relative flex flex-col h-full rounded-2xl border p-6 shadow-xl transition-all duration-300 ${
                isDarkMode 
                  ? "border-white/10 bg-slate-900/40" 
                  : "border-slate-200/60 bg-white"
              }`}
            >
              {/* ব্যাকগ্রাউন্ডে থাকা বড় কাউন্টার নাম্বার (01, 02...) */}
              <span className={`absolute top-4 right-6 text-4xl font-extrabold font-mono transition-colors ${
                isDarkMode ? "text-white/5" : "text-slate-900/5"
              }`}>
                {step.number}
              </span>
              
              {/* আইকন কন্টেইনার বক্স */}
              <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border ${
                isDarkMode 
                  ? "bg-indigo-500/10 border-indigo-500/20" 
                  : "bg-indigo-50 border-indigo-100"
              }`}>
                {step.icon}
              </div>
              
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              
              {/* ডেসক্রিপশন টেক্সট */}
              <p className={`text-xs leading-relaxed flex-grow transition-colors ${
                isDarkMode ? "text-slate-400" : "text-slate-600"
              }`}>
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}