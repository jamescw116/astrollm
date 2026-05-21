import { fnToFixDp } from "../to/fnToFixDp";

export const fnCalcGap = (num1: number, num2: number): number =>
  num1 > num2 ? num1 - num2 : fnToFixDp(num2 - num1);
