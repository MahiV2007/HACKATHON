import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { query, mode } = await req.json();

  // MOCK RESPONSE (safe for now)
  let response;

  if (mode === "fast") {
    response = {
      answer: "Quick response for: " + query,
      confidence: "60%",
      model: "fast-model",
      cost: "$0.001"
    };
  } else if (mode === "balanced") {
    response = {
      answer: "Balanced response for: " + query,
      confidence: "80%",
      model: "balanced-model",
      cost: "$0.003"
    };
  } else {
    response = {
      answer: "Accurate response for: " + query,
      confidence: "95%",
      model: "premium-model",
      cost: "$0.01"
    };
  }

  return NextResponse.json(response);
}