import AnalyticsPanel from "@/components/AnalyticsPanel";

export default function AnalyticsPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 pt-32 pb-20">

      {/* TITLE */}
      <div className="max-w-6xl mx-auto mb-12">
        <h1 className="text-5xl font-semibold tracking-tight">
          Analytics
        </h1>
        <p className="text-gray-400 mt-3">
          Real-time model performance metrics
        </p>
      </div>

      {/* GRAPHS */}
      <AnalyticsPanel />
    </main>
  );
}