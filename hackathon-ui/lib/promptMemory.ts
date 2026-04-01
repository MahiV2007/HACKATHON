import { readPromptStats, writePromptStats } from "./storage";

export let promptStats = readPromptStats();

// -----------------------------
// SIGNATURE (simple + fast)
// -----------------------------
export function getPromptSignature(prompt: string) {
  if (!prompt || typeof prompt !== "string") {
    return "default"; // 🔥 fallback key
  }

  return prompt
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
}

// -----------------------------
// UPDATE STATS PER PROMPT
// -----------------------------
export function updatePromptStats(
  prompt: string,
  modelId: string,
  latency: number,
  cost: number,
  success: boolean
) {
  const key = getPromptSignature(prompt);

  if (!promptStats[key]) {
    promptStats[key] = {};
  }

  if (!promptStats[key][modelId]) {
    promptStats[key][modelId] = {
      uses: 0,
      avg_latency: 0,
      avg_cost: 0,
      success_rate: 0,
    };
  }

  const stats = promptStats[key][modelId];
  const prevUses = stats.uses;

  stats.uses += 1;

  stats.avg_latency =
    (stats.avg_latency * prevUses + latency) / stats.uses;

  stats.avg_cost =
    (stats.avg_cost * prevUses + cost) / stats.uses;

  stats.success_rate =
    (stats.success_rate * prevUses + (success ? 1 : 0)) / stats.uses;

  writePromptStats(promptStats);
}