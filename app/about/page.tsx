"use client";

import React from 'react';
import { Sparkles, Users, Eye, Target, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const values = [
  {
    id: 1,
    title: "আমাদের লক্ষ্য (Mission)",
    description: "কৃত্রিম বুদ্ধিমত্তার সঠিক ব্যবহারের মাধ্যমে কন্টেন্ট ক্রিয়েশন প্রসেসকে সহজ, দ্রুত এবং সবার জন্য অ্যাক্সেসিবল করে তোলা।",
    icon: Target,
    color: "text-indigo-400"
  },
  {
    id: 2,
    title: "আমাদের ভিশন (Vision)",
    description: "ভবিষ্যতের ডিজিটাল রাইটিং এবং কন্টেন্ট মার্কেটিংয়ের দুনিয়ায় এআই-চালিত সবচেয়ে নির্ভরযোগ্য প্ল্যাটফর্ম হিসেবে নিজেকে প্রতিষ্ঠিত করা।",
    icon: Eye,
    color: "text-cyan-400"
  },
  {
    id: 3,
    title: "ডেটা সিকিউরিটি",
    description: "আপনার প্রতিটি আইডিয়া এবং কন্টেন্ট আমাদের কাছে সম্পূর্ণ সুরক্ষিত। আমরা ইউজার প্রাইভেসিকে সবচেয়ে বেশি প্রাধান্য দিই।",
    icon: ShieldCheck,
    color: "text-emerald-400"
  }
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8 pt-24 relative overflow-hidden">
      {/* গ্লাসমরফিজম ব্যাকগ্রাউন্ড গ্লো */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

       
        {/* Back Button */}
        <div className="p-6 pb-0">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors tracking-widest uppercase"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
        </div>
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* হেডার সেকশন */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 mb-4">
            <Users className="h-3.5 w-3.5" /> About WriteFlow AI
          </span>
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            আমাদের গল্প ও পথচলা
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            আমরা বিশ্বাস করি প্রযুক্তির শক্তি মানুষের সৃজনশীলতাকে থামিয়ে দেয় না, বরং আরও বাড়িয়ে দেয়। WriteFlow AI তৈরি হয়েছে আপনার লেখার গতিকে ১০ গুণ বাড়িয়ে দিতে।
          </p>
        </div>

        {/* ইন্ট্রোডাকশন সেকশন (গ্লাস কার্ড) */}
        <div className="backdrop-blur-xl bg-slate-900/40 border border-white/10 p-6 md:p-10 rounded-2xl mb-12 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-2">
                আমরা কে এবং কী করি? <Sparkles className="h-5 w-5 text-indigo-400" />
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                WriteFlow AI হলো একটি আধুনিক এআই-চালিত কন্টেন্ট রাইটিং অ্যাসিস্ট্যান্ট। এটি মূলত রাইটার, মার্কেটার, ডেভেলপার এবং কন্টেন্ট ক্রিয়েটরদের জন্য তৈরি করা হয়েছে, যাতে তারা যেকোনো ধরণের কন্টেন্ট বা আইডিয়া এক ক্লিকেই জেনারেট করতে পারেন।
              </p>
              <p className="text-slate-400 text-xs leading-relaxed">
                আমাদের অ্যাডভান্সড অ্যালগরিদম মানুষের লেখার স্বাভাবিকতা বজায় রেখে নিখুঁত এবং এসইও-ফ্রেন্ডলি কন্টেন্ট আউটপুট দিতে সক্ষম।
              </p>
            </div>
            {/* রাইট সাইড ডিজাইন এলিমেন্ট */}
            <div className="bg-slate-950/60 border border-white/5 rounded-xl p-6 text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <h4 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                10x Faster
              </h4>
              <p className="text-slate-400 text-xs uppercase tracking-wider">Content Generation Speed</p>
              <div className="mt-6 border-t border-white/5 pt-4 flex justify-around text-center">
                <div>
                  <h5 className="text-lg font-bold text-white">99%</h5>
                  <p className="text-[10px] text-slate-500">Accuracy Rate</p>
                </div>
                <div className="border-l border-white/5 h-8" />
                <div>
                  <h5 className="text-lg font-bold text-white">24/7</h5>
                  <p className="text-[10px] text-slate-500">AI Availability</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* কোর ভ্যালুজ গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {values.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id} 
                className="backdrop-blur-xl bg-slate-900/20 border border-white/5 p-6 rounded-2xl hover:border-indigo-500/20 transition-colors duration-300 flex flex-col"
              >
                <div className={`w-10 h-10 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-center mb-4 ${item.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed flex-grow">{item.description}</p>
              </div>
            );
          })}
        </div>

        {/* কল টু অ্যাকশন (CTA) */}
        <div className="text-center py-6">
          <Link 
            href="/explore" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-xs font-semibold px-6 py-3 rounded-xl shadow-lg shadow-indigo-500/20 hover:opacity-95 transition-all"
          >
            আমাদের এআই টুলসগুলো দেখুন
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;