import type { Lang } from "@/lib/types/common";

import { fnHouseToString } from "./fnHouseToString";

export const fnRuleHouseToString = (
  ruleHouse: [number] | [number, number] | undefined,
  lang: Lang = "zh",
): string =>
  ruleHouse && ruleHouse.length > 0
    ? `是 ${ruleHouse.map((h) => fnHouseToString({ idx: h, lang })).join(" 及 ")} 宮主星`
    : "";
