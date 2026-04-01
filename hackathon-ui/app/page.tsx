// "use client";

// import Link from "next/link";
// import { useState } from "react";

// export default function Home() {
//   const [prompt, setPrompt] = useState("");

// const [loading, setLoading] = useState(false);
// const [response, setResponse] = useState("");
// const [meta, setMeta] = useState<any>(null);

// const runAI = async () => {
//   setLoading(true);
//   setResponse("");
//   setMeta(null);

//   try {
//     const res = await fetch("/api/ai", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ query: prompt }),
//     });

//     const data = await res.json();

//     // Typing effect
//     let text = data.answer;
//     for (let i = 0; i < text.length; i++) {
//       setResponse((prev) => prev + text[i]);
//       await new Promise((res) => setTimeout(res, 10));
//     }

//     setMeta({
//       model: data.model,
//       confidence: data.confidence,
//       cost: data.cost,
//       reason: data.reason,
//       fallbackUsed: data.fallbackUsed,
//     });

//   } catch (err) {
//     setResponse("Error fetching AI response");
//   }

//   setLoading(false);
// };

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col items-center px-6 py-10">
//       <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 opacity-20 blur-3xl rounded-full"></div>
//       <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500 opacity-20 blur-3xl rounded-full"></div>
//       <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
//         Intelligent Prompt Router
//       </h1>

//       <p className="text-gray-400 mt-4 text-center max-w-xl">
//         Optimize cost. Maximize accuracy. Route intelligence.
//       </p>

// {/* INPUT CARD */}
// <div className="mt-12 w-full max-w-xl p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl flex flex-col items-center">

// <input
//   value={prompt}
//   onChange={(e) => setPrompt(e.target.value)}
//   placeholder="Try: Explain black holes or write code..."
//   className="w-full p-4 rounded-xl bg-black/40 border border-gray-700"
// />

//   <button
//     onClick={runAI}
//     className="mt-4 w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl"
//   >
//     🚀 Run Smart Routing
//   </button>

// </div>


// {/* 👇 ADD OUTPUT HERE (IMPORTANT) */}
// <div className="mt-8 w-full max-w-xl">

//   {loading && (
//     <p className="text-gray-400 animate-pulse">
//       ⚡ Routing through models...
//     </p>
//   )}

//   {response && (
//     <div className="mt-4 p-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl">

//       <p className="text-gray-200 leading-relaxed">
//         {response}
//       </p>

//       {meta && (
//         <div className="flex justify-between mt-4 text-sm text-gray-400 border-t border-gray-700 pt-3">
//           <span>🤖 {meta.model}</span>
//           <span>🎯 {meta.confidence}</span>
//           <span>💰 {meta.cost}</span>
//         </div>
//       )}

//     </div>
//   )}

// </div>


//       <div className="mt-16">
//         <Link href="/details">
//       <button className="relative px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 overflow-hidden group hover:scale-105 transition">

//         {/* Glow Effect */}
//         <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 blur-lg opacity-30 group-hover:opacity-60 transition"></span>

//         {/* Content */}
//         <span className="relative flex items-center gap-2">
//           See How It Works
//           <span className="transform group-hover:translate-x-1 transition">→</span>
//         </span>

//       </button>
//   </Link>
// </div>
//     </main>
//   );
// }

// function delay(ms: number) {
//   return new Promise((res) => setTimeout(res, ms));
// }



"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [meta, setMeta] = useState<any>(null);

  const runAI = async () => {
    setLoading(true);
    setResponse("");
    setMeta(null);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }), // ✅ FIXED
      });

      const data = await res.json();

      const text = data.response || "";

      // Typing effect
      for (let i = 0; i < text.length; i++) {
        setResponse((prev) => prev + text[i]);
        await new Promise((res) => setTimeout(res, 5));
      }

      setMeta(data.meta); // ✅ DIRECT META

    } catch (err) {
      setResponse("Error fetching AI response");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col items-center px-6 py-10">
      
      <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
        Intelligent Prompt Router
      </h1>

      <p className="text-gray-400 mt-4 text-center max-w-xl">
        Optimize cost. Maximize accuracy. Route intelligence.
      </p>

      {/* INPUT */}
      <div className="mt-12 w-full max-w-xl p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl">
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Try: Explain black holes or write code..."
          className="w-full p-4 rounded-xl bg-black/40 border border-gray-700"
        />

        <button
          onClick={runAI}
          className="mt-4 w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl"
        >
          🚀 Run Smart Routing
        </button>
      </div>

      {/* OUTPUT */}
      <div className="mt-8 w-full max-w-xl">

        {loading && (
          <p className="text-gray-400 animate-pulse">
            ⚡ Routing through models...
          </p>
        )}

        {response && (
          <div className="mt-4 p-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl">

            {/* AI RESPONSE */}
            <p className="text-gray-200 leading-relaxed whitespace-pre-line">
              {response}
            </p>

            {/* META INFO */}
            {meta && (
              <div className="mt-6 space-y-3 text-sm">

                {/* MODEL INFO */}
                <div className="flex justify-between border-t border-gray-700 pt-3 text-gray-400">
                  <span>🤖 {meta.model}</span>
                  <span>⚙️ {meta.provider}</span>
                  <span>📊 {meta.mode}</span>
                </div>

                {/* SCORE */}
                <div className="flex justify-between text-gray-400">
                  <span>🎯 Confidence</span>
                  <span>{meta.confidence_score?.toFixed(3)}</span>
                </div>

                {/* METRICS */}
                <div className="grid grid-cols-2 gap-2 text-gray-400">
                  <span>⏱ Latency: {meta.metrics?.latency?.toFixed(2)}s</span>
                  <span>💰 Cost: {meta.metrics?.cost?.toFixed(5)}</span>
                  <span>🔢 Tokens: {Math.round(meta.metrics?.tokens)}</span>
                  <span>
                    ✅ Success: {meta.metrics?.success ? "Yes" : "No"}
                  </span>
                </div>

                {/* LEARNING STATS 🔥 */}
                <div className="border-t border-gray-700 pt-3 text-gray-400">
                  <p>🧠 Learned Stats:</p>
                  <p>Uses: {meta.learned_stats?.uses}</p>
                  <p>
                    Success Rate:{" "}
                    {(meta.learned_stats?.success_rate * 100)?.toFixed(1)}%
                  </p>
                  <p>
                    Avg Latency:{" "}
                    {meta.learned_stats?.avg_latency?.toFixed(2)}s
                  </p>
                </div>

              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-16">
        <Link href="/details">
          <button className="px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-500 to-blue-500">
            See How It Works →
          </button>
        </Link>
      </div>

    </main>
  );
}