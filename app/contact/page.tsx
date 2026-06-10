"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeft, UploadCloud, Send, Loader2, CheckCircle2, X } from 'lucide-react';
import Link from 'next/link';
import Lottie from "lottie-react";

import contactAnim from '../animation/contact.json';

// টাইপস্ক্রিপ্টের জন্য Props টাইপ ডিফাইন করা
interface ContactPageProps {
  isDarkMode: boolean;
}

const ContactPage = ({ isDarkMode }: ContactPageProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // ফাইল আপলোড ও প্রিভিউ ট্র্যাকিংয়ের জন্য স্টেট
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  // ফর্মের অ্যাকশন ট্র্যাকিং স্টেট
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // ফাইল হ্যান্ডলিং এবং ইমেজ প্রিভিউ লজিক
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      setFile(selectedFile);
      setIsSuccess(false); // নতুন ফাইল সিলেক্ট করলে আগের সাকসেস মেসেজ হাইড হবে

      // ফাইলটি যদি ইমেজ হয় তবে প্রিভিউ URL তৈরি হবে
      if (selectedFile.type.startsWith("image/")) {
        const url = URL.createObjectURL(selectedFile);
        setPreviewUrl(url);
      } else {
        setPreviewUrl(null); // ইমেজ না হলে কোনো প্রিভিউ থাকবে না
      }
    }
  };

  // প্রিভিউ ডিলিট বা রিমুভ করার ফাংশন
  const removeFile = (e: React.MouseEvent) => {
    e.preventDefault(); // লেবেলের ট্রিগার আটকানোর জন্য
    setFile(null);
    setPreviewUrl(null);
  };

  // মেমোরি লিক রোধ করতে কম্পোনেন্ট আনমাউন্ট হলে ওল্ড URL ক্লিন করা
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 🔄 এপিআই কল করার জন্য স্ট্রাকচার:
      // const data = new FormData();
      // data.append('name', formData.name);
      // if(file) data.append('file', file);
      // await fetch('/api/contact', { method: 'POST', body: data });

      // একটি ডেমো ডিলে (Fake Delay)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Submitted Data:", { ...formData, file });
      setIsSuccess(true);

      // সাবমিট শেষে ফর্ম রিসেট করা
      setFormData({ name: '', email: '', subject: '', message: '' });
      setFile(null);
      setPreviewUrl(null);
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen p-4 md:p-8 pt-24 relative overflow-hidden flex items-center justify-center transition-colors duration-300 ${
      isDarkMode ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"
    }`}>
      
      {/* ব্যাকগ্রাউন্ড ডেকোরেティブ গ্লো */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-indigo-500/5 transition-all duration-300" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-cyan-500/5 transition-all duration-300" />

      {/* মেইন কন্টেইনারカード */}
      <div className={`max-w-6xl w-full mx-auto relative z-10 border rounded-3xl overflow-hidden transition-all duration-300 ${
        isDarkMode 
          ? "border-white/10 bg-slate-900/20 shadow-2xl" 
          : "border-slate-200 bg-white shadow-xl shadow-slate-200/50"
      }`}>
        
        {/* Back Button */}
        <div className="p-6 pb-0">
          <Link 
            href="/" 
            className={`inline-flex items-center gap-2 text-xs font-bold transition-colors tracking-widest uppercase ${
              isDarkMode ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-indigo-600"
            }`}
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
        </div>

        {/* মেইন গ্রিড লেআউট */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-12 pt-4">
          
          {/* বাম পাশ: লোট্টি অ্যানিমেশন */}
          <div className="lg:col-span-5 flex flex-col justify-center items-center relative min-h-[300px] lg:min-h-[450px]">
            <div className="w-full max-w-[380px] relative z-10">
              <Lottie 
                animationData={contactAnim} 
                loop={true} 
                autoplay={true}
              />
            </div>
          </div>

          {/* ডান পাশ: কন্টাক্ট ফর্ম */}
          <div className={`lg:col-span-7 border rounded-2xl p-6 md:p-8 transition-colors duration-300 ${
            isDarkMode ? "border-white/5 bg-slate-950/40" : "border-slate-100 bg-slate-50/50"
          }`}>
            <div className="mb-8">
              <h1 className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${
                isDarkMode ? "from-white to-slate-400" : "from-slate-900 to-slate-600"
              }`}>
                Get in touch
              </h1>
              <p className={`text-sm mt-1 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                Our support team will get in touch with you shortly.
              </p>
            </div>

            {/* সাকসেস মেসেজ অ্যালার্ট বক্স */}
            {isSuccess && (
              <div className="mb-6 flex items-center gap-3 p-4 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-xl text-sm font-semibold animate-in fade-in-50 duration-300">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                <span>Thank you! Your message has been sent successfully.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* নাম এবং ইমেইল পাশাপাশি */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className={`text-[10px] font-bold uppercase tracking-wider block ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => {
                      setIsSuccess(false);
                      setFormData({...formData, name: e.target.value});
                    }}
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none transition-all ${
                      isDarkMode 
                        ? "bg-slate-900 border-white/10 text-white placeholder-slate-600 focus:border-indigo-500" 
                        : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-indigo-600"
                    }`}
                  />
                </div>

                <div className="space-y-2">
                  <label className={`text-[10px] font-bold uppercase tracking-wider block ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="example@mail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none transition-all ${
                      isDarkMode 
                        ? "bg-slate-900 border-white/10 text-white placeholder-slate-600 focus:border-indigo-500" 
                        : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-indigo-600"
                    }`}
                  />
                </div>
              </div>

              {/* সাবজেক্ট */}
              <div className="space-y-2">
                <label className={`text-[10px] font-bold uppercase tracking-wider block ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>Subject</label>
                <input
                  type="text"
                  required
                  placeholder="What is this regarding?"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none transition-all ${
                    isDarkMode 
                      ? "bg-slate-900 border-white/10 text-white placeholder-slate-600 focus:border-indigo-500" 
                      : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-indigo-600"
                  }`}
                />
              </div>

              {/* মেসেজ ডিটেইলস */}
              <div className="space-y-2">
                <label className={`text-[10px] font-bold uppercase tracking-wider block ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>Message Details</label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none transition-all resize-none ${
                    isDarkMode 
                      ? "bg-slate-900 border-white/10 text-white placeholder-slate-600 focus:border-indigo-500" 
                      : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-indigo-600"
                  }`}
                />
              </div>

              {/* ফাইল আপলোড ও লাইভ ইমেজ প্রিভিউ অপশন */}
              <div className="space-y-2">
                <label className={`text-[10px] font-bold uppercase tracking-wider block ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>Attachments (Optional)</label>
                
                <label className={`w-full flex flex-col items-center justify-center border border-dashed rounded-xl p-5 cursor-pointer transition-all group relative ${
                  isDarkMode 
                    ? "bg-slate-900/30 hover:bg-slate-900/50 border-white/10 hover:border-indigo-500/50" 
                    : "bg-white hover:bg-slate-50 border-slate-200 hover:border-indigo-600/50"
                }`}>
                  
                  {/* ইমেজ সিলেক্ট করা থাকলে প্রিভিউ দেখাবে */}
                  {previewUrl ? (
                    <div className="w-full flex flex-col items-center gap-2">
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 group/img">
                        <img 
                          src={previewUrl} 
                          alt="Attachment Preview" 
                          className="w-full h-full object-cover"
                        />
                        {/* ইমেজ রিমুভ করার চমৎকার ক্লোজ বাটন */}
                        <button 
                          onClick={removeFile}
                          className="absolute top-1 right-1 p-1 bg-rose-500 text-white rounded-full opacity-100 lg:opacity-0 lg:group-hover/img:opacity-100 transition-opacity shadow-md"
                          title="Remove image"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                      <span className={`text-xs font-semibold max-w-[250px] truncate ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
                        {file?.name}
                      </span>
                      <span className="text-[10px] text-amber-500 font-bold hover:underline">Change image</span>
                    </div>
                  ) : (
                    // কোনো ফাইল না থাকলে ডিফল্ট আপলোড প্লেসহোল্ডার
                    <div className="flex items-center gap-2 text-xs transition-colors py-3">
                      <UploadCloud className={`h-4 w-4 transition-colors ${isDarkMode ? "text-slate-500 group-hover:text-indigo-400" : "text-slate-400 group-hover:text-indigo-600"}`} />
                      <span className={isDarkMode ? "text-slate-400 group-hover:text-slate-300" : "text-slate-500 group-hover:text-slate-700"}>
                        {file ? file.name : "Add screenshot or files"}
                      </span>
                    </div>
                  )}
                  
                  <input 
                    type="file" 
                    accept="image/*" // শুধু ইমেজ ফাইলগুলোর ফিল্টারিং সাপোর্ট করবে
                    className="hidden" 
                    onChange={handleFileChange}
                  />
                </label>
              </div>

              {/* সাবমিট বাটন (WCM বাটন থিমের সাথে এলাইনড এবং লোডিং ফিচারড) */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full mt-2 text-white font-bold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r ${
                  isDarkMode 
                    ? "from-indigo-500 to-cyan-500 hover:opacity-90 shadow-indigo-500/10" 
                    : "from-orange-500 to-amber-500 hover:opacity-95 shadow-orange-500/10"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;