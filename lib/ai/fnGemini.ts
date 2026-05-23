import { GoogleGenAI, ThinkingLevel } from "@google/genai";

import { fnTypeSystemPrompt } from "./fnTypeSystemPrompt";
import { fnReadFile } from "../fnReadFile";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const fnGemini = async (params: {
  type: string;
  message: string;
  showResponse?: boolean;
}): Promise<string | undefined> => {
  const response = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL || "gemma-4-31b-it",
    contents: params.message,
    config: {
      thinkingConfig: {
        thinkingLevel: ThinkingLevel.HIGH,
      },
      systemInstruction: fnReadFile(fnTypeSystemPrompt(params.type)),
    },
  });

  if (params.showResponse) {
    console.log(response.text);
  }

  return response.text;
};

export default fnGemini;
