import { useEffect, useState } from "react";

import type { ChartData, ChartDataInput } from "@/lib/types/chartData";

import { fnLngLagByIdx } from "@/lib/types/LngLat";

import Input from "../Input/Input";
import AstroChart from "../AstroChart/AstroChart";
import AI from "../AI/AI";
import BasicInfo from "../BasicInfo/BasicInfo";
import Button from "../Input/Inputs/Button";

export const LayoutMode = ["星圖", "基本資訊", "AI分析", "輸入"] as const;
export type LayoutMode = (typeof LayoutMode)[number];

const fnDefaultChartDataInput = (date: Date = new Date()): ChartDataInput =>
  ({
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    ...fnLngLagByIdx(0),
    hse: "P",
  }) as ChartDataInput;

const Layout = () => {
  const [input, setInput] = useState<ChartDataInput>(fnDefaultChartDataInput());
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ChartData | undefined>(undefined);
  const [mode, setMode] = useState<LayoutMode>(LayoutMode[0]);
  const [aiResp, setAiResp] = useState<string | undefined>(undefined);

  useEffect(() => {
    const handleResize = () => {
      setMode(window.innerWidth < 768 ? "輸入" : "星圖");
    };

    // 初始化執行一次
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`
      flex flex-col h-dvh w-screen overflow-hidden
      md:flex-row
      `}
    >
      {/* 左方區域：設定為 resize 水平方向，預設 20% */}
      {/* 在此放入你的輸入元件 */}
      <Input
        input={input}
        setInput={setInput}
        setData={setData}
        setLoading={setLoading}
        setMode={setMode}
        className="hidden md:flex"
      />

      {/* 右方區域：佔據剩餘空間 */}
      <main className="flex-1 flex flex-col p-3 md:p-6 overflow-hidden">
        <div className="flex flex-row gap-2 mb-4">
          <Button onClick={() => setMode("星圖")}>星盤</Button>
          <Button onClick={() => setMode("基本資訊")}>資訊</Button>
          <Button onClick={() => setMode("AI分析")}>AI分析</Button>
          <Button className="md:hidden" onClick={() => setMode("輸入")}>
            輸入
          </Button>
        </div>
        <div
          className={`
            flex flex-col w-full min-h-0 flex-1
            justify-center items-center
            border border-gray-600 rounded-lg p-2 md:p-6
        `}
        >
          {/* 在此放入你的結果元件 */}
          {data && mode === "星圖" && <AstroChart data={data} />}
          {data && mode === "基本資訊" && <BasicInfo chartData={data} />}
          {data && mode === "AI分析" && <AI chartData={data} aiResp={aiResp} setAiResp={setAiResp} />}
          {mode === "輸入" && (
            <Input
              input={input}
              setInput={setInput}
              setData={setData}
              setLoading={setLoading}
              setMode={setMode}
              className="flex md:hidden"
            />
          )}
          {!data && loading && mode !== "輸入" && (
            <div className="flex">載入中...</div>
          )}
          {!data && !loading && mode !== "輸入" && (
            <div className="flex">請提供星盤資料</div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Layout;
