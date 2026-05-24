import { useState } from "react";

import type { ChartData, ChartDataInput } from "@/lib/types/chartData";

import { fnLngLagByIdx } from "@/lib/types/LngLat";

import LayoutInput from "./LayoutInput";
import AstroChart from "../AstroChart/AstroChart";
import AI from "../AI/AI";
import BasicInfo from "../BasicInfo/BasicInfo";

const LayoutMode = ["星圖", "基本資訊", "AI分析"] as const;
type LayoutMode = (typeof LayoutMode)[number];

const fnDefaultChartDataInput = (date: Date = new Date()): ChartDataInput =>
  ({
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    ...fnLngLagByIdx(0),
  }) as ChartDataInput;

const Layout = () => {
  const [input, setInput] = useState<ChartDataInput>(fnDefaultChartDataInput());
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ChartData | undefined>(undefined);
  const [mode, setMode] = useState<LayoutMode>(LayoutMode[0]);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* 左方區域：設定為 resize 水平方向，預設 20% */}
      <aside className="w-1/5 min-w-37.5 max-w-[50%] resize-x overflow-hidden border-r border-gray-300 p-4">
        {/* 在此放入你的輸入元件 */}
        <LayoutInput
          input={input}
          setInput={setInput}
          setData={setData}
          setLoading={setLoading}
        />
      </aside>

      {/* 右方區域：佔據剩餘空間 */}
      <main className="flex-1 flex flex-col p-6 overflow-hidden">
        <div className="flex flex-row gap-5">
          {LayoutMode.map((m) => (
            <h2
              key={m}
              className={"font-bold mb-4"}
              {...(m !== mode
                ? { onClick: () => setMode(m), style: { cursor: "pointer"} }
                : { style: { cursor: "default", color: "var(--color-blue-500)" } })}
            >
              {m}
            </h2>
          ))}
        </div>
        <div className="flex flex-col w-full min-h-0 flex-1 justify-center items-center border border-gray-600 rounded-lg p-6">
          {/* 在此放入你的結果元件 */}
          {data ? (
            mode === "星圖" ? (
              <AstroChart data={data} />
            ) : mode === "基本資訊" ? (
              <BasicInfo chartData={data} />
            ) : (
              <AI chartData={data} />
            )
          ) : loading ? (
            <div className="flex">載入中...</div>
          ) : (
            <div className="flex">請提供星盤資料</div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Layout;
