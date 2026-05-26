export const LngLatLocations = [
  "香港",
  "本拿比",
  "溫哥華",
  "台北",
  "紐約",
  "倫敦",
  "東京",
  "雪梨",
  "巴黎",
  "莫斯科",
  "杜拜",
  "新加坡",
];
export type LngLatLocationName = (typeof LngLatLocations)[number];

export type LngLat = {
  lngD: number;
  lngM: number;
  latD: number;
  latM: number;
  tz: number;
};

export type LngLatLists = Record<LngLatLocationName, LngLat>;

export const LngLatList: LngLatLists = {
  香港: { lngD: 114, lngM: 10, latD: 22, latM: 18, tz: 8 },
  本拿比: { lngD: -122, lngM: 57, latD: 49, latM: 15, tz: -7 },
  溫哥華: { lngD: -123, lngM: 6, latD: 49, latM: 16, tz: -7 },
  台北: { lngD: 121, lngM: 31, latD: 25, latM: 2, tz: 8 },
  紐約: { lngD: -74, lngM: 0, latD: 40, latM: 42, tz: -5 },
  倫敦: { lngD: 0, lngM: 0, latD: 51, latM: 30, tz: 0 },
  東京: { lngD: 139, lngM: 41, latD: 35, latM: 41, tz: 9 },
  雪梨: { lngD: 151, lngM: 12, latD: -33, latM: 52, tz: 10 },
  巴黎: { lngD: 2, lngM: 21, latD: 48, latM: 51, tz: 1 },
  莫斯科: { lngD: 37, lngM: 37, latD: 55, latM: 45, tz: 3 },
  杜拜: { lngD: 55, lngM: 16, latD: 25, latM: 16, tz: 4 },
  新加坡: { lngD: 103, lngM: 51, latD: 1, latM: 17, tz: 8 },
};

export const fnLngLagByIdx = (idx: number) =>
  LngLatList[LngLatLocations[idx] as keyof typeof LngLatList];

export const fnLngLagDspByIdx = (idx: number): string => {
  const { lngD, lngM, latD, latM } =
    LngLatList[LngLatLocations[idx] as keyof typeof LngLatList];
  const lngLag = fnLngLagDsp(lngD, lngM, latD, latM);

  return `${LngLatLocations[idx]} (${lngLag})`;
};

export const fnLngLagDsp = (
  lngD: number,
  lngM: number,
  latD: number,
  latM: number,
): string => {
  const lng = `${Math.abs(lngD)}°${lngM}'${lngD < 0 ? "W" : "E"}`;
  const lat = `${Math.abs(latD)}°${latM}'${latD < 0 ? "S" : "N"}`;

  return `Lng: ${lng}, Lat: ${lat}`;
};

export const fnLngLagIdx = (
  lngD: number,
  lngM: number,
  latD: number,
  latM: number,
): number =>
  LngLatLocations.findIndex((location) => {
    const {
      lngD: d,
      lngM: m,
      latD: ld,
      latM: lm,
    } = LngLatList[location as keyof typeof LngLatList];

    return d === lngD && m === lngM && ld === latD && lm === latM;
  });
