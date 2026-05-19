import type { ChartDataApiResponse, ChartDataInput } from "./types/chartData";

const fnInputToQuery = (input: ChartDataInput): string =>
  Object.entries(input)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

export const fnFetchAPI = async (
  input: ChartDataInput,
): Promise<ChartDataApiResponse> => {
  const api: string =
    process.env.SWEPH_API ?? "https://swephapi.vercel.app/api/planets";
  const res = await fetch(`${api}?${fnInputToQuery(input)}`);
  const data = await res.json();
  return data as ChartDataApiResponse;
};
