import type {
  ChartData,
  ChartDataApiResponse,
  ChartDataAsteroids,
  ChartDataAstroPoints,
  ChartDataFixedStars,
  ChartDataHouse,
  ChartDataInput,
  ChartDataPlanets,
} from "../../types/chartData";

import { fnCalcChartData } from "../../calc/fnCalcChartData";
import { fnToChartDataAsteroids } from "./fnToChartDataAsteroids";
import { fnToChartDataAstroPoints } from "./fnToChartDataAstroPoints";
import { fnToChartDataFixedStars } from "./fnToChartDataFixedStars";
import { fnToChartDataHouses } from "./fnToChartDataHouses";
import { fnToChartDataPlanets } from "./fnToChartDataPlanets";

export const fnToChartData = (input: ChartDataInput, apiResp: ChartDataApiResponse): ChartData => {
  const planets: ChartDataPlanets = fnToChartDataPlanets(apiResp.p);

  const asteroids: ChartDataAsteroids = fnToChartDataAsteroids(apiResp.p);

  const astroPoints: ChartDataAstroPoints = fnToChartDataAstroPoints(
    apiResp.p,
  );

  const houses: ChartDataHouse[] = fnToChartDataHouses(apiResp.h);

  const fixedStars: ChartDataFixedStars = fnToChartDataFixedStars(
    apiResp.fs,
  );

  const data: ChartData = {
    input,
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
