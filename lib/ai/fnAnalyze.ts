"use server";

import type { ChartData } from "@/lib/types/chartData";

import { Timer } from "../common/Timer";

import { fnChartDataToString } from "@/lib/to/string/fnChartDataToString";
import { fnOpenRouter } from "@/lib/ai/fnOpenRouter";
import { fnInputToString } from "../to/string/fnInputToString";
import { fnSleep } from "../fnSleep";
import fnGemini from "./fnGemini";

export const fnAnalyse = async (data: ChartData): Promise<string> => {
  const cdStr = fnChartDataToString(data);
  const results: string[] = [];
  let tempResult: string | undefined;
  const timer = new Timer();

  console.log("Key: ${process.env.GEMINI_API_KEY}");
  timer.start();
  console.log(timer.startString());
  for (const key in cdStr) {
    results.push(key);
    if (cdStr.hasOwnProperty(key)) {
      const cdValue = cdStr[key as keyof typeof cdStr];

      /*for (const line of cdValue) {
        tempResult = await fnOpenRouter({
          type: key,
          message: {
            role: "user",
            content: `請分析${key}資料:\n${line}`,
          },
        });

        timer.tick();
        console.log(`${key} - ${line}: ${timer.resultString(timer.prevResult())}`);

        results.push(line);
        if (tempResult.includes("Error") || tempResult.includes("error")) {
          return `Error ${tempResult}. Please try again later.`;
        } else {
          results.push(tempResult);
        }

        await fnSleep(5000);
      }*/
      tempResult = await fnGemini({
        type: key,
        message: `請分析${key}資料:\n${cdValue.join("\n")}`,
        showResponse: process.env.AI_CONSOLE_RESULT === "1",
      });
      timer.tick();
      console.log(`${key}: ${timer.resultString(timer.prevResult())}`);

      //results.push(line);
      if (!tempResult || tempResult.includes("Error") || tempResult.includes("error")) {
        return `Error ${tempResult}. Please try again later.`;
      } else {
        results.push(tempResult);
      }

      await fnSleep(5000);
    }
  }

  tempResult = await fnOpenRouter({
    type: "總結",
    message: {
      role: "user",
      content: "請分析:" + results.join("\n\n"),
    },
    showResponse: process.env.AI_CONSOLE_RESULT === "1",
  });

  timer.stop();
  console.log(timer.resultsString(timer.results()));
  if (tempResult.includes("Error") || tempResult.includes("error")) {
    return `Error ${tempResult}. Please try again later.`;
  } else {
    results.push(tempResult);
  }

  results.unshift(
    fnInputToString(data.input),
    Object.entries(cdStr)
      .map(([key, value]) => `${key}:\n${value.join("\n")}`)
      .join("\n\n"),
  );

  return results.join("\n\n");
};
