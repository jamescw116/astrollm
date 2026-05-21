import type {
  ChartDataApiResponsePlanet,
  ChartDataApiResponsePlanets,
  ChartDataAsteroid,
  ChartDataAsteroids,
} from "../../types/chartData";
import type { AsteroidName } from "../../types/planet";

import { AsteroidList } from "../../types/planet";

import { fnDegToZodiacDMS } from "../../common/fnDegToZodiacDMS";

const fnToChartDataAsteroid = (
  apiRespAsteroid: ChartDataApiResponsePlanet,
): ChartDataAsteroid => {
  const zodiacDMS = fnDegToZodiacDMS(apiRespAsteroid.d, apiRespAsteroid.m);
  return {
    degree: apiRespAsteroid.d,
    zodiacDMS,
    aspects: [],
    is: {
      VoC: false,
      cazimi: false,
      combustion: false,
      underSunbeams: false,
    },
  } satisfies ChartDataAsteroid;
};

export const fnToChartDataAsteroids = (
  asteroidData: ChartDataApiResponsePlanets,
): ChartDataAsteroids =>
  Object.entries(asteroidData)
    .filter(([asteroidName]) =>
      AsteroidList.includes(asteroidName as AsteroidName),
    )
    .map(([asteroidName, asteroidData]) => ({
      [asteroidName as AsteroidName]: fnToChartDataAsteroid(asteroidData),
    }))
    .reduce((acc, cur) => ({ ...acc, ...cur }), {}) as ChartDataAsteroids;
