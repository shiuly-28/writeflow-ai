"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { User, Mail, FileText, Zap, Save } from "lucide-react";

export default function ProfilePage() {
  const { data: session } = useSession();
  const user = session?.user as any;

  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold ">My Profile</h1>
        <p className="text-slate-600 text-sm mt-1">তোমার প্রোফাইল ম্যানেজ করো।</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>
          <h2 className="text-white font-semibold">{user?.name}</h2>
          <p className="text-slate-400 text-sm">{user?.email}</p>
          <span className="inline-block mt-2 px-3 py-1 bg-indigo-500/20 text-indigo-400 text-xs rounded-full font-medium capitalize">
            {user?.role || "user"} · Free Plan
          </span>

          <div className="grid grid-cols-2 gap-3 mt-6">
            <div className="bg-slate-800 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <FileText className="h-3.5 w-3.5 text-indigo-400" />
                <span className="text-slate-400 text-xs">Documents</span>
              </div>
              <p className="text-white font-bold">0</p>
            </div>
            <div className="bg-slate-800 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="h-3.5 w-3.5 text-amber-400" />
                <span className="text-slate-400 text-xs">AI Calls</span>
              </div>
              <p className="text-white font-bold">0</p>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="lg:col-span-2 bg-slate-900 border border-white/10 rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-6">Edit Profile</h3>

          <div className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="w-full bg-slate-950/50 border border-white/5 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-500 cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                placeholder="নিজের সম্পর্কে কিছু লেখো..."
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>

            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm font-medium rounded-xl hover:opacity-90 transition-all"
            >
              <Save className="h-4 w-4" />
              {saved ? "Saved! ✓" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}