import type { ChartData, ChartDataString } from "@/lib/types/chartData";

import { AspectConfigs } from "@/lib/types/aspect";

import { fnDegToString } from "./fnDegToString";
import { fnToCapitalize } from "../fnToCapitalize";
import { fnHouseToString } from "./fnHouseToString";

export const fnChartDataToString = (chartData: ChartData): ChartDataString => ({
  星體: Object.entries(chartData.planets).map(([name, planet]) =>
    [
      fnToCapitalize(name),
      ": ",
      fnDegToString(planet.degree, planet.zodiacDMS.motion, "string"),
      " @ ",
      fnHouseToString(planet.atHouse, false, false),
    ].join(""),
  ),
  互融: chartData.mutualReceptions.map((mr) =>
    [
      fnToCapitalize(mr.planets[0]),
      " & ",
      fnToCapitalize(mr.planets[1]),
      " = ",
      mr.fortune === 1 ? "Good" : mr.fortune === 0 ? "Neutral" : "Bad",
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
        fnToCapitalize(aspect.fromName),
        " ",
        aspect.aspect,
        " ",
        typeof aspect.toName === "string"
          ? fnToCapitalize(aspect.toName)
          : fnHouseToString(aspect.toName, aspect.toType === "eqHouse"),
        " (",
        fnDegToString(aspect.degreeDiff, undefined, ""),
        ", orb: ",
        `${aspect.orb}°`,
        ")",
      ].join(""),
    ),
  宮位: chartData.houses.map((house, index) =>
    [
      fnHouseToString(index, false, false),
      ": ",
      fnDegToString(house.degree, undefined, "string"),
      ", ruler: ",
      fnToCapitalize(house.ruler),
    ].join(""),
  ),
});
