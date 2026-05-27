"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Sparkles } from "lucide-react";

// টাইপস্ক্রিপ্টের জন্য লিঙ্কের স্ট্রাকচার বলে দেওয়া
interface NavLink {
  name: string;
  href: string;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // লগআউট অবস্থার ৫টি রুট
  const navLinks: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/explore" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-900/70 backdrop-blur-md text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* লোগো সেকশন */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              <Sparkles className="h-6 w-6 text-indigo-400 animate-pulse" />
              WriteFlow <span className="text-white font-light">AI</span>
            </Link>
          </div>

          {/* ডেক্সটপ মেনু */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* ডেক্সটপ রাইট সাইড বাটন */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Log In
            </Link>
            <Link href="/register" className="rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-4 py-2 text-sm font-medium text-white shadow-lg hover:opacity-90 transition-all duration-200">
              Get Started
            </Link>
          </div>

          {/* মোবাইল মেনু বাটন (Hamburger) */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:bg-slate-800 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* মোবাইল ড্রপডাউন মেনু */}
      {isOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-lg border-b border-white/10 px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block rounded-md px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 pb-2 border-t border-slate-800 px-3 flex flex-col gap-2">
            <Link href="/login" onClick={() => setIsOpen(false)} className="text-center py-2 text-slate-300 hover:text-white">
              Log In
            </Link>
            <Link href="/register" onClick={() => setIsOpen(false)} className="text-center rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 py-2 font-medium text-white">
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}