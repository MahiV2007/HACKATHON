import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function callBedrock(prompt: string, modelId: string) {
  const body = JSON.stringify({
    prompt: `\n\nHuman: ${prompt}\n\nAssistant:`,
    max_tokens_to_sample: 300,
  });

  const command = new InvokeModelCommand({
    modelId,
    contentType: "application/json",
    body,
  });

  const response = await client.send(command);

  const decoded = new TextDecoder().decode(response.body);
  const parsed = JSON.parse(decoded);

  return parsed.completion;
}