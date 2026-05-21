import type {
  ChartDataAspect,
  ChartDataAsteroid,
  ChartDataAsteroids,
  ChartDataAstroPoint,
  ChartDataAstroPoints,
  ChartDataFixedStar,
  ChartDataFixedStars,
  ChartDataPlanet,
} from "../types/chartData";
import type { AsteroidName, AstroPointName, PlanetName } from "../types/planet";
import type { AspectConfigObjectType, AspectName } from "../types/aspect";
import type { FixedStarName } from "../types/fixedStar";

import { AspectConfigs } from "../types/aspect";
import { PlanetConfigs } from "../types/planet";

import { fnCalcGap } from "../common/fnCalcGap";
import { fnCalcMin } from "../common/fnCalcMin";
import { fnSigmoidScale } from "../fnSigmoidScale";

export const fnCalcPlanetVOther = <
  CD extends ChartDataAsteroid | ChartDataAstroPoint | ChartDataFixedStar,
  N extends AsteroidName | AstroPointName | FixedStarName,
>(
  planet: ChartDataPlanet,
  planetName: PlanetName,
  other: CD,
  otherName: N,
  aspects: ChartDataAspect[],
  objType: AspectConfigObjectType,
): void => {
  const degreeDiff = fnCalcGap(planet.degree, other.degree);

  // 相位
  Object.entries(AspectConfigs)
    .filter(([, aspectConfig]) => (aspectConfig.orb[objType] ?? 0) !== 0)
    .forEach(([aspectName, aspectConfig]) => {
      const planetOrb = fnCalcMin(
        aspectConfig.orb[PlanetConfigs[planetName].type],
        PlanetConfigs[planetName].orb ?? 99,
      );
      const houseOrb = aspectConfig.orb[objType];

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
          toType: objType,
          toName: otherName,
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

export const fnCalcPlanetVOthers = <
  CDs extends ChartDataAsteroids | ChartDataAstroPoints | ChartDataFixedStars,
  CD extends ChartDataAsteroid | ChartDataAstroPoint | ChartDataFixedStar,
  N extends AsteroidName | AstroPointName | FixedStarName,
>(
  planet: ChartDataPlanet,
  planetName: PlanetName,
  others: CDs,
  aspects: ChartDataAspect[],
  orbType: AspectConfigObjectType | ((name: N) => AspectConfigObjectType),
): void =>
  Object.entries(others).forEach(([otherName, other]) =>
    fnCalcPlanetVOther<CD, N>(
      planet,
      planetName,
      other as CD,
      otherName as N,
      aspects,
      typeof orbType === "function" ? orbType(otherName as N) : orbType,
    ),
  );
