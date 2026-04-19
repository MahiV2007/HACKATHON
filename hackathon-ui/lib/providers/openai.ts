// import OpenAI from "openai";
// import { ModelResponse } from "@/types";

// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY!,
// });

// export async function callOpenAI(
//   prompt: string,
//   model: string
// ): Promise<ModelResponse> {
//   try {
//     const response = await client.chat.completions.create({
//       model: "gpt-4o-mini", // ✅ SAFE MODEL
//       messages: [{ role: "user", content: prompt }],
//     });

//     const tokens = response.usage?.total_tokens || 0;
//     const cost = (tokens / 1000) * 0.002;

//     return {
//       text: response.choices[0]?.message?.content || "No response",
//       cost,
//     };
//   } catch (err: any) {
//     console.error("🔥 OPENAI ERROR:", err);
//     throw err;
//   }
// }


import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function callOpenAI(model: string, prompt: string) {
  const res = await client.chat.completions.create({
    model,
    messages: [{ role: "user", content: prompt }],
  });

  return res.choices[0].message.content || "";
}