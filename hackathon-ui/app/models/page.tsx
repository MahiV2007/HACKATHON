"use client";

import { motion } from "framer-motion";
import { useModel } from "@/lib/store/useModel";

const modelData: Record<string, any> = {
  "GPT-4o": {
    tag: "Balanced",
    description: "Best overall performance across reasoning, speed, and cost.",
    latency: "0.9s",
    cost: "$0.03",
    strengths: ["Reasoning", "Speed", "General Tasks"],
  },
  "Claude Sonnet": {
    tag: "Reasoning",
    description: "Strong reasoning and structured outputs.",
    latency: "1.2s",
    cost: "$0.025",
    strengths: ["Logic", "Writing", "Analysis"],
  },
};

export default function ModelsPage() {
  const { selectedModel } = useModel();
  const model = modelData[selectedModel];

  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 pt-40 pb-20">

      {/* TITLE */}
      <div className="max-w-6xl mx-auto mb-16">
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight">
          {selectedModel}
        </h1>
        <p className="text-gray-400 mt-4 max-w-2xl">
          {model?.description}
        </p>
      </div>

      {/* 🔥 MAIN CARD (BIG) */}
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            relative p-10 rounded-3xl
            bg-gradient-to-br from-blue-500/10 to-purple-500/10
            border border-white/10
            backdrop-blur-xl
            shadow-[0_0_80px_rgba(139,92,246,0.15)]
          "
        >
          {/* HEADER */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold">
              Model Overview
            </h2>

            <span className="
              px-3 py-1 text-sm rounded-full
              bg-white/10 border border-white/10
              text-blue-300
            ">
              {model?.tag}
            </span>
          </div>

        <div className="max-w-4xl mx-auto mt-20 space-y-16">

  {/* OVERVIEW */}
  <section>
    <h2 className="text-2xl font-semibold mb-4">Overview</h2>
    <p className="text-gray-400 leading-relaxed">
      {selectedModel} is designed to provide a balance between performance,
      latency, and cost. It is suitable for a wide range of applications,
      including conversational AI, reasoning tasks, and structured outputs.
    </p>
  </section>

  {/* CAPABILITIES */}
  <section>
    <h2 className="text-2xl font-semibold mb-4">Capabilities</h2>
    <ul className="space-y-3 text-gray-400">
      <li>• Advanced reasoning and problem solving</li>
      <li>• Natural language understanding and generation</li>
      <li>• Multi-turn conversations</li>
      <li>• Code generation and debugging</li>
    </ul>
  </section>

  {/* USE CASES */}
  <section>
    <h2 className="text-2xl font-semibold mb-4">Best Use Cases</h2>
    <ul className="space-y-3 text-gray-400">
      <li>• Chatbots and assistants</li>
      <li>• Data analysis and summarization</li>
      <li>• Content generation</li>
      <li>• AI routing systems (like PromptOps 😉)</li>
    </ul>
  </section>

  {/* LIMITATIONS */}
  <section>
    <h2 className="text-2xl font-semibold mb-4">Limitations</h2>
    <ul className="space-y-3 text-gray-400">
      <li>• May be slower than lightweight models</li>
      <li>• Higher cost compared to smaller models</li>
      <li>• Not ideal for ultra-low latency tasks</li>
    </ul>
  </section>

  {/* EXAMPLE */}
  <section>
    <h2 className="text-2xl font-semibold mb-4">Example</h2>

    <div className="p-5 rounded-xl bg-white/5 border border-white/10 font-mono text-sm text-gray-300">
      <p className="text-gray-500 mb-2">Prompt</p>
      <p>Explain quantum computing in simple terms</p>

      <div className="h-px bg-white/10 my-4" />

      <p className="text-gray-500 mb-2">Response</p>
      <p>
        Quantum computing uses quantum bits (qubits) that can exist in multiple
        states at once, allowing it to solve certain problems much faster than
        classical computers...
      </p>
    </div>
  </section>

</div>
          {/* GRID CONTENT */}
          <div className="grid md:grid-cols-3 gap-8">

            {/* LATENCY */}
            <InfoCard label="Latency" value={model?.latency} />

            {/* COST */}
            <InfoCard label="Cost" value={model?.cost} />

            {/* TYPE */}
            <InfoCard label="Type" value={model?.tag} />

          </div>

          {/* STRENGTHS */}
          <div className="mt-10">
            <p className="text-sm text-gray-400 mb-3">
              Strengths
            </p>

            <div className="flex flex-wrap gap-3">
              {model?.strengths?.map((s: string) => (
                <span
                  key={s}
                  className="
                    px-3 py-1 rounded-full text-sm
                    bg-gradient-to-r from-blue-500/20 to-purple-500/20
                    border border-white/10
                  "
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

        </motion.div>
      </div>

      {/* 🔥 FUTURE SECTION (you can expand here) */}
      <div className="max-w-6xl mx-auto mt-16 grid md:grid-cols-2 gap-8">
        
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <p className="text-gray-400 text-sm mb-2">Performance</p>
          <p className="text-lg">Add charts / evaluation here</p>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <p className="text-gray-400 text-sm mb-2">Usage</p>
          <p className="text-lg">Best use cases, routing logic</p>
        </div>

      </div>
    </main>
  );
}

/* 🔥 SMALL COMPONENT */

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="
      p-6 rounded-xl
      bg-white/5 border border-white/10
    ">
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-xl font-semibold mt-2">{value}</p>
    </div>
  );
}