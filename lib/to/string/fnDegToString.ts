import { fnDegToZodiacDMS } from "../../common/fnDegToZodiacDMS";
import { fnZodiacDMSToString } from "./fnZodiacDMSToString";

export const fnDegToString = (deg: number, motion?: number, zodiac: "string" | "symbol" | "" = "string"): string =>
  fnZodiacDMSToString(fnDegToZodiacDMS(deg, motion), zodiac);
