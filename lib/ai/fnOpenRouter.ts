"use server";

import { fnReadFile } from "../fnReadFile";

const fnTypeSystemPrompt = (type: string): string => {
  switch (type) {
    case "星體":
      return "lib\\ai\\systemPrompts\\01_planets.md";
    case "互融":
      return "lib\\ai\\systemPrompts\\02_mutualReceptions.md";
    case "相位":
      return "lib\\ai\\systemPrompts\\03_aspects.md";
    case "宮位":
      return "lib\\ai\\systemPrompts\\04_houses.md";
    case "總結":
      return "lib\\ai\\systemPrompts\\05_finalize.md";
  }
  return "";
};

const fnTypeModel = (type: string): string =>
  type === "總結"
    ? process.env.OPENROUTER_MODEL_L!
    : process.env.OPENROUTER_MODEL_S!;

export type OpenRouterMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export const fnOpenRouter = async (params: {
  type: string;
  message: OpenRouterMessage;
  showResponse?: boolean;
}): Promise<string> =>
  await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      //    'HTTP-Referer': '<YOUR_SITE_URL>', // Optional. Site URL for rankings on openrouter.ai.
      //    'X-OpenRouter-Title': '<YOUR_SITE_NAME>', // Optional. Site title for rankings on openrouter.ai.
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: fnTypeModel(params.type),
      messages: [
        {
          role: "system",
          content: fnReadFile(fnTypeSystemPrompt(params.type)),
        },
        params.message,
      ],
    }),
  })
    .then((resp: Response) => resp.json())
    .then((json) => {
      const result: string = json.choices?.[0].message.content;

      if (params.showResponse === true) {
        console.log(
          `AI response ${params.type} - ${params.message.content}:`,
          JSON.stringify(json),
        );
      }

      return result ?? JSON.stringify(json);
    })
    .catch((error) => {
      console.log(JSON.stringify(error));
      return JSON.stringify(error);
    });
