"use server";

import { OpenRouter } from "@openrouter/sdk";

import type { LLMProvider, LLMProviderParams } from "../fnAnalyze";

import { fnReadFile } from "../../fnReadFile";
import { fnTypeSystemPrompt } from "../fnTypeSystemPrompt";

const openRouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY!,
});

const fnOpenRouter: LLMProvider = async ({
  type,
  message,
  showResponse,
}: LLMProviderParams): Promise<string | undefined> => {
  const result = await openRouter.chat
    .send({
      chatRequest: {
        messages: [
          {
            role: "system",
            content: fnReadFile(fnTypeSystemPrompt(type)),
          },
          {
            role: "user",
            content: message,
          },
        ],
        model: process.env.OPENROUTER_MODEL,
        stream: false,
      },
    })
    .then((response) => response.choices?.[0].message.content);

  if (showResponse) {
    console.log(`AI response ${type} - ${message}:`, result);
  }

  return result;
};

export default fnOpenRouter;
