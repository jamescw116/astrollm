import type { ChartData, ChartDataAspect, ChartDataHouse, ChartDataPlanet, ChartDataPlanetMutualReception, ChartDataString } from "@/lib/types/chartData";

import type { PlanetName } from "@/lib/types/planet";
import type { ZodiacName } from "@/lib/types/zodiac";
import type { AspectName } from "@/lib/types/aspect";
import type { Lang } from "@/lib/types/common";

import { AspectConfigs } from "@/lib/types/aspect";

import { fnDegToString } from "./fnDegToString";
import { fnHouseToString } from "./fnHouseToString";
import { fnToLabel } from "./fnToLabel";

const fnChartDataToStringPlanet = (
  planetName: PlanetName,
  planet: ChartDataPlanet,
  lang: Lang,
): string[] => ([
  fnToLabel(planetName as PlanetName, lang, true),
  fnDegToString({
        deg: planet.degree,
        motion: planet.zodiacDMS.motion,
        format: "string",
        lang,
        desc: true
      }),
])

const fnChartDataToStringMutualReception = (
  mr: ChartDataPlanetMutualReception,
  lang: Lang
): string[] => ([
  fnToLabel(mr.planets[0], lang, true),
  fnToLabel(mr.planets[1], lang, true),
  " 互融成 " + (mr.fortune === 1 ? "吉" : mr.fortune === 0 ? "平" : "凶"),
])

const fnChartDataToStringAspect = (
  aspect: ChartDataAspect,
  lang: Lang
): string[] => ([
  fnToLabel(aspect.fromName as PlanetName, lang, true),
  typeof aspect.toName === "string"
    ? fnToLabel(aspect.toName as PlanetName | ZodiacName | AspectName, lang, true)
    : fnHouseToString({ idx: aspect.toName, eqHouse: aspect.toType === "eqHouse", lang }),
  fnToLabel(aspect.aspect as AspectName, lang, true),
  "差距: " + fnDegToString({ deg: aspect.degreeDiff, format: "string", lang }),
  "容許度: " + `${aspect.orb}°`,
])

const fnChartDataToStringHouse = (
  house: ChartDataHouse,
  houseIdx: number,
  lang: Lang
): string[] => ([
  fnHouseToString({ idx: houseIdx, eqHouse: false, lang }),
  fnDegToString({ deg: house.degree, format: "string", lang }),
  "宮主星: " + fnToLabel(house.ruler, lang, true),
])

export const CharDataStringTypes = ["星體", "互融", "相位", "宮位"] as const;
export type ChartDataStringType = (typeof CharDataStringTypes)[number];

export const fnChartDataToString = (
  chartData: ChartData,
  type: ChartDataStringType,
  objName: PlanetName | ZodiacName | AspectName | number,
  lang: Lang = "zh",
): string[] => (
  type === "星體"
    ? fnChartDataToStringPlanet(objName as PlanetName, chartData.planets[objName as PlanetName], lang)
    : type === "互融"
      ? fnChartDataToStringMutualReception(chartData.mutualReceptions[objName as number], lang)
      : type === "相位"
        ? fnChartDataToStringAspect(chartData.aspects[objName as number], lang)
        : fnChartDataToStringHouse(chartData.houses[objName as number], objName as number, lang)
)

export const fnChartDataToStrings = (
  chartData: ChartData,
  lang: Lang = "zh",
): ChartDataString => ({
  星體: Object.entries(chartData.planets).map(([name, planet]) =>
    fnChartDataToStringPlanet(name as PlanetName, planet, lang).join("，"),
  ),
  互融: chartData.mutualReceptions.map((mr) =>
    fnChartDataToStringMutualReception(mr, lang).join("，"),
  ),
  相位: chartData.aspects
    .filter(
      (aspect) =>
        aspect.active &&
        AspectConfigs[aspect.aspect].type === "main" &&
        ["main"].includes(aspect.fromType) &&
        ["main", "zodiac", "axis", "house", "eqHouse"].includes(aspect.toType),
    )
    .map((aspect) =>
      fnChartDataToStringAspect(aspect, lang).join("，"),
    ),
  宮位: chartData.houses.map((house, index) =>
    fnChartDataToStringHouse(house, index, lang).join("，"),
  ),
})

/*: ChartDataString => ({
  星體: Object.entries(chartData.planets).map(([name, planet]) =>
    [
      fnToLabel(name as PlanetName, lang),
      ` ${fnRuleHouseToString(planet.ruleHouse, lang)}`,
      " 落入 ",
      fnDegToString({
        deg: planet.degree,
        motion: planet.zodiacDMS.motion,
        zodiac: "string",
        lang,
      }),
//      ", ",
//      fnHouseToString({ idx: planet.atHouse, lang }),
    ].join(""),
  ),
  互融: chartData.mutualReceptions.map((mr) =>
    [
      fnToLabel(mr.planets[0], lang),
      " 與 ",
      fnToLabel(mr.planets[1], lang),
      " 互融成 ",
      mr.fortune === 1 ? "吉" : mr.fortune === 0 ? "平" : "凶",
    ].join(""),
  ),
  相位: chartData.aspects
    .filter(
      (aspect) =>
        aspect.active &&
        AspectConfigs[aspect.aspect].type === "main" &&
        ["main"].includes(aspect.fromType) &&
        ["main", "zodiac", "axis", "house", "eqHouse"].includes(aspect.toType),
    )
    .map((aspect) =>
      [
        fnToLabel(aspect.fromName as PlanetName, lang),
        " ",
        fnToLabel(aspect.aspect as AspectName, lang),
        " ",
        typeof aspect.toName === "string"
          ? fnToLabel(
              aspect.toName as PlanetName | ZodiacName | AspectName,
              lang,
            )
          : fnHouseToString({ idx: aspect.toName, eqHouse: aspect.toType === "eqHouse", lang }),
        " (差距: ",
        fnDegToString({ deg: aspect.degreeDiff, zodiac: "" }),
        ", 容許度: ",
        `${aspect.orb}°`,
        ")",
      ].join(""),
    ),
  宮位: chartData.houses.map((house, index) =>
    [
      fnHouseToString({ idx: index, eqHouse: false, lang }),
      ": ",
      fnDegToString({ deg: house.degree, zodiac: "string", lang }),
      ", 宮主星: ",
      fnToLabel(house.ruler, lang),
    ].join(""),
  ),
});*/
