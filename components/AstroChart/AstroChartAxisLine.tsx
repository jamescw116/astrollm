import type { Line } from "@/lib/types/common";
import type { ChartDataHouse } from "@/lib/types/chartData";

import { ChartConfig } from "@/lib/types/chartSetting";
import { fnAxises } from "@/lib/chart/fnAxises";

interface AstroChartAxisLineProps {
  line: Line;
}

const AstroChartAxisLine = ({ line }: AstroChartAxisLineProps) => {
  return (
    <line
      x1={line.fm.x}
      y1={line.fm.y}
      x2={line.to.x}
      y2={line.to.y}
      stroke="currentColor"
      strokeWidth={1}
    />
  );
};

interface AstroChartAxisLinesProps {
  houses: ChartDataHouse[];
}

const AstroChartAxisLines = ({ houses }: AstroChartAxisLinesProps) => {
  const [ascAxis, icAxis, dscAxis, mcAxis] = fnAxises(
    houses,
    ChartConfig.centerXY,
    ChartConfig.radiusAspect,
    ChartConfig.radius + ChartConfig.ticks.spacing + ChartConfig.ticks.axis,
  );

  return (
    <>
      <AstroChartAxisLine line={ascAxis} />
      <AstroChartAxisLine line={icAxis} />
      <AstroChartAxisLine line={dscAxis} />
      <AstroChartAxisLine line={mcAxis} />
    </>
  );
};

export default AstroChartAxisLines;
