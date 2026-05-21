import type { ChartDataAspect, ChartDataPlanet } from "../types/chartData";
import type { PlanetName } from "../types/planet";
import type { ZodiacName } from "../types/zodiac";
import type { AspectName } from "../types/aspect";

import { AspectConfigs } from "../types/aspect";
import { PlanetConfigs } from "../types/planet";
import { ZodiacList } from "../types/zodiac";

import { fnCalcMin } from "../common/fnCalcMin";
import { fnSigmoidScale } from "../fnSigmoidScale";
import { fnCalcGap } from "../common/fnCalcGap";

const fnCalcPlanetVZodiac = (
  planet: ChartDataPlanet,
  planetName: PlanetName,
  zodiac: ZodiacName,
  degree: number,
  aspects: ChartDataAspect[],
) => {
  const degreeDiff = fnCalcGap(planet.degree, degree);

  // 相位
  Object.entries(AspectConfigs)
    .filter(([, aspectConfig]) => (aspectConfig.orb.zodiac ?? 0) !== 0)
    .forEach(([aspectName, aspectConfig]) => {
      const planetOrb = fnCalcMin(
        aspectConfig.orb[PlanetConfigs[planetName].type],
        PlanetConfigs[planetName].orb ?? 99,
      );
      const houseOrb = aspectConfig.orb.zodiac;

      const orb = fnCalcMin(planetOrb, houseOrb);

      if (orb === 0) {
        return;
      }

      const aspectDegreeDiff = fnCalcGap(aspectConfig.degree, degreeDiff);

      if (aspectDegreeDiff <= orb) {
        aspects.push({
          aspect: aspectName as AspectName,
          degreeDiff: aspectDegreeDiff,
          orb,
          fromType: PlanetConfigs[planetName].type,
          fromName: planetName,
          toType: "zodiac",
          toName: zodiac,
          isTrueAspect: true,
          power: fnSigmoidScale(
            orb !== 0 ? ((orb - aspectDegreeDiff) / orb) * 100 : 0,
          ),
          active: true,
        } satisfies ChartDataAspect);

        // 在相關行星資料中加入相位索引
        planet.aspects.push(aspects.length - 1);
      }
    });
};

export const fnCalcPlanetVZodiacs = (
  planet: ChartDataPlanet,
  planetName: PlanetName,
  aspects: ChartDataAspect[],
): void =>
  ZodiacList.forEach((zodiac, idx) => {
    fnCalcPlanetVZodiac(planet, planetName, zodiac, idx * 30, aspects);
  });
