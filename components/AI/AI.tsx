import React from "react";

import { allExpanded, darkStyles, JsonView } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";

import type { ChartData } from "@/lib/types/chartData";

import useRemoteData from "@/lib/hooks/useRemoteData";

import { fnAnalyse } from "@/lib/ai/fnAnalyze";

interface AIProps {
  chartData: ChartData;
}

const AI = ({ chartData }: AIProps) => {
  const { data, loading } = useRemoteData(fnAnalyse, chartData);

  return (loading || !data
    ? <>分析中...</>
    : <React.Fragment>
      <JsonView
        data={data}
        shouldExpandNode={allExpanded}
        clickToExpandNode={true}
        compactTopLevel={true}
        style={darkStyles}
      />
    </React.Fragment>
  );
};

export default AI;
