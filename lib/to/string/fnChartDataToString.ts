import type { ChartData, ChartDataString } from "@/lib/types/chartData";

import type { PlanetName } from "@/lib/types/planet";
import type { ZodiacName } from "@/lib/types/zodiac";
import type { AspectName } from "@/lib/types/aspect";
import type { Lang } from "@/lib/types/common";

import { AspectConfigs } from "@/lib/types/aspect";

import { fnDegToString } from "./fnDegToString";
import { fnHouseToString } from "./fnHouseToString";
import { fnToLabel } from "./fnToLabel";
import { fnRuleHouseToString } from "./fnRuleHouseToString";

export const fnChartDataToString = (
  chartData: ChartData,
  lang: Lang = "zh",
): ChartDataString => ({
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
});
