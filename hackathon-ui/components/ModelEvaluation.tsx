"use client";
import { motion } from "framer-motion";

const models = [
  { name: "GPT-4o", score: 96, latency: "0.9s", type: "Balanced" },
  { name: "Claude Sonnet", score: 94, latency: "1.2s", type: "Reasoning" },
  { name: "Claude Haiku", score: 89, latency: "0.6s", type: "Fast" },
  { name: "Llama 70B", score: 91, latency: "1.9s", type: "Deep Reasoning" },
  { name: "Llama 8B", score: 84, latency: "0.7s", type: "Cheap" },
  { name: "Mistral 7B", score: 86, latency: "0.8s", type: "Efficient" },
  { name: "Gemma 7B", score: 83, latency: "0.75s", type: "Lightweight" },
];

export default function ModelEvaluation() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* TITLE */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight">
          Real-time Model Evaluation
        </h2>
        <p className="text-gray-400 mt-4">
          Live scoring across multiple LLMs
        </p>
      </div>

      {/* EDGE FADE */}
      <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-[#020617] to-transparent z-10" />
      <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-[#020617] to-transparent z-10" />

      {/* SCROLL */}
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="flex gap-6 w-max px-6"
      >
        {[...models, ...models].map((m, i) => (
          <div
            key={i}
            className={`
              min-w-[260px]
              p-6 rounded-2xl
              bg-white/5 border border-white/10
              backdrop-blur-xl
              hover:scale-105 transition
              ${
                m.score > 94
                  ? "shadow-[0_0_30px_rgba(168,85,247,0.3)] border-purple-500/30"
                  : ""
              }
            `}
          >
            {/* TOP */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-400">{m.name}</p>
              <span className="text-[10px] px-2 py-1 rounded-full bg-white/10 text-gray-300">
                {m.type}
              </span>
            </div>

            {/* SCORE */}
            <p className="text-4xl font-semibold mt-3 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {m.score}
            </p>

            {/* LATENCY */}
            <p className="text-xs text-gray-400 mt-1">
              Avg latency: <span className="text-white">{m.latency}</span>
            </p>

            {/* PROGRESS BAR */}
            <div className="mt-4 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                style={{ width: `${m.score}%` }}
              />
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}