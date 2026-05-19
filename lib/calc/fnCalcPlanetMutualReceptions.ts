import type {
  ChartDataPlanetMutualReception,
  ChartDataPlanets,
} from "../types/chartData";
import type { PlanetName } from "../types/planet";

import { fnCalcPlanetFortuneType } from "./fnCalcPlanetFortuneType";

export const fnCalcPlanetMutualReceptions = (
  planets: ChartDataPlanets,
  planetName1: PlanetName,
  planetName2: PlanetName,
  mutualReceptions: ChartDataPlanetMutualReception[],
): void => {
  const planetFortune1 = fnCalcPlanetFortuneType(
    planetName1,
    planets[planetName2].zodiacDMS.zodiac,
  );
  const planetFortune2 = fnCalcPlanetFortuneType(
    planetName2,
    planets[planetName1].zodiacDMS.zodiac,
  );

  if (planetFortune1 === 0 || planetFortune2 === 0) {
    return;
  }

  if (planetFortune1 === planetFortune2) {
    mutualReceptions.push({
      planets: [planetName1, planetName2],
      fortune: planetFortune1,
    });

    planets[planetName1].mutualReceptions.push(mutualReceptions.length - 1);
    planets[planetName2].mutualReceptions.push(mutualReceptions.length - 1);
  }
};
