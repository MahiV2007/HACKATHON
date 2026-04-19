import Link from "next/link";

<Link href="/chat">
  <button className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition">
    Get Started
  </button>
</Link>

export default function Hero() {
  return (
    <section className="pt-70 pb-24 flex flex-col items-center text-center px-6">
      <h1 className="text-6xl md:text-8xl font-semibold tracking-tight leading-[1.05]">
        Intelligent{" "}
        <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          AI Routing Gateway
        </span>
      </h1>

      <p className="text-gray-400 max-w-2xl mt-6 text-lg">
        Route prompts across multiple LLMs with real-time optimization
        for cost, latency, and performance.
      </p>

      <div className="flex gap-4 mt-8">
        <Link href="/chat">
  <button className="px-10 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition">
    Get Started
  </button>
</Link>
      </div>
    </section>
  );
}