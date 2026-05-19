export const fnCalcMin = (
  num1: number | undefined,
  num2: number | undefined,
): number =>
  num1 !== undefined && num2 !== undefined ? Math.min(num1, num2) : 0;
