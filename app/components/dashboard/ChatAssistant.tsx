"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Sparkles, Bot } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatAssistant({ documentContext }: { documentContext?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "হ্যালো! আমি তোমার AI writing assistant। কন্টেন্ট লেখায় কীভাবে সাহায্য করতে পারি?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          documentContext,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setMessages([...newMessages, { role: "assistant", content: data.response }]);
    } catch (err: any) {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Sorry, কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করো।" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-amber-600 to-amber-500 text-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all z-50 flex items-center justify-center"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-[480px] bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-600 to-amber-500 px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-white text-sm font-bold">AI Writing Assistant</p>
              <p className="text-white/70 text-xs">সবসময় সাহায্য করতে প্রস্তুত</p>
            </div>
            <div className="ml-auto w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="w-6 h-6 rounded-lg bg-amber-100 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                    <Bot className="h-3.5 w-3.5 text-amber-600" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                    msg.role === "user"
                      ? "bg-amber-600 text-white rounded-tr-none"
                      : "bg-gray-100 text-gray-700 rounded-tl-none"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="w-6 h-6 rounded-lg bg-amber-100 flex items-center justify-center mr-2 flex-shrink-0">
                  <Bot className="h-3.5 w-3.5 text-amber-600" />
                </div>
                <div className="bg-gray-100 px-3 py-2 rounded-2xl rounded-tl-none">
                  <Loader2 className="h-4 w-4 text-amber-500 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="কিছু জিজ্ঞেস করো..."
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="w-8 h-8 bg-amber-600 hover:bg-amber-700 text-white rounded-xl flex items-center justify-center transition-all disabled:opacity-50"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}