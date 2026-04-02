"use client";

import { useState } from "react";
import { motion } from "framer-motion";


export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "ai"; content: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState<any>(null);

  const send = async () => {
    if (!input.trim()) return;

    const userMessage = input;

    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setLoading(true);
    setMeta(null);

    // placeholder AI message for streaming
    setMessages((prev) => [...prev, { role: "ai", content: "" }]);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userMessage }),
      });

      const data = await res.json();
      const text = data.response || "";

      let built = "";

      for (let i = 0; i < text.length; i++) {
        built += text[i];

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "ai",
            content: built,
          };
          return updated;
        });

        await new Promise((r) => setTimeout(r, 5));
      }

      setMeta(data.meta);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "Error fetching AI response" },
      ]);
    }

    setLoading(false);
  };

  const isEmpty = messages.length === 0;

  return (
    <main className="relative min-h-screen bg-[#020617] text-white flex flex-col items-center">

      {/* 🌌 BACKGROUND */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ x: [0, 200, -200, 0], y: [0, -200, 200, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute w-[600px] h-[600px] bg-blue-600/20 blur-[140px] rounded-full"
        />
        <motion.div
          animate={{ x: [0, -200, 200, 0], y: [0, 200, -200, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute right-0 bottom-0 w-[600px] h-[600px] bg-purple-600/20 blur-[140px] rounded-full"
        />
      </div>

      {/* ================= EMPTY STATE ================= */}
      {isEmpty && (
        <div className="flex flex-col items-center justify-center flex-1 w-full max-w-3xl px-6 text-center">

          <h1 className="text-6xl md:text-7xl font-semibold tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              PromptOps
            </span>
          </h1>

          <p className="text-gray-400 mt-4">
            Intelligent prompt routing across LLMs
          </p>

          {/* INPUT */}
          <div className="mt-10 w-full">
            <div className="
              flex items-center gap-3
              p-3 rounded-2xl
              bg-white/5 border border-white/10
              backdrop-blur-xl
              shadow-[0_10px_40px_rgba(0,0,0,0.6)]
            ">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything..."
                className="flex-1 bg-transparent outline-none px-3 py-3 text-white placeholder-gray-500"
              />

              <button
                onClick={send}
                className="
                  px-5 py-3 rounded-xl
                  bg-gradient-to-r from-blue-500 to-purple-500
                  hover:opacity-90 transition
                "
              >
                Send
              </button>
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex gap-6 mt-10 text-xs text-gray-500">
            <span>About</span>
            <span>Docs</span>
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      )}

      {/* ================= CHAT MODE ================= */}
      {!isEmpty && (
        <div className="w-full max-w-3xl px-6 pt-32 pb-40 space-y-6">

          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`
                p-4 rounded-xl border
                ${
                  msg.role === "user"
                    ? "bg-white/5 border-white/10"
                    : "bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-white/10"
                }
              `}
            >
              <div className="whitespace-pre-wrap break-words leading-relaxed text-sm">
                {msg.content || "…"}
              </div>
            </motion.div>
          ))}

          {/* LOADING */}
          {loading && (
            <p className="text-gray-400 animate-pulse">
              Routing intelligently...
            </p>
          )}

          {/* META */}
{meta && (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="
      relative mt-10 p-8 rounded-2xl
      bg-gradient-to-br from-[#0b1220] to-[#020617]
      border border-white/10
      overflow-hidden
    "
  >
    {/* ⚡ animated electric background */}
    <div className="absolute inset-0 opacity-40">
      <div className="absolute w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.2),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.2),transparent_40%)]" />
    </div>

    {/* ⚡ moving energy line */}
    <motion.div
      className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent"
      animate={{ x: ["-100%", "100%"] }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
    />

    {/* CONTENT */}
    <div className="relative z-10 flex items-center justify-between">

      {/* LEFT: Model Info */}
      <div>
        <p className="text-xs text-gray-400 mb-2 tracking-wider">
          ROUTED TO
        </p>

        <h3 className="
          text-2xl font-semibold
          bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent
        ">
          {meta.model}
        </h3>

        <p className="text-sm text-gray-400 mt-1">
          {meta.provider}
        </p>
      </div>

      {/* RIGHT: glowing indicator */}
      <div className="relative">
        <div className="w-4 h-4 bg-blue-400 rounded-full" />
        <div className="absolute inset-0 w-4 h-4 bg-blue-400 rounded-full blur-md opacity-70 animate-pulse" />
      </div>
    </div>

    {/* ⚡ bottom metrics (clean, not heavy) */}
    <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">

      <MiniStat label="Latency" value={`${meta.metrics?.latency?.toFixed(2)}s`} />
      <MiniStat label="Cost" value={`$${meta.metrics?.cost?.toFixed(5)}`} />
      <MiniStat label="Tokens" value={Math.round(meta.metrics?.tokens)} />
      <MiniStat label="Score" value={meta.confidence_score?.toFixed(2)} />

    </div>
  </motion.div>
)}
  
        </div>
      )}

      {/* ================= FLOATING INPUT ================= */}
      {!isEmpty && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-3xl px-4">
          <div className="
            flex items-center gap-3
            p-3 rounded-2xl
            bg-white/5 border border-white/10
            backdrop-blur-xl
          ">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask follow-up..."
              className="flex-1 bg-transparent outline-none px-3 py-3"
            />

            <button
              onClick={send}
              className="
                px-5 py-3 rounded-xl
                bg-gradient-to-r from-blue-500 to-purple-500
              "
            >
              Send
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

/* ================= MINI STAT ================= */

function MiniStat({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: any;
  highlight?: boolean;
}) {
  return (
    <div
      className={`
        p-3 rounded-lg border text-xs
        ${
          highlight
            ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30 text-white"
            : "bg-white/5 border-white/10 text-gray-300"
        }
      `}
    >
      <p className="text-gray-400 text-[10px]">{label}</p>
      <p className="font-semibold text-sm mt-1">{value}</p>
    </div>
  );
}


