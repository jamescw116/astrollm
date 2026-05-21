import type { ZodiacDMS } from "@/lib/types/zodiac";

import { ZodiacConfigs } from "@/lib/types/zodiac";

import { fnToCapitalize } from "../fnToCapitalize";

export const fnZodiacDMSToString = (
  zodiacDMS: ZodiacDMS,
  zodiac: "string" | "symbol" | "" = "string",
): string => {
  return [
    zodiac === "symbol"
      ? ZodiacConfigs[zodiacDMS.zodiac].symbol
      : zodiac === "string"
        ? fnToCapitalize(zodiacDMS.zodiac)
        : "",
    " ",
    zodiacDMS.dms.degree.toString().padStart(2, "0"),
    "°",
    " ",
    zodiacDMS.dms.minute.toString().padStart(2, "0"),
    "'",
    zodiacDMS.motion === -1 ? " R" : zodiacDMS.motion === 0 ? " S" : "",
  ].join("").trim();
};
