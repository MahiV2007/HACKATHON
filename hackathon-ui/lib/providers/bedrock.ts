// import {
//   BedrockRuntimeClient,
//   InvokeModelCommand,
// } from "@aws-sdk/client-bedrock-runtime";

// import { ModelResponse } from "@/types";

// const client = new BedrockRuntimeClient({
//   region: process.env.AWS_REGION as string,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
//   },
// });

// export async function callBedrock(
//   prompt: string,
//   modelId: string
// ): Promise<ModelResponse> {
//   try {
//     const body = JSON.stringify({
//       prompt: `<|begin_of_text|><|user|>\n${prompt}\n<|assistant|>`,
//       max_gen_len: 200,
//       temperature: 0.7,
//     });

//     const command = new InvokeModelCommand({
//       modelId,
//       contentType: "application/json",
//       body,
//     });

//     const response = await client.send(command);

//     const decoded = new TextDecoder().decode(response.body);
//     const parsed = JSON.parse(decoded);

//     return {
//       text: parsed.generation || "No response",
//       cost: 0.001,
//     };
//   } catch (err) {
//     console.error("Bedrock Error:", err);
//     throw new Error("Bedrock failed");
//   }
// }

import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient({
  region: process.env.AWS_REGION,
});

export async function callBedrock(model: string, prompt: string) {
  const command = new InvokeModelCommand({
    modelId: model,
    body: JSON.stringify({
      prompt,
      max_tokens: 200,
    }),
  });

  const response = await client.send(command);

  const decoded = new TextDecoder().decode(response.body);

  return decoded;
}