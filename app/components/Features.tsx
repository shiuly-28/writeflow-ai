import { Cpu, RefreshCw, Users } from "lucide-react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function Features() {
  const features: Feature[] = [
    {
      icon: <Cpu className="h-6 w-6 text-indigo-400" />,
      title: "AI Drafting Agent",
      description: "শুধু টপিক আর টোন সিলেক্ট করুন, আমাদের ব্যাকগ্রাউন্ড এজেন্ট স্বয়ংক্রিয়ভাবে রেডি-টু-পাবলিশ কন্টেন্ট ড্রাফট করে দেবে।"
    },
    {
      icon: <RefreshCw className="h-6 w-6 text-cyan-400" />,
      title: "Tone Rewriting",
      description: "যেকোনো টেক্সটকে এক ক্লিকে ফরমাল, ক্যাজুয়াল কিংবা পারসুয়াসিভ টোনে রূপান্তর করুন নিমেষেই।"
    },
    {
      icon: <Users className="h-6 w-6 text-purple-400" />,
      title: "Team Collaboration",
      description: "একই ওয়ার্কস্পেসে পুরো টিম একসাথে রিয়েল-টাইমে কন্টেন্ট রিভিউ, এডিট এবং পাবলিশ করার সুবিধা।"
    }
  ];

  return (
    <section className="py-20 bg-slate-950 text-white px-4">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold sm:text-4xl bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Powering Your Entire Content Workflow
          </h2>
          <p className="mt-4 text-slate-400">
            WriteFlow AI-এর শক্তিশালী এআই এজেন্টগুলো আপনার কন্টেন্ট ক্রিয়েশনের গতি বাড়িয়ে দেবে ১০ গুণ।
          </p>
        </div>

        {/* ৩-কলাম কার্ড গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col h-full rounded-2xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-md shadow-xl hover:border-indigo-500/30 transition-all duration-300"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 border border-white/5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed flex-grow">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}