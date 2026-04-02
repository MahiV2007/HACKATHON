// export const modelPool = {
//   coding: [
    
//     {
//       provider: "bedrock",
//       model: "meta.llama3-8b-instruct-v1:0",
//       name: "LLaMA 3 (Bedrock)",
//     },
//   ],

//   reasoning: [

//     {
//       provider: "openrouter",
//       model: "mistralai/mistral-7b-instruct",
//       name: "GPT-3.5 (Fallback)",
//     },
//     {
//       provider: "bedrock",
//       model: "meta.llama3-8b-instruct-v1:0",
//       name: "LLaMA 3",
//     },
//   ],

//   general: [
//     {
//       provider: "openrouter",
//       model: "mistralai/mistral-7b-instruct",
//       name: "GPT-3.5 (OpenRouter)",
//     },
//   ],
// };





// lib/modelPool.ts

// -----------------------------
// TYPES (clean structure)
// -----------------------------
export type ModelConfig = {
  id: string;
  name: string;
  provider: "openrouter" | "openai" | "bedrock" | "nvidia" | "groq" | "fireworks" | "google";
  enabled: boolean;
};

export type ModelStats = {
  uses: number;
  avg_latency: number;
  avg_cost: number;
  success_rate: number;
  failures: number; // NEW
};


// -----------------------------
// NVIDIA MODELS
// -----------------------------

export const models: ModelConfig[] = [
  // ⚡ FAST (LLAMA 8B)
  {
    id: "meta-llama/llama-3-8b-instruct",
    name: "claude Haiku - Fast",
    provider: "openrouter",
    enabled: true,
  },

    {
  id: "llama-3.1-8b-instant",
  name: "LLaMA 3.1 Instant (Groq)",
  provider: "groq",
  enabled: true,
},
  {
  id: "meta-llama/llama-prompt-guard-2-86m",
  name: "LLaMA Prompt Guard - Fast (Groq)",
  provider: "groq",
  enabled: false,
},
  {
  id: "openai/gpt-oss-safeguard-20b",
  name: "GPT-OSS Safeguard 20B (Groq)",
  provider: "groq",
  enabled: true,
},
{
  id: "openai/gpt-oss-120b",
  name: "GPT-OSS 120B (Groq)",
  provider: "groq",
  enabled: true,
},

{
  id: "moonshotai/kimi-k2-instruct-0905",
  name: "Kimi K2 (Groq)",
  provider: "groq",
  enabled: true,
},
{
  id: "gemini-1.5-flash-latest",
  name: "Gemini Flash",
  provider: "google",
  enabled: false,
},
{
  id: "gemini-1.5-pro",
  name: "Gemini Pro",
  provider: "google",
  enabled: false,
},
{
  id: "accounts/fireworks/models/nvidia-nemotron-3-super-120b-a12b-fp8",
  name: "Nemotron 3 Super 120B-Reasoning (Fireworks)",
  provider: "fireworks",
  enabled: false,
},
{
  id: "accounts/fireworks/models/minimax-m2p5",
  name: "Minimax M2P5-Coding (Fireworks)",
  provider: "fireworks",
  enabled: false,
},
{
  id: "accounts/fireworks/models/deepseek-v3p2",
  name: "Deepseek 3.2 (Fireworks)",
  provider: "fireworks",
  enabled: false,
},
  {
    id: "accounts/fireworks/models/glm-4p7",
    name: "GLM 4.7 (Fireworks)",
    provider: "fireworks",
    enabled: false,
  },
  {
    id: "meta-llama/llama-3-8b-instruct",
    name: "GPT-4o - Balanced",
    provider: "openrouter",
    enabled: false,
  },
  {
    id: "meta-llama/llama-3-8b-instruct",
    name: " Mistral 7B- Efficient",
    provider: "openrouter",
    enabled: false,
  },

  // 🧠 POWERFUL (LLAMA 70B)
 
  {
    id: "meta-llama/llama-3-70b-instruct",
    name: "Claude Sonnet - Deep Reasoning",
    provider: "openrouter",
    enabled: false,
  },
  {
    id: "meta-llama/llama-3-70b-instruct",
    name: "Llama 70B - Detailed",
    provider: "openrouter",
    enabled: false,
  },


{
  id: "Deepseek -v3.2",
  name: "Deepseek 3.2 (NVIDIA)",
  provider: "nvidia",
  enabled: false,
},
{
  id: "gpt-oss-120b",
  name: "GPT-OSS 120B (NVIDIA)",
  provider: "nvidia",
  enabled: false,
},
{
  id: "nemotron-3-super-120b",
  name: "Nemotron 3 Super 120B (NVIDIA)",
  provider: "nvidia",
  enabled: false,
},
  {
    id: "meta-llama/llama-3-70b-instruct",
    name: "Gemma 7B - Lightweight",
    provider: "openrouter",
    enabled: false,
  },
    {
      id: "meta/llama3-8b-instruct",
      name: "claude Haikyu",
      provider: "nvidia",
      enabled: false,
    },
    {
    
      id: "meta.llama3-2-3b-instruct-v1:0",
      name: "Claude 3 Haiku (Bedrock)",
      provider: "bedrock",
      enabled: false,
    },
    {
      id: "anthropic.claude-3-sonnet-20240229-v1:0",
      name: "Claude 3 Sonnet (Bedrock)",
      provider: "bedrock",
      enabled: false,

    },
     {
    id: "meta-llama/llama-3-70b-instruct",
    name: "Llama 70B - Accurate",
    provider: "openrouter",
    enabled: false},
    {
      id: "anthropic.claude-3-7-sonnet-20250219-v1:0",
      name: "Claude 3.7 Sonnet (Bedrock)",
      provider: "bedrock",
      enabled: false,
    },
    {
      id: "anthropic.claude-3-5-haiku-20241022-v1:0",
      name: "Claude 3.5 Haiku (Bedrock)",
      provider: "bedrock",
      enabled: false,
    },

    // -----------------------------
    // COHERE (TEXT MODELS)
    // -----------------------------
    {
      id: "cohere.command-r-v1:0",
      name: "Command R (Bedrock)",
      provider: "bedrock",
      enabled: false,
    },
    {
      id: "cohere.command-r-plus-v1:0",
      name: "Command R+ (Bedrock)",
      provider: "bedrock",
      enabled: false,
    },

    // -----------------------------
    // META LLAMA (TEXT MODELS)
    // -----------------------------
    {
      id: "meta.llama3-2-1b-instruct-v1:0",
      name: "Llama 3.2 1B (Bedrock)",
      provider: "bedrock",
      enabled: false,
    },
    {
      id: "meta.llama3-2-3b-instruct-v1:0",
      name: "Llama 3.2 3B (Bedrock)",
      provider: "bedrock",
      enabled: false,
    },
    {
      id: "meta.llama3-2-11b-instruct-v1:0",
      name: "Llama 3.2 11B (Bedrock)",
      provider: "bedrock",
      enabled: false,
    },
    {
      id: "meta.llama3-2-90b-instruct-v1:0",
      name: "Llama 3.2 90B (Bedrock)",
      provider: "bedrock",
      enabled: false,
    },
    {
      id: "openchat/openchat-3.5",
      name: "GPT-3.5 Turbo (Router)",
      provider: "openrouter",
      enabled: false,
    },


  // 🔥 READY FOR NEXT
  {
    id: "gpt-4o",
    name: "GPT-4o (OpenAI)",
    provider: "openai",
    enabled: false, // turn on later
  },

];

