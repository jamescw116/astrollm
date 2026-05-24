import { useState } from "react";

import type { ChartData } from "@/lib/types/chartData";

import { fnAnalyse } from "@/lib/llm/fnAnalyze";
import Button from "../Layout/Inputs/Button";

interface AIProps {
  chartData: ChartData;
}

const AI = ({ chartData }: AIProps) => {
  const [aiResp, setAiResp] = useState<string>(); //useRemoteData(fnAnalyse, chartData);
  const [loading, setLoading] = useState<boolean>(false);

  const fnSubmit = async () => {
    setLoading(true);
    setAiResp(undefined);
    const resp = await fnAnalyse(chartData);
    setAiResp(resp);
    setLoading(false);
  };

  return !aiResp ? (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center items-center">需時約 5 - 10 分鐘，請耐心等待</div>
      <div className="flex justify-center items-center">AI 分析仍有很大改進空間，一切結果僅供參考</div>
      <div className="flex justify-center items-center">免費額度有限，請小心使用</div>
      <div className="flex justify-center items-center">&nbsp;</div>
      {loading ? (
        <div className="flex justify-center items-center">分析中...</div>
      ) : (
        <Button onClick={() => fnSubmit()}>進行分析</Button>
      )}
    </div>
  ) : (
    <div className="overflow-y-auto">
      {aiResp.split("\n").map((line, index) => (
        <div key={index}>{line}</div>
      ))}
      <Button onClick={() => fnSubmit()}>重新分析</Button>
    </div>
  );
};

export default AI;
