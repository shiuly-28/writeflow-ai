"use client";

import { Star } from "lucide-react";

interface Stat {
  value: string;
  label: string;
}

interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  review: string;
}

// টাইপস্ক্রিপ্টের জন্য Props টাইপ ডিফাইন করা
interface StatsAndReviewsProps {
  isDarkMode: boolean;
}

export default function StatsAndReviews({ isDarkMode }: StatsAndReviewsProps) {
  const stats: Stat[] = [
    { value: "10,000+", label: "সক্রিয় ইউজার" },
    { value: "500,000+", label: "জেনারেটেড শব্দ" },
    { value: "99.9%", label: "এজেন্ট আপটাইম" },
    { value: "4.9/5", label: "কাস্টমার রেটিং" },
  ];

  const testimonials: Testimonial[] = [
    {
      name: "রাকিব হাসান",
      role: "SaaS Founder",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
      review: "WriteFlow AI আমার কন্টেন্ট টিমের কাজের গতি অনেক বাড়িয়ে দিয়েছে। বিশেষ করে এর ব্যাকগ্রাউন্ড এআই এজেন্টগুলো জাস্ট অসাধারণ কাজ করে!",
    },
    {
      name: "ফারহানা আক্তার",
      role: "SEO Specialist",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
      review: "কোনো ডামি টেক্সট ছাড়াই এই এআই এসইও অপ্টিমাইজড ব্লগ পোস্টের চমৎকার আউটপুট দেয়। ফ্রিল্যান্সারদের জন্য এটি একটি মাস্ট-হ্যাভ টুল।",
    }
  ];

  return (
    // 💡 ডাইনামিক ব্যাকগ্রাউন্ড, টেক্সট এবং বর্ডার কালার টগল
    <section className={`py-20 px-4 border-t transition-colors duration-300 ${
      isDarkMode 
        ? "bg-slate-950 text-white border-white/5" 
        : "bg-slate-50 text-slate-900 border-slate-200"
    }`}>
      <div className="mx-auto max-w-7xl">
        
        {/* ১. স্ট্যাটিস্টিকস সাব-সেকশন (blur রিমুভড ও কার্ড ডিজাইন ফিক্সড) */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-8 text-center mb-24 rounded-2xl py-10 border transition-all ${
          isDarkMode 
            ? "bg-slate-900/30 border-white/5" 
            : "bg-white border-slate-200/60 shadow-md"
        }`}>
          {stats.map((stat, index) => (
            <div key={index}>
              {/* স্ট্যাট ভ্যালু গ্রাডিয়েন্ট (লাইট মোডে একটু ডিপ কালার করা হয়েছে যাতে স্পষ্ট বোঝা যায়) */}
              <div className={`text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r mb-2 ${
                isDarkMode ? "from-indigo-400 to-cyan-400" : "from-indigo-600 to-cyan-600"
              }`}>
                {stat.value}
              </div>
              <div className={isDarkMode ? "text-slate-400 text-xs sm:text-sm" : "text-slate-600 text-xs sm:text-sm font-medium"}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* ২. টেস্টিমোনিয়াল সাব-সেকশন হেডার */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${
            isDarkMode ? "from-white to-slate-400" : "from-slate-900 to-slate-600"
          }`}>
            What Our Users Say
          </h2>
        </div>

        {/* রিভিউ কার্ড গ্রিড (blur রিমুভড) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((item, index) => (
            <div 
              key={index} 
              className={`flex flex-col justify-between h-full rounded-2xl border p-6 shadow-xl transition-all ${
                isDarkMode 
                  ? "border-white/10 bg-slate-900/40" 
                  : "border-slate-200/60 bg-white"
              }`}
            >
              {/* স্টার রেটিং */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              
              {/* রিভিউ টেক্সট */}
              <p className={`text-sm leading-relaxed mb-6 flex-grow transition-colors ${
                isDarkMode ? "text-slate-300" : "text-slate-600"
              }`}>
                "{item.review}"
              </p>
              
              {/* ইউজার ইনফো */}
              <div className={`flex items-center gap-4 border-t pt-4 ${
                isDarkMode ? "border-white/5" : "border-slate-100"
              }`}>
                <img 
                  src={item.avatar} 
                  alt={item.name} 
                  className={`h-10 w-10 rounded-full object-cover border ${
                    isDarkMode ? "border-white/10" : "border-slate-200"
                  }`} 
                />
                <div>
                  <h4 className="text-sm font-semibold">{item.name}</h4>
                  <p className={isDarkMode ? "text-slate-500 text-xs" : "text-slate-400 text-xs font-medium"}>
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}