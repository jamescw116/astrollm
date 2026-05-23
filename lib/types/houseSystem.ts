import { Label } from "./common";

export const HouseSystemList = [
  "P", // Placidus
  "K", // Koch
  "O", // Porphyry
  "R", // Regiomontanus
  "C", // Campanus
  "A", // Equal (Ascendant)
  "E", // Equal (MC)
  "W", // Whole Sign
] as const;
export type HouseSystemName = (typeof HouseSystemList)[number];

export const HouseNames: Label[] = [
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
];
