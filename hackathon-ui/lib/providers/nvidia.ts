export async function callNvidia(model: string, prompt: string) {
  try {
    const res = await fetch(
      "https://integrate.api.nvidia.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NVIDIA_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          messages: [{ role: "user", content: prompt }],
        }),
      }
    );

    const raw = await res.text();
    console.log("NVIDIA RAW:", raw);

    if (!raw.startsWith("{")) {
      return "No response";
    }

    const data = JSON.parse(raw);

    return data?.choices?.[0]?.message?.content || "No response";

  } catch (err) {
    console.error("NVIDIA failed:", err);
    return "No response";
  }
}