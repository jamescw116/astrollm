import type { ChartData, ChartDataPlanet } from "../types/chartData";
import type { PlanetName } from "../types/planet";

import { PlanetList } from "../types/planet";

import { fnCalcPlanetVPlanets } from "./fnCalcPlanetVPlanets";
import { fnCalcPlanetVZodiacs } from "./fnCalcPlanetVZodiacs";
import { fnCalcPlanetVHouses } from "./fnCalcPlanetVHouses";
import { fnCalcPlanetPower } from "./fnCalcPlanetPower";
import { fnCalcPlanetVOthers } from "./fnCalcPlanetVOthers";
import { fnCalcObjectsVObjects } from "./fnCalcObjectsVObjects";
import { fnCalcAstroPointObjectType } from "./fnCalcAstroPointObjectType";
import { fnCalcIsAxis } from "./fnCalcIsAxis";

export const fnCalcChartData = (data: ChartData): void => {
  for (let planetIdx = 0; planetIdx < PlanetList.length; planetIdx++) {
    const planet: ChartDataPlanet = data.planets[PlanetList[planetIdx]];
    const planetName: PlanetName = PlanetList[planetIdx];

    planet.ruleHouse = data.houses
      .map((house, idx) => (house.ruler === planetName ? idx : undefined))
      .filter((idx) => idx !== undefined)
      .reduce((acc, cur) => [...acc, cur], [] as number[]) as
      | [number]
      | [number, number];

    // 四化

    // 星體 vs 星體 (相位, 互融)
    fnCalcPlanetVPlanets(
      data.planets,
      planetIdx,
      data.aspects,
      data.mutualReceptions,
    );

    // 星體 vs 座界 (相位)
    fnCalcPlanetVZodiacs(planet, planetName, data.aspects);

    // 星體 vs 宮界 / 等宮界 (相位)
    fnCalcPlanetVHouses(planet, planetName, data.houses, data.aspects);

    // 星體 vs 小行星
    fnCalcPlanetVOthers(
      planet,
      planetName,
      data.asteroids,
      data.aspects,
      "asteroid",
    );

    // 星體 vs 點
    fnCalcPlanetVOthers(
      planet,
      planetName,
      data.astroPoints,
      data.aspects,
      fnCalcAstroPointObjectType,
    );

    // 星體 vs 固定星
    fnCalcPlanetVOthers(
      planet,
      planetName,
      data.fixedStars,
      data.aspects,
      "fixedStar",
    );

    if (planet.mutualReceptions.length === 0 && planet.aspects.length === 0) {
      planet.is.VoC = true;
    }
  }

  // 小行星 vs 軸
  fnCalcObjectsVObjects(
    data.asteroids,
    "asteroid",
    data.houses,
    "axis",
    data.aspects,
    fnCalcIsAxis, // 只與 1 / 4 / 7 / 10 合軸才算相位
  );

  // 點 vs 軸
  fnCalcObjectsVObjects(
    data.astroPoints,
    fnCalcAstroPointObjectType,
    data.houses,
    "axis",
    data.aspects,
    fnCalcIsAxis, // 只與 1 / 4 / 7 / 10 合軸才算相位
  );

  // 固定星 vs 軸
  fnCalcObjectsVObjects(
    data.fixedStars,
    "fixedStar",
    data.houses,
    "axis",
    data.aspects,
    fnCalcIsAxis, // 只與 1 / 4 / 7 / 10 合軸才算相位
  );

  /*
  No Energy or too weak, ignore for now

  // 小行星 vs 小行星
  fnCalcObjectsVObjects(
    data.asteroids,
    "asteroid",
    data.asteroids,
    "asteroid",
    data.aspects,
  );

  // 小行星 vs 點
  fnCalcObjectsVObjects(
    data.asteroids,
    "asteroid",
    data.astroPoints,
    fnCalcAstroPointObjectType,
    data.aspects,
  );

  // 點 vs 點
  fnCalcObjectsVObjects(
    data.astroPoints,
    fnCalcAstroPointObjectType,
    data.astroPoints,
    fnCalcAstroPointObjectType,
    data.aspects,
  );
  */

  // 強星論
  for (let planetIdx = 0; planetIdx < PlanetList.length; planetIdx++) {
    fnCalcPlanetPower(
      data.planets,
      PlanetList[planetIdx],
      data.aspects,
      data.powers,
    );
  }
};
