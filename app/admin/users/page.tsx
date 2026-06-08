"use client";

import { useState } from "react";
import { Search, Shield, Ban, ChevronDown } from "lucide-react";

const mockUsers = [
  { id: 1, name: "Demo User", email: "user@writeflow.com", role: "user", plan: "free", joined: "2025-01-01", status: "active" },
  { id: 2, name: "Demo Admin", email: "admin@writeflow.com", role: "admin", plan: "pro", joined: "2025-01-01", status: "active" },
  { id: 3, name: "Shiuly", email: "shulybd1245@gmail.com", role: "user", plan: "free", joined: "2025-06-05", status: "active" },
];

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");

  const filtered = mockUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
            Manage <span className="text-amber-600">Users</span>
          </h1>
          <p className="text-gray-400 text-xs mt-0.5">সব ইউজার ম্যানেজ করো।</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="নাম বা ইমেইল খোঁজো..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-amber-600"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left text-xs text-gray-500 font-bold uppercase px-6 py-4">Name</th>
              <th className="text-left text-xs text-gray-500 font-bold uppercase px-6 py-4">Email</th>
              <th className="text-left text-xs text-gray-500 font-bold uppercase px-6 py-4">Role</th>
              <th className="text-left text-xs text-gray-500 font-bold uppercase px-6 py-4">Plan</th>
              <th className="text-left text-xs text-gray-500 font-bold uppercase px-6 py-4">Joined</th>
              <th className="text-left text-xs text-gray-500 font-bold uppercase px-6 py-4">Status</th>
              <th className="text-left text-xs text-gray-500 font-bold uppercase px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => (
              <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50 transition-all">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-600 to-amber-500 flex items-center justify-center text-white text-xs font-bold">
                      {user.name[0]}
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{user.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                    user.role === "admin"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-amber-200 text-amber-600"
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-lg text-xs font-bold bg-gray-100 text-gray-600 capitalize">
                    {user.plan}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{user.joined}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                    user.status === "active"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-rose-100 text-rose-700"
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 rounded-lg bg-amber-60 hover:bg-amber-600 transition-all" title="Change Role">
                      <Shield className="h-3.5 w-3.5 text-amber-600" />
                    </button>
                    <button className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 transition-all" title="Ban User">
                      <Ban className="h-3.5 w-3.5 text-rose-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}