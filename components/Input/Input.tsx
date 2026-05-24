import { useState } from "react";

import type { ChartData, ChartDataInput } from "@/lib/types/chartData";

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

interface LayoutInputProps {
  input: ChartDataInput;
  setInput: React.Dispatch<React.SetStateAction<ChartDataInput>>;
  setData: React.Dispatch<React.SetStateAction<ChartData | undefined>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface InputPropsEx {
  label?: string;
}

const Input = ({ input, setInput, setData, setLoading }: LayoutInputProps) => {
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

  const fnSubmit = async () => {
    setData(undefined);
    setLoading(true);
    const apiResp = await fnFetchAPI(input);
    const chartData: ChartData = fnToChartData(input, apiResp);
    console.log("chartData", chartData);
    setData(chartData);
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-2">
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
      <div className="mt-5">&nbsp;</div>
      <Button onClick={fnSubmit}>送出</Button>
      <Button onClick={fnChangeTheme}>切換主題 (目前: {theme})</Button>
    </div>
  );
};

export default Input;
