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
  const [horizonAxis, mcIcAxis] = fnAxises(
    houses,
    ChartConfig.centerXY,
    ChartConfig.radius + ChartConfig.ticks.spacing + ChartConfig.ticks.axis,
  );

  return (
    <>
      <AstroChartAxisLine line={horizonAxis} colorMode={colorMode} />
      <AstroChartAxisLine line={mcIcAxis} colorMode={colorMode} />
    </>
  );
};

export default AstroChartAxisLines;