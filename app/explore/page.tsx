"use client";

import React, { useState } from 'react';
import { Sparkles, Search, Code, PenTool, MessageSquare, Zap, ArrowRight, Grid } from 'lucide-react';

const categories = [
  { id: 'all', name: 'All Tools', icon: Grid },
  { id: 'writing', name: 'Content Writing', icon: PenTool },
  { id: 'coding', name: 'Coding Assistants', icon: Code },
  { id: 'chat', name: 'AI Chatbots', icon: MessageSquare },
];

const exploreItems = [
  {
    id: 1,
    title: "AI Blog Post Generator",
    description: "যেকোনো টপিক দিন, আর এসইও ফ্রেন্ডলি সম্পূর্ণ ব্লগ পোস্ট জেনারেট করে নিন মুহূর্তের মধ্যে।",
    category: "writing",
    badge: "Popular",
    clicks: "2.4k uses"
  },
  {
    id: 2,
    title: "Code Bug Fixer & Explainer",
    description: "আপনার কোডের এরর পেস্ট করুন। এই এআই টুলটি এরর ফিক্স করার পাশাপাশি সহজ ভাষায় বুঝিয়েও দেবে।",
    category: "coding",
    badge: "New",
    clicks: "1.2k uses"
  },
  {
    id: 3,
    title: "Social Media Caption Craft",
    description: "ফেসবুক, লিঙ্কডইন বা ইনস্টাগ্রামের জন্য আকর্ষক এবং ট্রেন্ডি ক্যাপশন ও হ্যাশট্যাগ তৈরি করুন।",
    category: "writing",
    badge: "Free",
    clicks: "950 uses"
  },
  {
    id: 4,
    title: "SQL Query Generator",
    description: "সাধারণ ইংরেজিতে বলুন আপনি কী ডেটা চান, এআই আপনাকে নিখুঁত SQL কোড লিখে দেবে।",
    category: "coding",
    badge: "Pro",
    clicks: "1.8k uses"
  },
  {
    id: 5,
    title: "Creative Story Teller",
    description: "বাচ্চাদের গল্প বা উপন্যাসের প্লট আইডিয়া জেনারেট করার জন্য একটি অনন্য ক্রিয়েটিভ কন্টেন্ট টুল।",
    category: "writing",
    badge: "Free",
    clicks: "620 uses"
  },
  {
    id: 6,
    title: "Contextual AI Chatbot",
    description: "যেকোনো বড় ডকুমেন্টস বা পিডিএফ আপলোড করে সরাসরি তার সাথে চ্যাট বা প্রশ্ন-উত্তর করুন।",
    category: "chat",
    badge: "Hot",
    clicks: "3.1k uses"
  }
];

const ExplorePage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // ফিল্টারিং লজিক
  const filteredItems = exploreItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8 pt-24 relative overflow-hidden">
      {/* গ্লোয়িং গ্লাস ব্যাকগ্রাউন্ড ইফেক্ট */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* হেডার ও ইন্ট্রো */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 mb-4 animate-pulse">
            <Zap className="h-3.5 w-3.5" /> Explore WriteFlow AI
          </div>
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent mb-4">
            স্মার্ট এআই টুলস গ্যালারি
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
            আপনার কাজকে ১০ গুণ সহজ করতে আমাদের কাস্টম-বিল্ট কৃত্রিম বুদ্ধিমত্তার ম্যাজিকাল টুলগুলো এক্সপ্লোর করুন।
          </p>
        </div>

        {/* সার্চ এবং ফিল্টার সেকশন */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 backdrop-blur-xl bg-slate-900/20 border border-white/5 p-4 rounded-2xl">
          {/* সার্চ বার */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="টুলস সার্চ করুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          {/* ফিল্টার ট্যাব */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border ${
                    activeCategory === cat.id
                      ? 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-white border-transparent shadow-lg shadow-cyan-500/10'
                      : 'bg-slate-950 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* টুলস গ্রিড */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group border border-white/10 bg-slate-900/40 backdrop-blur-xl rounded-2xl p-6 transition-all duration-300 hover:border-cyan-500/30 flex flex-col hover:-translate-y-1 shadow-xl"
              >
                {/* কার্ড হেডার (ব্যাজ ও ইউজেস) */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                    item.badge === 'Popular' || item.badge === 'Hot'
                      ? 'bg-rose-500/10 border border-rose-500/20 text-rose-400'
                      : item.badge === 'New'
                      ? 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-400'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.badge}
                  </span>
                  <span className="text-[11px] text-slate-500">{item.clicks}</span>
                </div>

                {/* টাইটেল */}
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors duration-200 flex items-center gap-2 mb-2">
                  {item.title}
                </h3>

                {/* ডেসক্রিপশন */}
                <p className="text-slate-400 text-xs leading-relaxed mb-6 flex-grow">
                  {item.description}
                </p>

                {/* অ্যাকশন বাটন */}
                <button className="inline-flex items-center justify-between w-full bg-slate-950 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-indigo-500 group-hover:border-transparent border border-white/10 py-3 px-4 rounded-xl text-xs font-semibold text-white transition-all duration-300">
                  <span>টুলটি ব্যবহার করুন</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          /* নট ফাউন্ড স্টেট */
          <div className="text-center py-20 backdrop-blur-xl bg-slate-900/20 border border-white/5 rounded-2xl">
            <Sparkles className="h-8 w-8 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-500 text-sm">আপনার খোঁজা টপিকের কোনো এআই টুল পাওয়া যায়নি।</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default ExplorePage;