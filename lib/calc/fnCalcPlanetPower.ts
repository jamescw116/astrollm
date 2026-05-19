import type {
  ChartDataAspect,
  ChartDataPlanets,
  ChartDataPower,
} from "../types/chartData";
import type { PlanetName } from "../types/planet";

import { PlanetConfigs } from "../types/planet";

export const fnCalcPlanetPower = (
  planets: ChartDataPlanets,
  planetName: PlanetName,
  aspects: ChartDataAspect[],
  powers: ChartDataPower[],
): void => {
  if (["main", "sub"].includes(PlanetConfigs[planetName].type)) {
    for (const aIdx of planets[planetName].aspects) {
      const aspect: ChartDataAspect = aspects[aIdx];

      if (aspect.active) {
        if (aspect.aspect === "conjunction") {
          if (
            ["axis", "house", "eqHouse", "zodiac"].includes(aspect.toType)
          ) {
            if (typeof aspect.toName === "number") {
              powers.push({
                planet: planetName,
                power: aspect.power,
                aspect: aIdx, // 宮位索引
              } satisfies ChartDataPower);

              planets[planetName].powers.push(powers.length - 1);
            }
          }
        }
      }
    }
  }
};
