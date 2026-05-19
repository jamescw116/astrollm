import type { ZodiacDMS, ZodiacName } from "../types/zodiac";

import { ZodiacConfigs } from "../types/zodiac";

export const fnDegToZodiacDMS = (deg: number, motion?: number): ZodiacDMS => {
  const zodiac = Object.keys(ZodiacConfigs)[Math.floor(deg / 30)] as ZodiacName;
  const degree = Math.floor(deg % 30);
  const minute = Math.floor((deg - Math.floor(deg)) * 60);
  const second = Math.floor(((deg - Math.floor(deg)) * 60 - minute) * 60);

  return {
    zodiac,
    dms: {
      degree,
      minute,
      second,
    },
    motion,
  } satisfies ZodiacDMS;
};
