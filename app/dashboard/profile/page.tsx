"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { User, Mail, FileText, Zap, Save } from "lucide-react";

export default function ProfilePage() {
  const { data: session } = useSession();
  const user = session?.user as any;

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [saved, setSaved] = useState(false);

  // সেশন লোড হলে স্টেট আপডেট করার জন্য
  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-white min-h-screen text-slate-800 p-2">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>
        <p className="text-slate-600 text-sm mt-1">তোমার প্রোফাইল ম্যানেজ করো।</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white border-2 border-amber-500 rounded-2xl p-6 text-center shadow-sm">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-md">
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>
          <h2 className="font-bold text-lg text-slate-900">{user?.name || "User Name"}</h2>
          <p className="text-slate-600 text-sm">{user?.email}</p>
          <span className="inline-block mt-2 px-3 py-1 bg-amber-100 text-amber-700 text-xs rounded-full font-semibold capitalize">
            {user?.role || "user"} · Free Plan
          </span>

          <div className="grid grid-cols-2 gap-3 mt-6">
            <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1 justify-center">
                <FileText className="h-3.5 w-3.5 text-amber-600" />
                <span className="text-slate-600 text-xs font-medium">Documents</span>
              </div>
              <p className="text-slate-900 font-bold text-lg">0</p>
            </div>
            <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1 justify-center">
                <Zap className="h-3.5 w-3.5 text-amber-600" />
                <span className="text-slate-600 text-xs font-medium">AI Calls</span>
              </div>
              <p className="text-slate-900 font-bold text-lg">0</p>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="lg:col-span-2 bg-white border-2 border-amber-500 rounded-2xl p-6 shadow-sm">
          <h3 className="text-slate-900 font-bold text-lg mb-6">Edit Profile</h3>

          <div className="space-y-5">
            {/* Full Name Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                  placeholder="Your Name"
                />
              </div>
            </div>

            {/* Email Input (Read Only) */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  value={user?.email || ""}
               
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-500 "
                />
              </div>
            </div>

            {/* Bio Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                placeholder="নিজের সম্পর্কে কিছু লেখো..."
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all resize-none"
              />
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all transform active:scale-95"
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