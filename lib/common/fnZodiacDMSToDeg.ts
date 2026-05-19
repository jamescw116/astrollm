import type { DMS } from "../types/common";
import type { ZodiacDMS } from "../types/zodiac";
import { ZodiacConfigs } from "../types/zodiac";

export const fnDMSToDeg = (dms: DMS): number =>
  fnZodiacDMSToDeg({ zodiac: "aries", dms, motion: 0 });

export const fnZodiacDMSToDeg = (zodiacDMS: ZodiacDMS): number =>
  Object.keys(ZodiacConfigs).indexOf(zodiacDMS.zodiac) * 30 +
  (zodiacDMS.dms.degree +
    zodiacDMS.dms.minute / 60 +
    zodiacDMS.dms.second / 3600);
