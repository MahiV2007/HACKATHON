import { NextResponse } from "next/server";
import { routeQuery } from "@/lib/router";

export async function POST(req: Request) {
  const { query } = await req.json();

  try {
    // ✅ DEFINE result here
    const result = await routeQuery(query);

    return NextResponse.json({
    answer: result.answer,
    model: result.model,
    confidence: result.confidence, // ✅ now real
    cost: result.cost,             // ✅ now real
    reason: result.reason,
    });

  } catch (error) {
    return NextResponse.json({
      answer: "Something went wrong",
      model: "error",
      confidence: "0%",
      cost: "$0",
      reason: "Error occurred",
    });
  }
}