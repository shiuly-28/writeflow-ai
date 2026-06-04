"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Sparkles, Sun, Moon } from "lucide-react";

interface NavLink {
  name: string;
  href: string;
}

// টাইপস্ক্রিপ্ট প্রপ্স টাইপ
interface NavbarProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

export default function Navbar({ isDarkMode, setIsDarkMode }: NavbarProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navLinks: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/explore" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
      isDarkMode 
        ? "border-white/10 bg-slate-950 text-white" 
        : "border-slate-200/50 bg-white text-slate-900 shadow-sm"
    }`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* লোগো সেকশন */}
          <div className="flex items-center">
            <Link href="/" className={`flex items-center gap-2 text-xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r transition-all ${
              isDarkMode ? "from-indigo-400 to-cyan-400" : "from-indigo-600 to-cyan-600"
            }`}>
              <Sparkles className={`h-6 w-6 animate-pulse ${isDarkMode ? "text-indigo-400" : "text-indigo-600"}`} />
              WriteFlow <span className={`font-light transition-colors ${isDarkMode ? "text-white" : "text-slate-900"}`}>AI</span>
            </Link>
          </div>

          {/* ডেক্সটপ মেনু */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isDarkMode ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-indigo-600"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* ডেক্সটপ রাইট সাইড বাটন ও থিম টগল */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* ☀️/🌙 ডেক্সটপ থিম সুইচার */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-xl border transition-all ${
                isDarkMode 
                  ? "bg-slate-900 border-white/10 text-yellow-400 hover:bg-slate-800" 
                  : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <Link href="/login" className={`text-sm font-medium transition-colors ${isDarkMode ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-indigo-600"}`}>
              Log In
            </Link>
            <Link href="/register" className={`rounded-xl px-4 py-2 text-sm font-medium text-white shadow-md transition-all duration-200 bg-gradient-to-r ${
              isDarkMode ? "from-indigo-500 to-cyan-500 shadow-indigo-500/10" : "from-indigo-600 to-cyan-600 shadow-indigo-600/10"
            } hover:opacity-95`}>
              Register
            </Link>
          </div>

          {/* মোবাইল মেনু ও থিম সুইচার */}
          <div className="flex md:hidden items-center gap-2">
            {/* ☀️/🌙 মোবাইল থিম সুইচার */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-xl border transition-all ${
                isDarkMode ? "bg-slate-900 border-white/10 text-yellow-400" : "bg-slate-100 border-slate-200 text-slate-700"
              }`}
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center rounded-xl p-2 focus:outline-none transition-colors ${
                isDarkMode ? "text-slate-400 hover:bg-slate-800 hover:text-white" : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* মোবাইল ড্রপডাউন মেনু */}
      {isOpen && (
        <div className={`md:hidden border-b px-2 pt-2 pb-3 space-y-1 sm:px-3 ${
          isDarkMode ? "bg-slate-950 border-white/10" : "bg-white border-slate-200"
        }`}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block rounded-xl px-3 py-2 text-base font-medium transition-all ${
                isDarkMode ? "text-slate-300 hover:bg-slate-900 hover:text-white" : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className={`pt-4 pb-2 border-t px-3 flex flex-col gap-2 ${isDarkMode ? "border-slate-800" : "border-slate-100"}`}>
            <Link href="/login" onClick={() => setIsOpen(false)} className={`text-center py-2 text-sm font-medium ${isDarkMode ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-indigo-600"}`}>
              Log In
            </Link>
            <Link href="/register" onClick={() => setIsOpen(false)} className={`text-center rounded-xl py-2.5 text-sm font-medium text-white shadow-md bg-gradient-to-r ${
              isDarkMode ? "from-indigo-500 to-cyan-500" : "from-indigo-600 to-cyan-600"
            }`}>
             Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}