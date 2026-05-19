export const FixedStarList = [
  "Regulus", // 軒轅十四
  "Aldebaran", // 畢宿五
  "Antares", // 心宿二
  "Fomalhaut", // 北落師門 / 南魚座α
  "Algol", // 大陵五

  "Sirius", // 天狼星
  "Arcturus", // 大角星
  "Vega", // 織女星
] as const;
export type FixedStarName = (typeof FixedStarList)[number];
