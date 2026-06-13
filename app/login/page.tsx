"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Sparkles, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false); // 🎯 গুগল লোডিংয়ের জন্য আলাদা স্টেট
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const msg = params.get("success");
      const authError = params.get("error"); // যদি গুগল লগইনে কোনো এরর আসে
      if (msg) setSuccess(msg);
      if (authError) setError("গুগল লগইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("ভুল ইমেইল অথবা পাসওয়ার্ড! আবার চেষ্টা করুন।");
      } else {
        const session = await fetch("/api/auth/session").then((r) => r.json());
        const role = session?.user?.role;
        router.push(role === "admin" ? "/admin" : "/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("অনাকাঙ্ক্ষিত কোনো সমস্যা ঘটেছে।");
    } finally {
      setLoading(false);
    }
  };

  // 🎯 গুগল লগইন হ্যান্ডেল করার ফাংশন
  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError("");
    try {
      // এটি সরাসরি ইউজারকে গুগলের অফিশিয়াল লগইন স্ক্রিনে নিয়ে যাবে
      // লগইন সফল হলে NextAuth অটোমেটিক সেশন তৈরি করে ড্যাশবোর্ডে রিডাইরেক্ট করবে
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (err) {
      setError("গুগল সার্ভারে কানেক্ট করতে সমস্যা হচ্ছে।");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />

      <div className="w-full max-w-md backdrop-blur-xl bg-slate-900/40 border border-white/10 p-8 rounded-2xl shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-400 bg-clip-text text-transparent">
            <Sparkles className="h-6 w-6 text-amber-400" />
            WriteFlow AI
          </Link>
          <h2 className="text-xl font-semibold mt-4 text-white">Welcome Back</h2>
          <p className="text-slate-400 text-xs mt-1">আপনার অ্যাকাউন্টে লগইন করুন</p>
        </div>

        {success && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs p-3 rounded-xl mb-4 text-center">
            {success}
          </div>
        )}

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs p-3 rounded-xl mb-4 text-center">
            {error}
          </div>
        )}

       

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl bg-slate-950 border border-white/10 pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl bg-slate-950 border border-white/10 pl-10 pr-12 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
              />
              
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-amber-500 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 hover:opacity-95 transition-all mt-2 disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        {/* 🎯 "OR" ডিভাইডার */}
        <div className="relative my-6 mt-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#0b1329] px-3 text-slate-500">Or continue with</span>
          </div>
        </div>
         {/* 🎯 গুগল সাইন-ইন বাটন */}
        <button
          type="button"
          disabled={googleLoading || loading}
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 rounded-xl bg-white text-slate-900 py-3 text-sm font-semibold hover:bg-slate-100 transition-all disabled:opacity-50 shadow-md mt-4"
        >
          {/* গুগল আইকন (SVG) */}
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3A11.954 11.954 0 0 0 12 0C7.27 0 3.19 2.583 1.018 6.418l4.248 3.347z"
            />
            <path
              fill="#4285F4"
              d="M16.04 15.345c-1.054.71-2.436 1.155-4.04 1.155a7.068 7.068 0 0 1-6.723-4.855l-4.26 3.3a11.96 11.96 0 0 0 10.983 6.555c3.245 0 6.18-1.073 8.354-2.909l-4.313-3.246z"
            />
            <path
              fill="#FBBC05"
              d="M5.277 14.268A7.054 7.054 0 0 1 4.909 12c0-.79.136-1.55.368-2.264L1.03 6.39A11.942 11.942 0 0 0 0 12c0 2.073.532 4.027 1.464 5.736l3.813-3.468z"
            />
            <path
              fill="#34A853"
              d="M23.491 10.091H12v4.51h6.636a5.673 5.673 0 0 1-2.464 3.718l4.313 3.245c2.527-2.336 3.982-5.782 3.982-9.782 0-.582-.055-1.145-.173-1.691z"
            />
          </svg>
          {googleLoading ? "Connecting to Google..." : "Continue with Google"}
        </button>

        

        <p className="text-center text-xs text-slate-400 mt-6">
          নতুন ইউজার?{" "}
          <Link href="/register" className="text-amber-400 hover:underline font-medium">
            নতুন অ্যাকাউন্ট তৈরি করুন
          </Link>
        </p>
      </div>
    </div>
  );
}