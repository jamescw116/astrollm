import { RefObject } from "react";

import { ChartConfig } from "../types/chartSetting";

export const fnGetPanBoundsInUnits = (
  svgRef: RefObject<SVGSVGElement | null>,
  nextScale: number,
) => {
  const svg = svgRef.current;
  if (!svg) {
    return {
      minX: 0,
      maxX: 0,
      minY: 0,
      maxY: 0,
      unitsPerPx: 1,
    };
  }

  const rect = svg.getBoundingClientRect();
  const renderedSquarePx = Math.min(rect.width, rect.height);
  const pxPerUnit = renderedSquarePx / ChartConfig.size;

  if (!Number.isFinite(pxPerUnit) || pxPerUnit <= 0) {
    return {
      minX: 0,
      maxX: 0,
      minY: 0,
      maxY: 0,
      unitsPerPx: 1,
    };
  }

  const unitsPerPx = 1 / pxPerUnit;

  const scaledSquarePx = renderedSquarePx * nextScale;

  const overflowXpx = Math.max(0, (scaledSquarePx - rect.width) / 2);
  const overflowYpx = Math.max(0, (scaledSquarePx - rect.height) / 2);

  return {
    minX: -overflowXpx * unitsPerPx,
    maxX: overflowXpx * unitsPerPx,
    minY: -overflowYpx * unitsPerPx,
    maxY: overflowYpx * unitsPerPx,
    unitsPerPx,
  };
};
