import type { DMS, Label } from "./common";
import type { ElementName } from "./element";
import type { PlanetName } from "./planet";

export const ZodiacList = [
  "aries",
  "taurus",
  "gemini",
  "cancer",
  "leo",
  "virgo",
  "libra",
  "scorpio",
  "sagittarius",
  "capricorn",
  "aquarius",
  "pisces",
] as const;

export type ZodiacName = (typeof ZodiacList)[number];

export type ZodiacConfig = {
  label: Label;
  symbol: string;
  element: ElementName;
  ruler: PlanetName;
};
export type ZodiacConfigs = Record<ZodiacName, ZodiacConfig>;
export const ZodiacConfigs: ZodiacConfigs = {
  aries: {
    label: { zh: "白羊", en: "Aries" },
    symbol: "\u2648\uFE0E", // ♈
    // color: "#ff4500",
    element: "fire",
    ruler: "mars",
  },
  taurus: {
    label: { zh: "金牛", en: "Taurus" },
    symbol: "\u2649\uFE0E", // ♉
    // color: "#228b22",
    element: "earth",
    ruler: "venus",
  },
  gemini: {
    label: { zh: "雙子", en: "Gemini" },
    symbol: "\u264A\uFE0E", // ♊
    // color: "#daa520",
    element: "air",
    ruler: "mercury",
  },
  cancer: {
    label: { zh: "巨蟹", en: "Cancer" },
    symbol: "\u264B\uFE0E", // ♋
    // color: "#ff69b4",
    element: "water",
    ruler: "moon",
  },
  leo: {
    label: { zh: "獅子", en: "Leo" },
    symbol: "\u264C\uFE0E", // ♌
    // color: "#ffa500",
    element: "fire",
    ruler: "sun",
  },
  virgo: {
    label: { zh: "處女", en: "Virgo" },
    symbol: "\u264D\uFE0E", // ♍
    // color: "#808000",
    element: "earth",
    ruler: "mercury",
  },
  libra: {
    label: { zh: "天秤", en: "Libra" },
    symbol: "\u264E\uFE0E", // ♎
    // color: "#00ced1",
    element: "air",
    ruler: "venus",
  },
  scorpio: {
    label: { zh: "天蠍", en: "Scorpio" },
    symbol: "\u264F\uFE0E", // ♏
    // color: "#8b0000",
    element: "water",
    ruler: "mars",
  },
  sagittarius: {
    label: { zh: "射手", en: "Sagittarius" },
    symbol: "\u2650\uFE0E", // ♐
    // color: "#1e90ff",
    element: "fire",
    ruler: "jupiter",
  },
  capricorn: {
    label: { zh: "山羊", en: "Capricorn" },
    symbol: "\u2651\uFE0E", // ♑
    // color: "#2f4f4f",
    element: "earth",
    ruler: "saturn",
  },
  aquarius: {
    label: { zh: "水瓶", en: "Aquarius" },
    symbol: "\u2652\uFE0E", // ♒
    // color: "#00bfff",
    element: "air",
    ruler: "saturn",
  },
  pisces: {
    label: { zh: "雙魚", en: "Pisces" },
    symbol: "\u2653\uFE0E", // ♓
    // color: "#9370db",
    element: "water",
    ruler: "jupiter",
  },
};

export const ZodiacConfigsArray = Object.values(ZodiacConfigs);

export type ZodiacDMS = {
  zodiac: ZodiacName;
  dms: DMS;
  motion?: number; // -1 retrograde, 0 stationary, 1 direct
};
