import type { ChartDataHouse } from "../types/chartData";
import type { Line, XY } from "../types/common";

import { fnDegToXY } from "./fnDegToXY";
import { fnCalcDegMean } from "../common/fnCalcDegMean";
import { ChartConfig } from "../types/chartSetting";

const fnAlignHouseDegree = (degree: number, ascDeg: number) =>
  (degree - ascDeg + 360) % 360;

export const fnHouses = (houses: ChartDataHouse[], cXY: XY): [Line, XY][] =>
  houses.map((house, idx) => [
    {
      fm: fnDegToXY(
        cXY,
        fnAlignHouseDegree(house.degree, houses[0].degree),
        ChartConfig.radiusAspect,
      ),
      to: fnDegToXY(
        cXY,
        fnAlignHouseDegree(house.degree, houses[0].degree),
        ChartConfig.radius,
      ),
    },
    fnDegToXY(
      cXY,
      fnCalcDegMean([
        fnAlignHouseDegree(house.degree, houses[0].degree),
        fnAlignHouseDegree(
          houses[(idx + 1) % houses.length].degree,
          houses[0].degree,
        ),
      ]),
      ChartConfig.radiusAspect + ChartConfig.ticks.house,
    ),
  ]);
