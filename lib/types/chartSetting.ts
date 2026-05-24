import type { XY } from "./common";

const ChartTick = 4;

const ChartTicks = {
  tick: ChartTick,
  zodiac: {
    deg1: ChartTick,
    deg5: ChartTick * 2,
    deg10: ChartTick * 3,
    deg30: ChartTick * 8,
    symbol: ChartTick * 6,
  },
  planet: ChartTick * 3,
  house: ChartTick * 3,
  axis: ChartTick * 10,
  spacing: ChartTick / 2,
};

const ChartSize: number = 400;
const ChartRadius: number =
  ChartSize / 2 - (ChartTicks.axis + ChartTicks.spacing * 2);
const ChartRadiusAspect: number = ChartRadius * 0.6;
const ChartCenterXY: XY = {
  x: ChartSize / 2,
  y: ChartSize / 2,
};
const ChartFontSize = {
  planet: 14,
  zodiac: 12,
};

const ChartColorName = {
  red: "#E53935", // #FF0000
  blue: "#1E88E5", // #0000FF
  green: "#43A047", // #00FF00
  yellow: "#FBC02D", // #FFFF00
  cyan: "#039BE5", // #00FFFF
  magenta: "#D81B60", // #FF00FF
};

const ChartColor = {
  element: {
    water: ChartColorName.blue, // Blue
    fire: ChartColorName.red, // Red
    air: ChartColorName.green, // Teal
    earth: ChartColorName.yellow, // Orange
  },
};

export const ChartConfig = {
  ticks: ChartTicks,
  size: ChartSize,
  radius: ChartRadius,
  radiusAspect: ChartRadiusAspect,
  centerXY: ChartCenterXY,
  fontSize: ChartFontSize,
  colorName: ChartColorName,
  color: ChartColor,
  scale: {
    min: 0.5,
    max: 4,
  },
};
