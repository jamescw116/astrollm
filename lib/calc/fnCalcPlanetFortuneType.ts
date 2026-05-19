import type { ChartDataPlanetFortuneType } from "../types/chartData";
import type { PlanetName } from "../types/planet";
import type { ZodiacName } from "../types/zodiac";

import { PlanetConfigs } from "../types/planet";

export const fnCalcPlanetFortuneType = (
  planet: PlanetName,
  zodiac: ZodiacName,
): ChartDataPlanetFortuneType =>
  (PlanetConfigs[planet].domicile?.includes(zodiac)
    ? 1
    : PlanetConfigs[planet].exaltation?.includes(zodiac)
      ? 1
      : PlanetConfigs[planet].detriment?.includes(zodiac)
        ? -1
        : PlanetConfigs[planet].fall?.includes(zodiac)
          ? -1
          : 0) satisfies ChartDataPlanetFortuneType;
