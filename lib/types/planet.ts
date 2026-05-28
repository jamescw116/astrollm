import type { Label } from "./common";
import type { ZodiacName } from "./zodiac";

import { ChartConfig } from "./chartSetting";

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
  label: Label<string>;
  desc: Label<string[]>;
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
    desc: { zh: ["個性", "目標", "自我", "父親", "領導"] },
    type: "main",
    symbol: "\u2609", // ☉
    color: ChartConfig.colorName.red,
    domicile: ["leo"],
    exaltation: ["aries"],
    fall: ["libra"],
    detriment: ["aquarius"],
  },
  moon: {
    label: { zh: "月", en: "Moon" },
    desc: { zh: ["內在", "情緒", "感性", "母親", "記憶", "不安"] },
    type: "main",
    symbol: "\u263D", // ☽
    color: ChartConfig.colorName.blue,
    domicile: ["cancer"],
    exaltation: ["taurus"],
    fall: ["scorpio"],
    detriment: ["capricorn"],
  },
  mercury: {
    label: { zh: "水", en: "Mercury" },
    desc: { zh: ["理解", "溝通", "理性", "商業", "學習", "快速"] },
    type: "main",
    symbol: "\u263F", // ☿
    color: ChartConfig.colorName.green,
    domicile: ["gemini", "virgo"],
    exaltation: ["aquarius"],
    fall: ["leo"],
    detriment: ["sagittarius", "pisces"],
  },
  venus: {
    label: { zh: "金", en: "Venus" },
    desc: { zh: ["審美", "和諧", "交際", "人緣", "愛情"] },
    type: "main",
    symbol: "\u2640", // ♀
    color: ChartConfig.colorName.green,
    domicile: ["taurus", "libra"],
    exaltation: ["pisces"],
    fall: ["virgo"],
    detriment: ["scorpio", "aries"],
  },
  mars: {
    label: { zh: "火", en: "Mars" },
    desc: { zh: ["慾望", "企圖", "行動", "競爭", "衝突"] },
    type: "main",
    symbol: "\u2642", // ♂
    color: ChartConfig.colorName.red,
    domicile: ["aries", "scorpio"],
    exaltation: ["capricorn"],
    fall: ["cancer"],
    detriment: ["libra", "taurus"],
  },
  jupiter: {
    label: { zh: "木", en: "Jupiter" },
    desc: { zh: ["擴張", "機會", "樂觀", "學術", "希望"] },
    type: "main",
    symbol: "\u2643", // ♃
    color: ChartConfig.colorName.red,
    domicile: ["sagittarius", "pisces"],
    exaltation: ["cancer"],
    fall: ["capricorn"],
    detriment: ["gemini", "virgo"],
  },
  saturn: {
    label: { zh: "土", en: "Saturn" },
    desc: { zh: ["壓抑", "規範", "冷漠", "組織", "責任", "緩慢"] },
    type: "main",
    symbol: "\u2644", // ♄
    color: ChartConfig.colorName.yellow,
    domicile: ["capricorn", "aquarius"],
    exaltation: ["libra"],
    fall: ["aries"],
    detriment: ["cancer", "leo"],
  },
  uranus: {
    label: { zh: "天", en: "Uranus" },
    desc: { zh: ["變革", "意外", "創新", "科技", "顛覆"] },
    type: "sub",
    symbol: "\u2645", // ♅
    color: ChartConfig.colorName.green,
    orb: 3,
  },
  neptune: {
    label: { zh: "海", en: "Neptune" },
    desc: { zh: ["幻想", "模糊", "靈感", "藝術", "迷幻"] },
    type: "sub",
    symbol: "\u2646", // ♆
    color: ChartConfig.colorName.blue,
    orb: 3,
  },
  pluto: {
    label: { zh: "冥", en: "Pluto" },
    desc: { zh: ["威脅", "極端", "摧毀", "死亡", "重生"] },
    type: "sub",
    symbol: "\u2647", // ♇
    color: ChartConfig.colorName.blue,
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
