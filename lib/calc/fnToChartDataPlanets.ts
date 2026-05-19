import type {
  ChartDataApiResponsePlanet,
  ChartDataApiResponsePlanets,
  ChartDataPlanet,
  ChartDataPlanets,
} from "../types/chartData";
import type { PlanetName } from "../types/planet";

import { PlanetList } from "../types/planet";

import { fnDegToZodiacDMS } from "../common/fnDegToZodiacDMS";
import { fnCalcPlanetFortuneType } from "./fnCalcPlanetFortuneType";

const fnToChartDataPlanet = (
  planetName: PlanetName,
  apiRespPlanet: ChartDataApiResponsePlanet,
): ChartDataPlanet => {
  const zodiacDMS = fnDegToZodiacDMS(apiRespPlanet.d, apiRespPlanet.m);

  return {
    degree: apiRespPlanet.d,
    zodiacDMS,
    fortune: fnCalcPlanetFortuneType(planetName, zodiacDMS.zodiac),
    ruleHouse: undefined,
    aspects: [],
    powers: [],
    mutualReceptions: [],
    /* TODO: fourElements: {
    },*/
    is: {
      VoC: false,
      cazimi: false,
      combustion: false,
      underSunbeams: false,
    },
  } satisfies ChartDataPlanet;
};

export const fnToChartDataPlanets = (
  planets: ChartDataApiResponsePlanets,
): ChartDataPlanets =>
  Object.entries(planets)
    .filter(([planetName]) => PlanetList.includes(planetName as PlanetName))
    .map(([planetName, planetData]) => ({
      [planetName as PlanetName]: fnToChartDataPlanet(
        planetName as PlanetName,
        planetData,
      ),
    }))
    .reduce((acc, cur) => ({ ...acc, ...cur }), {}) as ChartDataPlanets;
