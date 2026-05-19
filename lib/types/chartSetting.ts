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
  planet: ChartTick * 4,
  axis: ChartTick * 10,
  spacing: ChartTick / 2,
};

const ChartSize: number = 400;
const ChartRadius: number =
  ChartSize / 2 - (ChartTicks.axis + ChartTicks.spacing * 2);
const ChartCenterXY: XY = {
  x: ChartSize / 2,
  y: ChartSize / 2,
};
const ChartFontSize = {
  planet: 14,
  zodiac: 12,
};

const ChartColor = {
  line: {
    main: {
      light: "#222",
      dark: "#999",
    },
    sub: {
      light: "#666",
      dark: "#666",
    },
  },
  bg: {
    light: "#fff",
    dark: "#111",
  },
  element: {
    water: "#4A90E2", // Blue
    fire: "#E94E77", // Red
    air: "#50E3C2", // Teal
    earth: "#F5A623", // Orange
  },
};

export const ChartConfig = {
  ticks: ChartTicks,
  size: ChartSize,
  radius: ChartRadius,
  centerXY: ChartCenterXY,
  fontSize: ChartFontSize,
  color: ChartColor,
  scale: {
    min: 0.5,
    max: 4,
  }
};
