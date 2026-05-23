import type { ChartDataHouse } from "../types/chartData";
import type { Line, XY } from "../types/common";

import { fnDegToXY } from "./fnDegToXY";

export const fnHouses = (
  houses: ChartDataHouse[],
  cXY: XY,
  lenStart: number,
  lenEnd: number,
): Line[] =>
  houses.map((house) => ({
    fm: fnDegToXY(cXY, (house.degree - houses[0].degree + 360) % 360, lenStart),
    to: fnDegToXY(cXY, (house.degree - houses[0].degree + 360) % 360, lenEnd),
  }));
