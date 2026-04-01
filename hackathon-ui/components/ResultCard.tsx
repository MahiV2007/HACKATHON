import { AIResponse } from "@/types";

export default function ResultCard({ result }: { result: AIResponse }) {
  return (
    <div className="mt-6 p-6 rounded-xl bg-white/10 border border-white/20">
      <p><strong>Answer:</strong> {result.answer}</p>
      <p><strong>Confidence:</strong> {result.confidence}</p>
      <p><strong>Model:</strong> {result.model}</p>
      <p><strong>Cost:</strong> {result.cost}</p>
    </div>
  );
}