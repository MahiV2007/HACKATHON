export async function callGoogle(model: string, prompt: string) {
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GOOGLE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.log("GOOGLE ERROR:", err);
      return "Error";
    }

    const data = await res.json();

    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response"
    );
  } catch (err) {
    console.log("GOOGLE FAILED:", err);
    return "Timeout";
  }
}