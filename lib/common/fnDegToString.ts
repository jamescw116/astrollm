import type { ZodiacDMS } from "../types/zodiac";

import { ZodiacConfigs } from "../types/zodiac";

import { fnDegToZodiacDMS } from "./fnDegToZodiacDMS";

export const fnZodiacDMSToString = (zodiacDMS: ZodiacDMS): string => {
  return [
    ZodiacConfigs[zodiacDMS.zodiac].symbol,
    " ",
    zodiacDMS.dms.degree.toString().padStart(2, "0"),
    "°",
    " ",
    zodiacDMS.dms.minute.toString().padStart(2, "0"),
    "'",
    zodiacDMS.motion === -1 ? " R" : zodiacDMS.motion === 0 ? " S" : "",
  ].join("");
};

export const fnDegToString = (deg: number, motion?: number): string =>
  fnZodiacDMSToString(fnDegToZodiacDMS(deg, motion));
