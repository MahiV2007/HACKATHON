import { models, modelStats, ModelConfig } from "./modelPool";
import { calculateScore } from "./calculateConfidence";
import { getHint } from "./promptHints";
import { getVector, findClosestState } from "./stateMemory";

// -----------------------------
// GET ACTIVE MODELS
// -----------------------------
function getActiveModels(): ModelConfig[] {
  return models.filter((m) => m.enabled);
}

// -----------------------------
// RANDOM MODEL
// -----------------------------
function getRandomModel(models: ModelConfig[]): ModelConfig {
  return models[Math.floor(Math.random() * models.length)];
}

// -----------------------------
// MAIN ROUTER (RL + UCB)
// -----------------------------
export function pickBestModel(prompt: string): {
  model: ModelConfig;
  score: number;
  mode: "explore" | "exploit";
} {
  const activeModels = getActiveModels();

  if (activeModels.length === 0) {
    throw new Error("No enabled models");
  }

  // -----------------------------
  // 🔥 1. FORCE EXPLORATION (IMPORTANT)
  // -----------------------------
  if (Math.random() < 0.3) {
    return {
      model: getRandomModel(activeModels),
      score: 0.3,
      mode: "explore",
    };
  }

  // -----------------------------
  // 🔥 2. STATE-BASED LEARNING
  // -----------------------------
  const vector = getVector(prompt);
  const { state, similarity } = findClosestState(vector);

  if (state && similarity > 0.6) {
    let bestModelId: string | null = null;
    let bestScore = -Infinity;

    // total usage for UCB
    const totalUses = Object.values(state.models).reduce(
      (sum: number, m: any) => sum + (m.uses || 0),
      0
    );

    const hints = getHint(prompt);

    for (const modelId in state.models) {
      const stats = state.models[modelId];
      const model = activeModels.find((m) => m.id === modelId);

      if (!model) continue;

      // -----------------------------
      // 🔥 BASE SCORE
      // -----------------------------
      let score = calculateScore(stats);

      // -----------------------------
      // 🔥 UCB EXPLORATION (IMPORTANT)
      // -----------------------------
      const exploration = Math.sqrt(
        Math.log(totalUses + 1) / (stats.uses + 1)
      );

      score += 0.3 * exploration;

      // -----------------------------
      // 🔥 SMART HINT BOOST
      // -----------------------------
      if (hints.isCoding && model.name.includes("120B")) {
        score += 0.2;
      }

      if (hints.isSimple && model.name.includes("8B")) {
        score += 0.15;
      }

      if (hints.isMath && model.name.includes("120B")) {
        score += 0.2;
      }

      // -----------------------------
      // 🔥 RANDOMNESS (ANTI-DOMINATION)
      // -----------------------------
      score += Math.random() * 0.03;

      if (score > bestScore) {
        bestScore = score;
        bestModelId = modelId;
      }
    }

    const model = activeModels.find((m) => m.id === bestModelId);

    if (model) {
      return {
        model,
        score: bestScore,
        mode: "exploit",
      };
    }
  }

  // -----------------------------
  // 🔥 3. TRY UNUSED MODELS
  // -----------------------------
  const unusedModels = activeModels.filter(
    (m) => !modelStats[m.id] || modelStats[m.id].uses < 2
  );

  if (unusedModels.length > 0) {
    return {
      model: getRandomModel(unusedModels),
      score: 0.4,
      mode: "explore",
    };
  }

  // -----------------------------
  // 🔥 4. GLOBAL BEST (FALLBACK)
  // -----------------------------
  let bestModel: ModelConfig | null = null;
  let bestScore = -Infinity;

  for (const model of activeModels) {
    const stats = modelStats[model.id];
    if (!stats) continue;

    let score = calculateScore(stats);

    // slight exploration
    score += 1 / (stats.uses + 1);

    // tiny randomness
    score += Math.random() * 0.02;

    if (score > bestScore) {
      bestScore = score;
      bestModel = model;
    }
  }

  // -----------------------------
  // FINAL RETURN
  // -----------------------------
  return {
    model: bestModel || getRandomModel(activeModels),
    score: bestScore,
    mode: "exploit",
  };
}