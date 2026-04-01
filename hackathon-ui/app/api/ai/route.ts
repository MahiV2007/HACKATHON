// import { NextResponse } from "next/server";
// import { routeQuery } from "@/lib/router";

// export async function POST(req: Request): Promise<Response> {
//   try {
//     const body = await req.json();
//     const query = body.query;

//     const result = await routeQuery(query);
    
// return NextResponse.json({
//   answer: result.answer,
//   model: result.model,
//   confidence: result.confidence,
//   cost: result.cost,
//   reason: result.reason,
//   fallbackUsed: result.fallbackUsed,
// });

//   } catch (err: any) {
//     console.error("API ERROR:", err);

//     return NextResponse.json({
//       answer: "Something went wrong",
//       model: "error",
//       confidence: "0%",
//       cost: "$0",
//       reason: "Backend error",
//     });
//   }
// }
  

import { NextResponse } from "next/server";

import { pickBestModel } from "@/lib/router";
import { callModel } from "@/lib/providerRouter";
import { updateStateMemory } from "@/lib/stateMemory";
import {
  updateModelStats,
  modelStats,
} from "@/lib/modelPool";

// -----------------------------
// STATE FUNCTION
// -----------------------------
function getState(prompt: string) {
  const length = prompt.length;

  if (length < 20) return "simple";
  if (length < 50) return "short";
  if (length < 150) return "medium";
  return "long";
}

// -----------------------------
// SIMPLE PROMPT CHECK
// -----------------------------
function isSimple(prompt: string) {
  return prompt.length < 20;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prompt = body?.prompt;

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // -----------------------------
    // 1. PICK MODEL
    // -----------------------------
    const { model, score, mode } = pickBestModel(prompt);

    const startTime = Date.now();

    // -----------------------------
    // 2. CALL MODEL
    // -----------------------------
    const output = await callModel(
      model.provider,
      model.id,
      prompt
    );

    const endTime = Date.now();

    // -----------------------------
    // 3. TEXT HANDLING
    // -----------------------------
    const text =
      typeof output === "string"
        ? output
        : JSON.stringify(output || "");

    // -----------------------------
    // 4. METRICS
    // -----------------------------
    const latency = (endTime - startTime) / 1000;

    const tokens = Math.max(1, Math.ceil(text.length / 4));

    const cost = tokens * 0.00001;

    const success =
      typeof output === "string" &&
      output.length > 5 &&
      !output.toLowerCase().includes("error") &&
      !output.toLowerCase().includes("no response");

    // -----------------------------
    // 🔥 RL REWARD (SMART)
    // -----------------------------
    const simple = isSimple(prompt);
    const state = getState(prompt);

const reward =
  (success ? 1 : 0) * 0.6 +
  (1 / (latency + 0.5)) * 0.25 +
  (1 / (cost + 0.000001)) * 0.15;

updateModelStats(model.id, latency, cost, success);
updateStateMemory(prompt, model.id, reward);

    // -----------------------------
    // 6. RESPONSE
    // -----------------------------
    return NextResponse.json({
      success: true,

      response: text,

      meta: {
        model: model.name,
        model_id: model.id,
        provider: model.provider,

        mode,
        confidence_score: score,

        // 🔥 RL VISIBILITY
        state,
        reward,

        metrics: {
          latency,
          tokens,
          cost,
          success,
        },

        learned_stats: modelStats[model.id],
      },
    });

  } catch (err) {
    console.error("API ERROR:", err);

    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong",
      },
      { status: 500 }
    );
  }
}