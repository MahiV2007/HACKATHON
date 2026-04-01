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
// -----------------------------
// GET ACTIVE MODELS
// -----------------------------
function getActiveModels(): ModelConfig[] {
  return models.filter((m) => m.enabled);
}

// -----------------------------
// RANDOM MODEL (EXPLORATION)
// -----------------------------
function getRandomModel(): ModelConfig {
  const activeModels = getActiveModels();

  if (activeModels.length === 0) {
    throw new Error("No active models available");
  }

  const index = Math.floor(Math.random() * activeModels.length);
  return activeModels[index];
}

// -----------------------------
// CHECK IF ANY MODEL HAS DATA
// -----------------------------
function hasData(): boolean {
  const activeModels = getActiveModels();

  return activeModels.some(
    (m) => modelStats[m.id] && modelStats[m.id].uses > 0
  );
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
  // ALWAYS TRY UNUSED MODELS FIRST
  // -----------------------------


      // -----------------------------
  // GET PROMPT MEMORY
  // -----------------------------
    const signature = getPromptSignature(prompt);
  const promptData = promptStats[signature];

  // 🔥 🔥 🔥 PLACE IT RIGHT HERE 🔥 🔥 🔥

  // -----------------------------
  // IF PROMPT SEEN BEFORE → USE BEST MODEL
  // -----------------------------
  if (promptData && Math.random() > 0.25)  {
    let bestModel = null;
    let bestScore = -Infinity;

    for (const modelId in promptData) {
      const stats = promptData[modelId];

      const score =
        stats.success_rate * 0.5 +
        (1 / (stats.avg_latency || 1)) * 0.25 +
        (1 / (stats.avg_cost || 1)) * 0.15 +
        (1 / (stats.uses + 1)) * 0.1; // 🔥 prevents domination

      if (score > bestScore) {
        bestScore = score;
        bestModel = modelId;
      }
    }

    if (bestModel) {
      const model = activeModels.find((m) => m.id === bestModel);

      if (model && model.enabled) {
        return {
          model,
          score: bestScore,
          mode: "exploit",
        };
      }
    }
  }

  const unusedModels = activeModels.filter(
    (m) => !modelStats[m.id] || modelStats[m.id].uses === 0
  );

  if (unusedModels.length > 0) {
    const randomUnused =
      unusedModels[Math.floor(Math.random() * unusedModels.length)];

    return {
      model: randomUnused,
      score: 0,
      mode: "explore",
    };
  }


  // -----------------------------
  // EPSILON EXPLORATION
  // -----------------------------
  const explorationRate = 0.2;

  if (Math.random() < explorationRate) {
    return {
      model: getRandomModel(),
      score: 0,
      mode: "explore",
    };
  }

  // -----------------------------
  // EXPLOIT (BEST MODEL)
  // -----------------------------
  let bestModel: ModelConfig | null = null;
  let bestScore = -Infinity;

  for (const model of activeModels) {
    const stats = modelStats[model.id];
    if (!stats) continue;

    let score = calculateScore(stats);

    // 🔥 SMALL BOOST FOR LESS USED MODELS
    score += 1 / (stats.uses + 1);

    if (score > bestScore) {
      bestScore = score;
      bestModel = model;
    }
  }

  // -----------------------------
  // FALLBACK
  // -----------------------------
  if (!bestModel) {
    return {
      model: getRandomModel(),
      score: 0,
      mode: "explore",
    };
  }

  return {
    model: bestModel,
    score: bestScore,
    mode: "exploit",
  };
}