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

export default function StatsAndReviews() {
  const stats: Stat[] = [
    { value: "10,000+", label: "সক্রিয় ইউজার" },
    { value: "500,000+", label: "জেনারেটেড শব্দ" },
    { value: "99.9%", label: "এজেন্ট আপটাইম" },
    { value: "4.9/5", label: "কাস্টমার রেটিং" },
  ];

  const testimonials: Testimonial[] = [
    {
      name: "রাকিব হাসান",
      role: "SaaS Founder",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
      review: "WriteFlow AI আমার কন্টেন্ট টিমের কাজের গতি অনেক বাড়িয়ে দিয়েছে। বিশেষ করে এর ব্যাকগ্রাউন্ড এআই এজেন্টগুলো জাস্ট অসাধারণ কাজ করে!",
    },
    {
      name: "ফারহানা আক্তার",
      role: "SEO Specialist",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
      review: "কোনো ডামি টেক্সট ছাড়াই এই এআই এসইও অপ্টিমাইজড ব্লগ পোস্টের চমৎকার আউটপুট দেয়। ফ্রিল্যান্সারদের জন্য এটি একটি মাস্ট-হ্যাভ টুল।",
    }
  ];

  return (
    <section className="py-20 bg-slate-950 text-white px-4 border-t border-white/5">
      <div className="mx-auto max-w-7xl">
        
        {/* ১. স্ট্যাটিস্টিকস সাব-সেকশন */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center mb-24 bg-slate-900/30 border border-white/5 rounded-2xl py-10 backdrop-blur-sm">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-2">
                {stat.value}
              </div>
              <div className="text-slate-400 text-xs sm:text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* ২. টেস্টিমোনিয়াল সাব-সেকশন */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            What Our Users Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((item, index) => (
            <div key={index} className="flex flex-col justify-between h-full rounded-2xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-md shadow-xl">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-6 flex-grow">"{item.review}"</p>
              <div className="flex items-center gap-4 border-t border-white/5 pt-4">
                <img src={item.avatar} alt={item.name} className="h-10 w-10 rounded-full object-cover border border-white/10" />
                <div>
                  <h4 className="text-sm font-semibold">{item.name}</h4>
                  <p className="text-slate-500 text-xs">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}