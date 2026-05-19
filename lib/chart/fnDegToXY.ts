import type { XY } from "../types/common";

import { fnDegToRad } from "../common/fnDegToRad";

// 角度轉為SVG座標（0度在最左，逆時針）
export const fnDegToXY = (fmXY: XY, deg: number, len: number): XY => {
  const rad = fnDegToRad(deg); // 0度在最左，逆時針

  return {
    x: parseFloat((fmXY.x + len * Math.cos(rad)).toFixed(8)),
    y: parseFloat((fmXY.y + len * Math.sin(rad)).toFixed(8)),
  } satisfies XY;
};
