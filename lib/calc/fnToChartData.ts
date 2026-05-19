import type {
  ChartData,
  ChartDataApiResponse,
  ChartDataAsteroids,
  ChartDataAstroPoints,
  ChartDataFixedStars,
  ChartDataHouse,
  ChartDataPlanets,
} from "../types/chartData";

import { fnCalcChartData } from "./fnCalcChartData";
import { fnToChartDataAsteroids } from "./fnToChartDataAsteroids";
import { fnToChartDataAstroPoints } from "./fnToChartDataAstroPoints";
import { fnToChartDataFixedStars } from "./fnToChartDataFixedStars";
import { fnToChartDataHouses } from "./fnToChartDataHouses";
import { fnToChartDataPlanets } from "./fnToChartDataPlanets";

export const fnToChartData = (apiResp: ChartDataApiResponse): ChartData => {
  const planets: ChartDataPlanets = fnToChartDataPlanets(apiResp.planets);

  const asteroids: ChartDataAsteroids = fnToChartDataAsteroids(apiResp.planets);

  const astroPoints: ChartDataAstroPoints = fnToChartDataAstroPoints(
    apiResp.planets,
  );

  const houses: ChartDataHouse[] = fnToChartDataHouses(apiResp.houses);

  const fixedStars: ChartDataFixedStars = fnToChartDataFixedStars(
    apiResp.fixedStars,
  );

  const data: ChartData = {
    planets,
    asteroids,
    astroPoints,
    houses,
    fixedStars,
    aspects: [],
    mutualReceptions: [],
    powers: [],
  } satisfies ChartData;

  fnCalcChartData(data);

  return data;
};
