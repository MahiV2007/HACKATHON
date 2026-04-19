import AnalyticsPanel from "@/components/AnalyticsPanel";

export default function AnalyticsPage() {
  return (
    <main className="min-h-screen w-full bg-[#020617] text-white px-6 pt-28 pb-20">

      {/* 🌌 BACKGROUND GLOW */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-100px] right-1/3 w-[500px] h-[500px] bg-purple-500/20 blur-[120px] rounded-full" />
      </div>

      {/* 🔥 HEADER */}
      <div className="max-w-6xl mx-auto mb-14">
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Analytics Dashboard
        </h1>

        <p className="text-gray-400 mt-4 max-w-xl text-lg">
          Monitor real-time performance, cost, and efficiency of your AI models.
        </p>
      </div>

      {/* ⚡ QUICK STATS BAR (NEW 🔥) */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        
        <StatCard label="Requests" value="12.4K" />
        <StatCard label="Avg Latency" value="0.9s" />
        <StatCard label="Success Rate" value="98%" />
        <StatCard label="Cost" value="$42.10" />

      </div>

      {/* 📊 ANALYTICS PANEL */}
      <div className="max-w-6xl mx-auto w-full">
        <AnalyticsPanel />
      </div>

    </main>
  );
}

/* ================= STAT CARD ================= */

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-lg">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-lg font-semibold mt-1">{value}</p>
    </div>
  );
}