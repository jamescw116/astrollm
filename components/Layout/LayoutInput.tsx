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

import Button from "./Inputs/Button";
import Select from "./Inputs/Select";
import Input from "./Inputs/Input";
import InputNumber from "./Inputs/Number";

interface LayoutInputProps {
  input: ChartDataInput;
  setInput: React.Dispatch<React.SetStateAction<ChartDataInput>>;
  //data: ChartData | undefined;
  setData: React.Dispatch<React.SetStateAction<ChartData | undefined>>;
  //loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const LayoutInput = ({ input, setInput, setData, setLoading }: LayoutInputProps) => {
  const [dateStr, setDateStr] = useState<string>(
    fnYMToDateStr(input.y, input.m, input.d)
  );
  const [timeStr, setTimeStr] = useState<string>(
    fnTimeToStr(input.h, input.i, input.s)
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
      const [h, i, s] = timeStr.split(":").map(Number);

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
    <div className="flex flex-col gap-4">
      <div>日期</div>
      <Input
        type="date"
        onChange={(e) => setDateStr(e.target.value)}
        value={dateStr}
        onBlur={(e) => setInputDate(e.target.value)}
      />
      <div className="mt-5">時間</div>
      <Input
        type="time"
        onChange={(e) => setTimeStr(e.target.value)}
        value={timeStr}
        onBlur={(e) => setInputTime(e.target.value)}
      />
      <div className="mt-5">時區</div>
      <InputNumber
        onChange={(e) => setInputTz(Number(e.target.value))}
        step={0.5}
        min={-12}
        max={14}
        value={input.tz}
      />
      <div className="mt-5">位置</div>
      <Select
        onChange={(e) => setInputLngLag(Number(e.target.value))}
        value={fnLngLagIdx(input.lngD, input.lngM, input.latD, input.latM)}
      >
        <option value=""> - 請選擇 - </option>
        {LngLatLocations.map((location, idx) => (
          <option key={location} value={idx}>
            {fnLngLagDspByIdx(idx)}
          </option>
        ))}
      </Select>
      <div className="mt-5">&nbsp;</div>
      <Button onClick={fnSubmit}>送出</Button>
    </div>
  );
};

export default LayoutInput;
