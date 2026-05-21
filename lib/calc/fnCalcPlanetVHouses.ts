import type { PlanetName } from "../types/planet";
import type {
  ChartDataPlanet,
  ChartDataHouse,
  ChartDataAspect,
} from "../types/chartData";
import type { AspectConfigObjectType, AspectName } from "../types/aspect";

import { AspectConfigs } from "../types/aspect";
import { PlanetConfigs } from "../types/planet";

import { fnSigmoidScale } from "../fnSigmoidScale";
import { fnCalcMin } from "../common/fnCalcMin";
import { fnCalcGap } from "../common/fnCalcGap";
import { fnCalcIsAxis } from "./fnCalcIsAxis";

const fnCalcPlanetVHouse = (
  planet: ChartDataPlanet,
  planetName: PlanetName,
  house: ChartDataHouse,
  houseIdx: number,
  houseType: "house" | "eqHouse",
  aspects: ChartDataAspect[],
) => {
  const degreeDiff = fnCalcGap(planet.degree, house.degree);

  // 相位
  Object.entries(AspectConfigs)
    .filter(([, aspectConfig]) => (aspectConfig.orb[houseType] ?? 0) !== 0)
    .forEach(([aspectName, aspectConfig]) => {
      const planetOrb = fnCalcMin(
        aspectConfig.orb[PlanetConfigs[planetName].type],
        PlanetConfigs[planetName].orb ?? 99,
      );
      const houseOrb = aspectConfig.orb[houseType];

      const orb = fnCalcMin(planetOrb, houseOrb);

      if (orb === 0) {
        return;
      }

      const aspectDegreeDiff = fnCalcGap(aspectConfig.degree, degreeDiff);

      const exists = aspects.find(
        (aspect) =>
          aspect.fromType === PlanetConfigs[planetName].type &&
          aspect.fromName === planetName &&
          ["axis", "house", "eqHouse"].includes(aspect.toType) &&
          aspect.toName === houseIdx,
      );

      const realHouseType: AspectConfigObjectType =
        houseType === "eqHouse"
          ? houseType
          : fnCalcIsAxis(houseIdx)
            ? "axis"
            : houseType;

      if (aspectDegreeDiff <= orb) {
        const power: number = fnSigmoidScale(
          orb !== 0 ? ((orb - aspectDegreeDiff) / orb) * 100 : 0,
        );

        aspects.push({
          aspect: aspectName as AspectName,
          degreeDiff: aspectDegreeDiff,
          orb,
          fromType: PlanetConfigs[planetName].type,
          fromName: planetName,
          toType: realHouseType,
          toName: houseIdx,
          isTrueAspect: true,
          power,
          active: !exists || exists.power < power,
        } satisfies ChartDataAspect);

        // 在相關行星資料中加入相位索引
        planet.aspects.push(aspects.length - 1);

        if (exists && exists.power < power) {
          exists.active = false;
        }
      }
    });
};

export const fnCalcPlanetVHouses = (
  planet: ChartDataPlanet,
  planetName: PlanetName,
  houses: ChartDataHouse[],
  aspects: ChartDataAspect[],
): void => {
  houses.forEach((house, houseIdx) => {
    if (houseIdx - planet.atHouse === 1 && planet.degree >= house.degree) {
      planet.atHouse = houseIdx;
    }

    // 宮界
    fnCalcPlanetVHouse(planet, planetName, house, houseIdx, "house", aspects);

    // 等宮界
    fnCalcPlanetVHouse(
      planet,
      planetName,
      { ...house, degree: houses[0].degree + houseIdx * 30 },
      houseIdx,
      "eqHouse",
      aspects,
    );
  });
};
