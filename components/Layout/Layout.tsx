import { useState } from "react";

import type { ChartData, ChartDataInput } from "@/lib/types/chartData";

import { fnLngLagByIdx } from "@/lib/types/LngLat";

import LayoutInput from "./LayoutInput";
import AstroChart from "../AstroChart/AstroChart";

const fnDefaultChartDataInput = (date: Date = new Date()): ChartDataInput =>
  ({
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    tz: date.getTimezoneOffset() / -60,
    ...fnLngLagByIdx(0),
  }) as ChartDataInput;

const Layout = () => {
  const [input, setInput] = useState<ChartDataInput>(fnDefaultChartDataInput());
  const [data, setData] = useState<ChartData | undefined>(undefined);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* 左方區域：設定為 resize 水平方向，預設 20% */}
      <aside className="w-1/5 min-w-37.5 max-w-[50%] resize-x overflow-hidden border-r border-gray-300 p-4">
        {/* 在此放入你的輸入元件 */}
        <LayoutInput
          input={input}
          setInput={setInput}
          data={data}
          setData={setData}
        />
      </aside>

      {/* 右方區域：佔據剩餘空間 */}
      <main className="flex-1 flex flex-col p-6 overflow-hidden">
        <h2 className="font-bold mb-4">結果區域</h2>
        <div className="flex flex-col min-h-0 flex-1 border border-gray-600 rounded-lg p-6">
          {/* 在此放入你的結果元件 */}
          {data ? (
            <AstroChart data={data} />
          ) : (
            <div className="h-full overflow-y-auto">請提供星盤資料</div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Layout;
