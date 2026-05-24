import type { XY } from "@/lib/types/common";
import type { PlanetName } from "@/lib/types/planet";
import type { ChartDataPlanet, ChartDataPlanets } from "@/lib/types/chartData";

import { ChartConfig } from "@/lib/types/chartSetting";
import { PlanetConfigs } from "@/lib/types/planet";

import { fnDegToXY } from "@/lib/chart/fnDegToXY";
import { fnZodiacDMSToString } from "@/lib/to/string/fnZodiacDMSToString";
import { fnPlanetsTooClose } from "@/lib/chart/fnPlanetTooClose";

interface AstroChartPlanetProps {
  planetName: PlanetName;
  planet: ChartDataPlanet;
  planetDeg: number;
  ascDeg: number;
  cXY: XY;
  len: number;
}

const AstroChartPlanet = ({
  planetName,
  planet,
  planetDeg,
  ascDeg,
  cXY,
  len,
}: AstroChartPlanetProps) => {
  const relDeg = (planet.degree - ascDeg + 360) % 360;
  const tickFm = fnDegToXY(cXY, relDeg, len);
  const tickTo = fnDegToXY(cXY, relDeg, len - ChartConfig.ticks.tick);
  const fixDeg = (planetDeg - ascDeg + 360) % 360;
  const pXY = fnDegToXY(cXY, fixDeg, len - ChartConfig.ticks.planet);

  return (
    <>
      <text
        key={name + "-glyph"}
        x={pXY.x}
        y={pXY.y}
        fontSize={ChartConfig.fontSize.planet}
        textAnchor="middle"
        alignmentBaseline="middle"
        fill={PlanetConfigs[planetName].color}
        style={{ userSelect: "none", pointerEvents: "auto", cursor: "pointer" }}
      >
        <title>
          {fnZodiacDMSToString({
            zodiacDMS: planet.zodiacDMS,
            zodiac: "symbol",
          })}
        </title>
        {PlanetConfigs[planetName]?.symbol || "?"}
      </text>

      <line
        key={planetName + "-deg-tick"}
        x1={tickFm.x}
        y1={tickFm.y}
        x2={tickTo.x}
        y2={tickTo.y}
        stroke={PlanetConfigs[planetName].color}
        strokeWidth={1}
      />
    </>
  );
};

interface AstroChartPlanetsProps {
  planets: ChartDataPlanets;
  ascDeg: number;
}

const AstroChartPlanets = ({ planets, ascDeg }: AstroChartPlanetsProps) => {
  const planetDegs = fnPlanetsTooClose(planets);

  return Object.entries(planets).map(
    ([planetName, planet]: [string, ChartDataPlanet]) => (
      <AstroChartPlanet
        key={planetName}
        planetName={planetName as PlanetName}
        planet={planet}
        planetDeg={planetDegs[planetName as PlanetName] ?? planet.degree}
        ascDeg={ascDeg}
        cXY={ChartConfig.centerXY}
        len={ChartConfig.radius - ChartConfig.ticks.spacing}
      />
    ),
  );
};
export default AstroChartPlanets;
