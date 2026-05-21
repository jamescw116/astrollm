import type { ChartDataApiResponse, ChartDataInput } from "./chartData";

export const TestInput: ChartDataInput = 
{
  y: 1985,
  m: 11,
  d: 6,
  h: 17,
  i: 54,
  s: 0,
  tz: 8,
  lngD: 114,
  lngM: 6,
  latD: 22,
  latM: 12,
  hse: "P",
} satisfies ChartDataInput;
/*{
  y: 1985,
  m: 11,
  d: 6,
  h: 17,
  i: 54,
  s: 0,
  tz: 8,
  lngD: 114,
  lngM: 6,
  latD: 22,
  latM: 12,
  hse: "P",
} satisfies ChartDataInput;*/

export const TestData: ChartDataApiResponse = {
  p: {
    sun: {
      d: 223.92989,
      m: 1,
    },
    moon: {
      d: 140.876391,
      m: 1,
    },
    mercury: {
      d: 246.822495,
      m: 1,
    },
    venus: {
      d: 205.975015,
      m: 1,
    },
    mars: {
      d: 186.12508,
      m: 1,
    },
    jupiter: {
      d: 308.977846,
      m: 1,
    },
    saturn: {
      d: 238.742314,
      m: 1,
    },
    uranus: {
      d: 256.208208,
      m: 1,
    },
    neptune: {
      d: 271.650277,
      m: 1,
    },
    pluto: {
      d: 215.054155,
      m: 1,
    },
    northNode: {
      d: 39.172947,
      m: 1,
    },
    ceres: {
      d: 151.935691,
      m: 1,
    },
    pallas: {
      d: 98.103805,
      m: 1,
    },
    juno: {
      d: 220.848361,
      m: 1,
    },
    vesta: {
      d: 258.505747,
      m: 1,
    },
    chiron: {
      d: 73.477605,
      m: -1,
    },
    lilith: {
      d: 47.460623,
      m: 1,
    },
  },
  h: [
    47.861851, 75.922115, 100.562889, 125.78909, 154.990754, 190.061988,
    227.861851, 255.922115, 280.562889, 305.78909, 334.990754, 10.061988,
  ],
  fs: {
    Regulus: 149.627475,
    Aldebaran: 69.593187,
    Antares: 249.556162,
    Fomalhaut: 333.659646,
    Algol: 55.972996,
    Sirius: 103.887133,
    Arcturus: 204.026473,
    Vega: 285.108709,
  },
} satisfies ChartDataApiResponse;
