import type { ColorModeName, Line } from "@/lib/types/common";
import type { ChartDataHouse } from "@/lib/types/chartData";

import { ChartConfig } from "@/lib/types/chartSetting";

import { fnHouses } from "@/lib/chart/fnHouses";

interface AstroChartHouseProps {
  line: Line;
  idx: number;
  colorMode: ColorModeName;
}

const AstroChartHouse = ({ line, idx, colorMode }: AstroChartHouseProps) => (
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
);

interface AstroChartHousesProps {
  houses: ChartDataHouse[];
  colorMode: ColorModeName;
}

const AstroChartHouses = ({ houses, colorMode }: AstroChartHousesProps) =>
  fnHouses(houses, ChartConfig.centerXY, ChartConfig.radius).map(
    (line, idx) => (
      <AstroChartHouse key={idx} idx={idx} line={line} colorMode={colorMode} />
    ),
  );

export default AstroChartHouses;
