import type { XY } from "@/lib/types/common";
import type { PlanetName } from "@/lib/types/planet";
import type { ChartDataPlanet, ChartDataPlanets } from "@/lib/types/chartData";

import { ChartConfig } from "@/lib/types/chartSetting";
import { PlanetConfigs } from "@/lib/types/planet";

import { fnDegToXY } from "@/lib/chart/fnDegToXY";
import { fnZodiacDMSToString } from "@/lib/to/string/fnZodiacDMSToString";

interface AstroChartPlanetProps {
  name: PlanetName;
  planet: ChartDataPlanet;
  ascDeg: number;
  cXY: XY;
  len: number;
}

const AstroChartPlanet = ({
  name,
  planet,
  ascDeg,
  cXY,
  len,
}: AstroChartPlanetProps) => {
  const relDeg = (planet.degree - ascDeg + 360) % 360;
  const tickFm = fnDegToXY(cXY, relDeg, len);
  const tickTo = fnDegToXY(cXY, relDeg, len - ChartConfig.ticks.tick);
  const pXY = fnDegToXY(cXY, relDeg, len - ChartConfig.ticks.planet);

  return (
    <>
      <text
        key={name + "-glyph"}
        x={pXY.x}
        y={pXY.y}
        fontSize={ChartConfig.fontSize.planet}
        textAnchor="middle"
        alignmentBaseline="middle"
        fill={PlanetConfigs[name].color}
        style={{ userSelect: "none", pointerEvents: "auto", cursor: "pointer" }}
      >
        <title>{fnZodiacDMSToString(planet.zodiacDMS)}</title>
        {PlanetConfigs[name]?.symbol || "?"}
      </text>

      <line
        key={name + "-deg-tick"}
        x1={tickFm.x}
        y1={tickFm.y}
        x2={tickTo.x}
        y2={tickTo.y}
        stroke={PlanetConfigs[name].color}
        strokeWidth={1}
      />
    </>
  );
};

interface AstroChartPlanetsProps {
  planets: ChartDataPlanets;
  ascDeg: number;
}

const AstroChartPlanets = ({ planets, ascDeg }: AstroChartPlanetsProps) =>
  Object.entries(planets).map(([name, planet]: [string, ChartDataPlanet]) => (
    <AstroChartPlanet
      key={name}
      name={name as PlanetName}
      planet={planet}
      ascDeg={ascDeg}
      cXY={ChartConfig.centerXY}
      len={ChartConfig.radius - ChartConfig.ticks.spacing}
    />
  ));

export default AstroChartPlanets;
