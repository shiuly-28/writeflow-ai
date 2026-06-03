"use client";

import React, { useState } from 'react';
import { ArrowLeft, UploadCloud, Send } from 'lucide-react';
import Link from 'next/link';
// লোট্টি প্লেয়ার ইমপোর্ট করা হলো
import Lottie from 'lottie-react'; 
// আপনার লোট্টি জেসন ফাইলটি ইমপোর্ট করুন অথবা public ফোল্ডারের পাথ দিন
// import contactAnimation from "@/public/contact-animation.json"; 

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    // আপনার সাবমিট লজিক বা এপিআই কল এখানে করবেন
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8 pt-24 relative overflow-hidden flex items-center justify-center">
      {/* গ্লাসমরফিজম ব্যাকগ্রাউন্ড গ্লো */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="max-w-6xl w-full mx-auto relative z-10 backdrop-blur-xl bg-slate-900/40 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Back Button */}
        <div className="p-6 pb-0">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors tracking-widest uppercase"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
        </div>

        {/* মেইন গ্রিড লেআউট */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-12 pt-4">
          
          {/* বাম পাশ: লোট্টি অ্যানিমেশন কন্টেইনার (৫ কলাম) */}
          <div className="lg:col-span-5 flex flex-col justify-center items-center relative min-h-[300px] lg:min-h-[450px]">
            {/* স্ক্রিনশটের মতো ব্যাকগ্রাউন্ডের অ্যাবস্ট্রাক্ট শেপ */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-cyan-500/5 rounded-full blur-2xl scale-75" />
            
            <div className="w-full max-w-[360px] relative z-10">
              {/* লোট্টি প্লেয়ার: আপনার অ্যানিমেশন ফাইল থাকলে নিচের কমেন্ট তুলে দিয়ে active করতে পারেন */}
              {/* <Lottie animationData={contactAnimation} loop={true} /> */}
              
              {/* ফাইল যুক্ত করার আগ পর্যন্ত সাময়িক প্লেসহোল্ডার গ্রাফিক্স */}
              <div className="w-full aspect-square bg-slate-900/60 border border-white/5 rounded-full flex flex-col items-center justify-center text-center p-6 border-dashed">
                <div className="w-20 h-20 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 mb-4 animate-bounce">
                  <UploadCloud className="h-10 w-10" />
                </div>
                <p className="text-sm font-semibold text-slate-300">Lottie Animation Area</p>
                <p className="text-xs text-slate-500 mt-1">আপনার .json ফাইলটি এখানে লোড হবে</p>
              </div>
            </div>
          </div>

          {/* ডান পাশ: কন্টাক্ট ফর্ম (৭ কলাম) */}
          <div className="lg:col-span-7 bg-slate-950/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 md:p-8 shadow-xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                Get in touch
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                Our support team will get in touch with you shortly.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* নাম এবং ইমেইল পাশাপাশি */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="example@mail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              {/* সাবজেক্ট */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="What is this regarding?"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              {/* মেসেজ ডিটেইলস */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Message Details</label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                />
              </div>

              {/* কাস্টম ফাইল আপলোড (অপশনাল) */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Attachments (Optional)</label>
                <label className="w-full flex flex-col items-center justify-center bg-slate-900/30 hover:bg-slate-900/50 border border-dashed border-white/10 hover:border-indigo-500/50 rounded-xl py-4 cursor-pointer transition-all group">
                  <div className="flex items-center gap-2 text-xs text-slate-400 group-hover:text-slate-300">
                    <UploadCloud className="h-4 w-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                    <span>Add screenshot or files</span>
                  </div>
                  <input type="file" className="hidden" />
                </label>
              </div>

              {/* সাবমিট বাটন */}
              <button
                type="submit"
                className="w-full mt-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-semibold text-sm py-3.5 px-4 rounded-xl shadow-lg shadow-orange-500/10 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
              >
                <span>Send Message</span>
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;