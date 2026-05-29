import type { Lang } from "@/lib/types/common";

import { Houses } from "@/lib/types/houseSystem";

export type HouseToStringParams = {
  idx: number;
  eqHouse?: boolean;
  showAxis?: boolean;
  lang?: Lang;
};

export const fnHouseToString = (params: HouseToStringParams): string =>
  (params.showAxis
    ? Houses[params.idx].nameAxis[params.lang ?? "en"]
    : Houses[params.idx].name[params.lang ?? "en"]) +
  (params.eqHouse ? " [等宮]" : "");
