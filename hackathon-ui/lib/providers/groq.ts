export async function callGroq(model: string, prompt: string) {
  try {
    const res = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          messages: [{ role: "user", content: prompt }],
        }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.log("GROQ ERROR:", err);
      return "Error";
    }

    const data = await res.json();

    return data?.choices?.[0]?.message?.content || "No response";
  } catch (err) {
    console.log("GROQ FAILED:", err);
    return "Timeout";
  }
}