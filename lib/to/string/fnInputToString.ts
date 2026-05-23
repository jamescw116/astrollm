import type { ChartDataInput } from "@/lib/types/chartData";

import { fnToFixDp } from "../fnToFixDp";

export const fnInputToString = (input: ChartDataInput): string =>
  [
    input.y.toString().padStart(4, "0"),
    "-",
    input.m.toString().padStart(2, "0"),
    "-",
    input.d.toString().padStart(2, "0"),
    " ",
    input.h.toString().padStart(2, "0"),
    ":",
    input.m.toString().padStart(2, "0"),
    ":",
    input.s.toString().padStart(2, "0"),
    " ",
    input.tz >= 0 ? "+" : "-",
    fnToFixDp(Math.abs(input.tz), 1).toString().padStart(2, "0"),
    " ",
    `${fnToFixDp(input.lngD, 3)}${input.lngD > 0 ? "E" : "W"}${fnToFixDp(input.lngM, 2)}`,
    " ",
    `${fnToFixDp(input.latD, 2)}${input.latD > 0 ? "N" : "S"}${fnToFixDp(input.latM, 2)}`,
    " ",
    input.hse,
    "宮",
  ].join("");
