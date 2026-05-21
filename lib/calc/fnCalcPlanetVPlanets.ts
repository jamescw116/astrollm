import type {
  ChartDataAspect,
  ChartDataPlanetMutualReception,
  ChartDataPlanets,
} from "../types/chartData";
import type { PlanetName } from "../types/planet";
import type { AspectName } from "../types/aspect";

import { PlanetConfigs, PlanetList } from "../types/planet";
import { AspectConfigs, SunCondition } from "../types/aspect";
import { ZodiacList } from "../types/zodiac";

import { fnSigmoidScale } from "../fnSigmoidScale";
import { fnCalcMin } from "../common/fnCalcMin";
import { fnCalcGap } from "../common/fnCalcGap";
import { fnDMSToDeg } from "../common/fnZodiacDMSToDeg";
import { fnCalcPlanetMutualReceptions } from "./fnCalcPlanetMutualReceptions";

const fnCalcPlanetVPlanet = (
  planets: ChartDataPlanets,
  planetName1: PlanetName,
  planetName2: PlanetName,
  aspects: ChartDataAspect[],
  mutualReceptions: ChartDataPlanetMutualReception[],
): void => {
  const degreeDiff = fnCalcGap(
    planets[planetName1].degree,
    planets[planetName2].degree,
  );

  // 互融
  fnCalcPlanetMutualReceptions(
    planets,
    planetName1,
    planetName2,
    mutualReceptions,
  );

  // 太陽狀態
  if (planetName1 === "sun") {
    if (degreeDiff <= fnDMSToDeg(SunCondition.cazimi)) {
      planets[planetName2].is.cazimi = true;
    } else if (degreeDiff <= fnDMSToDeg(SunCondition.combustion)) {
      planets[planetName2].is.combustion = true;
    } else if (degreeDiff <= fnDMSToDeg(SunCondition.underSunbeams)) {
      planets[planetName2].is.underSunbeams = true;
    }
  }

  // 相位
  Object.entries(AspectConfigs).forEach(([aspectName, aspectConfig]) => {
    const planetOrb1 = fnCalcMin(
      aspectConfig.orb[PlanetConfigs[planetName1].type],
      PlanetConfigs[planetName1].orb ?? 99,
    );
    const planetOrb2 = fnCalcMin(
      aspectConfig.orb[PlanetConfigs[planetName2].type],
      PlanetConfigs[planetName2].orb ?? 99,
    );
    const orb = fnCalcMin(planetOrb1, planetOrb2);

    if (orb === 0) {
      return;
    }

    const aspectDegreeDiff = fnCalcGap(aspectConfig.degree, degreeDiff);

    if (aspectDegreeDiff <= orb) {
      const zodiacDiff = fnCalcGap(
        ZodiacList.findIndex(
          (z) => planets[planetName1].zodiacDMS.zodiac === z,
        ),
        ZodiacList.findIndex(
          (z) => planets[planetName2].zodiacDMS.zodiac === z,
        ),
      );

      aspects.push({
        aspect: aspectName as AspectName,
        degreeDiff: aspectDegreeDiff,
        orb,
        fromType: PlanetConfigs[planetName1].type,
        fromName: planetName1,
        toType: PlanetConfigs[planetName2].type,
        toName: planetName2,
        isTrueAspect: zodiacDiff === aspectConfig.zodiacDiff,
        power: fnSigmoidScale(
          orb !== 0 ? ((orb - aspectDegreeDiff) / orb) * 100 : 0,
        ),
        active: true,
      } satisfies ChartDataAspect);

      // 在相關行星資料中加入相位索引
      const aspectIndex = aspects.length - 1;
      planets[planetName1].aspects.push(aspectIndex);
      planets[planetName2].aspects.push(aspectIndex);
    }
  });
};

export const fnCalcPlanetVPlanets = (
  planets: ChartDataPlanets,
  planetIdx: number,
  aspects: ChartDataAspect[],
  mutualReceptions: ChartDataPlanetMutualReception[],
): void => {
  for (let j = planetIdx + 1; j < PlanetList.length; j++) {
    fnCalcPlanetVPlanet(
      planets,
      PlanetList[planetIdx],
      PlanetList[j],
      aspects,
      mutualReceptions,
    );
  }
};
