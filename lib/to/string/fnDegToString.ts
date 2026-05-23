import type { ZodiacLabelFormat } from "./fnZodiacDMSToString";
import type { Lang } from "@/lib/types/common";

import { fnDegToZodiacDMS } from "../../common/fnDegToZodiacDMS";
import { fnZodiacDMSToString } from "./fnZodiacDMSToString";

export type DegToStringParams = {
  deg: number;
  motion?: number;
  zodiac?: ZodiacLabelFormat;
  lang?: Lang;
};

export const fnDegToString = (params: DegToStringParams): string =>
  fnZodiacDMSToString({
    zodiacDMS: fnDegToZodiacDMS(params.deg, params.motion),
    zodiac: params.zodiac,
    lang: params.lang,
  });
