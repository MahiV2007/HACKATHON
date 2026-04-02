export async function callFireworks(model: string, prompt: string) {
  try {
    const res = await fetch(
      "https://api.fireworks.ai/inference/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.FIREWORKS_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "accounts/fireworks/models/llama-v3p1-8b-instruct", // 🔥 hardcode for test
          messages: [{ role: "user", content: prompt }],
        }),
      }
    );

    const text = await res.text();
    console.log("FW RAW:", text);

    const data = JSON.parse(text);

    return data?.choices?.[0]?.message?.content || "No response";
  } catch (err) {
    console.log("FW FAILED:", err);
    return "Timeout";
  }
}