import type { Lang } from "@/lib/types/common";

export const fnRuleHouseToString = (
  ruleHouse: [number] | [number, number] | undefined,
  lang: Lang = "zh",
): string =>
  ruleHouse && ruleHouse.length > 0
    ? `(${ruleHouse.map((h) => (h + 1).toString()).join(" / ")} 宮主星)`
    : "";
