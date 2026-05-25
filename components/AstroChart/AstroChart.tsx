"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useGesture } from "@use-gesture/react";

import type { ChartData } from "@/lib/types/chartData";

import { ChartConfig } from "@/lib/types/chartSetting";

import { fnGetPanBoundsInUnits } from "@/lib/chart/fnGetPanBoundsUnUnits";
import { fnGetEventCoords } from "@/lib/chart/fnGetEventCoords";

import AstroChartCore from "./AstroChartCore";
import { XY } from "@/lib/types/common";

interface AstroChartProps {
  data: ChartData;
}

const AstroChart: React.FC<AstroChartProps> = ({ data }) => {
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState<XY>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  //const dragStartRef = useRef<{ x: number; y: number } | null>(null);*/
  const svgRef = useRef<SVGSVGElement>(null);

  const clamp = useCallback(
    (value: number, min: number, max: number) =>
      Math.min(max, Math.max(min, value)),
    [],
  );

  const fnZoom = useCallback(
    (delta: number) => {
      setScale((prev) => {
        let next = prev + delta;
        if (next < ChartConfig.scale.min) next = ChartConfig.scale.min;
        if (next > ChartConfig.scale.max) next = ChartConfig.scale.max;
        const rounded = Number(next.toFixed(2));
        const bounds = fnGetPanBoundsInUnits(svgRef, rounded);
        setPan((prevPan) => ({
          x: clamp(prevPan.x, bounds.minX, bounds.maxX),
          y: clamp(prevPan.y, bounds.minY, bounds.maxY),
        }));
        return rounded;
      });
    },
    [clamp, svgRef],
  );

  const fnMoving = useCallback(
    (dx: number, dy: number) => {
      const bounds = fnGetPanBoundsInUnits(svgRef, scale);
      const dxUnits = dx * bounds.unitsPerPx;
      const dyUnits = dy * bounds.unitsPerPx;
      setPan((prev) => ({
        x: clamp(prev.x + dxUnits, bounds.minX, bounds.maxX),
        y: clamp(prev.y + dyUnits, bounds.minY, bounds.maxY),
      }));
    },
    [clamp, scale, svgRef],
  );

  const bind = useGesture(
    {
      onDrag: ({ active, delta: [dx, dy] }) => {
        fnMoving(dx, dy);
        setIsDragging(active);
      },
      onPinch: ({ delta: [d] }) => fnZoom(d > 0 ? 0.1 : -0.1),
      onWheel: ({ direction: [, dy] }) => fnZoom(dy > 0 ? -0.1 : 0.1),
    },
    {
      drag: { from: () => [pan.x, pan.y], filterTaps: true },
      wheel: { eventOptions: { passive: false } },
    },
  );

  return (
    <AstroChartCore
      data={data}
      svgRef={svgRef}
      bind={bind}
      scale={scale}
      setScale={setScale}
      pan={pan}
      setPan={setPan}
      isDragging={isDragging}
    />
  );
};

export default AstroChart;
