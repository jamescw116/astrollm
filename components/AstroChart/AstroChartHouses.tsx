import type { ColorModeName, Line, XY } from "@/lib/types/common";
import type { ChartDataHouse } from "@/lib/types/chartData";

import { ChartConfig } from "@/lib/types/chartSetting";

import { fnHouses } from "@/lib/chart/fnHouses";

interface AstroChartHouseProps {
  line: Line;
  hseMarkXY: XY;
  idx: number;
  colorMode: ColorModeName;
}

const fnGetElementByHouseIdx = (idx: number) =>
  idx % 4 === 0
    ? "fire"
    : idx % 4 === 1
      ? "earth"
      : idx % 4 === 2
        ? "air"
        : "water";

const AstroChartHouse = ({
  line,
  hseMarkXY,
  idx,
  colorMode,
}: AstroChartHouseProps) => (
  <g>
    <line
      key={"house-" + idx}
      x1={line.fm.x}
      y1={line.fm.y}
      x2={line.to.x}
      y2={line.to.y}
      stroke={
        ChartConfig.color.line.sub[
          colorMode as keyof typeof ChartConfig.color.line.sub
        ]
      }
      strokeDasharray="3 2"
    />
    <text
      key={"zodiac-label-" + idx}
      x={hseMarkXY.x}
      y={hseMarkXY.y}
      fontSize={ChartConfig.fontSize.zodiac}
      textAnchor="middle"
      alignmentBaseline="middle"
      fill={
        ChartConfig.color.element[
          fnGetElementByHouseIdx(idx) as keyof typeof ChartConfig.color.element
        ]
      }
      style={{ userSelect: "none" }}
    >
      {(idx + 1).toString()}
    </text>
  </g>
);

interface AstroChartHousesProps {
  houses: ChartDataHouse[];
  colorMode: ColorModeName;
}

const AstroChartHouses = ({ houses, colorMode }: AstroChartHousesProps) => (
  <>
    {fnHouses(houses, ChartConfig.centerXY).map(([line, hseMarkXY], idx) => (
      <AstroChartHouse
        key={idx}
        idx={idx}
        line={line}
        hseMarkXY={hseMarkXY}
        colorMode={colorMode}
      />
    ))}
    <circle
      cx={ChartConfig.centerXY.x}
      cy={ChartConfig.centerXY.y}
      r={ChartConfig.radiusAspect}
      fill="none"
      stroke={
        ChartConfig.color.line.main[
          colorMode as keyof typeof ChartConfig.color.line.main
        ]
      }
      strokeWidth={1.5}
    />
    <circle
      cx={ChartConfig.centerXY.x}
      cy={ChartConfig.centerXY.y}
      r={ChartConfig.radius}
      fill="none"
      stroke={
        ChartConfig.color.line.main[
          colorMode as keyof typeof ChartConfig.color.line.main
        ]
      }
      strokeWidth={1.5}
    />
  </>
);

export default AstroChartHouses;
