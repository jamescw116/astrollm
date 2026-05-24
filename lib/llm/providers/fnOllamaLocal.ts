import { Ollama } from "ollama";

import type { LLMProvider, LLMProviderParams } from "../fnAnalyze";

import { fnTypeSystemPrompt } from "../fnTypeSystemPrompt";
import { fnReadFile } from "../../fnReadFile";

const ollama = new Ollama();

const fnOllamaLocal: LLMProvider = async ({
  type,
  message,
  showResponse,
}: LLMProviderParams): Promise<string | undefined> => {
  const response = await ollama.chat({
    model: process.env.OLLAMA_MODEL || "gemma-4-31b-it",
    messages: [
      { role: "system", content: fnReadFile(fnTypeSystemPrompt(type)) },
      { role: "user", content: message },
    ],
  });

  if (showResponse) {
    console.log(response.message.content);
  }

  return response.message.content;
};

export default fnOllamaLocal;
