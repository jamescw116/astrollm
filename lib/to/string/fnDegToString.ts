import type { ZodiacLabelFormat } from "./fnZodiacDMSToString";
import type { Lang } from "@/lib/types/common";

import { fnDegToZodiacDMS } from "../../common/fnDegToZodiacDMS";
import { fnZodiacDMSToString } from "./fnZodiacDMSToString";

export type DegToStringParams = {
  deg: number;
  motion?: number;
  format?: ZodiacLabelFormat;
  lang?: Lang;
  desc?: boolean;
};

export const fnDegToString = (params: DegToStringParams): string =>
  fnZodiacDMSToString({
    zodiacDMS: fnDegToZodiacDMS(params.deg, params.motion),
    format: params.format,
    lang: params.lang,
    desc: params.desc,
  });
