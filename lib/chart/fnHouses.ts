import type { ChartDataHouse } from "../types/chartData";
import type { Line, XY } from "../types/common";

import { fnDegToXY } from "./fnDegToXY";

export const fnHouses = (
  houses: ChartDataHouse[],
  cXY: XY,
  len: number,
): Line[] =>
  houses.map((house) => ({
    fm: cXY,
    to: fnDegToXY(cXY, (house.degree - houses[0].degree + 360) % 360, len),
  }));
