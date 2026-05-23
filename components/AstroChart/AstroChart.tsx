"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

import type { ColorModeName } from "@/lib/types/common";
import type { ChartData } from "@/lib/types/chartData";

import { ChartConfig } from "@/lib/types/chartSetting";

import { fnGetPanBoundsInUnits } from "@/lib/chart/fnGetPanBoundsUnUnits";

import AstroChartCore from "./AstroChartCore";

interface AstroChartProps {
  data: ChartData;
}

const AstroChart: React.FC<AstroChartProps> = ({ data }) => {
  const [colorModeSys, setColorModeSys] = useState<ColorModeName | undefined>(
    undefined,
  );
  const [colorMode, setColorMode] = useState<ColorModeName>("system");
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

  // 滾輪縮放
  const handleWheel = useCallback(
    (e: globalThis.WheelEvent) => {
      if (e.ctrlKey || e.metaKey) return; // 避免與瀏覽器縮放衝突
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
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

  const handleMouseDown = useCallback((e: globalThis.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseMove = useCallback(
    (e: globalThis.MouseEvent) => {
      if (!isDragging || !dragStartRef.current) return;

      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      const bounds = fnGetPanBoundsInUnits(svgRef, scale);
      const dxUnits = dx * bounds.unitsPerPx;
      const dyUnits = dy * bounds.unitsPerPx;

      setPan((prev) => ({
        x: clamp(prev.x + dxUnits, bounds.minX, bounds.maxX),
        y: clamp(prev.y + dyUnits, bounds.minY, bounds.maxY),
      }));
      dragStartRef.current = { x: e.clientX, y: e.clientY };
    },
    [clamp, scale, isDragging, svgRef],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    dragStartRef.current = null;
  }, []);

  const getColorMode = (): ColorModeName => {
    if (colorMode === "system") {
      return colorModeSys || "light";
    }
    return colorMode;
  };

  useEffect(() => {
    const fnSetColorModeSys = async () => {
      setColorModeSys(
        window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light",
      );
    };

    fnSetColorModeSys();
  }, []);

  useEffect(() => {
    const svg = svgRef.current;

    if (!svg) return;

    svg.addEventListener("wheel", handleWheel, { passive: false });
    svg.addEventListener("mousedown", handleMouseDown);
    svg.addEventListener("mousemove", handleMouseMove);
    svg.addEventListener("mouseup", handleMouseUp);
    svg.addEventListener("mouseleave", handleMouseUp);

    return () => {
      svg.removeEventListener("wheel", handleWheel);
      svg.removeEventListener("mousedown", handleMouseDown);
      svg.removeEventListener("mousemove", handleMouseMove);
      svg.removeEventListener("mouseup", handleMouseUp);
      svg.removeEventListener("mouseleave", handleMouseUp);
    };
  }, [handleWheel, handleMouseDown, handleMouseMove, handleMouseUp]);

  return (
    <AstroChartCore
      data={data}
      svgRef={svgRef}
      colorMode={getColorMode()}
      setColorMode={setColorMode}
      colorModeDsp={colorMode}
      scale={scale}
      setScale={setScale}
      pan={pan}
      setPan={setPan}
      isDragging={isDragging}
    />
  );
};

export default AstroChart;
