import type { Lang } from "@/lib/types/common";

import { HouseAxisNames, HouseNames } from "@/lib/types/houseSystem";

export type HouseToStringParams = {
  idx: number;
  eqHouse?: boolean;
  showAxis?: boolean;
  lang?: Lang;
};

export const fnHouseToString = (params: HouseToStringParams): string =>
  (params.showAxis
    ? HouseAxisNames[params.idx][params.lang ?? "en"]
    : HouseNames[params.idx][params.lang ?? "en"]) +
  (params.eqHouse ? " (等宮)" : "");
