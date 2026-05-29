import { HTMLAttributes, JSX, useState } from "react";

import type { ChartData } from "@/lib/types/chartData";

import { fnAnalyse } from "@/lib/llm/fnAnalyze";

import Button from "../Input/Inputs/Button";

interface AIProps {
  chartData: ChartData;
  aiResp?: string | undefined;
  setAiResp: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const AILines = ({
  lines,
  className,
}: {
  lines: (string | JSX.Element | undefined)[];
  className?: HTMLAttributes<HTMLElement>["className"];
}) =>
  lines.map((line, idx) => (
    <div key={idx} className={className}>
      {line ?? <>&nbsp;</>}
    </div>
  ));

const AI = ({ chartData, aiResp, setAiResp }: AIProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const fnSubmit = async () => {
    setLoading(true);
    setAiResp(undefined);
    const resp = await fnAnalyse(chartData);
    setAiResp(resp);
    setLoading(false);
  };

  const AIPre = [
    "需時約 5 - 10 分鐘，請耐心等待",
    "AI 分析仍有很大改進空間，一切結果僅供參考",
    "免費額度有限，請小心使用",
    undefined,
    loading ? (
      "分析中..."
    ) : (
      <Button onClick={() => fnSubmit()}>進行分析</Button>
    ),
  ];

  /*return !aiResp ? (
    <div className="flex flex-col w-full h-full justify-center items-center gap-4">
      <div className="flex justify-center items-center">
        需時約 5 - 10 分鐘，請耐心等待
      </div>
      <div className="flex justify-center items-center">
        AI 分析仍有很大改進空間，一切結果僅供參考
      </div>
      <div className="flex justify-center items-center">
        免費額度有限，請小心使用
      </div>
      <div className="flex justify-center items-center">&nbsp;</div>
      {loading ? (
        <div className="flex justify-center items-center">分析中...</div>
      ) : (
        <Button onClick={() => fnSubmit()}>進行分析</Button>
      )}
    </div>
  ) : (
    <div className="flex flex-col w-full h-full justify-center items-center gap-4">
      {aiResp.split("\n").map((line, index) => (
        <div key={index}>{line}</div>
      ))}
      <Button onClick={() => fnSubmit()}>重新分析</Button>
    </div>
  );*/
  return (
    <div
      className={`flex flex-col gap-4 w-full h-full overflow-y-auto${!aiResp ? " justify-center items-center" : ""}`}
    >
      <AILines
        lines={!aiResp ? AIPre : aiResp.split("\n")}
        className={!aiResp ? "flex justify-center items-center" : undefined}
      />
    </div>
  );
};

export default AI;
