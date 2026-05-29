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
  detail: {
    core: Label<string[]>;
    operation: Label<string[]>;
  };
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
    detail: {
      core: {
        zh: [
          "建立主體性",
          "定義方向與目標",
          "維持主導權",
          "集中資源",
          "穩定核心意志",
        ],
      },
      operation: {
        zh: ["傾向主動控制局面", "重視自身存在感", "容易圍繞核心目標運作"],
      },
    },
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
    detail: {
      core: {
        zh: [
          "建立安全感",
          "儲存情緒記憶",
          "對外界刺激產生情緒反應",
          "維持熟悉感",
        ],
      },
      operation: {
        zh: ["優先保護內在穩定", "容易受環境影響", "傾向重複熟悉模式"],
      },
    },
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
    detail: {
      core: { zh: ["接收資訊", "分析與理解", "傳遞訊息", "建立邏輯連結"] },
      operation: {
        zh: ["快速切換資訊", "重視思考過程", "傾向從多角度分析問題"],
      },
    },
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
    detail: {
      core: { zh: ["建立關係", "維持和諧", "判斷價值與美感", "降低衝突成本"] },
      operation: { zh: ["傾向互惠", "重視舒適感", "避免破壞關係"] },
    },
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
    detail: {
      core: { zh: ["推進行動", "爭奪主導權", "排除阻力", "直接滿足慾望"] },
      operation: { zh: ["反應速度快", "優先行動", "衝突傾向直接爆發"] },
    },
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
    detail: {
      core: { zh: ["擴大可能性", "建立信念", "延伸視野", "放大既有方向"] },
      operation: { zh: ["傾向樂觀放大", "容易忽略限制", "喜歡建立長遠願景"] },
    },
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
    detail: {
      core: { zh: ["建立秩序", "壓縮風險", "延遲滿足", "維持長期穩定"] },
      operation: { zh: ["行動保守", "重視責任", "需要驗證後才推進"] },
    },
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
    detail: {
      core: { zh: ["打破既有結構", "製造突變", "推動新模式", "強制脫離慣性"] },
      operation: { zh: ["反傳統", "不穩定", "容易突然轉向"] },
    },
    type: "sub",
    symbol: "\u2645", // ♅
    color: ChartConfig.colorName.green,
    orb: 3,
  },
  neptune: {
    label: { zh: "海", en: "Neptune" },
    detail: {
      core: { zh: ["模糊界線", "放大感受", "建立幻想投射", "削弱現實邊界"] },
      operation: { zh: ["難以明確定義", "容易理想化", "傾向逃避現實限制"] },
    },
    type: "sub",
    symbol: "\u2646", // ♆
    color: ChartConfig.colorName.blue,
    orb: 3,
  },
  pluto: {
    label: { zh: "冥", en: "Pluto" },
    detail: {
      core: { zh: ["極端集中", "摧毀舊結構", "強制重組", "控制生存權"] },
      operation: { zh: ["具有壓迫性", "容易走向極端", "會長期滲透與改造"] },
    },
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
