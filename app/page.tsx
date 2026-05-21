"use client";

import { useEffect, useState } from "react";

import type { ChartData } from "@/lib/types/chartData";

import { TestData, TestInput } from "@/lib/types/testData";

import { fnFetchAPI } from "@/lib/fnFetchAPI";
import { fnToChartData } from "@/lib/to/chartData/fnToChartData";

import AstroChart from "@/components/AstroChart/AstroChart";
import AI from "@/components/AI/AI";

const drType: "local" | "api" = "local" as "local" | "api";
const dspMode: "chart" | "ai" = "ai" as "chart" | "ai";

const Home = () => {
  const [data, setData] = useState<ChartData | undefined>(undefined);

  useEffect(() => {
    const fnSetData = async () => {
      let chartData: ChartData | undefined = undefined;
      switch (drType) {
        case "api":
          const apiResp = await fnFetchAPI(TestInput);
          chartData = fnToChartData(apiResp);
          break;

        case "local":
          chartData = fnToChartData(TestData);
          break;
      }
      console.log("chartData", chartData);
      setData(chartData);
    };

    fnSetData();

    return () => {
      setData(undefined);
    }
  }, []);

  return (
    <>
      {data ? (
        dspMode === "chart" ? (
          <AstroChart data={data} />
        ) : (
          <AI chartData={data} />
        )
      ) : (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            color: "#888",
          }}
        >
          請提供星盤資料
        </div>
      )}
    </>
  );
};

export default Home;
