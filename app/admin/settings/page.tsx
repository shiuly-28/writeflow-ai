"use client";

import { useState } from "react";
import { Save, Globe, Bot, Wrench } from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "WriteFlow AI",
    maintenanceMode: false,
    draftAgent: true,
    rewriteAgent: true,
    chatAgent: true,
    reviewSummarizer: true,
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition-all ${value ? "bg-amber-500" : "bg-gray-200"}`}
    >
      <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${value ? "left-5" : "left-0.5"}`} />
    </button>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
            Site <span className="text-amber-500">Settings</span>
          </h1>
          <p className="text-gray-400 text-xs mt-0.5">প্ল্যাটফর্মের সেটিংস ম্যানেজ করো।</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-all"
        >
          <Save className="h-4 w-4" />
          {saved ? "Saved! ✓" : "Save Changes"}
        </button>
      </div>

      <div className="space-y-4">
        {/* General Settings */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <Globe className="h-5 w-5 text-amber-500" />
            <h2 className="text-sm font-black text-gray-900 uppercase tracking-tight">General Settings</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Site Name</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="w-full max-w-sm border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="flex items-center justify-between max-w-sm">
              <div>
                <p className="text-sm font-semibold text-gray-900">Maintenance Mode</p>
                <p className="text-xs text-gray-400">চালু করলে site সাময়িক বন্ধ থাকবে।</p>
              </div>
              <Toggle
                value={settings.maintenanceMode}
                onChange={() => setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode })}
              />
            </div>
          </div>
        </div>

        {/* AI Agents */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <Bot className="h-5 w-5 text-amber-500" />
            <h2 className="text-sm font-black text-gray-900 uppercase tracking-tight">AI Agents</h2>
          </div>
          <div className="space-y-4">
            {[
              { key: "draftAgent", label: "Content Draft Agent", desc: "Blog, email ও social content generate করে" },
              { key: "rewriteAgent", label: "Rewrite & Tone Agent", desc: "Content rewrite ও tone পরিবর্তন করে" },
              { key: "chatAgent", label: "Chat Assistant", desc: "Editor এর sidebar chatbot" },
              { key: "reviewSummarizer", label: "Review Summariser", desc: "AI দিয়ে reviews summarize করে" },
            ].map((agent) => (
              <div key={agent.key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{agent.label}</p>
                  <p className="text-xs text-gray-400">{agent.desc}</p>
                </div>
                <Toggle
                  value={(settings as any)[agent.key]}
                  onChange={() => setSettings({ ...settings, [agent.key]: !(settings as any)[agent.key] })}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance Warning */}
        {settings.maintenanceMode && (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-center gap-3">
            <Wrench className="h-5 w-5 text-rose-500 flex-shrink-0" />
            <p className="text-sm text-rose-700 font-medium">Maintenance mode চালু আছে — ইউজাররা site access করতে পারবে না।</p>
          </div>
        )}
      </div>
    </div>
  );
}