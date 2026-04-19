"use client";

import {
  LineChart,
  Line,
  Tooltip,
  CartesianGrid,
} from "recharts";

/* ================= DATA ================= */

const latencyData = [
  { name: "1", v: 1.2 },
  { name: "2", v: 1.1 },
  { name: "3", v: 1.4 },
  { name: "4", v: 1.0 },
  { name: "5", v: 0.9 },
];

const costData = [
  { name: "1", v: 0.02 },
  { name: "2", v: 0.025 },
  { name: "3", v: 0.021 },
  { name: "4", v: 0.019 },
  { name: "5", v: 0.022 },
];

const successData = [
  { name: "1", v: 95 },
  { name: "2", v: 97 },
  { name: "3", v: 96 },
  { name: "4", v: 98 },
  { name: "5", v: 99 },
];

const tokenData = [
  { name: "1", v: 120 },
  { name: "2", v: 150 },
  { name: "3", v: 130 },
  { name: "4", v: 160 },
  { name: "5", v: 140 },
];

/* ================= MAIN PANEL ================= */

export default function AnalyticsPanel() {
  return (
    <div className="w-full max-w-6xl mx-auto mt-20 px-4 grid md:grid-cols-2 gap-6">
      
      <MetricCard
        title="Latency"
        value="0.9s"
        data={latencyData}
        color="#3b82f6"
        trend="down"
        insight="Latency decreased by 12%, improving response speed."
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
        insight="Token usage increased slightly."
      />

    </div>
  );
}

/* ================= METRIC CARD ================= */

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
  data: { name: string; v: number }[];
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
        relative p-6 rounded-2xl
        bg-white/5 border border-white/10
        backdrop-blur-xl
        transition duration-300
        hover:scale-[1.02] hover:bg-white/10
      "
      style={{
        boxShadow: `0 0 40px ${color}20`,
      }}
    >
      {/* Glow Effect */}
      <div
        className="absolute inset-0 rounded-2xl opacity-20 blur-2xl"
        style={{ background: color }}
      />

      {/* HEADER */}
      <div className="flex items-center justify-between mb-2 relative z-10">
        <p className="text-sm text-gray-400">{title}</p>

        <div className={`text-xs flex items-center gap-1 ${trendColor}`}>
          {trendSymbol} trend
        </div>
      </div>

      {/* VALUE */}
      <div className="mb-4 relative z-10">
        <p className="text-2xl font-semibold">{value}</p>
      </div>

      {/* GRAPH */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[450px]">
          <LineChart width={450} height={220} data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="v"
              stroke={color}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </div>
      </div>

      {/* INSIGHT */}
      <p className="text-xs text-gray-400 mt-3 leading-relaxed relative z-10">
        {insight}
      </p>
    </div>
  );
}