import type { ChartData } from "@/lib/types/chartData";
import type { XY } from "@/lib/types/common";

import { ChartConfig } from "@/lib/types/chartSetting";

import { useTheme } from "@/lib/ThemeProvider";

import AstroChartHouses from "./AstroChartHouses";
import AstroChartZodiacs from "./AstroChartZodiac";
import AstroChartPlanets from "./AstroChartPlanets";
import AstroChartAxisLines from "./AstroChartAxisLine";
import AstroChartAspects from "./AstroChartAspects";
import { useGesture } from "@use-gesture/react/dist/declarations/src/useGesture";

interface AstroChartCoreProps {
  data: ChartData;
  svgRef: React.RefObject<SVGSVGElement | null>;
  bind: ReturnType<typeof useGesture>;
  scale: number;
  setScale: React.Dispatch<React.SetStateAction<number>>;
  pan: XY;
  setPan: React.Dispatch<React.SetStateAction<XY>>;
  isDragging: boolean;
}

const AstroChartCore = ({
  data,
  svgRef,
  bind,
  scale,
  setScale,
  pan,
  setPan,
  isDragging,
}: AstroChartCoreProps) => {
  const { realTheme } = useTheme();

  return (
    <div
      className={`
        ${realTheme === "dark" ? "scheme-dark" : "scheme-light"}
        relative w-full h-full flex items-center justify-center overflow-hidden
        `}
    >
      <svg
        {...bind()}
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
            {/* 12宮線 */}
            <AstroChartHouses houses={data.houses} />
            {/* 地平線與天底天頂線 */}
            <AstroChartAxisLines houses={data.houses} />
            {/* 星座 */}
            <AstroChartZodiacs houses={data.houses} />
            {/* 行星 */}
            <AstroChartPlanets
              planets={data.planets}
              ascDeg={data.houses[0].degree}
            />
            {/* 相位 */}
            <AstroChartAspects
              aspects={data.aspects}
              planets={data.planets}
              ascDeg={data.houses[0].degree}
            />
          </g>
        </g>
      </svg>
      {/* 可選：顯示縮放比例 */}
      <div
        className={`
          ${realTheme === "dark" ? "scheme-dark" : "scheme-light"}
          bg-(--background) text-(--foreground) 
          absolute right-5 bottom-5 px-2.5 py-0.5 text-[14px] rounded cursor-pointer
          `}
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
