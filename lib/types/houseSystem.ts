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