// -----------------------------
// STATS STORE (SELF-LEARNING)
// -----------------------------
import { readStats, writeStats } from "./storage";

export let modelStats = readStats();

// initialize stats for all models
export function initializeModelStats() {
  for (const model of models) {
    if (!modelStats[model.id]) {
      modelStats[model.id] = {
        uses: 0,
        avg_latency: 0,
        avg_cost: 0,
        success_rate: 0,
        failures: 0, // NEW
      };
    }
  }
}

// call once on startup
initializeModelStats();

// -----------------------------
// GET MODEL BY ID
// -----------------------------
export function getModelById(id: string): ModelConfig | undefined {
  return models.find((m) => m.id === id);
}

// -----------------------------
// UPDATE STATS (SELF-TRAINING CORE)
// -----------------------------
export function updateModelStats(
  modelId: string,
  latency: number,
  cost: number,
  success: boolean
) {
  const stats = modelStats[modelId];
  if (!stats) return;

  const prevUses = stats.uses;
  writeStats(modelStats);
  stats.uses += 1;
  if (!success) {
  stats.failures += 1;
  }

  // moving averages
  stats.avg_latency =
    (stats.avg_latency * prevUses + latency) / stats.uses;

  stats.avg_cost =
    (stats.avg_cost * prevUses + cost) / stats.uses;

  stats.success_rate =
    (stats.success_rate * prevUses + (success ? 1 : 0)) / stats.uses;
}

// -----------------------------
// OPTIONAL: RESET (DEBUG)
// -----------------------------
export function resetStats() {
  for (const key in modelStats) {
    modelStats[key] = {
      uses: 0,
      avg_latency: 0,
      avg_cost: 0,
      success_rate: 0,
      failures: 0, // NEW
    };
  }
}

// -----------------------------
// OPTIONAL: PRETTY PRINT (UI DEBUG)
// -----------------------------
export function getModelStatsReadable() {
  return models.map((model) => ({
    id: model.id,
    name: model.name,
    provider: model.provider,
    ...modelStats[model.id],
  }));
}