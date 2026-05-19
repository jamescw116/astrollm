import type { ChartData } from "@/lib/types/chartData";
import type { ColorModeName, XY } from "@/lib/types/common";

import { ChartConfig } from "@/lib/types/chartSetting";

import AstroChartHouses from "./AstroChartHouses";
import AstroChartZodiacs from "./AstroChartZodiac";
import AstroChartPlanets from "./AstroChartPlanets";
import AstroChartAxisLines from "./AstroChartAxisLine";

interface AstroChartCoreProps {
  data: ChartData;
  svgRef: React.RefObject<SVGSVGElement | null>;
  colorMode: ColorModeName;
  setColorMode: React.Dispatch<React.SetStateAction<ColorModeName>>;
  scale: number;
  setScale: React.Dispatch<React.SetStateAction<number>>;
  pan: XY;
  setPan: React.Dispatch<React.SetStateAction<XY>>;
  isDragging: boolean;
}

const AstroChartCore = ({
  data,
  svgRef,
  colorMode,
  setColorMode,
  scale,
  setScale,
  pan,
  setPan,
  isDragging,
}: AstroChartCoreProps) => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          ChartConfig.color.bg[colorMode as keyof typeof ChartConfig.color.bg],
        overflow: "hidden",
      }}
    >
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={`0 0 ${ChartConfig.size} ${ChartConfig.size}`}
        style={{
          maxWidth: "100vw",
          maxHeight: "100vh",
          display: "block",
          cursor: isDragging ? "grabbing" : "grab",
          touchAction: "none",
        }}
        preserveAspectRatio="xMidYMid meet"
      >
        <g transform={`translate(${pan.x} ${pan.y})`}>
          <g
            transform={`translate(${(1 - scale) * ChartConfig.centerXY.x} ${(1 - scale) * ChartConfig.centerXY.y}) scale(${scale})`}
          >
            {/* 12宮線 */}
            <AstroChartHouses houses={data.houses} colorMode={colorMode} />
            {/* 星座 */}
            <AstroChartZodiacs houses={data.houses} colorMode={colorMode} />
            {/* 行星符號 */}
            <AstroChartPlanets
              planets={data.planets}
              ascDeg={data.houses[0].degree}
            />
            {/* 地平線與天底天頂線 */}
            <AstroChartAxisLines houses={data.houses} colorMode={colorMode} />
            {/* 星盤圓 */}
            <circle
              cx={ChartConfig.centerXY.x}
              cy={ChartConfig.centerXY.y}
              r={ChartConfig.radius}
              fill="none"
              stroke={
                ChartConfig.color.line.main[
                  colorMode as keyof typeof ChartConfig.color.line.main
                ]
              }
              strokeWidth={1.5}
            />
          </g>
        </g>
      </svg>
      {/* 黑白模式 */}
      <button
        style={{
          position: "absolute",
          right: 20,
          top: 20,
          borderRadius: 8,
          padding: "2px 10px",
          fontSize: 14,
          color: colorMode === "light" ? "#333" : "#fff",
          cursor: "pointer",
        }}
        onClick={() =>
          setColorMode((prev) =>
            prev === "light" ? "dark" : prev === "dark" ? "system" : "light",
          )
        }
      >
        Mode: {colorMode}
      </button>
      {/* 可選：顯示縮放比例 */}
      <div
        style={{
          position: "absolute",
          right: 20,
          bottom: 20,
          borderRadius: 8,
          padding: "2px 10px",
          fontSize: 14,
          color: colorMode === "light" ? "#333" : "#fff",
          cursor: "pointer",
        }}
        onMouseDown={() => {
          setScale(1);
          setPan({ x: 0, y: 0 });
        }}
        title="Reset Zoom and Pan"
      >
        Zoom: {Math.round(scale * 100)}%
      </div>
    </div>
  );
};

export default AstroChartCore;
