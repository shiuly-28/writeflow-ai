import React from 'react';
import Link from 'next/link';
import { Sparkles, Calendar, User, ArrowRight, BookOpen } from 'lucide-react';

// স্যাম্পল ব্লগ ডেটা (পরবর্তীতে ডাটাবেজ থেকে আনলে এটা ডাইনামিক করা যাবে)
const blogPosts = [
  {
    id: 1,
    title: "AI দিয়ে কীভাবে প্রফেশনাল কন্টেন্ট রাইটিং করবেন?",
    description: "বর্তমান যুগে কৃত্রিম বুদ্ধিমত্তা ব্যবহার করে লেখার মান উন্নত করার এবং কম সময়ে কন্টেন্ট তৈরি করার দারুণ কিছু সিক্রেট টেকনিক।",
    author: "WriteFlow Team",
    date: "June 03, 2026",
    category: "AI Technology",
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    id: 2,
    title: "নেক্সট.জেএস (Next.js) প্রজেক্টে এসইও (SEO) অপ্টিমাইজেশন",
    description: "আপনার তৈরি করা নেক্সট.জেএস ওয়েব অ্যাপ্লিকেশন কীভাবে সার্চ ইঞ্জিনের প্রথম পাতায় নিয়ে আসবেন তার একটি গাইডলাইন।",
    author: "Shiuly Akhter",
    date: "May 28, 2026",
    category: "Web Dev",
    gradient: "from-cyan-500 to-blue-500"
  },
  {
    id: 3,
    title: "কপিরাইটিংয়ের ভবিষ্যৎ এবং রাইটারদের ভূমিকা",
    description: "এআই টুলস থাকা সত্ত্বেও কেন মানুষের ক্রিয়েটিভিটি এবং ইমোশনাল টাচ কপিরাইটিংয়ের জন্য আজীবন অপরিহার্য থাকবে।",
    author: "Content Expert",
    date: "May 15, 2026",
    category: "Copywriting",
    gradient: "from-emerald-500 to-teal-500"
  }
];

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8 pt-24 relative overflow-hidden">
      {/* ব্যাকগ্রাউন্ডের চমৎকার গ্লোয়িং ইফেক্ট */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* হেডার সেকশন */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 mb-4">
            <Sparkles className="h-3.5 w-3.5" /> WriteFlow Insights
          </span>
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            আমাদের ব্লগ ও কন্টেন্ট হাব
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
            কৃত্রিম বুদ্ধিমত্তা, কন্টেন্ট ক্রিয়েশন এবং আধুনিক ওয়েব ডেভেলপমেন্টের দুনিয়ার চমৎকার সব আর্টিকেল পড়ুন।
          </p>
        </div>

        {/* ব্লগের ৩-কলাম রেসপন্সিভ গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <article 
              key={post.id} 
              className="group backdrop-blur-xl bg-slate-900/40 border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-all duration-300 flex flex-col hover:-translate-y-1 shadow-xl"
            >
              {/* কার্ডের উপরের ছোট কালার টপ-বার */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${post.gradient}`} />
              
              <div className="p-6 flex flex-col flex-grow">
                {/* ক্যাটাগরি */}
                <div className="mb-3">
                  <span className="text-[10px] uppercase tracking-wider bg-white/5 border border-white/10 px-2.5 py-1 rounded-md text-slate-300 font-medium">
                    {post.category}
                  </span>
                </div>

                {/* টাইটেল */}
                <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors duration-200 line-clamp-2 mb-3">
                  {post.title}
                </h3>

                {/* ডেসক্রিপশন */}
                <p className="text-slate-400 text-sm line-clamp-3 mb-6 flex-grow">
                  {post.description}
                </p>

                {/* মেটা ডেটা (লেখক ও তারিখ) */}
                <div className="border-t border-white/5 pt-4 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-slate-400" />
                    <span className="truncate max-w-[100px]">{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                    <span>{post.date}</span>
                  </div>
                </div>

                {/* Read More বাটন */}
                <Link 
                  href={`/blog/${post.id}`}
                  className="mt-4 inline-flex items-center justify-center gap-1.5 w-full bg-slate-950 hover:bg-indigo-600 border border-white/10 hover:border-indigo-500 py-2.5 px-4 rounded-xl text-xs font-semibold text-white transition-all duration-300"
                >
                  বিস্তারিত পড়ুন
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
};

export default BlogPage;