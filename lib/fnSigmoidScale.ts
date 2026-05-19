import { fnToFixDp } from "./common/fnToFixDp";

// 用來計算非線性能量
export const fnSigmoidScale = (
  value: number,
  min: number = 0,
  max: number = 100,
  k: number = 10,
): number => {
  if (min === max) return min; // 避免除以零嘅情況

  const realMin = Math.min(min, max);
  const realMax = Math.max(min, max);

  const clamped = Math.max(realMin, Math.min(realMax, value));

  // 將 min - max 對稱搬去 -0.5 鋪排到 0.5
  const x = (clamped - realMin) / (realMax - realMin) - 0.5;

  // Sigmoid 標準公式嘅變體
  const sigmoid = 1 / (1 + Math.exp(-k * x));

  // 因為 Sigmoid 喺有限區間內頭尾唔會完美等於 0 同 1，我哋要做個邊界修正 (Min-Max Normalization)
  const minSigmoid = 1 / (1 + Math.exp(-k * -0.5));
  const maxSigmoid = 1 / (1 + Math.exp(-k * 0.5));

  const normalized = (sigmoid - minSigmoid) / (maxSigmoid - minSigmoid);

  return fnToFixDp(normalized * (realMax - realMin) + realMin);
};
