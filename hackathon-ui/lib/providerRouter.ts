// import { callOpenRouter } from "./openrouter";
// import { callBedrock } from "./providers/bedrock";
// //import { callOpenAI } from "./providers/openai";

// export async function callModel(provider: string, prompt: string, model: string) {
//   if (provider === "openrouter") {
//     return await callOpenRouter(prompt, model);
//   }

//  // if (provider === "openai") {
//    // return await callOpenAI(prompt, model);
//   //}

//   if (provider === "bedrock") {
//     return await callBedrock(prompt, model);
//   }

//   throw new Error("Unknown provider");
// }

import { callOpenRouter } from "./openrouter";
import { callOpenAI } from "./providers/openai";
import { callBedrock } from "./providers/bedrock";
import { callNvidia } from "./providers/nvidia";

function withTimeout(promise: Promise<any>, ms: number) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout")), ms)
    ),
  ]);
}


export async function callModel(
  provider: string,
  modelId: string,
  prompt: string
) {
  if (provider === "openrouter") {
    return callOpenRouter(modelId, prompt);
  }

  if (provider === "openai") {
    return callOpenAI(modelId, prompt);
  }

  if (provider === "bedrock") {
    return callBedrock(modelId, prompt);
  }

  if (provider === "nvidia") {
  return callNvidia(modelId, prompt);
}

  throw new Error("Unknown provider");
}