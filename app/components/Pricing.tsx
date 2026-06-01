import { Check } from "lucide-react";

interface Plan {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular: boolean;
}

export default function Pricing() {
  const plans: Plan[] = [
    {
      name: "Free",
      price: "$0",
      description: "এআই রাইটিং এর সাথে পরিচিত হওয়ার জন্য পারফেক্ট প্ল্যান।",
      features: ["৫,০০০ জেনারেটেড শব্দ/মাস", "১০+ বেসিক টেমপ্লেট", "১ জন ইউজার সিট", "কমিউনিটি সাপোর্ট"],
      isPopular: false,
    },
    {
      name: "Pro",
      price: "$29",
      description: "প্রফেশনাল রাইটার এবং ফ্রিল্যান্সারদের জন্য সেরা চয়েস।",
      features: ["আনলিমিটেড শব্দ জেনারেশন", "সব প্রিমিয়াম টেমপ্লেট", "৩টি ব্যাকগ্রাউন্ড এআই এজেন্ট", "২৪/৭ প্রায়োরিটি সাপোর্ট"],
      isPopular: true,
    },
    {
      name: "Team",
      price: "$79",
      description: "এজেন্সি এবং বড় টিমের কন্টেন্ট কোলাবোরেশনের জন্য।",
      features: ["আনলিমিটেড সবকিছু", "আনলিমিটেড টিম মেম্বার সিট", "কাস্টম এআই এজেন্ট ট্রেইনিং", "অ্যাডভান্সড অ্যানালিটিক্স ড্যাশবোর্ড"],
      isPopular: false,
    },
  ];

  return (
    <section className="py-20 bg-slate-950 text-white px-4 border-t border-white/5">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold sm:text-4xl bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Flexible Pricing Plans
          </h2>
          <p className="mt-4 text-slate-400">
            আপনার বা আপনার টিমের প্রয়োজন অনুযায়ী সঠিক প্ল্যানটি বেছে নিন। কোনো হিডেন চার্জ নেই।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`flex flex-col h-full rounded-2xl border p-8 backdrop-blur-md shadow-xl relative transition-all duration-300 ${
                plan.isPopular
                  ? "border-indigo-500 bg-slate-900/80 scale-105 z-10 md:-translate-y-2"
                  : "border-white/10 bg-slate-900/40 hover:border-indigo-500/30"
              }`}
            >
              {plan.isPopular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                  Most Popular
                </span>
              )}
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <p className="text-slate-400 text-xs mb-6 min-h-[32px]">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-extrabold">{plan.price}</span>
                <span className="text-slate-400 text-sm"> / month</span>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                    <Check className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full rounded-xl py-3 text-sm font-semibold transition-all duration-200 ${
                  plan.isPopular
                    ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/20 hover:opacity-95"
                    : "bg-slate-800 border border-white/5 hover:bg-slate-700"
                }`}
              >
                Choose {plan.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}