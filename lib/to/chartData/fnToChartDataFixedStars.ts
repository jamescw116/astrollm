import type {
  ChartDataApiResponseFixedStars,
  ChartDataFixedStars,
  ChartDataFixedStar,
} from "../../types/chartData";

import { fnDegToZodiacDMS } from "../../common/fnDegToZodiacDMS";

export const fnToChartDataFixedStars = (
  fixedStars: ChartDataApiResponseFixedStars,
): ChartDataFixedStars =>
  Object.entries(fixedStars)
    .map(([fixedStarName, degree]) => ({
      [fixedStarName]: {
        degree,
        zodiacDMS: fnDegToZodiacDMS(degree),
      } as ChartDataFixedStar,
    }))
    .reduce((acc, cur) => ({ ...acc, ...cur }), {}) as ChartDataFixedStars;
