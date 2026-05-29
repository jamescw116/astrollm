import { Label } from "./common";

export const HouseSystemList = [
  "P", // Placidus
  "K", // Koch
  "O", // Porphyry
  "R", // Regiomontanus
  "C", // Campanus
  "A", // Ascendant
  "E", // Equal
  "W", // Whole Sign
] as const;
export const HouseSystemNames = {
  P: "Placidus",
  K: "Koch",
  O: "Porphyry",
  R: "Regiomontanus",
  C: "Campanus",
  A: "Ascendant",
  E: "Equal",
  W: "Whole Sign",
} as const;
export type HouseSystemName = (typeof HouseSystemList)[number];

/*export const HouseNames: Label[] = [
  { zh: "一宮", en: "1st" },
  { zh: "二宮", en: "2nd" },
  { zh: "三宮", en: "3rd" },
  { zh: "四宮", en: "4th" },
  { zh: "五宮", en: "5th" },
  { zh: "六宮", en: "6th" },
  { zh: "七宮", en: "7th" },
  { zh: "八宮", en: "8th" },
  { zh: "九宮", en: "9th" },
  { zh: "十宮", en: "10th" },
  { zh: "十一宮", en: "11th" },
  { zh: "十二宮", en: "12th" },
];

export const HouseAxisNames: Label[] = [
  { zh: "上昇", en: "ASC" },
  { zh: "二宮", en: "2nd" },
  { zh: "三宮", en: "3rd" },
  { zh: "天底", en: "IC" },
  { zh: "五宮", en: "5th" },
  { zh: "六宮", en: "6th" },
  { zh: "下降", en: "DSC" },
  { zh: "八宮", en: "8th" },
  { zh: "九宮", en: "9th" },
  { zh: "天頂", en: "MC" },
  { zh: "十一宮", en: "11th" },
  { zh: "十二宮", en: "12th" },
];*/

export type House = {
  name: Label<string>;
  nameAxis: Label<string>;
  area: Label<string[]>;
};
export const Houses: House[] = [
  {
    name: { zh: "一宮", en: "1st" },
    nameAxis: { zh: "上昇", en: "ASC" },
    area: {
      zh: [
        "直接對外顯現",
        "優先即時反應",
        "容易被外界觀察",
        "影響主體存在方式",
      ],
    },
  },
  {
    name: { zh: "二宮", en: "2nd" },
    nameAxis: { zh: "二宮", en: "2nd" },
    area: {
      zh: [
        "涉及可持續資源",
        "重視控制與保存",
        "關注交換價值",
        "影響穩定供應能力",
      ],
    },
  },
  {
    name: { zh: "三宮", en: "3rd" },
    nameAxis: { zh: "三宮", en: "3rd" },
    area: {
      zh: ["小範圍資訊流動", "快速互動", "短距離交換", "建立日常認知連結"],
    },
  },
  {
    name: { zh: "四宮", en: "4th" },
    nameAxis: { zh: "天底", en: "IC" },
    area: {
      zh: ["建立內部基礎", "維持安全區域", "儲存歷史記憶", "保護核心根基"],
    },
  },
  {
    name: { zh: "五宮", en: "5th" },
    nameAxis: { zh: "五宮", en: "5th" },
    area: {
      zh: ["主動創造輸出", "強化自我表現", "尋求注意與回應", "容易產生娛樂性"],
    },
  },
  {
    name: { zh: "六宮", en: "6th" },
    nameAxis: { zh: "六宮", en: "6th" },
    area: {
      zh: ["處理維持性工作", "修正問題", "維持流程運作", "面對現實細節壓力"],
    },
  },
  {
    name: { zh: "七宮", en: "7th" },
    nameAxis: { zh: "下降", en: "DSC" },
    area: {
      zh: [
        "與外部對等互動",
        "必須考慮對方存在",
        "建立合作或對抗",
        "容易形成鏡像關係",
      ],
    },
  },
  {
    name: { zh: "八宮", en: "8th" },
    nameAxis: { zh: "八宮", en: "8th" },
    area: {
      zh: ["涉及共享控制權", "進入深層交換", "面對風險與壓力", "容易產生重組"],
    },
  },
  {
    name: { zh: "九宮", en: "9th" },
    nameAxis: { zh: "九宮", en: "9th" },
    area: {
      zh: ["建立大型理解框架", "擴展視野", "尋找抽象原則", "形成信念系統"],
    },
  },
  {
    name: { zh: "十宮", en: "10th" },
    nameAxis: { zh: "天頂", en: "MC" },
    area: {
      zh: ["建立社會定位", "接受外部評價", "面對制度壓力", "追求可見成果"],
    },
  },
  {
    name: { zh: "十一宮", en: "11th" },
    nameAxis: { zh: "十一宮", en: "11th" },
    area: {
      zh: ["進入群體網絡", "建立共同理念", "分散個體中心", "強調集體方向"],
    },
  },
  {
    name: { zh: "十二宮", en: "12th" },
    nameAxis: { zh: "十二宮", en: "12th" },
    area: {
      zh: ["難以直接觀察", "容易隱藏與滲透", "模糊邊界", "容易失控或消散"],
    },
  },
];
