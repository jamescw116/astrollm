import type { ColorModeName, XY } from "@/lib/types/common";
import type { ChartDataHouse } from "@/lib/types/chartData";

import { ZodiacConfigsArray } from "@/lib/types/zodiac";

import { fnDegToXY } from "@/lib/chart/fnDegToXY";
import { ChartConfig } from "@/lib/types/chartSetting";

interface AstroChartZodiacProps {
  idx: number;
  deg: number;
  cXY: XY;
  len: number;
  colorMode: ColorModeName;
}

const AstroChartZodiac = ({
  idx,
  deg,
  cXY,
  len,
  colorMode,
}: AstroChartZodiacProps) => {
  const symbolPos = fnDegToXY(
    cXY,
    deg + 15,
    len + ChartConfig.ticks.zodiac.symbol,
  );

  const zodiac = ZodiacConfigsArray[idx % 12];

  return (
    <g>
      <text
        key={"zodiac-label-" + idx}
        x={symbolPos.x}
        y={symbolPos.y}
        fontSize={ChartConfig.fontSize.zodiac}
        textAnchor="middle"
        alignmentBaseline="middle"
        fill={ChartConfig.color.element[zodiac.element]}
        style={{ userSelect: "none" }}
      >
        {zodiac.symbol}
      </text>

      {new Array(30).fill(0).map((_, i) => {
        const tickDeg = (deg + i) % 360;
        const tickLen =
          i === 0
            ? ChartConfig.ticks.zodiac.deg30
            : i % 10 === 0
              ? ChartConfig.ticks.zodiac.deg10
              : i % 5 === 0
                ? ChartConfig.ticks.zodiac.deg5
                : ChartConfig.ticks.zodiac.deg1;
        const fm = fnDegToXY(cXY, tickDeg, len);
        const to = fnDegToXY(cXY, tickDeg, len + tickLen);

        return (
          <line
            key={"zodiac-tick-" + idx + "-" + i}
            x1={fm.x}
            y1={fm.y}
            x2={to.x}
            y2={to.y}
            stroke={
              ChartConfig.color.line.sub[
                colorMode as keyof typeof ChartConfig.color.line.sub
              ]
            }
            strokeWidth={1}
          />
        );
      })}
    </g>
  );
};

interface AstroChartZodiacsProps {
  houses: ChartDataHouse[];
  colorMode: ColorModeName;
}

const AstroChartZodiacs = ({
  houses,
  colorMode,
}: AstroChartZodiacsProps) =>
  houses.map((_, idx: number) => (
    <AstroChartZodiac
      key={idx}
      idx={idx}
      deg={(30 * idx - houses[0].degree + 360) % 360}
      cXY={ChartConfig.centerXY}
      len={ChartConfig.radius + ChartConfig.ticks.spacing}
      colorMode={colorMode}
    />
  ));

  export default AstroChartZodiacs;