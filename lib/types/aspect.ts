import type { DMS, Label } from "./common";
import type { AstroPointType, PlanetConfigType } from "./planet";

import { ChartConfig } from "./chartSetting";

export const AspectList = [
  "conjunction", // 合相 0°
  "sextile", // 六分相 60°
  "square", // 四分相 90°
  "trine", // 三分相 120°
  "opposition", // 對分相 180°

  "semisextile", // 半六分相 30°
  "quincunx", // 刑相 150°
] as const;
export type AspectName = (typeof AspectList)[number];

export type AspectConfigObjectType =
  | PlanetConfigType
  | "asteroid"
  | AstroPointType
  | "fixedStar"
  | "axis"
  | "house"
  | "eqHouse"
  | "zodiac"
  | "other";
export type AspectConfigOrb = {
  [key in AspectConfigObjectType]?: number;
};

export type SunConditionType = {
  cazimi: DMS;
  combustion: DMS;
  underSunbeams: DMS;
};

export const SunCondition: SunConditionType = {
  cazimi: { degree: 0, minute: 17, second: 0 },
  combustion: { degree: 8, minute: 30, second: 0 },
  underSunbeams: { degree: 17, minute: 0, second: 0 },
};

export type AspectType = "main" | "sub";
export type AspectConfig = {
  label: Label<string>;
  interaction: Label<string[]>;
  type: AspectType;
  symbol: string;
  degree: number; // 相位角度，單位為度
  orb: AspectConfigOrb; // 容許度，單位為度
  zodiacDiff: number;
  color: string;
};
export type AspectConfigs = Record<AspectName, AspectConfig>;

export const AspectConfigs: AspectConfigs = {
  conjunction: {
    label: { zh: "合相", en: "Conjunction" },
    interaction: {
      zh: [
        "功能直接融合",
        "難以分離運作",
        "其中一方會放大另一方",
        "容易形成單一核心行為",
      ],
    },
    type: "main",
    symbol: "\u260C", // ☌
    degree: 0,
    orb: {
      main: 8,
      sub: 8,

      asteroid: 1,

      node: 1,
      apogee: 1,
      arabicLot: 1,
      midPoint: 1,

      fixedStar: 1,
      axis: 1,
      house: 4,
      eqHouse: 4,
      zodiac: 1,
    },
    zodiacDiff: 0,
    color: ChartConfig.colorName.yellow,
  },
  opposition: {
    label: { zh: "對分相", en: "Opposition" },
    interaction: {
      zh: [
        "雙方互相拉扯",
        "容易投射到外部",
        "需要建立平衡",
        "難同時滿足兩端需求",
      ],
    },
    type: "main",
    symbol: "\u260D", // ☍
    degree: 180,
    orb: { main: 8, sub: 8 },
    zodiacDiff: 6,
    color: ChartConfig.colorName.blue,
  },
  trine: {
    label: { zh: "三分相", en: "Trine" },
    interaction: {
      zh: ["雙方運作流暢", "容易自然配合", "缺乏外部壓力修正", "容易變成慣性"],
    },
    type: "main",
    symbol: "\u25B3", // △
    degree: 120,
    orb: { main: 6, sub: 6 },
    zodiacDiff: 4,
    color: ChartConfig.colorName.green,
  },
  square: {
    label: { zh: "四分相", en: "Square" },
    interaction: {
      zh: ["雙方運作邏輯衝突", "會互相干擾", "需要強制調整", "容易產生內耗"],
    },
    type: "main",
    symbol: "\u25A1", // □
    degree: 90,
    orb: { main: 6, sub: 6 },
    zodiacDiff: 3,
    color: ChartConfig.colorName.red,
  },
  sextile: {
    label: { zh: "六分相", en: "Sextile" },
    interaction: {
      zh: ["雙方存在合作空間", "需要主動啟動", "可以形成輔助", "不會強制發生"],
    },
    type: "main",
    symbol: "\u26B9", // ⚹
    degree: 60,
    orb: { main: 6, sub: 6 },
    zodiacDiff: 2,
    color: ChartConfig.colorName.cyan,
  },

  semisextile: {
    label: { zh: "半六分相", en: "Semisextile" },
    interaction: { zh: ["微調"] },
    type: "sub",
    symbol: "\u26BA", // ⚺
    degree: 30,
    orb: { main: 3, sub: 3 },
    zodiacDiff: 1,
    color: ChartConfig.colorName.magenta,
  },

  quincunx: {
    label: { zh: "梅花相", en: "Quincunx" },
    interaction: { zh: ["調整"] },
    type: "sub",
    symbol: "\u26BB", // ⚻
    degree: 150,
    orb: { main: 3, sub: 3 },
    zodiacDiff: 5,
    color: ChartConfig.colorName.magenta,
  },
} satisfies Record<AspectName, AspectConfig>;

export const AspectConfigsArray = Object.values(AspectConfigs);
