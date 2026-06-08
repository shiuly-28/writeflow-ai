"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Search, X } from "lucide-react";

interface Template {
  id: number;
  title: string;
  category: string;
  description: string;
  tone: string;
  status: "active" | "draft";
}

const initialTemplates: Template[] = [
  { id: 1, title: "Blog Post Writer", category: "Blog", description: "AI-powered blog post generator", tone: "Professional", status: "active" },
  { id: 2, title: "Social Media Caption", category: "Social Media", description: "Engaging captions for social media", tone: "Casual", status: "active" },
  { id: 3, title: "Email Newsletter", category: "Email", description: "Professional email newsletters", tone: "Friendly", status: "draft" },
  { id: 4, title: "Ad Copy Generator", category: "Ad Copy", description: "High-converting ad copy", tone: "Persuasive", status: "active" },
];

export default function AdminTemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>(initialTemplates);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editTemplate, setEditTemplate] = useState<Template | null>(null);
  const [form, setForm] = useState({ title: "", category: "Blog", description: "", tone: "Professional" });

  const filtered = templates.filter(
    (t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = () => {
    if (!form.title || !form.description) return;
    if (editTemplate) {
      setTemplates(templates.map((t) => t.id === editTemplate.id ? { ...t, ...form } : t));
    } else {
      setTemplates([...templates, { id: Date.now(), ...form, status: "active" } as Template]);
    }
    setShowModal(false);
    setEditTemplate(null);
    setForm({ title: "", category: "Blog", description: "", tone: "Professional" });
  };

  const handleEdit = (t: Template) => {
    setEditTemplate(t);
    setForm({ title: t.title, category: t.category, description: t.description, tone: t.tone });
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    setTemplates(templates.filter((t) => t.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
            Manage <span className="text-indigo-600">Templates</span>
          </h1>
          <p className="text-gray-400 text-xs mt-0.5">Template তৈরি, সম্পাদনা ও মুছে ফেলো।</p>
        </div>
        <button
          onClick={() => { setEditTemplate(null); setForm({ title: "", category: "Blog", description: "", tone: "Professional" }); setShowModal(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-all"
        >
          <Plus className="h-4 w-4" />
          New Template
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Template খোঁজো..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left text-xs text-gray-500 font-bold uppercase px-6 py-4">Title</th>
              <th className="text-left text-xs text-gray-500 font-bold uppercase px-6 py-4">Category</th>
              <th className="text-left text-xs text-gray-500 font-bold uppercase px-6 py-4">Tone</th>
              <th className="text-left text-xs text-gray-500 font-bold uppercase px-6 py-4">Status</th>
              <th className="text-left text-xs text-gray-500 font-bold uppercase px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50 transition-all">
                <td className="px-6 py-4">
                  <p className="text-sm font-semibold text-gray-900">{t.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{t.description}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-lg">{t.category}</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{t.tone}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                    t.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"
                  }`}>
                    {t.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleEdit(t)} className="p-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition-all">
                      <Pencil className="h-3.5 w-3.5 text-indigo-600" />
                    </button>
                    <button onClick={() => handleDelete(t.id)} className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 transition-all">
                      <Trash2 className="h-3.5 w-3.5 text-rose-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-black text-gray-900">
                {editTemplate ? "Edit Template" : "New Template"}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-gray-100">
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
                  placeholder="Template title"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
                >
                  {["Blog", "Social Media", "Email", "Ad Copy"].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">Tone</label>
                <select
                  value={form.tone}
                  onChange={(e) => setForm({ ...form, tone: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
                >
                  {["Professional", "Casual", "Friendly", "Persuasive", "Formal"].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 resize-none"
                  placeholder="Template description"
                />
              </div>
              <button
                onClick={handleSubmit}
                className="w-full py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-all"
              >
                {editTemplate ? "Update Template" : "Create Template"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}