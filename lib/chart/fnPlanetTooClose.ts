import { fnCalcDegMean } from "../common/fnCalcDegMean";
import { fnCalcDegSpread } from "../common/fnCalcDegSpread";
import { fnCalcGap } from "../common/fnCalcGap";
import type { ChartDataPlanets } from "../types/chartData";
import { PlanetName } from "../types/planet";

export const fnPlanetsTooClose = (planets: ChartDataPlanets): Record<PlanetName, number> => {
  const orderPlanets = Object.entries(planets).sort(
    (a, b) => a[1].degree - b[1].degree,
  );

  let tooClose: Record<number, number> = {};

  const fnPlanetTooClose = (
    curIdx: number,
    step: number,
  ): Record<number, number> => {
    const curDeg = tooClose[curIdx] ?? orderPlanets[curIdx][1].degree;

    const nextIdx = (curIdx + step + orderPlanets.length) % orderPlanets.length;
    const nextDeg = tooClose[nextIdx] ?? orderPlanets[nextIdx][1].degree;

    return fnCalcGap(curDeg, nextDeg) < 5
      ? {
          [curIdx]: curDeg,
          [nextIdx]: nextDeg,
          ...fnPlanetTooClose(nextIdx, step + 1),
        }
      : {};
  };

  for (let i = 0; i < orderPlanets.length; i++) {
    const curCluster: Record<number, number> = fnPlanetTooClose(i, 1);
    const centerDeg = fnCalcDegMean(Object.values(curCluster));
    tooClose = { ...tooClose, ...fnCalcDegSpread(curCluster, centerDeg) };
  }

  return Object.entries(tooClose).reduce((acc, [idx, deg]) => {
    acc[orderPlanets[Number(idx)][0] as PlanetName] = deg;
    return acc;
  }, {} as Record<PlanetName, number>);
};
