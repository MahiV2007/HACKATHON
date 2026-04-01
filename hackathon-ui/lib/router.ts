import { callBedrock } from "./providers/bedrock";
import { calculateConfidence } from "./calculateConfidence";
import { estimateCost } from "./cost";

export async function routeQuery(query: string) {
  let modelId = "";
  let modelName = "";
  let reason = "";
  let fallbackUsed = false;

  // 🔥 MODEL SELECTION
  if (query.length < 40) {
    modelId = "anthropic.claude-3-haiku-20240307-v1:0";
    modelName = "Claude Haiku";
    reason = "Short query → fast & low-cost model selected";
  } else if (
    query.includes("explain") ||
    query.includes("why") ||
    query.includes("how")
  ) {
    modelId = "anthropic.claude-3-sonnet-20240229-v1:0";
    modelName = "Claude Sonnet";
    reason = "Reasoning required → higher intelligence model selected";
  } else {
    modelId = "anthropic.claude-3-haiku-20240307-v1:0";
    modelName = "Claude Haiku";
    reason = "General query → balanced fast model";
  }

  // 🔌 CALL MODEL
  let answer = await callBedrock(query, modelId);

  // 🧮 CONFIDENCE
  let confidenceScore = calculateConfidence(answer);

  // 🔁 FALLBACK LOGIC (Portkey-style)
  if (confidenceScore < 70) {
    fallbackUsed = true;

    modelId = "anthropic.claude-3-sonnet-20240229-v1:0";
    modelName = "Claude Sonnet";

    answer = await callBedrock(query, modelId);
    confidenceScore = calculateConfidence(answer);

    reason += " → Low confidence, upgraded model";
  }

  const cost = estimateCost(modelName);

  return {
    answer,
    model: modelName,
    provider: "AWS Bedrock",
    confidence: confidenceScore + "%",
    cost,
    reason,
    fallbackUsed,
  };
}