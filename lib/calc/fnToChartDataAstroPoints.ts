import type {
  ChartDataApiResponsePlanet,
  ChartDataApiResponsePlanets,
  ChartDataAstroPoint,
  ChartDataAstroPoints,
} from "../types/chartData";

import type { AstroPointName } from "../types/planet";

import { AstroPointList } from "../types/planet";

import { fnDegToZodiacDMS } from "../common/fnDegToZodiacDMS";

const fnToChartDataAstroPoint = (
  apiRespAstroPoint: ChartDataApiResponsePlanet,
): ChartDataAstroPoint =>
  ({
    degree: apiRespAstroPoint.d,
    zodiacDMS: fnDegToZodiacDMS(apiRespAstroPoint.d, apiRespAstroPoint.m),
    aspects: [],
  }) satisfies ChartDataAstroPoint;

export const fnToChartDataAstroPoints = (
  apiRespPlanets: ChartDataApiResponsePlanets,
): ChartDataAstroPoints =>
  Object.entries(apiRespPlanets)
    .filter(([astroPointName]) =>
      AstroPointList.includes(astroPointName as AstroPointName),
    )
    .map(([astroPointName, astroPointData]) => ({
      [astroPointName as AstroPointName]:
        fnToChartDataAstroPoint(astroPointData),
    }))
    .reduce((acc, cur) => ({ ...acc, ...cur }), {}) as ChartDataAstroPoints;
