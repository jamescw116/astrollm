export const fnCalcDegSpread = (
  planets: Record<number, number>,
  centerAngle: number,
  spacing: number = 5,
): Record<number, number> => {
  const n = Object.keys(planets).length;
  const result: Record<number, number> = {};

  // 1. 將星星按與中心的「相對夾角」排序
  // 使用前一個公式: 180 - Math.abs(Math.abs(a - b) - 180)
  const sortedPlanets = Object.entries(planets).sort((a, b) => {
    const gapA = a[1] - centerAngle;
    const gapB = b[1] - centerAngle;
    return gapA - gapB;
  });

  // 2. 從中心點向兩側散開
  // 例如：若 n=3, 偏移量為 [-5, 0, 5]
  sortedPlanets.forEach((p, index) => {
    const offset = index * spacing - (spacing * (n - 1)) / 2;
    const newDegree = (centerAngle + offset + 360) % 360;
    result[Number(p[0])] = newDegree;
  });

  return result;
};
