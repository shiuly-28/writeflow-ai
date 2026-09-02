"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

interface Plan {
  _id?: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular: boolean;
}

interface PricingProps {
  isDarkMode: boolean;
}

// API না থাকলে বা fetch ফেইল করলে এই fallback data দেখাবে, সাইট ভাঙবে না
const FALLBACK_PLANS: Plan[] = [
  {
    name: "Free",
    price: "$0",
    description: "এআই রাইটিং এর সাথে পরিচিত হওয়ার জন্য পারফেক্ট প্ল্যান।",
    features: ["৫,০০০ জেনারেটেড শব্দ/মাস", "১০+ বেসিক টেমপ্লেট", "১ জন ইউজার সিট", "কমিউনিটি সাপোর্ট"],
    isPopular: false,
  },
  {
    name: "Pro",
    price: "$29",
    description: "প্রফেশনাল রাইটার এবং ফ্রিল্যান্সারদের জন্য সেরা চয়েস।",
    features: ["আনলিমিটেড শব্দ জেনারেশন", "সব প্রিমিয়াম টেমপ্লেট", "৩টি ব্যাকগ্রাউন্ড এআই এজেন্ট", "২৪/৭ প্রায়োরিটি সাপোর্ট"],
    isPopular: true,
  },
  {
    name: "Team",
    price: "$79",
    description: "এজেন্সি এবং বড় টিমের কন্টেন্ট কোলাবোরেশনের জন্য।",
    features: ["আনলিমিটেড সবকিছু", "আনলিমিটেড টিম মেম্বার সিট", "কাস্টম এআই এজেন্ট ট্রেইনিং", "অ্যাডভান্সড অ্যানালিটিক্স ড্যাশবোর্ড"],
    isPopular: false,
  },
];

export default function Pricing({ isDarkMode }: PricingProps) {
  const router = useRouter();
  const [plans, setPlans] = useState<Plan[]>(FALLBACK_PLANS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchPlans() {
      try {
        const res = await fetch("/api/plans", { cache: "no-store" });
        if (!res.ok) throw new Error("failed");
        const data = await res.json();
        if (!cancelled && Array.isArray(data.plans) && data.plans.length > 0) {
          setPlans(data.plans);
        }
      } catch {
        // fetch ফেইল করলে FALLBACK_PLANS-ই থেকে যাবে, কিছু করার দরকার নেই
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchPlans();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSelectPlan = (planName: string) => {
    router.push(`/dashboard/checkout?plan=${planName.toLowerCase()}`);
  };

  return (
    <section
      className={`py-20 px-4 border-t transition-colors duration-300 ${
        isDarkMode ? "bg-slate-950 text-white border-white/5" : "bg-slate-50 text-slate-900 border-slate-200"
      }`}
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2
            className={`text-3xl font-bold sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r ${
              isDarkMode ? "from-white to-slate-400" : "from-slate-900 to-slate-600"
            }`}
          >
            Flexible Pricing Plans
          </h2>
          <p className={`mt-4 transition-colors ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
            আপনার বা আপনার টিমের প্রয়োজন অনুযায়ী সঠিক প্ল্যানটি বেছে নিন। কোনো হিডেন চার্জ নেই।
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`h-[420px] rounded-2xl border animate-pulse ${
                  isDarkMode ? "border-white/10 bg-slate-900/40" : "border-slate-200 bg-white"
                }`}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-4">
            {plans.map((plan, index) => (
              <div
                key={plan._id ?? index}
                className={`flex flex-col h-full rounded-2xl border p-8 shadow-xl relative transition-all duration-300 ${
                  plan.isPopular
                    ? isDarkMode
                      ? "border-amber-500 bg-slate-900/90 scale-105 z-10 md:-translate-y-2"
                      : "border-amber-600 bg-white scale-105 z-10 md:-translate-y-2 shadow-amber-600/5"
                    : isDarkMode
                      ? "border-white/10 bg-slate-900/40 hover:border-amber-500/30"
                      : "border-slate-200 bg-white hover:border-amber-500/20"
                }`}
              >
                {plan.isPopular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-amber-500 to-amber-500 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white shadow-sm">
                    Most Popular
                  </span>
                )}

                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className={`text-xs mb-6 min-h-[32px] transition-colors ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                  {plan.description}
                </p>

                <div className="mb-6">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  <span className={`text-sm transition-colors ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}> / month</span>
                </div>

                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <Check className={`h-4 w-4 mt-0.5 flex-shrink-0 ${isDarkMode ? "text-amber-400" : "text-amber-600"}`} />
                      <span className={isDarkMode ? "text-slate-300" : "text-slate-600"}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSelectPlan(plan.name)}
                  className={`w-full rounded-xl py-3 text-sm font-semibold transition-all duration-200 ${
                    plan.isPopular
                      ? "bg-gradient-to-r from-amber-500 to-amber-500 text-white shadow-lg shadow-amber-500/20 hover:opacity-95"
                      : isDarkMode
                        ? "bg-slate-800 border border-white/5 text-white hover:bg-slate-700"
                        : "bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Choose {plan.name}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}