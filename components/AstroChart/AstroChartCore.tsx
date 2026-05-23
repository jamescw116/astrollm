import type { ChartData } from "@/lib/types/chartData";
import type { ColorModeName, XY } from "@/lib/types/common";

import { ChartConfig } from "@/lib/types/chartSetting";

import AstroChartHouses from "./AstroChartHouses";
import AstroChartZodiacs from "./AstroChartZodiac";
import AstroChartPlanets from "./AstroChartPlanets";
import AstroChartAxisLines from "./AstroChartAxisLine";
import AstroChartAspects from "./AstroChartAspects";

interface AstroChartCoreProps {
  data: ChartData;
  svgRef: React.RefObject<SVGSVGElement | null>;
  colorMode: ColorModeName;
  setColorMode: React.Dispatch<React.SetStateAction<ColorModeName>>;
  colorModeDsp: ColorModeName;
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
  colorModeDsp,
  scale,
  setScale,
  pan,
  setPan,
  isDragging,
}: AstroChartCoreProps) => {
  return (
    <div
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
      style={{
        background:
          ChartConfig.color.bg[colorMode as keyof typeof ChartConfig.color.bg],
      }}
    >
      <svg
        className="w-full h-full touch-none"
        ref={svgRef}
        viewBox={`0 0 ${ChartConfig.size} ${ChartConfig.size}`} // 0 0 400 400
        style={{
          cursor: isDragging ? "grabbing" : "grab",
        }}
        preserveAspectRatio="xMidYMid meet"
      >
        <g transform={`translate(${pan.x} ${pan.y})`}>
          <g
            transform={`translate(${(1 - scale) * ChartConfig.centerXY.x} ${(1 - scale) * ChartConfig.centerXY.y}) scale(${scale})`}
          >
            {/* 相位線 */}
            <AstroChartAspects
              aspects={data.aspects}
              planets={data.planets}
              ascDeg={data.houses[0].degree}
              colorMode={colorMode}
            />
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
        Mode: {colorModeDsp}
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
