"use client";

import { Cpu, RefreshCw, Users } from "lucide-react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// টাইপস্ক্রিপ্টের জন্য Props টাইপ ডিফাইন করা
interface FeaturesProps {
  isDarkMode: boolean;
}

export default function Features({ isDarkMode }: FeaturesProps) {
  const features: Feature[] = [
    {
      // ডার্ক মোডে আইকন একটু ব্রাইট, লাইট মোডে একটু ডিপ করা হয়েছে যাতে স্পষ্ট দেখা যায়
      icon: <Cpu className={`h-6 w-6 ${isDarkMode ? "text-amber-400" : "text-amber-600"}`} />,
      title: "AI Drafting Agent",
      description: "শুধু টপিক আর টোন সিলেক্ট করুন, আমাদের ব্যাকগ্রাউন্ড এজেন্ট স্বয়ংক্রিয়ভাবে রেডি-টু-পাবলিশ কন্টেন্ট ড্রাফট করে দেবে।"
    },
    {
      icon: <RefreshCw className={`h-6 w-6 ${isDarkMode ? "text-cyan-400" : "text-cyan-600"}`} />,
      title: "Tone Rewriting",
      description: "যেকোনো টেক্সটকে এক ক্লিকে ফরমাল, ক্যাজুয়াল কিংবা পারসুয়াসিভ টোনে রূপান্তর করুন নিমেষেই।"
    },
    {
      icon: <Users className={`h-6 w-6 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />,
      title: "Team Collaboration",
      description: "একই ওয়ার্কস্পেসে পুরো টিম একসাথে রিয়েল-টাইমে কন্টেন্ট REVIEW, এডিট এবং পাবলিশ করার সুবিধা।"
    }
  ];

  return (
    // 💡 থিম অনুযায়ী সেকশনের ব্যাকগ্রাউন্ড ও মেইন টেক্সট টগল হবে
    <section className={`py-20 px-4 transition-colors duration-300 ${
      isDarkMode ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"
    }`}>
      <div className="mx-auto max-w-7xl">
        
        {/* টপ হেডার সেকশন */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className={`text-3xl font-bold sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r ${
            isDarkMode ? "from-white to-slate-400" : "from-slate-900 to-slate-600"
          }`}>
            Powering Your Entire Content Workflow
          </h2>
          <p className={`mt-4 transition-colors ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
            WriteFlow AI-এর শক্তিশালী এআই এজেন্টগুলো আপনার কন্টেন্ট ক্রিয়েশনের গতি বাড়িয়ে দেবে ১০ গুণ।
          </p>
        </div>

        {/* ৩-কলাম কার্ড গ্রিড (blur রিমুভড এবং কালার ফিক্সড) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`flex flex-col h-full rounded-2xl border p-6 shadow-xl transition-all duration-300 ${
                isDarkMode 
                  ? "border-white/10 bg-slate-900/40 hover:border-amber-500/30" 
                  : "border-slate-200/60 bg-white hover:border-amber-500/20 hover:shadow-2xl"
              }`}
            >
              {/* আইকন কন্টেইনার বক্স */}
              <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border ${
                isDarkMode ? "bg-slate-800 border-white/5" : "bg-slate-100 border-slate-200/60"
              }`}>
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              
              {/* কার্ড ডেসক্রিপশন টেক্সট */}
              <p className={`text-sm leading-relaxed flex-grow transition-colors ${
                isDarkMode ? "text-slate-400" : "text-slate-600"
              }`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}