import { fnToFixDp } from "../to/fnToFixDp";

export const fnCalcGap = (num1: number, num2: number): number =>
  fnToFixDp(180 - Math.abs(Math.abs(num1 - num2) - 180));
