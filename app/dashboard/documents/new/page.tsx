"use client";

import { useState } from "react";
import { Sparkles, Loader2, Copy, Check, ArrowLeft } from "lucide-react";
import Link from "next/link";

const contentTypes = ["Blog Post", "Social Media", "Email"];
const tones = ["Professional", "Casual", "Friendly", "Persuasive", "Formal"];

export default function NewDocumentPage() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Professional");
  const [audience, setAudience] = useState("");
  const [contentType, setContentType] = useState("Blog Post");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    content: string;
    title: string;
    meta: string;
    tags: string;
    tokens: number;
  } | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError("Topic লিখো।");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/ai/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, tone, audience, contentType }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResult(data);
    } catch (err: any) {
      setError(err.message || "কিছু একটা সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
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
            Content <span className="text-amber-500">Draft Agent</span>
          </h1>
          <p className="text-gray-400 text-xs mt-0.5">AI দিয়ে কন্টেন্ট generate করো।</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 uppercase tracking-tight mb-5">
            Content <span className="text-amber-500">Settings</span>
          </h2>

          <div className="space-y-4">
            {/* Content Type */}
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-2 block">Content Type</label>
              <div className="flex gap-2">
                {contentTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setContentType(type)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      contentType === type
                        ? "bg-amber-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Topic */}
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-2 block">Topic *</label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                rows={3}
                placeholder="কোন বিষয়ে লিখতে চাও? যেমন: AI এর ভবিষ্যৎ, Digital Marketing Tips..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 resize-none"
              />
            </div>

            {/* Tone */}
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-2 block">Tone</label>
              <div className="flex flex-wrap gap-2">
                {tones.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      tone === t
                        ? "bg-amber-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Audience */}
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-2 block">Target Audience</label>
              <input
                type="text"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder="যেমন: Entrepreneurs, Students, Developers..."
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            {error && (
              <p className="text-rose-500 text-xs bg-rose-50 border border-rose-200 rounded-xl px-4 py-2.5">
                {error}
              </p>
            )}

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  AI লিখছে...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate Content
                </>
              )}
            </button>
          </div>
        </div>

        {/* Output Panel */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-black text-gray-900 uppercase tracking-tight">
              Generated <span className="text-amber-500">Content</span>
            </h2>
            {result && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-xs font-semibold text-gray-600 transition-all"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied!" : "Copy"}
              </button>
            )}
          </div>

          {loading && (
            <div className="flex flex-col items-center justify-center h-64 gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center animate-pulse">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <p className="text-gray-500 text-sm font-medium">AI কন্টেন্ট লিখছে...</p>
              <p className="text-gray-400 text-xs">একটু অপেক্ষা করো</p>
            </div>
          )}

          {!loading && !result && (
            <div className="flex flex-col items-center justify-center h-64 gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-gray-300" />
              </div>
              <p className="text-gray-400 text-sm">Topic দিয়ে Generate চাপো</p>
            </div>
          )}

          {result && !loading && (
            <div className="space-y-4">
              {/* Meta Info */}
              <div className="bg-amber-50 border border-amber-500 rounded-xl p-4 space-y-2">
                <div>
                  <span className="text-xs font-bold text-amber-500">TITLE: </span>
                  <span className="text-xs text-gray-700">{result.title}</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-amber-500">META: </span>
                  <span className="text-xs text-gray-700">{result.meta}</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-amber-500">TAGS: </span>
                  <span className="text-xs text-gray-700">{result.tags}</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-amber-600">TOKENS: </span>
                  <span className="text-xs text-gray-700">{result.tokens}</span>
                </div>
              </div>

              {/* Content */}
              <div className="bg-gray-50 rounded-xl p-4 max-h-80 overflow-y-auto">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">
                  {result.content}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}