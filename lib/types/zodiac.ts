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
  label: Label<string>;
  deco: Label<string[]>;
  symbol: string;
  element: ElementName;
  ruler: PlanetName;
};
export type ZodiacConfigs = Record<ZodiacName, ZodiacConfig>;
export const ZodiacConfigs: ZodiacConfigs = {
  aries: {
    label: { zh: "白羊", en: "Aries" },
    deco: {
      zh: [
        "優先快速開始",
        "不等待外部確認",
        "容易直接碰撞",
        "傾向先行動後修正",
      ],
    },
    symbol: "\u2648\uFE0E", // ♈
    // color: "#ff4500",
    element: "fire",
    ruler: "mars",
  },
  taurus: {
    label: { zh: "金牛", en: "Taurus" },
    deco: {
      zh: ["優先維持既有狀態", "重視可持續性", "行動速度慢", "對失去資源敏感"],
    },
    symbol: "\u2649\uFE0E", // ♉
    // color: "#228b22",
    element: "earth",
    ruler: "venus",
  },
  gemini: {
    label: { zh: "雙子", en: "Gemini" },
    deco: {
      zh: ["傾向多方向切換", "保持資訊流動", "難長期固定", "優先理解與交流"],
    },
    symbol: "\u264A\uFE0E", // ♊
    // color: "#daa520",
    element: "air",
    ruler: "mercury",
  },
  cancer: {
    label: { zh: "巨蟹", en: "Cancer" },
    deco: {
      zh: [
        "優先保護熟悉範圍",
        "容易受情緒記憶影響",
        "對外界具防衛性",
        "重視歸屬感",
      ],
    },
    symbol: "\u264B\uFE0E", // ♋
    // color: "#ff69b4",
    element: "water",
    ruler: "moon",
  },
  leo: {
    label: { zh: "獅子", en: "Leo" },
    deco: {
      zh: ["需要被看見", "維持主導位置", "強化自我表現", "對失去尊嚴敏感"],
    },
    symbol: "\u264C\uFE0E", // ♌
    // color: "#ffa500",
    element: "fire",
    ruler: "sun",
  },
  virgo: {
    label: { zh: "處女", en: "Virgo" },
    deco: {
      zh: [
        "優先修正錯誤",
        "傾向拆解細節",
        "重視效率與流程",
        "容易進入反覆檢查",
      ],
    },
    symbol: "\u264D\uFE0E", // ♍
    // color: "#808000",
    element: "earth",
    ruler: "mercury",
  },
  libra: {
    label: { zh: "天秤", en: "Libra" },
    deco: {
      zh: [
        "決策需考慮他人反應",
        "優先維持關係平衡",
        "避免直接破壞合作",
        "傾向協商與互相校正",
      ],
    },
    symbol: "\u264E\uFE0E", // ♎
    // color: "#00ced1",
    element: "air",
    ruler: "venus",
  },
  scorpio: {
    label: { zh: "天蠍", en: "Scorpio" },
    deco: {
      zh: [
        "傾向隱藏真正動機",
        "重視控制權",
        "容易長期觀察滲透",
        "透過壓力推動轉變",
      ],
    },
    symbol: "\u264F\uFE0E", // ♏
    // color: "#8b0000",
    element: "water",
    ruler: "mars",
  },
  sagittarius: {
    label: { zh: "射手", en: "Sagittarius" },
    deco: {
      zh: [
        "傾向向外擴張",
        "優先追求整體觀",
        "容易忽略細節",
        "喜歡建立信念系統",
      ],
    },
    symbol: "\u2650\uFE0E", // ♐
    // color: "#1e90ff",
    element: "fire",
    ruler: "jupiter",
  },
  capricorn: {
    label: { zh: "山羊", en: "Capricorn" },
    deco: {
      zh: ["優先現實成果", "重視階層與責任", "需要長期累積", "行動偏保守"],
    },
    symbol: "\u2651\uFE0E", // ♑
    // color: "#2f4f4f",
    element: "earth",
    ruler: "saturn",
  },
  aquarius: {
    label: { zh: "水瓶", en: "Aquarius" },
    deco: {
      zh: [
        "傾向脫離既有框架",
        "重視群體概念",
        "喜歡非主流方法",
        "強調獨立思考",
      ],
    },
    symbol: "\u2652\uFE0E", // ♒
    // color: "#00bfff",
    element: "air",
    ruler: "saturn",
  },
  pisces: {
    label: { zh: "雙魚", en: "Pisces" },
    deco: {
      zh: [
        "容易模糊界線",
        "對外界感受高度滲透",
        "傾向逃避現實壓力",
        "依靠感覺流動",
      ],
    },
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
