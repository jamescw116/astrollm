import { NextRequest, NextResponse } from "next/server";

import type { ChartData } from "@/lib/types/chartData";

import { fnChartDataToString } from "@/lib/to/string/fnChartDataToString";

export async function POST(req: NextRequest) {
  // 處理你嘅 Sweph 數據同叫 AI API
  const data: ChartData = await req.json();

  return NextResponse.json({
    message: "Received ChartData successfully",
    receivedData: fnChartDataToString(data),
  });
}
