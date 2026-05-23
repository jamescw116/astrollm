export const fnCalcDegMean = (degrees: number[]): number => {
  let sumSin = 0;
  let sumCos = 0;

  degrees.forEach((deg) => {
    const rad = deg * (Math.PI / 180);
    sumSin += Math.sin(rad);
    sumCos += Math.cos(rad);
  });

  const avgRad = Math.atan2(sumSin / degrees.length, sumCos / degrees.length);
  const avgDeg = avgRad * (180 / Math.PI);

  // 確保回傳值是 0-360
  return (avgDeg + 360) % 360;
};
