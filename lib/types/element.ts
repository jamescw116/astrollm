export const Elements = ["fire", "earth", "air", "water"] as const;
export type ElementName = (typeof Elements)[number];
