import type {
  ChartDataAspect,
  ChartDataAsteroid,
  ChartDataAsteroids,
  ChartDataAstroPoint,
  ChartDataAstroPoints,
  ChartDataFixedStar,
  ChartDataFixedStars,
  ChartDataHouse,
} from "../types/chartData";
import type { AsteroidName, AstroPointName } from "../types/planet";
import type { AspectConfigObjectType, AspectName } from "../types/aspect";
import type { FixedStarName } from "../types/fixedStar";

import { AspectConfigs } from "../types/aspect";

import { fnCalcGap } from "../common/fnCalcGap";
import { fnCalcMin } from "../common/fnCalcMin";
import { fnSigmoidScale } from "../fnSigmoidScale";

export const fnCalcObjectVObject = <
  FCD extends ChartDataAsteroid | ChartDataAstroPoint | ChartDataFixedStar,
  FN extends AsteroidName | AstroPointName | FixedStarName,
  TCD extends
    | ChartDataAsteroid
    | ChartDataAstroPoint
    | ChartDataFixedStar
    | ChartDataHouse,
  TN extends AsteroidName | AstroPointName | FixedStarName | number,
>(
  from: FCD,
  fromName: FN,
  fmOrbType: AspectConfigObjectType,
  to: TCD,
  toName: TN,
  toOrbType: AspectConfigObjectType,
  aspects: ChartDataAspect[],
): void => {
  const degreeDiff = fnCalcGap(from.degree, to.degree);

  // 相位
  Object.entries(AspectConfigs)
    .filter(
      ([, aspectConfig]) =>
        (aspectConfig.orb[fmOrbType] ?? 0) !== 0 &&
        (aspectConfig.orb[toOrbType] ?? 0) !== 0,
    )
    .forEach(([aspectName, aspectConfig]) => {
      const orb = fnCalcMin(
        aspectConfig.orb[fmOrbType],
        aspectConfig.orb[toOrbType],
      );

      if (orb === 0) {
        return;
      }

      const aspectDegreeDiff = fnCalcGap(aspectConfig.degree, degreeDiff);

      if (aspectDegreeDiff <= orb) {
        aspects.push({
          aspect: aspectName as AspectName,
          degreeDiff: aspectDegreeDiff,
          orb,
          fromType: fmOrbType,
          fromName: fromName,
          toType: toOrbType,
          toName: toName,
          isTrueAspect: true,
          power: fnSigmoidScale(
            orb !== 0 ? ((orb - aspectDegreeDiff) / orb) * 100 : 0,
          ),
          active: true,
        } satisfies ChartDataAspect);

        // 在相關行星資料中加入相位索引
        from.aspects.push(aspects.length - 1);
      }
    });
};

const fnCalcObjectVObjects = <
  FCD extends ChartDataAsteroid | ChartDataAstroPoint | ChartDataFixedStar,
  FN extends AsteroidName | AstroPointName | FixedStarName,
  TCDs extends
    | ChartDataAsteroids
    | ChartDataAstroPoints
    | ChartDataFixedStars
    | ChartDataHouse[],
  TCD extends
    | ChartDataAsteroid
    | ChartDataAstroPoint
    | ChartDataFixedStar
    | ChartDataHouse,
  TN extends AsteroidName | AstroPointName | FixedStarName | number,
>(
  from: FCD,
  fromName: FN,
  fromOrbType: AspectConfigObjectType,
  tos: TCDs,
  toOrbType: AspectConfigObjectType | ((name: TN) => AspectConfigObjectType),
  aspects: ChartDataAspect[],
  fnToFilter: ((toName: TN) => boolean) | undefined,
): void =>
  Array.isArray(tos)
    ? tos
        .map((to, idx) => [to, idx])
        .filter(([, idx]) => fnToFilter === undefined || fnToFilter(idx as TN))
        .forEach(([to, idx]) =>
          fnCalcObjectVObject<FCD, FN, TCD, TN>(
            from,
            fromName,
            fromOrbType,
            to as TCD,
            idx as TN,
            typeof toOrbType === "function" ? toOrbType(idx as TN) : toOrbType,
            aspects,
          ),
        )
    : Object.entries(tos)
        .filter(
          ([toName]) => fnToFilter === undefined || fnToFilter(toName as TN),
        )
        .forEach(([toName, to]) =>
          fnCalcObjectVObject<FCD, FN, TCD, TN>(
            from,
            fromName,
            fromOrbType,
            to as TCD,
            toName as TN,
            typeof toOrbType === "function"
              ? toOrbType(toName as TN)
              : toOrbType,
            aspects,
          ),
        );

export const fnCalcObjectsVObjects = <
  FCDs extends ChartDataAsteroids | ChartDataAstroPoints | ChartDataFixedStars,
  FCD extends ChartDataAsteroid | ChartDataAstroPoint | ChartDataFixedStar,
  FN extends AsteroidName | AstroPointName | FixedStarName,
  TCDs extends
    | ChartDataAsteroids
    | ChartDataAstroPoints
    | ChartDataFixedStars
    | ChartDataHouse[],
  TCD extends
    | ChartDataAsteroid
    | ChartDataAstroPoint
    | ChartDataFixedStar
    | ChartDataHouse,
  TN extends AsteroidName | AstroPointName | FixedStarName | number,
>(
  froms: FCDs,
  fromOrbType: AspectConfigObjectType | ((name: FN) => AspectConfigObjectType),
  tos: TCDs,
  toOrbType: AspectConfigObjectType | ((name: TN) => AspectConfigObjectType),
  aspects: ChartDataAspect[],
  fnToFilter?: ((toName: TN) => boolean) | undefined,
): void =>
  Object.entries(froms).forEach(([fromName, from]) =>
    fnCalcObjectVObjects<FCD, FN, TCDs, TCD, TN>(
      from as FCD,
      fromName as FN,
      typeof fromOrbType === "function"
        ? fromOrbType(fromName as FN)
        : fromOrbType,
      tos,
      toOrbType,
      aspects,
      fnToFilter,
    ),
  );
