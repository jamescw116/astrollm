import type { ChartDataHouse } from "../../types/chartData";

import { fnDegToZodiacDMS } from "../../common/fnDegToZodiacDMS";
import { ZodiacConfigs } from "../../types/zodiac";

const fnToChartDataHouse = (apiRespHouse: number): ChartDataHouse => {
  const zodiacDMS = fnDegToZodiacDMS(apiRespHouse);

  return {
    degree: apiRespHouse,
    zodiacDMS: zodiacDMS,
    ruler: ZodiacConfigs[zodiacDMS.zodiac].ruler,
  } satisfies ChartDataHouse;
};

export const fnToChartDataHouses = (houses: number[]): ChartDataHouse[] =>
  houses.map(fnToChartDataHouse) satisfies ChartDataHouse[];
