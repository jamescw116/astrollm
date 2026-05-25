import { HTMLAttributes, useState } from "react";

import type { ChartData, ChartDataInput } from "@/lib/types/chartData";
import type { LayoutMode } from "../Layout/Layout";
import type { HouseSystemName } from "@/lib/types/houseSystem";

import {
  fnLngLagDspByIdx,
  fnLngLagIdx,
  LngLatList,
  LngLatLocations,
} from "@/lib/types/LngLat";
import { fnFetchAPI } from "@/lib/fnFetchAPI";
import { fnToChartData } from "@/lib/to/chartData/fnToChartData";
import { fnTimeToStr, fnYMToDateStr } from "@/lib/to/fnToDates";
import { useTheme } from "@/lib/ThemeProvider";

import Button from "./Inputs/Button";
import Select from "./Inputs/Select";
import Text from "./Inputs/Text";
import Number from "./Inputs/Number";
import Option from "./Inputs/Option";
import { HouseSystemList, HouseSystemNames } from "@/lib/types/houseSystem";

interface LayoutInputProps {
  input: ChartDataInput;
  className?: HTMLAttributes<HTMLElement>["className"];
  setInput: React.Dispatch<React.SetStateAction<ChartDataInput>>;
  setData: React.Dispatch<React.SetStateAction<ChartData | undefined>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setMode: React.Dispatch<React.SetStateAction<LayoutMode>>;
}

export interface InputPropsEx {
  label?: string;
}

const Input = ({
  input,
  className,
  setInput,
  setData,
  setLoading,
  setMode,
}: LayoutInputProps) => {
  const { theme, fnChangeTheme } = useTheme();

  const [dateStr, setDateStr] = useState<string>(
    fnYMToDateStr(input.y, input.m, input.d),
  );
  const [timeStr, setTimeStr] = useState<string>(
    fnTimeToStr(input.h, input.i, input.s),
  );

  const setInputDate = (dateStr: string) =>
    setInput((prev) => {
      const date = new Date(`${dateStr}T00:00:00`);

      if (isNaN(date.getTime())) {
        setDateStr(fnYMToDateStr(prev.y, prev.m, prev.d));
        return prev;
      }

      return {
        ...prev,
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
      };
    });

  const setInputTime = (timeStr: string) =>
    setInput((prev) => {
      const [h, i, s] = timeStr.split(":").map((t) => t as unknown as number);

      return { ...prev, h: h ?? 0, i: i ?? 0, s: s ?? 0 };
    });

  const setInputTz = (tz: number) => setInput((prev) => ({ ...prev, tz }));
  const setInputLngLag = (idx: number) =>
    setInput((prev) => {
      const { lngD, lngM, latD, latM, tz } =
        LngLatList[LngLatLocations[idx] as keyof typeof LngLatList];

      return { ...prev, lngD, lngM, latD, latM, tz };
    });

  const setInputHouseSystem = (hse: HouseSystemName) =>
    setInput((prev) => ({ ...prev, hse }));

  const fnSubmit = async () => {
    setMode("星圖");
    setData(undefined);
    setLoading(true);
    const apiResp = await fnFetchAPI(input);
    const chartData: ChartData = fnToChartData(input, apiResp);
    console.log("chartData", chartData);
    setData(chartData);
    setLoading(false);
  };

  return (
    <aside
      className={`flex flex-col gap-2 overflow-x-hidden p-2 border-gray-300
      w-full overflow-y-auto
      md:w-1/5 md:min-w-37.5 md:max-w-[50%] md:resize-x md:border-b-0 md:border-r
      ${className}
    `}
    >
      <Text
        type="date"
        onChange={(e) => setDateStr(e.target.value)}
        value={dateStr}
        onBlur={(e) => setInputDate(e.target.value)}
        label="選擇日期"
      />
      <Text
        type="time"
        onChange={(e) => setTimeStr(e.target.value)}
        value={timeStr}
        onBlur={(e) => setInputTime(e.target.value)}
        label="選擇時間"
      />
      <Number
        onChange={(e) => setInputTz(e.target.value as unknown as number)}
        step={0.5}
        min={-12}
        max={14}
        value={input.tz}
        label="選擇時區"
      />
      <Select
        onChange={(e) => setInputLngLag(e.target.value as unknown as number)}
        value={fnLngLagIdx(input.lngD, input.lngM, input.latD, input.latM)}
        label="選擇位置"
      >
        <Option value=""> - 請選擇 - </Option>
        {LngLatLocations.map((location, idx) => (
          <Option key={location} value={idx}>
            {fnLngLagDspByIdx(idx)}
          </Option>
        ))}
      </Select>
      <Select
        onChange={(e) => setInputHouseSystem(e.target.value as HouseSystemName)}
        value={input.hse}
        label="選擇宮位"
      >
        <Option value=""> - 請選擇 - </Option>
        {HouseSystemList.map((hse) => (
          <Option key={hse} value={hse}>
            {HouseSystemNames[hse]}
          </Option>
        ))}
      </Select>
      <div className="mt-5">&nbsp;</div>
      <div className="flex flex-1 flex-row md:flex-col items-center gap-2">
        <Button className="w-full" onClick={fnSubmit}>
          送出
        </Button>
        <Button className="w-full" onClick={fnChangeTheme}>
          切換主題 (目前: {theme})
        </Button>
      </div>
    </aside>
  );
};

export default Input;
