"use client";

import { motion } from "framer-motion";

const models = [
  { name: "GPT-4o", score: 96 },
  { name: "Claude Sonnet", score: 94 },
  { name: "Claude Haiku", score: 89 },
  { name: "Llama 70B", score: 91 },
  { name: "Llama 8B", score: 84 },
  { name: "Mistral 7B", score: 86 },
  { name: "Gemma 7B", score: 83 },
];

export default function ModelTicker() {
  return (
    <div className="relative w-full overflow-hidden py-6">
      
      {/* fade edges */}
      <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-[#020617] to-transparent z-10" />
      <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-[#020617] to-transparent z-10" />

      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="flex gap-6 w-max"
      >
        {[...models, ...models].map((m, i) => (
          <div
            key={i}
            className="
              min-w-[180px]
              p-4 rounded-xl
              bg-white/5 border border-white/10
              backdrop-blur-xl
              hover:bg-white/10 transition
            "
          >
            <p className="text-sm text-gray-400">{m.name}</p>

            <p className="
              text-xl font-semibold mt-1
              bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent
            ">
              {m.score}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}