import type { ChartDataAspect, ChartDataPlanets } from "@/lib/types/chartData";
import type { PlanetName } from "@/lib/types/planet";
import type { AspectName } from "@/lib/types/aspect";
import type { ColorModeName, XY } from "@/lib/types/common";

import { ChartConfig } from "@/lib/types/chartSetting";
import { AspectConfigs } from "@/lib/types/aspect";
import { fnDegToXY } from "@/lib/chart/fnDegToXY";

interface AstroChartAspectProps {
  aspect: AspectName;
  p1Deg: number;
  p2Deg: number;
  power: number;
  colorMode: ColorModeName;
}

const AstroChartAspect = ({
  aspect,
  p1Deg,
  p2Deg,
  power,
  colorMode,
}: AstroChartAspectProps) => {
  const fmXY: XY = fnDegToXY(
    ChartConfig.centerXY,
    p1Deg,
    ChartConfig.radiusAspect - 1,
  );
  const toXY: XY = fnDegToXY(
    ChartConfig.centerXY,
    p2Deg,
    ChartConfig.radiusAspect - 1,
  );

  const lineWidth = (0.75 * power / 100) + 0.25;
  //const lineDash = (5 * (1 - (power / 100))).toString();

  return (
    <line
      x1={fmXY.x}
      y1={fmXY.y}
      x2={toXY.x}
      y2={toXY.y}
      stroke={AspectConfigs[aspect].color}
      strokeWidth={lineWidth}
      //strokeDasharray={`${lineDash} ${lineDash}`}
    />
  );
};

interface AstroChartAspectsProps {
  aspects: ChartDataAspect[];
  planets: ChartDataPlanets;
  ascDeg: number;
  colorMode: ColorModeName;
}

const AstroChartAspects = ({
  aspects,
  planets,
  ascDeg,
  colorMode,
}: AstroChartAspectsProps) =>
  aspects
    .filter(
      (aspect) =>
        ["main", "sub"].includes(aspect.fromType) &&
        ["main", "sub"].includes(aspect.toType),
    )
    .map((aspect, idx) => {
      const p1 =
        (planets[aspect.fromName as PlanetName].degree - ascDeg + 360) % 360;
      const p2 =
        (planets[aspect.toName as PlanetName].degree - ascDeg + 360) % 360;

      return (
        <AstroChartAspect
          key={idx}
          aspect={aspect.aspect as AspectName}
          p1Deg={p1}
          p2Deg={p2}
          power={aspect.power}
          colorMode={colorMode}
        />
      );
    });

export default AstroChartAspects;
