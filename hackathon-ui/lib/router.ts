// import { analyzePrompt } from "./analyzer";
// import { modelPool } from "./modelPool";
// import { callModel } from "./providerRouter";
// import { calculateConfidence } from "./calculateConfidence";
// import { estimateCost } from "./cost";

// export async function routeQuery(query: string) {
//   const type = await analyzePrompt(query);

//   const models = modelPool[type];

//   let finalAnswer = "";
//   let usedModel = "";
//   let reason = `AI classified as ${type}`;
//   let fallbackUsed = false;
//   let totalCost = 0;

//   for (let i = 0; i < models.length; i++) {
//     const { provider, model, name } = models[i];

//     try {
//       const result = await callModel(provider, query, model);

//       const answer = result.text;

//       if (!answer || answer.includes("Error")) {
//         throw new Error("Bad response");
//       }

//       finalAnswer = answer;
//       usedModel = name;
//       totalCost += result.cost;

//       if (i > 0) {
//         fallbackUsed = true;
//         reason += ` → fallback to ${name}`;
//       } else {
//         reason += ` → primary ${name}`;
//       }

//       break;
//     } catch (err) {
//       console.log(`❌ Failed: ${provider} ${model}`);
//       continue;
//     }
//   }

//   const confidence = calculateConfidence(finalAnswer);

//   return {
//     answer: finalAnswer || "All models failed",


//     model: usedModel,
//     confidence: confidence + "%",
//     cost: `$${totalCost.toFixed(6)}`,
//     reason,
//     fallbackUsed,
//   };
// }

// lib/router.ts

import { models, modelStats, ModelConfig } from "./modelPool";
import { calculateScore } from "./calculateConfidence";
import { promptStats, getPromptSignature } from "./promptMemory";
import { stateStats } from "./stateMemory";

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
// STATE FUNCTION
// -----------------------------
function getState(prompt: string) {
  const length = prompt.length;

  if (length < 50) return "short";
  if (length < 150) return "medium";
  return "long";
}

// -----------------------------
// MAIN ROUTER
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
  // 🔥 1. FORCE TRY UNUSED MODELS
  // -----------------------------
  const unusedModels = activeModels.filter(
    (m) => !modelStats[m.id] || modelStats[m.id].uses === 0
  );

  if (unusedModels.length > 0) {
    const model = getRandomModel(unusedModels);

    return {
      model,
      score: 0.4,
      mode: "explore",
    };
  }

  // -----------------------------
  // 🔥 2. STATE-BASED RL (MAIN)
  // -----------------------------
  const state = getState(prompt);
  const stateData = stateStats[state];

  if (stateData) {
    let bestModelId = null;
    let bestScore = -Infinity;

    for (const modelId in stateData) {
      const stats = stateData[modelId];

      const score =
        (stats.reward || 0) +
        Math.sqrt(1 / (stats.uses + 1)); // 🔥 exploration bonus

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
  // 🔥 3. EPSILON EXPLORATION
  // -----------------------------
  const explorationRate = 0.2;

  if (Math.random() < explorationRate) {
    return {
      model: getRandomModel(activeModels),
      score: 0.4,
      mode: "explore",
    };
  }

  // -----------------------------
  // 🔥 4. GLOBAL SCORING
  // -----------------------------
  let bestModel: ModelConfig | null = null;
  let bestScore = -Infinity;

  const totalUses = Object.values(modelStats).reduce(
    (sum: number, m: any) => sum + (m?.uses || 0),
    0
  );

  for (const model of activeModels) {
    const stats = modelStats[model.id];
    if (!stats) continue;

    const score = calculateScore(stats, totalUses);

    if (score > bestScore) {
      bestScore = score;
      bestModel = model;
    }
  }

  if (!bestModel) {
    return {
      model: getRandomModel(activeModels),
      score: 0.4,
      mode: "explore",
    };
  }

  return {
    model: bestModel,
    score: bestScore,
    mode: "exploit",
  };
}