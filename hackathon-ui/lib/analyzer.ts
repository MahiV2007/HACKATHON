// import { callOpenRouter } from "./openrouter";

// export async function analyzePrompt(query: string) {
//   const prompt = `
// You are an AI prompt classifier.

// Classify the user query into ONE of these categories:
// - coding
// - reasoning
// - general

// Rules:
// - coding → programming, code, debugging
// - reasoning → explanations, why/how questions
// - general → simple or casual queries

// ONLY return one word (coding/reasoning/general).

// User query:
// "${query}"
// `;

//   try {
    
//     const result = await callOpenRouter(prompt, "mistralai/mistral-7b-instruct");

//     const category = result.toLowerCase().trim(); // ✅ FIX
    

//     if (category.includes("coding")) return "coding";
//     if (category.includes("reasoning")) return "reasoning";

//     return "general";
//   } catch {
//     return "general"; // fallback safety
//   }
// }


// import { callOpenRouter } from "./openrouter";

// export async function analyzePrompt(query: string) {
//   const prompt = `
// You are an AI prompt classifier.

// Classify the user query into ONE of these categories:
// - coding
// - reasoning
// - general

// ONLY return one word.

// User query:
// "${query}"
// `;

//   try {
//     const result = await callOpenRouter(
//       "meta-llama/llama-3-8b-instruct",
//       prompt
//     );

//     const text =
//       typeof result === "string"
//         ? result
//         : (result as any)?.text || "";

//     const category = text.toLowerCase().trim();

//     if (category.includes("coding")) return "coding";
//     if (category.includes("reasoning")) return "reasoning";

//     return "general";
//   } catch {
//     return "general";
//   }
// }