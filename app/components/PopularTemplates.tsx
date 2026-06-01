import { FileText, Share2, Mail, MessageSquare, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Template {
  icon: React.ReactNode;
  title: string;
  description: string;
  category: string;
}

export default function PopularTemplates() {
  const templates: Template[] = [
    { icon: <FileText className="h-5 w-5 text-indigo-400" />, title: "SEO Blog Post", description: "সার্চ ইঞ্জিনে র‍্যাঙ্ক করার মতো অপ্টিমাইজড লং-ফর্ম ব্লগ পোস্ট তৈরি করুন।", category: "Blog" },
    { icon: <Share2 className="h-5 w-5 text-cyan-400" />, title: "LinkedIn Engagement", description: "আপনার প্রফেশনাল নেটওয়ার্কের জন্য আকর্ষক এবং ভাইরাল ক্যাপশন।", category: "Social Media" },
    { icon: <Mail className="h-5 w-5 text-purple-400" />, title: "Cold Email Outreach", description: "ক্লাইন্ট বা লিড কনভার্ট করার জন্য পারসুয়াসিভ ইমেইল কপি।", category: "Email" },
    { icon: <MessageSquare className="h-5 w-5 text-emerald-400" />, title: "Facebook Ad Copy", description: "বেশি সেলস এনে দেওয়ার মতো হাই-কনভার্টিং ফেসবুক বিজ্ঞাপন কপি।", category: "Ad Copy" }
  ];

  return (
    <section className="py-20 bg-slate-950 text-white px-4 border-t border-white/5">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Popular Templates
            </h2>
            <p className="mt-2 text-slate-400 text-sm">
              আমাদের সবচেয়ে বেশি ব্যবহৃত এআই প্রম্পট টেমপ্লেটসমূহ।
            </p>
          </div>
          <Link href="/explore" className="inline-flex items-center gap-1 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors group">
            View All Templates 
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* ৪-কলাম কার্ড গ্রিড (Desktop-এ ৪টা প্রতি রো-তে) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((template, index) => (
            <div 
              key={index} 
              className="flex flex-col h-full rounded-2xl border border-white/10 bg-slate-900/40 p-5 backdrop-blur-md shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 border border-white/5">
                {template.icon}
              </div>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-indigo-400 mb-1">{template.category}</span>
              <h3 className="text-lg font-semibold mb-2">{template.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed flex-grow mb-5">{template.description}</p>
              
              <button className="w-full rounded-xl bg-slate-800 border border-white/5 py-2.5 text-xs font-medium hover:bg-indigo-600 hover:border-indigo-500 transition-all duration-200">
                Use Template
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}