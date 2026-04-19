"use client";

import { motion } from "framer-motion";
import CrossedWires from "./CrossedWires";



function FloatingCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5, repeat: Infinity }}
      className={`
        relative rounded-2xl
        bg-gradient-to-b from-white/10 to-white/5
        border border-white/10
        backdrop-blur-xl
        shadow-[0_20px_80px_rgba(0,0,0,0.6)]
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}

export default function GatewayDiagram() {
  return (
    <section className="py-40 px-6 text-center relative">
      {/* Title */}
      <h2 className="text-5xl md:text-7xl font-semibold tracking-tight mb-24">
        The{" "}
        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          AI Gateway
        </span>{" "}
        Pattern
      </h2>

      {/* Diagram */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-12">

        {/* LEFT: APP */}
        <FloatingCard className="w-[260px] h-[320px] p-6 flex flex-col justify-between">
          <div className="text-sm text-gray-400">Your App</div>

          <div className="flex-1 flex items-center justify-center">
            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 shadow-[0_0_40px_rgba(59,130,246,0.6)]" />
          </div>

          <div className="h-10 bg-white/5 rounded-md" />
        </FloatingCard>

        <CrossedWires />

        {/* CENTER: PROMPTOPS */}
        <FloatingCard className="w-[320px] p-6">
          <h3 className="text-sm text-gray-400 mb-4">
            PromptOps AI Gateway
          </h3>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <span className="p-2 rounded bg-orange-500/10 text-orange-300 border border-orange-500/20">
              Observability
            </span>
            <span className="p-2 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
              Governance
            </span>
            <span className="p-2 rounded bg-green-500/10 text-green-300 border border-green-500/20">
              Routing
            </span>
            <span className="p-2 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
              Prompt Mgmt
            </span>
            <span className="p-2 rounded bg-pink-500/10 text-pink-300 border border-pink-500/20">
              Guardrails
            </span>
            <span className="p-2 rounded bg-yellow-500/10 text-yellow-300 border border-yellow-500/20">
              Cost Control
            </span>
          </div>

          {/* Inner glow box */}
          <div className="mt-6 h-20 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10" />
        </FloatingCard>

        {/* LINE */}
        <CrossedWires />

        {/* RIGHT: MODELS */}
        <FloatingCard className="w-[260px] h-[320px] p-6 flex flex-col gap-4">
          <div className="text-sm text-gray-400">1600+ LLMs</div>

          <div className="grid grid-cols-3 gap-3 text-xs">
            {[
              "GPT",
              "Claude",
              "Gemini",
              "Mistral",
              "Llama",
              "Groq",
              "Cohere",
              "xAI",
              "Perplexity",
            ].map((m) => (
              <div
                key={m}
                className="p-2 rounded bg-white/5 border border-white/10 hover:bg-white/10 transition"
              >
                {m}
              </div>
            ))}
          </div>

          <div className="mt-auto space-y-2">
            <div className="p-2 rounded bg-white/5 text-xs border border-white/10">
              Custom Models
            </div>
            <div className="p-2 rounded bg-white/5 text-xs border border-white/10">
              Fine-tuned Models
            </div>
          </div>
        </FloatingCard>
      </div>
    </section>
  );
}