"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard, FileText, User, History,
  Users, BarChart3, BookOpen, Star, Settings,
  LogOut, Sparkles, ChevronLeft, Menu,
} from "lucide-react";

const userLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/documents", label: "My Documents", icon: FileText },
  { href: "/dashboard/profile", label: "My Profile", icon: User },
  { href: "/dashboard/usage", label: "AI Usage History", icon: History },
];

const adminLinks = [
  { href: "/admin", label: "Analytics", icon: BarChart3 },
  { href: "/admin/users", label: "User Management", icon: Users },
  { href: "/admin/templates", label: "Templates", icon: BookOpen },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ role, user }: { role: string; user: any }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const links = role === "admin" ? adminLinks : userLinks;

  return (
    <>
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 flex flex-col z-40 shadow-sm transition-all duration-300 ${
        collapsed ? "w-16" : "w-60"
      }`}>

        {/* Logo + Toggle */}
        <div className="px-3 py-4 border-b border-gray-100 flex items-center justify-between">
          {!collapsed && (
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">WriteFlow</p>
                <p className="text-xs text-gray-400">AI Platform</p>
              </div>
            </Link>
          )}

          {collapsed && (
            <div className="w-full flex justify-center">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
            </div>
          )}

          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-all text-gray-400 hover:text-gray-600"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Collapsed Toggle Button */}
        {collapsed && (
          <div className="flex justify-center py-3 border-b border-gray-100">
            <button
              onClick={() => setCollapsed(false)}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-all text-gray-400 hover:text-gray-600"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* User Info */}
        {!collapsed && (
          <div className="px-3 py-3 border-b border-gray-100">
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-3 py-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {user?.name?.[0]?.toUpperCase() || "U"}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-gray-900 truncate">{user?.name}</p>
                <p className="text-xs text-gray-400 capitalize">{role} · Free</p>
              </div>
            </div>
          </div>
        )}

        {collapsed && (
          <div className="flex justify-center py-3 border-b border-gray-100">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>
          </div>
        )}

        {/* Section Label */}
        {!collapsed && (
          <div className="px-5 pt-4 pb-1">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {role === "admin" ? "Admin Panel" : "Main Menu"}
            </p>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-y-auto">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                title={collapsed ? link.label : ""}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  collapsed ? "justify-center" : ""
                } ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Icon className={`h-4 w-4 flex-shrink-0 ${isActive ? "text-white" : "text-gray-400"}`} />
                {!collapsed && link.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-2 border-t border-gray-100">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            title={collapsed ? "Logout" : ""}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-rose-500 hover:bg-rose-50 transition-all w-full ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <LogOut className="h-4 w-4 flex-shrink-0" />
            {!collapsed && "Logout"}
          </button>
        </div>
      </aside>

      {/* Main content margin adjuster */}
      <style>{`
        main { margin-left: ${collapsed ? "4rem" : "15rem"} !important; }
      `}</style>
    </>
  );
}