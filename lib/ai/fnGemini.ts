import { GoogleGenAI } from "@google/genai";

import { fnTypeSystemPrompt } from "./fnTypeSystemPrompt";
import { fnReadFile } from "../fnReadFile";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const fnGemini = async (params: {
  type: string;
  message: string;
  showResponse?: boolean;
}): Promise<string | undefined> => {
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: params.message,
    config: {
      systemInstruction: fnReadFile(fnTypeSystemPrompt(params.type))
    }
  });

  if (params.showResponse) {
    console.log(response.text);
  }

  return response.text;
};

export default fnGemini;
