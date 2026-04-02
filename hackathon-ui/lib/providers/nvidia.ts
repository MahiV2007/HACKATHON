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
          model: model,
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 512,
        }),
      }
    );

    const data = await res.json();

    console.log("NVIDIA RAW:", data);

    return data?.choices?.[0]?.message?.content || "No response";
  } catch (err) {
    console.error("NVIDIA ERROR:", err);
    return "No response";
  }
}