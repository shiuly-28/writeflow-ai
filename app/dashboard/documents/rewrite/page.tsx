"use client";

import { useState } from "react";
import { Sparkles, Loader2, Copy, Check, ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";

const tones = ["Professional", "Casual", "Friendly", "Persuasive", "Formal", "Humorous"];

const actions = [
  { key: "rewrite", label: "Rewrite", desc: "Tone অনুযায়ী rewrite করো", color: "bg-amber-600" },
  { key: "shorten", label: "Shorten", desc: "ছোট করো", color: "bg-amber-500" },
  { key: "expand", label: "Expand", desc: "বড় করো", color: "bg-emerald-500" },
  { key: "grammar", label: "Fix Grammar", desc: "Grammar ঠিক করো", color: "bg-blue-500" },
  { key: "clarity", label: "Improve Clarity", desc: "আরো স্পষ্ট করো", color: "bg-violet-500" },
];

export default function RewritePage() {
  const [text, setText] = useState("");
  const [tone, setTone] = useState("Professional");
  const [action, setAction] = useState("rewrite");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleRewrite = async () => {
    if (!text.trim()) {
      setError("Text লিখো।");
      return;
    }
    setLoading(true);
    setError("");
    setResult("");

    try {
      const res = await fetch("/api/ai/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, action, tone }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResult(data.result);
    } catch (err: any) {
      setError(err.message || "কিছু একটা সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUseResult = () => {
    setText(result);
    setResult("");
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard/documents" className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all">
          <ArrowLeft className="h-4 w-4 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
            Rewrite & <span className="text-amber-600">Tone Agent</span>
          </h1>
          <p className="text-gray-400 text-xs mt-0.5">AI দিয়ে content rewrite করো।</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 uppercase tracking-tight mb-5">
            Input <span className="text-amber-600">Settings</span>
          </h2>

          <div className="space-y-4">
            {/* Actions */}
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-2 block">Action</label>
              <div className="grid grid-cols-2 gap-2">
                {actions.map((a) => (
                  <button
                    key={a.key}
                    onClick={() => setAction(a.key)}
                    className={`p-3 rounded-xl text-left transition-all border ${
                      action === a.key
                        ? "border-amber-500 bg-amber-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <p className={`text-xs font-bold ${action === a.key ? "text-amber-700" : "text-gray-700"}`}>
                      {a.label}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{a.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Tone — only for rewrite */}
            {action === "rewrite" && (
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-2 block">Tone</label>
                <div className="flex flex-wrap gap-2">
                  {tones.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTone(t)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        tone === t
                          ? "bg-amber-600 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Text Input */}
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-2 block">
                তোমার Text *
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={8}
                placeholder="এখানে text paste করো বা লেখো..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 resize-none"
              />
              <p className="text-xs text-gray-400 mt-1">{text.split(" ").filter(Boolean).length} words</p>
            </div>

            {error && (
              <p className="text-rose-500 text-xs bg-rose-50 border border-rose-200 rounded-xl px-4 py-2.5">
                {error}
              </p>
            )}

            <button
              onClick={handleRewrite}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-amber-600 to-amber-500 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  AI কাজ করছে...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  {actions.find((a) => a.key === action)?.label}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Output Panel */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-black text-gray-900 uppercase tracking-tight">
              AI <span className="text-amber-600">Result</span>
            </h2>
            {result && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleUseResult}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 rounded-xl text-xs font-semibold text-emerald-600 transition-all"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Use This
                </button>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-xs font-semibold text-gray-600 transition-all"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            )}
          </div>

          {loading && (
            <div className="flex flex-col items-center justify-center h-64 gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-cyan-500 flex items-center justify-center animate-pulse">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <p className="text-gray-500 text-sm font-medium">AI rewrite করছে...</p>
            </div>
          )}

          {!loading && !result && (
            <div className="flex flex-col items-center justify-center h-64 gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-gray-300" />
              </div>
              <p className="text-gray-400 text-sm">Text দিয়ে action চাপো</p>
            </div>
          )}

          {result && !loading && (
            <div className="bg-gray-50 rounded-xl p-4 max-h-96 overflow-y-auto">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">
                {result}
              </pre>
              <p className="text-xs text-gray-400 mt-3 pt-3 border-t border-gray-200">
                {result.split(" ").filter(Boolean).length} words
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}