import type { ZodiacDMS } from "@/lib/types/zodiac";
import type { Lang } from "@/lib/types/common";

import { ZodiacConfigs } from "@/lib/types/zodiac";

import { fnToLabel } from "./fnToLabel";

export type ZodiacLabelFormat = "string" | "symbol" | "";
export type ZodiacDMSToStringParams = {
  zodiacDMS: ZodiacDMS;
  zodiac?: ZodiacLabelFormat;
  lang?: Lang;
};

export const fnZodiacDMSToString = (
  params: ZodiacDMSToStringParams,
): string => {
  return [
    params.zodiac === "symbol"
      ? ZodiacConfigs[params.zodiacDMS.zodiac].symbol
      : params.zodiac === "string"
        ? fnToLabel(params.zodiacDMS.zodiac, params.lang ?? "en")
        : "",
    " ",
    params.zodiacDMS.dms.degree.toString().padStart(2, "0"),
    "°",
    " ",
    params.zodiacDMS.dms.minute.toString().padStart(2, "0"),
    "'",
    params.zodiacDMS.motion === -1
      ? " R"
      : params.zodiacDMS.motion === 0
        ? " S"
        : "",
  ]
    .join("")
    .trim();
};
