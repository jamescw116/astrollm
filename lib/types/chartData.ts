import type { AspectConfigObjectType, AspectName } from "./aspect";
import type { FixedStarName } from "./fixedStar";
import type { HouseSystemName } from "./houseSystem";
import type { AsteroidName, AstroPointName, PlanetName } from "./planet";
import type { ZodiacDMS, ZodiacName } from "./zodiac";

export type ChartDataInput = {
  y: number;
  m: number;
  d: number;
  h: number;
  i: number;
  s: number;
  tz: number; // 時區（小時）
  lngD: number; // 經度（度數，正東為正，正西為負）
  lngM: number; // 經度（分）
  latD: number; // 緯度（度數，正北為正，正南為負）
  latM: number; // 緯度（分）
  hse: HouseSystemName;
};

export type ChartDataApiResponsePlanetName =
  | PlanetName
  | AsteroidName
  | AstroPointName;

export type ChartDataApiResponsePlanets = Record<
  ChartDataApiResponsePlanetName,
  ChartDataApiResponsePlanet
>;
export type ChartDataApiResponseFixedStars = Record<FixedStarName, number>;
export type ChartDataApiResponse = {
  p: ChartDataApiResponsePlanets;
  h: number[]; // 0~360°
  fs: ChartDataApiResponseFixedStars; // 0~360°
};

export type ChartDataApiResponsePlanet = {
  d: number; // 0~360°
  m: number; // 1 = 順行, 0 = 駐留, -1 = 逆行
};

export type ChartData = {
  planets: ChartDataPlanets;
  asteroids: ChartDataAsteroids;
  astroPoints: ChartDataAstroPoints;
  houses: ChartDataHouse[];
  fixedStars: ChartDataFixedStars;
  aspects: ChartDataAspect[];
  mutualReceptions: ChartDataPlanetMutualReception[];
  powers: ChartDataPower[];
};

export type ChartDataAsteroids = Record<AsteroidName, ChartDataAsteroid>;
export type ChartDataAsteroid = {
  degree: number; // 度數 (0~360)
  zodiacDMS: ZodiacDMS;
  aspects: number[]; // 相關相位, AspectData[] 的 index
  is: {
    VoC: boolean; // 空亡
    cazimi: boolean; // 日中 0°17'
    combustion: boolean; // 燒傷 8°30'
    underSunbeams: boolean; // 日光約束 17°
  };
};

export type ChartDataAstroPoints = Record<AstroPointName, ChartDataAstroPoint>;
export type ChartDataAstroPoint = {
  degree: number; // 度數 (0~360)
  zodiacDMS: ZodiacDMS;
  aspects: number[]; // 相關相位, AspectData[] 的 index
};

export type ChartDataPlanets = Record<PlanetName, ChartDataPlanet>;
export type ChartDataPlanetFourElement = {
  domicile: PlanetName;
  exaltation: PlanetName;
  fall: PlanetName;
  detriment: PlanetName;
};
export type ChartDataPlanet = {
  degree: number; // 度數 (0~360)
  zodiacDMS: ZodiacDMS;
  fortune: ChartDataPlanetFortuneType;
  ruleHouse: [number] | [number, number] | undefined; // 守護宮位 (單守護或雙守護)
  atHouse: number;
  aspects: number[]; // 相關相位, AspectData[] 的 index
  mutualReceptions: number[];
  powers: number[]; // 強度索引, ChartDataPower[] 的 index
  fourElements?: ChartDataPlanetFourElement;
  is: {
    VoC: boolean; // 空亡
    cazimi: boolean; // 日中 0°17'
    combustion: boolean; // 燒傷 8°30'
    underSunbeams: boolean; // 日光約束 17°
  };
};

export type ChartDataPlanetFortuneType = 1 | 0 | -1; // 1 = 吉, 0 = 無, -1 = 凶

export type ChartDataPlanetMutualReception = {
  planets: [PlanetName, PlanetName];
  fortune: ChartDataPlanetFortuneType;
};

export type ChartDataHouse = {
  //houseIdx: number; // 宮位索引 (0~11 = 1~12宮)
  degree: number; // 0~360°
  zodiacDMS: ZodiacDMS;
  ruler: PlanetName; // 守護星
};

export type ChartDataFixedStars = Record<FixedStarName, ChartDataFixedStar>;
export type ChartDataFixedStar = {
  degree: number; // 0~360°
  zodiacDMS: ZodiacDMS;
  aspects: number[]; // 相關相位, AspectData[] 的 index
};

/*export type ChartDataAspectType =
  | "planet"
  | "asteroid"
  | "astroPoint"
  | "fixedStar"
  | "zodiac"
  | "axis"
  | "house"
  | "eqHouse";*/
export type ChartDataAspectFrom =
  | PlanetName // 行星
  | AsteroidName // 小行星
  | AstroPointName // 點
  | FixedStarName; // 固定星
export type ChartDataAspectTo =
  | PlanetName // 行星
  | AsteroidName // 小行星
  | AstroPointName // 點
  | FixedStarName // 固定星
  | ZodiacName // 座界
  | number; // 宮位索引 / 等宮位索引, ChartDataHouse[] 的 houseIdx
export type ChartDataAspect = {
  aspect: AspectName;
  degreeDiff: number; // 度數差 (0~180)
  orb: number; // 相位允許的最大度數差
  fromType: AspectConfigObjectType; // ChartDataAspectType;
  fromName: PlanetName | AsteroidName | AstroPointName | FixedStarName;
  toType: AspectConfigObjectType; // ChartDataAspectType;
  toName: ChartDataAspectTo;
  isTrueAspect: boolean; // 是否為真相位 (星座數差 = 0)
  power: number; // 強度
  active: boolean;
};

export type ChartDataPower = {
  planet: PlanetName;
  power: number;
  aspect: number; // ChartDataAspect[] 的 index
};
