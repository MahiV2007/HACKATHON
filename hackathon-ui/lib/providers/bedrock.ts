import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function callBedrock(prompt: string, modelId: string) {
  try {
    const body = JSON.stringify({
      anthropic_version: "bedrock-2023-05-31",
      max_tokens: 300,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const command = new InvokeModelCommand({
      modelId, // 🔥 dynamic now
      contentType: "application/json",
      body,
    });

    const response = await client.send(command);

    const decoded = new TextDecoder().decode(response.body);
    const parsed = JSON.parse(decoded);

    return parsed.content[0].text;
  } catch (error) {
    console.error("Bedrock Error:", error);
    return "Error calling Bedrock";
  }
}