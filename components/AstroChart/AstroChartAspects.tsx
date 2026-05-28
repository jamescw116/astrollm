"use client";

import type { ChartDataAspect, ChartDataPlanets } from "@/lib/types/chartData";
import type { PlanetName } from "@/lib/types/planet";
import type { AspectName } from "@/lib/types/aspect";
import type { XY } from "@/lib/types/common";

import { PlanetConfigs } from "@/lib/types/planet";
import { ChartConfig } from "@/lib/types/chartSetting";
import { AspectConfigs } from "@/lib/types/aspect";

import { fnDegToXY } from "@/lib/chart/fnDegToXY";
import { fnDegToString } from "@/lib/to/string/fnDegToString";

interface AstroChartAspectProps {
  aspectName: AspectName;
  fromName: string;
  p1Deg: number;
  toName: string;
  p2Deg: number;
  power: number;
  diff: number;
}

const AstroChartAspect = ({
  aspectName,
  fromName,
  p1Deg,
  toName,
  p2Deg,
  power,
  diff,
}: AstroChartAspectProps) => {
  const p1Name = PlanetConfigs[fromName as PlanetName].symbol;
  const p2Name = PlanetConfigs[toName as PlanetName].symbol;

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

  const lineWidth = (0.75 * power) / 100 + 0.25;
  const lineDash = (5 * (1 - power / 100)).toString();

  return (
    <g className="phase-line">
      <line
        x1={fmXY.x}
        y1={fmXY.y}
        x2={toXY.x}
        y2={toXY.y}
        stroke={AspectConfigs[aspectName].color}
        strokeWidth={lineWidth}
        strokeDasharray={`${lineDash} ${lineDash}`}
        style={{ userSelect: "none", pointerEvents: "auto", cursor: "pointer" }}
      />
      <line
        x1={fmXY.x}
        y1={fmXY.y}
        x2={toXY.x}
        y2={toXY.y}
        stroke="transparent"
        strokeWidth={5}
        style={{ userSelect: "none", pointerEvents: "auto", cursor: "pointer" }}
      >
        <title>{`${p1Name} ${AspectConfigs[aspectName].symbol} ${p2Name} (${fnDegToString({ deg: diff })})`}</title>
      </line>
    </g>
  );
};

interface AstroChartAspectsProps {
  aspects: ChartDataAspect[];
  planets: ChartDataPlanets;
  ascDeg: number;
}

const AstroChartAspects = ({
  aspects,
  planets,
  ascDeg,
}: AstroChartAspectsProps) =>
  aspects
    .filter(
      (aspect) =>
        AspectConfigs[aspect.aspect as AspectName].type === "main" &&
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
          aspectName={aspect.aspect as AspectName}
          fromName={aspect.fromName}
          p1Deg={p1}
          toName={aspect.toName as PlanetName}
          p2Deg={p2}
          power={aspect.power}
          diff={aspect.degreeDiff}
        />
      );
    });

export default AstroChartAspects;
