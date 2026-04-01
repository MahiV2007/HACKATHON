"use client";

import { useState } from "react";

interface Result {
  answer: string;
  confidence: number;
  model_used: string;
  cost: number;
  reason: string;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState("balanced");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!query) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("http://localhost:8000/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, mode }),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center p-10">
      <h1 className="text-4xl font-bold mb-8">🧠 LLM Router Dashboard</h1>

      {/* Input */}
      <textarea
        placeholder="Enter your query..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        rows={4}
        className="w-full max-w-2xl p-4 rounded text-black mb-4"
      />

      {/* Mode Selection */}
      <div className="mb-4">
        <button
          onClick={() => setMode("fast")}
          className={`px-4 py-2 rounded mr-2 ${mode === "fast" ? "bg-blue-500" : "bg-gray-600"}`}
        >
          ⚡ Fast
        </button>
        <button
          onClick={() => setMode("balanced")}
          className={`px-4 py-2 rounded mr-2 ${mode === "balanced" ? "bg-blue-500" : "bg-gray-600"}`}
        >
          ⚖️ Balanced
        </button>
        <button
          onClick={() => setMode("accurate")}
          className={`px-4 py-2 rounded ${mode === "accurate" ? "bg-blue-500" : "bg-gray-600"}`}
        >
          🎯 Accurate
        </button>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 px-6 py-2 rounded hover:bg-blue-600 mb-4"
      >
        Ask
      </button>

      {/* Loading */}
      {loading && <p className="text-yellow-400">⏳ Processing...</p>}

      {/* Result */}
      {result && (
        <div className="mt-8 bg-slate-800 p-6 rounded w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">📢 Answer</h2>
          <p className="mb-2">{result.answer}</p>

          <h3 className="text-lg font-semibold">📊 Confidence: {result.confidence}%</h3>
          <h3 className="text-lg font-semibold">🤖 Model Used: {result.model_used}</h3>
          <h3 className="text-lg font-semibold">💸 Cost: ${result.cost}</h3>

          <h3 className="text-lg font-semibold mt-4">🔍 Decision Path</h3>
          <p>{result.reason}</p>
        </div>
      )}
    </div>
  );
}

