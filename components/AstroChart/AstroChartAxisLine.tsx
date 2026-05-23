import type { ColorModeName, Line } from "@/lib/types/common";
import type { ChartDataHouse } from "@/lib/types/chartData";

import { ChartConfig } from "@/lib/types/chartSetting";
import { fnAxises } from "@/lib/chart/fnAxises";

interface AstroChartAxisLineProps {
  line: Line;
  colorMode: ColorModeName;
}

const AstroChartAxisLine = ({ line, colorMode }: AstroChartAxisLineProps) => (
  <line
    x1={line.fm.x}
    y1={line.fm.y}
    x2={line.to.x}
    y2={line.to.y}
    stroke={
      ChartConfig.color.line.main[
        colorMode as keyof typeof ChartConfig.color.line.main
      ]
    }
    strokeWidth={1}
  />
);

interface AstroChartAxisLinesProps {
  houses: ChartDataHouse[];
  colorMode: ColorModeName;
}

const AstroChartAxisLines = ({
  houses,
  colorMode,
}: AstroChartAxisLinesProps) => {
  const [ascAxis, icAxis, dscAxis, mcAxis] = fnAxises(
    houses,
    ChartConfig.centerXY,
    ChartConfig.radiusAspect,
    ChartConfig.radius + ChartConfig.ticks.spacing + ChartConfig.ticks.axis,
  );

  return (
    <>
      <AstroChartAxisLine line={ascAxis} colorMode={colorMode} />
      <AstroChartAxisLine line={icAxis} colorMode={colorMode} />
      <AstroChartAxisLine line={dscAxis} colorMode={colorMode} />
      <AstroChartAxisLine line={mcAxis} colorMode={colorMode} />
    </>
  );
};

export default AstroChartAxisLines;