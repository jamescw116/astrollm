export type XY = {
  x: number;
  y: number;
};

export type Line = {
  fm: XY;
  to: XY;
};

export const LangLists = ["zh", "en"] as const;
export type Lang = (typeof LangLists)[number];

export type Label = Record<Lang, string>;

export const ColorSchemeList = ["light", "dark"] as const;
export type ColorScheme = (typeof ColorSchemeList)[number];
export const ColorSchemeDisplayList = ["light", "dark", "system"] as const;
export type ColorSchemeDisplay = (typeof ColorSchemeDisplayList)[number];

export type DMS = {
  degree: number; // 0-30
  minute: number; // 0-60
  second: number; // 0-60
};
