"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, Sparkles, Sun, Moon, LogOut, LayoutDashboard, User } from "lucide-react";

interface NavLink {
  name: string;
  href: string;
}

interface NavbarProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

export default function Navbar({ isDarkMode, setIsDarkMode }: NavbarProps) {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ইউজার রোল অনুযায়ী ড্যাশবোর্ড রুট ফিক্স করা
const userRole = (session?.user as any)?.role;
const dashboardHref = userRole === "admin" ? "/dashboard/admin" : "/dashboard/user";

  const navLinks: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/explore" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // ড্রপডাউনের বাইরে ক্লিক করলে তা বন্ধ করার মেকানিজম
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

          {/* ডেক্সটপ মেনু লিঙ্কসমূহ */}
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

          {/* ডেক্সটপ রাইট সাইড বাটন, থিম সুইচার ও প্রোফাইল ড্রপডাউন */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* ☀️/🌙 থিম সুইচার */}
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

            {/* সেশন চেকিং এর মাধ্যমে কন্ডিশনাল রেন্ডারিং */}
            {status === "authenticated" ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center focus:outline-none transition-transform active:scale-95"
                >
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt="Profile"
                      width={36}
                      height={36}
                      className="rounded-full border-2 border-indigo-500/50 object-cover"
                    />
                  ) : (
                    <div className={`h-9 w-9 rounded-full border-2 border-indigo-500/50 flex items-center justify-center font-bold text-sm bg-gradient-to-br text-white ${
                      isDarkMode ? "from-indigo-600 to-cyan-600" : "from-indigo-500 to-cyan-500"
                    }`}>
                      {session.user?.name ? session.user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                  )}
                </button>

                {/* ডেক্সটপ প্রোফাইল ড্রপডাউন মেনু */}
                {isDropdownOpen && (
                  <div className={`absolute right-0 mt-2 w-56 rounded-2xl border p-2 shadow-xl transition-all duration-200 ${
                    isDarkMode ? "bg-slate-900 border-white/10 text-white" : "bg-white border-slate-200 text-slate-900"
                  }`}>
                    <div className="px-3 py-2 border-b mb-1 border-slate-100/10 max-w-full">
                      <p className="text-xs font-semibold text-slate-400 truncate">Logged in as</p>
                      <p className="text-sm font-bold truncate">{session.user?.name}</p>
                    </div>

                    <Link
                      href={dashboardHref}
                      onClick={() => setIsDropdownOpen(false)}
                      className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                        isDarkMode ? "hover:bg-slate-800 text-slate-300 hover:text-white" : "hover:bg-slate-50 text-slate-600 hover:text-indigo-600"
                      }`}
                    >
                      <LayoutDashboard className="h-4 w-4" /> Dashboard
                    </Link>

                    <Link
                      href="/dashboard/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                        isDarkMode ? "hover:bg-slate-800 text-slate-300 hover:text-white" : "hover:bg-slate-50 text-slate-600 hover:text-indigo-600"
                      }`}
                    >
                      <User className="h-4 w-4" /> My Profile
                    </Link>

                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        signOut({ callbackUrl: "/" });
                      }}
                      className="w-full flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-rose-500 hover:bg-rose-500/10 transition-all text-left"
                    >
                      <LogOut className="h-4 w-4" /> Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              status !== "loading" && (
                <>
                  <Link href="/login" className={`text-sm font-medium transition-colors ${isDarkMode ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-indigo-600"}`}>
                    Log In
                  </Link>
                  <Link href="/register" className={`rounded-xl px-4 py-2 text-sm font-medium text-white shadow-md transition-all duration-200 bg-gradient-to-r ${
                    isDarkMode ? "from-indigo-500 to-cyan-500 shadow-indigo-500/10" : "from-indigo-600 to-cyan-600 shadow-indigo-600/10"
                  } hover:opacity-95`}>
                    Register
                  </Link>
                </>
              )
            )}
          </div>

          {/* মোবাইল মেনু ও মোবাইল থিম সুইচার */}
          <div className="flex md:hidden items-center gap-2">
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
            {status === "authenticated" ? (
              <>
                <div className="flex items-center gap-3 px-3 py-2 mb-2">
                  <div className={`h-9 w-9 rounded-full flex items-center justify-center font-bold bg-indigo-600 text-white`}>
                    {session.user?.name ? session.user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div className="truncate">
                    <p className="text-sm font-bold truncate">{session.user?.name}</p>
                    <p className="text-xs text-slate-500 truncate">{session.user?.email}</p>
                  </div>
                </div>
                
                <Link href={dashboardHref} onClick={() => setIsOpen(false)} className={`flex items-center gap-2 rounded-xl px-3 py-2 text-base font-medium ${isDarkMode ? "text-slate-300 hover:bg-slate-900" : "text-slate-600 hover:bg-slate-50"}`}>
                  <LayoutDashboard className="h-4 w-4" /> Dashboard
                </Link>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="flex items-center gap-2 rounded-xl px-3 py-2 text-base font-medium text-rose-500 hover:bg-rose-500/10 text-left w-full"
                >
                  <LogOut className="h-4 w-4" /> Log Out
                </button>
              </>
            ) : (
              status !== "loading" && (
                <>
                  <Link href="/login" onClick={() => setIsOpen(false)} className={`text-center py-2 text-sm font-medium ${isDarkMode ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-indigo-600"}`}>
                    Log In
                  </Link>
                  <Link href="/register" onClick={() => setIsOpen(false)} className={`text-center rounded-xl py-2.5 text-sm font-medium text-white shadow-md bg-gradient-to-r ${
                    isDarkMode ? "from-indigo-500 to-cyan-500" : "from-indigo-600 to-cyan-600"
                  }`}>
                    Register
                  </Link>
                </>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
}