import type { Line, XY } from "../types/common";
import type { ChartDataHouse } from "../types/chartData";

import { fnDegToXY } from "./fnDegToXY";

export const fnAxises = (
  houses: ChartDataHouse[],
  cXY: XY,
  len: number,
): [Line, Line] => {
  const deg1 = (houses[0].degree - houses[0].degree + 360) % 360;
  const deg7 = (houses[6].degree - houses[0].degree + 360) % 360;
  const deg4 = (houses[3].degree - houses[0].degree + 360) % 360;
  const deg10 = (houses[9].degree - houses[0].degree + 360) % 360;

  return [
    {
      fm: fnDegToXY(cXY, deg1, len),
      to: fnDegToXY(cXY, deg7, len),
    } satisfies Line,
    {
      fm: fnDegToXY(cXY, deg4, len),
      to: fnDegToXY(cXY, deg10, len),
    } satisfies Line,
  ];
};
