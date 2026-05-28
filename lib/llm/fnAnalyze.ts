"use server";

import type { ChartData, ChartDataString } from "@/lib/types/chartData";

import { Timer } from "../common/Timer";

import { fnChartDataToStrings } from "@/lib/to/string/fnChartDataToString";
import { fnInputToString } from "../to/string/fnInputToString";
import { fnSleep } from "../fnSleep";

import fnOpenRouter from "@/lib/llm/providers/fnOpenRouter";
import fnGoogleGenAI from "@/lib/llm/providers/fnGoogleGenAI";
import fnOllamaLocal from "@/lib/llm/providers/fnOllamaLocal";

export interface LLMProviderParams {
  type: string;
  message: string;
  showResponse?: boolean;
}

export type LLMProvider = (
  params: LLMProviderParams,
) => Promise<string | undefined>;

const AllowedSections: Array<keyof ChartDataString | "總結"> =
  process.env.LLM_ALLOW_SECTIONS?.split(",") as Array<keyof ChartDataString | "總結">;

export const fnAnalyse = async (data: ChartData): Promise<string> => {
  const cdStr = fnChartDataToStrings(data);
  const results: string[] = [];
  let tempResult: string | undefined;
  const timer = new Timer();
  let sleepMs: number = 0;

  let fnLLMProvider: LLMProvider;
  switch (process.env.LLM_PROVIDER) {
    case "GoogleGenAI":
      fnLLMProvider = fnGoogleGenAI;
      sleepMs = 5000;
      break;
    case "OpenRouter":
      fnLLMProvider = fnOpenRouter;
      sleepMs = 5000;
      break;
    // case "OllamaLocal":
    default:
      fnLLMProvider = fnOllamaLocal;
      sleepMs = 0;
      break;
  }

  const fnPushResult = async (
    result: string | undefined,
    title: string,
    stop: boolean = false,
  ): Promise<void> => {
    if (!result || result.includes("Error") || result.includes("error")) {
      throw new Error(`Error ${result}. Please try again later.`);
    }

    results.push(result);

    if (stop) {
      timer.stop();
      console.log(timer.resultsString(timer.results()));
    } else {
      timer.tick();
      console.log(`${title}: ${timer.resultString(timer.prevResult())}`);
      await fnSleep(sleepMs);
    }
  };

  timer.start();
  console.log(timer.startString());
  for (const key in cdStr) {
    if (!AllowedSections.includes(key as (typeof AllowedSections)[number]))
      continue;

    results.push(key);

    if (cdStr.hasOwnProperty(key)) {
      const cdValue = cdStr[key as keyof typeof cdStr];

      if (process.env.LLM_ANALYSE_LEVEL === "Object") {
        for (const line of cdValue) {
          tempResult = await fnLLMProvider({
            type: key,
            message: `請分析${key}資料:\n${line}`,
            showResponse: process.env.LLM_CONSOLE_RESULT === "1",
          });

          await fnPushResult(tempResult, `${key} - ${line}`);
        }
      } else {
        tempResult = await fnLLMProvider({
          type: key,
          message: `請分析${key}資料:\n${cdValue.join("\n")}`,
          showResponse: process.env.LLM_CONSOLE_RESULT === "1",
        });

        await fnPushResult(tempResult, key);
      }
    }
  }

  if (AllowedSections.includes("總結")) {
    tempResult = await fnLLMProvider({
      type: "總結",
      message: "請分析:" + results.join("\n\n"),
      showResponse: process.env.LLM_CONSOLE_RESULT === "1",
    });

    await fnPushResult(tempResult, "總結", true);
  }

  results.unshift(
    fnInputToString(data.input),
    Object.entries(cdStr)
      .map(([key, value]) => `${key}:\n${value.join("\n")}`)
      .join("\n\n"),
  );

  return results.join("\n\n");
};
