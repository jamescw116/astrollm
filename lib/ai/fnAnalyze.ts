"use server";

import type { ChartData } from "@/lib/types/chartData";

import { fnChartDataToString } from "@/lib/to/string/fnChartDataToString";
import { fnAIResponse } from "@/lib/ai/fnAIResponse";

export const fnAnalyse = async (data: ChartData): Promise<object> => {
  // 處理你嘅 Sweph 數據同叫 AI API
  const cdStr = fnChartDataToString(data);
  let response: object = {};

  for (const key in cdStr) {
    if (cdStr.hasOwnProperty(key)) {
      const cdValue = cdStr[key as keyof typeof cdStr];
      const aiResponse = await fnAIResponse(
        key,
        cdValue.join("\n"),
        Object.values(response).join("\n"),
      );
      response = { ...response, [key]: aiResponse };
    }
  }

  return response;
};
