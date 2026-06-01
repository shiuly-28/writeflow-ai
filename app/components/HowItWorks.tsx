import { ClipboardList, MessageSquare, Cpu, CheckCircle } from "lucide-react";

interface Step {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function HowItWorks() {
  const steps: Step[] = [
    { number: "01", icon: <ClipboardList className="h-5 w-5 text-indigo-400" />, title: "Pick Template", description: "আপনার ক্যাটাগরি অনুযায়ী একটি রেডিমেড এআই টেমপ্লেট বেছে নিন।" },
    { number: "02", icon: <MessageSquare className="h-5 w-5 text-indigo-400" />, title: "Enter Topic", description: "আপনার টপিক, কি-ওয়ার্ড এবং টার্গেট অডিয়েন্স ইনপুট দিন।" },
    { number: "03", icon: <Cpu className="h-5 w-5 text-indigo-400" />, title: "AI Generates", description: "ব্যাকগ্রাউন্ড এজেন্ট স্বয়ংক্রিয়ভাবে কন্টেন্ট অপ্টিমাইজড করে তৈরি করবে।" },
    { number: "04", icon: <CheckCircle className="h-5 w-5 text-indigo-400" />, title: "Edit & Publish", description: "স্মার্ট এডিটরে ফাইনাল টাচ দিয়ে সরাসরি পাবলিশ বা এক্সপোর্ট করুন।" }
  ];

  return (
    <section className="py-20 bg-slate-950 text-white px-4 border-t border-white/5">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold sm:text-4xl bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="mt-4 text-slate-400">
            আইডিয়া থেকে পাবলিশ — মাত্র ৪টি সহজ ধাপে আপনার কন্টেন্ট রেডি করুন।
          </p>
        </div>

        {/* স্টেপ ফ্লো গ্রিড */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col h-full rounded-2xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-md shadow-xl">
              <span className="absolute top-4 right-6 text-4xl font-extrabold text-white/5 font-mono">{step.number}</span>
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                {step.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed flex-grow">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}