import type { Label } from "./common";
import type { ZodiacName } from "./zodiac";

export const PlanetList = [
  "sun",
  "moon",
  "mercury",
  "venus",
  "mars",
  "jupiter",
  "saturn",
  "uranus",
  "neptune",
  "pluto",
] as const;
export type PlanetName = (typeof PlanetList)[number];

export const AsteroidList = [
  "ceres", // 穀神星
  "pallas", // 智神星
  "juno", // 婚神星
  "vesta", // 灶神星
  "chiron", // 凱龍星
] as const;
export type AsteroidName = (typeof AsteroidList)[number];

export const AstroPointList = [
  "northNode", // 北交點
  "lilith", // 黑月莉莉絲
] as const;
export type AstroPointName = (typeof AstroPointList)[number];

export type PlanetConfigType = "main" | "sub";

export type PlanetConfig = {
  label: Label;
  type: PlanetConfigType;
  symbol: string;
  color: string;
  orb?: number;
  domicile?: [ZodiacName] | [ZodiacName, ZodiacName] | undefined; // 廟 +5
  exaltation?: [ZodiacName] | [ZodiacName, ZodiacName] | undefined; // 旺 +4
  fall?: [ZodiacName] | [ZodiacName, ZodiacName] | undefined; // 落 -4
  detriment?: [ZodiacName] | [ZodiacName, ZodiacName] | undefined; // 陷 -5
};
export type PlanetConfigs = Record<PlanetName, PlanetConfig>;
export const PlanetConfigs: PlanetConfigs = {
  sun: {
    label: { zh: "日", en: "Sun" },
    type: "main",
    symbol: "\u2609", // ☉
    color: "#E94E77", //"#FFD700",
    domicile: ["leo"],
    exaltation: ["aries"],
    fall: ["libra"],
    detriment: ["aquarius"],
  },
  moon: {
    label: { zh: "月", en: "Moon" },
    type: "main",
    symbol: "\u263D", // ☽
    color: "#4A90E2", //"#B0C4DE",
    domicile: ["cancer"],
    exaltation: ["taurus"],
    fall: ["scorpio"],
    detriment: ["capricorn"],
  },
  mercury: {
    label: { zh: "水", en: "Mercury" },
    type: "main",
    symbol: "\u263F", // ☿
    color: "#50E3C2", //"#aaa",
    domicile: ["gemini", "virgo"],
    exaltation: ["aquarius"],
    fall: ["leo"],
    detriment: ["sagittarius", "pisces"],
  },
  venus: {
    label: { zh: "金", en: "Venus" },
    type: "main",
    symbol: "\u2640", // ♀
    color: "#50E3C2", //"#f8c",
    domicile: ["taurus", "libra"],
    exaltation: ["pisces"],
    fall: ["virgo"],
    detriment: ["scorpio", "aries"],
  },
  mars: {
    label: { zh: "火", en: "Mars" },
    type: "main",
    symbol: "\u2642", // ♂
    color: "#E94E77", //"#f44",
    domicile: ["aries", "scorpio"],
    exaltation: ["capricorn"],
    fall: ["cancer"],
    detriment: ["libra", "taurus"],
  },
  jupiter: {
    label: { zh: "木", en: "Jupiter" },
    type: "main",
    symbol: "\u2643", // ♃
    color: "#E94E77", //"#ffb347",
    domicile: ["sagittarius", "pisces"],
    exaltation: ["cancer"],
    fall: ["capricorn"],
    detriment: ["gemini", "virgo"],
  },
  saturn: {
    label: { zh: "土", en: "Saturn" },
    type: "main",
    symbol: "\u2644", // ♄
    color: "#F5A623", //"#deb887",
    domicile: ["capricorn", "aquarius"],
    exaltation: ["libra"],
    fall: ["aries"],
    detriment: ["cancer", "leo"],
  },
  uranus: {
    label: { zh: "天", en: "Uranus" },
    type: "sub",
    symbol: "\u2645", // ♅
    color: "#50E3C2", //"#40e0d0",
    orb: 3,
  },
  neptune: {
    label: { zh: "海", en: "Neptune" },
    type: "sub",
    symbol: "\u2646", // ♆
    color: "#4A90E2", //"#6495ed",
    orb: 3,
  },
  pluto: {
    label: { zh: "冥", en: "Pluto" },
    type: "sub",
    symbol: "\u2647", // ♇
    color: "#4A90E2", //"#b22222",
    orb: 3,
  },
} satisfies Record<PlanetName, PlanetConfig>;

export type AsteroidConfig = {
  label: Label;
  symbol: string;
  color: string;
  orb?: number;
};
export type AsteroidConfigs = Record<AsteroidName, AsteroidConfig>;
export const AsteroidConfigs: AsteroidConfigs = {
  ceres: {
    label: { zh: "穀神", en: "Ceres" },
    //type: "asteroid",
    symbol: "\u26B3", // ⚳
    color: "#4A90E2",
    orb: 1,
  },
  pallas: {
    label: { zh: "智神", en: "Pallas" },
    //type: "asteroid",
    symbol: "\u26B4", // ⚴ // "\u26B2", // ⚲
    color: "#4A90E2",
    orb: 1,
  },
  juno: {
    label: { zh: "婚神", en: "Juno" },
    //type: "asteroid",
    symbol: "\u26B5", // ⚵ // "\u26B1", // ⚱
    color: "#4A90E2",
    orb: 1,
  },
  vesta: {
    label: { zh: "灶神", en: "Vesta" },
    //type: "asteroid",
    symbol: "\u26B6", // ⚶ //"\u26B0", // ⚰
    color: "#4A90E2",
    orb: 1,
  },
  chiron: {
    label: { zh: "凱龍", en: "Chiron" },
    //type: "asteroid",
    symbol: "\u26B7", // ⚷
    color: "#4A90E2",
    orb: 1,
  },
} satisfies Record<AsteroidName, AsteroidConfig>;

export type AstroPointType = "node" | "arabicLot" | "apogee" | "midPoint";

export type AstroPointConfig = {
  label: Label;
  symbol: string;
  type: AstroPointType;
  color: string;
  orb?: number;
};
export type AstroPointConfigs = Record<AstroPointName, AstroPointConfig>;
export const AstroPointConfigs: AstroPointConfigs = {
  northNode: {
    label: { zh: "北交", en: "North Node" },
    symbol: "\u260A", // ☊
    type: "node",
    color: "#888",
    orb: 1,
  },
  lilith: {
    label: { zh: "莉莉絲", en: "Lilith" },
    symbol: "\u26B8", // ⚸ // "\u26B6", // ⚶
    type: "apogee",
    color: "#4A90E2",
    orb: 1,
  },
};
