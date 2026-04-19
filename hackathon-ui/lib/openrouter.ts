// import { ModelResponse } from "@/types";

// export async function callOpenRouter(
//   prompt: string,
//   model: string
// ): Promise<ModelResponse> {
//   const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       model,
//       messages: [{ role: "user", content: prompt }],
//     }),
//   });

//   const data = await res.json();

//   return {
//     text: data.choices?.[0]?.message?.content || "No response",
//     cost: data.usage?.cost || 0,
//   };
// }

export async function callOpenRouter(
  model: string,
  prompt: string
): Promise<string> {
  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 8000); // 8 sec timeout

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: prompt }],
      }),
      signal: controller.signal, // 🔥 IMPORTANT
    });

    clearTimeout(timeout);

    const data = await res.json();
    console.log("OPENROUTER RAW:", data);
    if (data.error) {
    console.error("OpenRouter error:", data.error);
    return "No response";
}

    return data?.choices?.[0]?.message?.content || "No response";
    
  } catch (err: any) {
    if (err.name === "AbortError") {
      console.error("⏱ OpenRouter timeout");
      return "Timeout";
    }

    console.error("OpenRouter error:", err);
    return "No response";
  }
}