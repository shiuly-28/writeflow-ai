import { Sparkles, Target, Users, Zap, Award, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

const team = [
  { name: "Sarah Johnson", role: "CEO & Founder", avatar: "SJ", bio: "10+ years in AI and content technology." },
  { name: "Michael Chen", role: "CTO", avatar: "MC", bio: "Ex-Google engineer, AI specialist." },
  { name: "Fatima Khan", role: "Head of Product", avatar: "FK", bio: "Product visionary with UX expertise." },
  { name: "David Park", role: "Lead AI Engineer", avatar: "DP", bio: "PhD in Machine Learning from MIT." },
];

const values = [
  { icon: Target, title: "Our Mission", desc: "AI-powered tools দিয়ে content creation সহজ করা — সবার জন্য।", color: "bg-amber-500" },
  { icon: Users, title: "Our Vision", desc: "এমন একটি world যেখানে প্রত্যেকে effectively communicate করতে পারে।", color: "bg-amber-500" },
  { icon: Zap, title: "Innovation", desc: "সর্বশেষ AI technology ব্যবহার করে সেরা content experience দেওয়া।", color: "bg-amber-500" },
  { icon: Award, title: "Quality", desc: "প্রতিটি content যেন professional মানের হয় সেটা নিশ্চিত করা।", color: "bg-emerald-500" },
];

const stats = [
  { value: "10,000+", label: "Active Users" },
  { value: "500,000+", label: "Words Generated" },
  { value: "50+", label: "Templates" },
  { value: "99.9%", label: "Uptime" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className=" py-20 px-4 mb-4">
        <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-xs font-semibold  hover:text-white transition-colors tracking-widest uppercase"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="h-8 w-8 " />
            <span className="text-2xl font-black">WriteFlow AI</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black  mb-6">
            We're Building the Future of Content Creation
          </h1>
          <p className="text-lg max-w-2xl mx-auto">
            WriteFlow AI হলো একটি AI-powered content platform যা writers, marketers ও businesses কে better content তৈরি করতে সাহায্য করে।
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-5xl mx-auto px-4 mt-8 mb-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm">
              <p className="text-3xl font-black text-amber-600">{stat.value}</p>
              <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Values */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-black text-gray-900 text-center uppercase tracking-tight mb-10">
          What We <span className="text-amber-600">Stand For</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div key={v.title} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className={`w-10 h-10 ${v.color} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-gray-900 font-black text-sm uppercase tracking-tight mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Team */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-black text-gray-900 text-center uppercase tracking-tight mb-10">
            Meet the <span className="text-amber-600">Team</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {team.map((member) => (
              <div key={member.name} className="text-center p-6 border border-gray-200 rounded-2xl hover:shadow-md transition-all">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-500 flex items-center justify-center text-white font-black text-lg mx-auto mb-4">
                  {member.avatar}
                </div>
                <h3 className="text-gray-900 font-bold text-sm">{member.name}</h3>
                <p className="text-amber-600 text-xs font-semibold mb-2">{member.role}</p>
                <p className="text-gray-400 text-xs">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-amber-600 to-amber-500 py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-black text-white mb-4">Ready to Get Started?</h2>
          <p className="text-white/80 mb-8">হাজার হাজার content creators এর সাথে যোগ দাও।</p>
          <Link
            href="/register"
            className="inline-flex items-center p-4 gap-2 px-8 py-4 bg-white text-amber-600 font-black rounded-2xl hover:bg-gray-50 transition-all shadow-lg"
          >
            Start Writing Free
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}