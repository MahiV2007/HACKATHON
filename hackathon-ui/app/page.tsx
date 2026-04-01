"use client";

import { useState } from "react";
import InputBox from "@/components/InputBox";
import ModeSelector from "@/components/ModeSelector";
import ResultCard from "@/components/ResultCard";
import Loader from "@/components/Loader";
import { AIResponse } from "@/types";

export default function Home() {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState("fast");
  const [result, setResult] = useState<AIResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    setLoading(true);
    setResult(null);

    const res = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, mode }),
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center p-6">

      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 w-full max-w-3xl">

        <h1 className="text-4xl font-bold text-center mb-6">
          🚀 LLM Routing System
        </h1>

        <InputBox value={query} onChange={setQuery} />

        <div className="flex justify-between items-center mb-4">
          <ModeSelector mode={mode} setMode={setMode} />

          <button
            onClick={handleRun}
            className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2 rounded-xl hover:scale-105 transition"
          >
            Run
          </button>
        </div>

        {loading && <Loader />}
        {result && <ResultCard result={result} />}

      </div>
    </div>
  );
}