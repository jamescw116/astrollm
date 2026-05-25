"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

import type { ChartData } from "@/lib/types/chartData";

import { ChartConfig } from "@/lib/types/chartSetting";

import { fnGetPanBoundsInUnits } from "@/lib/chart/fnGetPanBoundsUnUnits";
import { fnGetEventCoords } from "@/lib/chart/fnGetEventCoords";
import usePointerGestures from "@/lib/hooks/usePointerGestures";

import AstroChartCore from "./AstroChartCore";

interface AstroChartProps {
  data: ChartData;
}

const AstroChart: React.FC<AstroChartProps> = ({ data }) => {
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const clamp = useCallback(
    (value: number, min: number, max: number) =>
      Math.min(max, Math.max(min, value)),
    [],
  );

  const fnZoomCore = useCallback(
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

  // 滾輪縮放
  const fnZoomByWheel = useCallback(
    (e: globalThis.WheelEvent) => {
      if (e.ctrlKey || e.metaKey) return; // 避免與瀏覽器縮放衝突
      e.preventDefault();
      fnZoomCore(e.deltaY > 0 ? -0.1 : 0.1);
    },
    [fnZoomCore],
  );

  const fnMoveStart = useCallback(
    (e: globalThis.MouseEvent | globalThis.TouchEvent) => {
      // 1. 防止移動端捲動衝突 (重要！)
      if (e.type === "touchstart") {
        e.preventDefault();
      } else {
        e.preventDefault();
        if ((e as globalThis.MouseEvent).button !== 0) return;
      }

      setIsDragging(true);
      dragStartRef.current = fnGetEventCoords(e);
    },
    [],
  );

  const fnMovingCore = useCallback(
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

  const fnMoving = useCallback(
    (e: globalThis.MouseEvent | globalThis.TouchEvent) => {
      if (!isDragging || !dragStartRef.current) return;

      if (e.type === "touchmove") {
        e.preventDefault();
      }

      const { x, y } = fnGetEventCoords(e);
      fnMovingCore(x - dragStartRef.current.x, y - dragStartRef.current.y);
      dragStartRef.current = { x, y };
    },
    [isDragging, fnMovingCore],
  );

  const fnMoveEnd = useCallback(() => {
    setIsDragging(false);
    dragStartRef.current = null;
  }, []);

  usePointerGestures(svgRef, {
    onDrag: fnMovingCore,
    onZoom: fnZoomCore,
  });

  useEffect(() => {
    const svg = svgRef.current;

    if (!svg) return;

    svg.addEventListener("wheel", fnZoomByWheel, { passive: false });

    svg.addEventListener("pointerdown", fnMoveStart, { passive: false });
    svg.addEventListener("pointermove", fnMoving, { passive: false });
    svg.addEventListener("pointerup", fnMoveEnd);
    svg.addEventListener("pointercancel", fnMoveEnd);
    svg.addEventListener("pointerleave", fnMoveEnd);

    return () => {
      svg.removeEventListener("wheel", fnZoomByWheel);

      svg.removeEventListener("pointerdown", fnMoveStart);
      svg.removeEventListener("pointermove", fnMoving);
      svg.removeEventListener("pointerup", fnMoveEnd);
      svg.removeEventListener("pointercancel", fnMoveEnd);
      svg.removeEventListener("pointerleave", fnMoveEnd);
    };
  }, [fnZoomByWheel, fnMoveStart, fnMoving, fnMoveEnd]);

  return (
    <AstroChartCore
      data={data}
      svgRef={svgRef}
      scale={scale}
      setScale={setScale}
      pan={pan}
      setPan={setPan}
      isDragging={isDragging}
    />
  );
};

export default AstroChart;
