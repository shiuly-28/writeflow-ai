"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, PenLine, Sun, Moon, LogOut, LayoutDashboard, User } from "lucide-react";

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

  const userRole = (session?.user as any)?.role;
  const dashboardHref = userRole === "admin" ? "/admin" : "/dashboard";

  const navLinks: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/explore" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitial = () => {
    if (session?.user?.name) return session.user.name.charAt(0).toUpperCase();
    if (session?.user?.email) return session.user.email.charAt(0).toUpperCase();
    return "U";
  };

  return (
    <nav
      className="sticky top-0 z-50 w-full border-b"
    
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl tracking-tight font-display">
            <PenLine className="h-5 w-5" style={{ color: "var(--redline)" }} />
            <span>
              WriteFlow<span style={{ color: "var(--amber)" }}>.</span>
            </span>
          </Link>

          <div className="hidden md:flex items-baseline gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm transition-colors hover:opacity-70"
                style={{ color: "var(--ink-soft)" }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full border transition-all hover:opacity-70"
              style={{ borderColor: "var(--line)" }}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

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
                      className="rounded-full object-cover border-2"
                      style={{ borderColor: "var(--amber)" }}
                    />
                  ) : (
                    <div
                      className="h-9 w-9 rounded-full flex items-center justify-center font-semibold text-sm text-white"
                      style={{ background: "var(--redline)" }}
                    >
                      {getInitial()}
                    </div>
                  )}
                </button>

                {isDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 rounded-xl border p-2 shadow-xl"
                    style={{ background: "var(--paper-raised)", borderColor: "var(--line)" }}
                  >
                    <div className="px-3 py-2 border-b mb-1" style={{ borderColor: "var(--line)" }}>
                      <p className="text-xs" style={{ color: "var(--ink-soft)" }}>Logged in as</p>
                      <p className="text-sm font-semibold truncate">{session.user?.name || session.user?.email}</p>
                    </div>

                    <Link
                      href={dashboardHref}
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm hover:opacity-70"
                    >
                      <LayoutDashboard className="h-4 w-4" /> Dashboard
                    </Link>

                    <Link
                      href="/dashboard/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm hover:opacity-70"
                    >
                      <User className="h-4 w-4" /> My Profile
                    </Link>

                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        signOut({ callbackUrl: "/" });
                      }}
                      className="w-full flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-left hover:opacity-70"
                      style={{ color: "var(--redline)" }}
                    >
                      <LogOut className="h-4 w-4" /> Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              status !== "loading" && (
                <>
                  <Link href="/login" className="text-sm hover:opacity-70" style={{ color: "var(--ink-soft)" }}>
                    Log In
                  </Link>
                  <Link
                    href="/register"
                    className="rounded-full px-4 py-2 text-sm font-medium text-white transition-transform hover:scale-[1.02] bg-amber-500 hover:bg-amber-600"
                    
                  >
                    Register
                  </Link>
                </>
              )
            )}
          </div>

          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full border"
              style={{ borderColor: "var(--line)" }}
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-lg p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t px-4 pt-2 pb-4 space-y-1" style={{ borderColor: "var(--line)", background: "var(--paper)" }}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block rounded-lg px-3 py-2 text-base"
              style={{ color: "var(--ink-soft)" }}
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-4 pb-2 border-t px-1 flex flex-col gap-2" style={{ borderColor: "var(--line)" }}>
            {status === "authenticated" ? (
              <>
                <div className="flex items-center gap-3 px-2 py-2 mb-1">
                  {session.user?.image ? (
                    <Image src={session.user.image} alt="Profile" width={36} height={36} className="rounded-full object-cover border-2" style={{ borderColor: "var(--amber)" }} />
                  ) : (
                    <div className="h-9 w-9 rounded-full flex items-center justify-center font-semibold text-white" style={{ background: "var(--redline)" }}>
                      {getInitial()}
                    </div>
                  )}
                  <div className="truncate">
                    <p className="text-sm font-semibold truncate">{session.user?.name || "User"}</p>
                    <p className="text-xs truncate" style={{ color: "var(--ink-soft)" }}>{session.user?.email}</p>
                  </div>
                </div>

                <Link href={dashboardHref} onClick={() => setIsOpen(false)} className="flex items-center gap-2 rounded-lg px-2 py-2 text-base">
                  <LayoutDashboard className="h-4 w-4" /> Dashboard
                </Link>
                <Link href="/dashboard/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-2 rounded-lg px-2 py-2 text-base">
                  <User className="h-4 w-4" /> My Profile
                </Link>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="flex items-center gap-2 rounded-lg px-2 py-2 text-base text-left"
                  style={{ color: "var(--redline)" }}
                >
                  <LogOut className="h-4 w-4" /> Log Out
                </button>
              </>
            ) : (
              status !== "loading" && (
                <>
                  <Link href="/login" onClick={() => setIsOpen(false)} className="text-center py-2 text-sm" style={{ color: "var(--ink-soft)" }}>
                    Log In
                  </Link>
                  <Link href="/register" onClick={() => setIsOpen(false)} className="text-center rounded-full py-2.5 text-sm font-medium text-white" style={{ background: "var(--ink)" }}>
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