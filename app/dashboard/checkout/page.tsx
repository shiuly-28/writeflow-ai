"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { CreditCard, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL থেকে 'plan' এর মান তুলে আনা (যেমন: pro, team, free)
  // যদি URL-এ কিছু না থাকে তবে ডিফল্ট হিসেবে 'pro' ধরে নেবে
  const currentPlan = searchParams.get("plan") || "pro";

  // প্ল্যান অনুযায়ী প্রাইস ডাইনামিক করার জন্য একটা সাধারণ অবজেক্ট
  const planDetails: Record<string, { price: string; title: string }> = {
    free: { title: "Free Plan", price: "$0" },
    pro: { title: "Pro Plan", price: "$29" },
    team: { title: "Team Plan", price: "$79" },
  };

  const selectedPlan = planDetails[currentPlan] || planDetails.pro;

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Payment successful for ${selectedPlan.title}!`);
    router.push("/dashboard"); // পেমেন্ট শেষে ড্যাশবোর্ডে ফেরত পাঠানো
  };

  return (
    <div className="min-h-screen  p-6 flex items-center justify-center">
      <div className="w-full max-w-md  border border-amber-400 rounded-2xl p-6 shadow-2xl">
        
        {/* ব্যাক বাটন */}
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Pricing
        </button>

        <h1 className="text-2xl font-bold mb-2">Checkout</h1>
        <p className="text-sm text-slate-400 mb-6">আপনার সাবস্ক্রিপশন সম্পন্ন করতে পেমেন্ট করুন।</p>

        {/* সিলেক্টেড প্ল্যানের সামারি */}
        <div className="bg-slate-800/50 border border-amber-500/30 rounded-xl p-4 mb-6 flex justify-between items-center">
          <div>
            <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider">Selected Plan</p>
            <h3 className="text-lg font-bold capitalize">{selectedPlan.title}</h3>
          </div>
          <div className="text-right">
            <span className="text-2xl font-extrabold text-amber-400">{selectedPlan.price}</span>
            <span className="text-xs text-slate-400">/mo</span>
          </div>
        </div>

        {/* ডামি পেমেন্ট ফর্ম */}
        <form onSubmit={handlePaymentSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Card Holder Name</label>
            <input 
              type="text" 
              required
              placeholder="Halima Akhter" 
              className="w-full  border border-amber-400 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Card Number</label>
            <div className="relative">
              <input 
                type="text" 
                required
                maxLength={19}
                placeholder="4242 4242 4242 4242" 
                className="w-full  border border-amber-400 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
              />
              <CreditCard className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Expiry Date</label>
              <input 
                type="text" 
                required
                placeholder="MM/YY" 
                className="w-full  border border-amber-400 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">CVV</label>
              <input 
                type="password" 
                required
                maxLength={3}
                placeholder="•••" 
                className="w-full  border border-amber-400 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 to-amber-500 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-amber-500/20 hover:opacity-95 transition-all mt-4"
          >
            Pay {selectedPlan.price} Now
          </button>
        </form>

      </div>
    </div>
  );
}