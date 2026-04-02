"use client";

import {
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

const latencyData = [
  { v: 1.2 },
  { v: 1.1 },
  { v: 1.4 },
  { v: 1.0 },
  { v: 0.9 },
];

const costData = [
  { v: 0.02 },
  { v: 0.025 },
  { v: 0.021 },
  { v: 0.019 },
  { v: 0.022 },
];

const successData = [
  { v: 95 },
  { v: 97 },
  { v: 96 },
  { v: 98 },
  { v: 99 },
];

const tokenData = [
  { v: 120 },
  { v: 150 },
  { v: 130 },
  { v: 160 },
  { v: 140 },
];

export default function AnalyticsPanel() {
  return (
    <div className="max-w-6xl mx-auto mt-20 grid md:grid-cols-2 gap-6">

<MetricCard
  title="Latency"
  value="0.9s"
  data={latencyData}
  color="#3b82f6"
  trend="down"
  insight="Latency has decreased by 12%, improving response speed."
/>

<MetricCard
  title="Cost"
  value="$0.021"
  data={costData}
  color="#a855f7"
  trend="stable"
  insight="Cost remains stable across recent requests."
/>

<MetricCard
  title="Success Rate"
  value="98%"
  data={successData}
  color="#22c55e"
  trend="up"
  insight="Success rate improved due to better model routing."
/>

<MetricCard
  title="Tokens"
  value="145"
  data={tokenData}
  color="#f59e0b"
  trend="up"
  insight="Token usage increased slightly due to longer responses."
/>
    </div>
  );
}

/* 🔥 METRIC CARD */

function MetricCard({
  title,
  value,
  data,
  color,
  trend,
  insight,
}: {
  title: string;
  value: string;
  data: { v: number }[];
  color: string;
  trend: "up" | "down" | "stable";
  insight: string;
}) {
  const trendColor =
    trend === "up"
      ? "text-green-400"
      : trend === "down"
      ? "text-red-400"
      : "text-gray-400";

  const trendSymbol =
    trend === "up" ? "↑" : trend === "down" ? "↓" : "•";

  return (
    <div
      className="
        p-6 rounded-2xl
        bg-white/5 border border-white/10
        backdrop-blur-xl
        transition hover:bg-white/10
      "
      style={{
        boxShadow: `0 0 40px ${color}15`,
      }}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-400">{title}</p>

        <div className={`text-xs flex items-center gap-1 ${trendColor}`}>
          {trendSymbol} trend
        </div>
      </div>

      {/* VALUE */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-2xl font-semibold">{value}</p>
      </div>

      {/* GRAPH */}
      <div className="h-20 mb-3">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="v"
              stroke={color}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 🔥 INSIGHT TEXT */}
      <p className="text-xs text-gray-400 leading-relaxed">
        {insight}
      </p>
    </div>
  );
}