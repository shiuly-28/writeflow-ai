"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  Sparkles,
  LayoutDashboard,
  FileText,
  User,
  History,
  Users,
  BarChart3,
  BookTemplate,
  Star,
  Settings,
  LogOut,
} from "lucide-react";

const userLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/documents", label: "My Documents", icon: FileText },
  { href: "/dashboard/profile", label: "My Profile", icon: User },
  { href: "/dashboard/usage", label: "AI Usage History", icon: History },
];

const adminLinks = [
  { href: "/admin", label: "Analytics", icon: BarChart3 },
  { href: "/admin/users", label: "Manage Users", icon: Users },
  { href: "/admin/templates", label: "Templates", icon: BookTemplate },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function Sidebar({
  role,
  user,
}: {
  role: string;
  user: any;
}) {
  const pathname = usePathname();
  const links = role === "admin" ? adminLinks : userLinks;

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-slate-900 border-r border-white/10 flex flex-col z-40">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent"
        >
          <Sparkles className="h-5 w-5 text-indigo-400" />
          WriteFlow AI
        </Link>
        <div className="mt-3 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>
          <div>
            <p className="text-white text-xs font-medium">{user?.name}</p>
            <p className="text-slate-400 text-xs capitalize">{role}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                isActive
                  ? "bg-indigo-500/20 text-indigo-400 font-medium"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all w-full"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}