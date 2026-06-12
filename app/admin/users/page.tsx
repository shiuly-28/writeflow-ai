"use client";

import { useState, useEffect } from "react";
import { Search, Shield, Ban, Loader2 } from "lucide-react";

interface UserType {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  plan: "free" | "pro" | "team";
  createdAt: string;
  isActive: boolean;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/admin/users");
        if (!res.ok) throw new Error("ইউজার ডাটা লোড করতে ব্যর্থ হয়েছে।");
        const data = await res.json();
        setUsers(data);
      } catch (err: any) {
        setError(err.message || "কিছু একটা ভুল হয়েছে।");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filtered = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
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

      {/* Search Input */}
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="নাম বা ইমেইল খোঁজো..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-amber-600 text-gray-900"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 mb-4 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl text-sm">
          {error}
        </div>
      )}

      {/* Table & Loader Layer */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500 text-sm gap-2">
            <Loader2 className="h-6 w-6 animate-spin text-amber-600" />
            ডাটাবেজ থেকে ইউজার তালিকা লোড হচ্ছে...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400 text-sm">
            কোনো ইউজার পাওয়া যায়নি।
          </div>
        ) : (
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
                <tr key={user._id} className="border-b border-gray-50 hover:bg-gray-50 transition-all">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-600 to-amber-500 flex items-center justify-center text-white text-xs font-bold">
                        {user.name ? user.name[0].toUpperCase() : "U"}
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                      user.role === "admin"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-gray-100 text-gray-700"
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-600 capitalize">
                      {user.plan || "free"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString("en-US")}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                      user.isActive 
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-rose-100 text-rose-700"
                    }`}>
                      {user.isActive ? "active" : "banned"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 transition-all" title="Change Role">
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
        )}
      </div>
    </div>
  );
}