export const fnYMToDate = (y: number, m: number, d: number): Date => 
    new Date(Date.UTC(y, m - 1, d));

export const fnYMToDateStr = (y: number, m: number, d: number): string => 
    fnDateToDateStr(fnYMToDate(y, m, d));

export const fnDateToDateStr = (date: Date): string =>
  date.toISOString().split("T")[0];

export const fnTimeToStr = (h: number, i: number, s: number): string =>
  [h, i, s].map((num) => num.toString().padStart(2, "0")).join(":");