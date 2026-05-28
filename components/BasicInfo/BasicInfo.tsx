"use client";

import type { ChartData } from "@/lib/types/chartData";

import { fnChartDataToStrings } from "@/lib/to/string/fnChartDataToString";

interface BasicInfoProps {
  chartData: ChartData;
}

const BasicInfo = ({ chartData }: BasicInfoProps) => {
  return (
    <div className="flex flex-col gap-4 w-full h-full overflow-y-auto">
      {Object.entries(fnChartDataToStrings(chartData)).map(([key, value]) => [
        <div key={key} className="font-bold">
          {key}:
        </div>,
        ...value.map((v) => <div key={v}>{v}</div>),
        <div key={`${key}-spacer`}>&nbsp;</div>,
      ])}
    </div>
  );
};

export default BasicInfo;
