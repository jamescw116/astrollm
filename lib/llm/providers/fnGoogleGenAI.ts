import { GoogleGenAI, ThinkingLevel } from "@google/genai";

import type { LLMProvider, LLMProviderParams } from "../fnAnalyze";

import { fnTypeSystemPrompt } from "../fnTypeSystemPrompt";
import { fnReadFile } from "../../fnReadFile";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEN_AI_API_KEY });

const fnGoogleGenAI: LLMProvider = async ({
  type,
  message,
  showResponse,
}: LLMProviderParams): Promise<string | undefined> => {
  const response = await ai.models.generateContent({
    model: process.env.GOOGLE_GEN_AI_MODEL!,
    contents: message,
    config: {
      /*thinkingConfig: {
        thinkingLevel: ThinkingLevel.HIGH,
      },*/
      systemInstruction: fnReadFile(fnTypeSystemPrompt(type)),
    },
  });

  if (showResponse) {
    console.log(response.text);
  }

  return response.text;
};

export default fnGoogleGenAI;
