import { NextRequest, NextResponse } from "next/server";

import { ChartData } from "@/lib/types/chartData";

export async function POST(req: NextRequest) {
  // 處理你嘅 Sweph 數據同叫 AI API
  const data: ChartData = await req.json();

  return NextResponse.json({
    message: "Received ChartData successfully",
    receivedData: data,
  });
}
