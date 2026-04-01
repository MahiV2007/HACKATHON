"use client";
<<<<<<< HEAD
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState("balanced");
  const [result, setResult] = useState(null);
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
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>🧠 LLM Router Dashboard</h1>

      {/* Input */}
      <textarea
        placeholder="Enter your query..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        rows={4}
        style={{ width: "100%", padding: "10px", marginTop: "20px" }}
      />

      {/* Mode Selection */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setMode("fast")}>⚡ Fast</button>
        <button onClick={() => setMode("balanced")} style={{ marginLeft: "10px" }}>
          ⚖️ Balanced
        </button>
        <button onClick={() => setMode("accurate")} style={{ marginLeft: "10px" }}>
          🎯 Accurate
        </button>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "black",
          color: "white",
        }}
      >
        Ask
      </button>

      {/* Loading */}
      {loading && <p style={{ marginTop: "20px" }}>⏳ Processing...</p>}

      {/* Result */}
      {result && (
        <div style={{ marginTop: "30px", borderTop: "1px solid #ccc", paddingTop: "20px" }}>
          <h2>📢 Answer</h2>
          <p>{result.answer}</p>

          <h3>📊 Confidence: {result.confidence}%</h3>
          <h3>🤖 Model Used: {result.model_used}</h3>
          <h3>💸 Cost: ${result.cost}</h3>

          <h3>🔍 Decision Path</h3>
          <p>{result.reason}</p>
        </div>
      )}
=======

import { useState } from "react";

interface Response {
  answer: string;
  confidence: string;
  model: string;
  cost: string;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState("fast");
  const [result, setResult] = useState<Response | null>(null);

  const handleRun = () => {
    let response: Response;

    if (mode === "fast") {
      response = {
        answer: "Quick response (low cost, lower accuracy)",
        confidence: "60%",
        model: "Claude Haiku",
        cost: "$0.001"
      };
    } else if (mode === "balanced") {
      response = {
        answer: "Balanced response with validation",
        confidence: "80%",
        model: "Haiku + Validation Layer",
        cost: "$0.003"
      };
    } else {
      response = {
        answer: "High accuracy response using premium model",
        confidence: "95%",
        model: "Claude Sonnet / Opus",
        cost: "$0.01"
      };
    }

    setResult(response);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center p-10">
      
      <h1 className="text-4xl font-bold mb-8">
        🚀 Intelligent LLM Routing System
      </h1>

      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter your query..."
        className="w-full max-w-2xl p-4 rounded text-black mb-4"
      />

      <select
        value={mode}
        onChange={(e) => setMode(e.target.value)}
        className="p-2 text-black rounded mb-4"
      >
        <option value="fast">⚡ Fast</option>
        <option value="balanced">⚖️ Balanced</option>
        <option value="accurate">🎯 Accurate</option>
      </select>

      <button
        onClick={handleRun}
        className="bg-blue-500 px-6 py-2 rounded hover:bg-blue-600"
      >
        Run
      </button>

      {result && (
        <div className="mt-8 bg-slate-800 p-6 rounded w-full max-w-2xl">
          <p><strong>Answer:</strong> {result.answer}</p>
          <p><strong>Confidence:</strong> {result.confidence}</p>
          <p><strong>Model Used:</strong> {result.model}</p>
          <p><strong>Cost:</strong> {result.cost}</p>
        </div>
      )}


    </div>
  );
}