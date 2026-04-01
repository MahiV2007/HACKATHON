"use client";
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
    </div>
  );
}