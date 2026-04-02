import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ModelEvaluation from "@/components/ModelEvaluation";
import GatewayDiagram from "@/components/GatewayDiagram";
import Background from "@/components/Background";

export default function Home() {
  return (
    <main className="relative bg-[#020617] text-white overflow-hidden">
      <Background />
      <Navbar />
      <Hero />
      <ModelEvaluation />
      <GatewayDiagram />
    </main>
  );
}

