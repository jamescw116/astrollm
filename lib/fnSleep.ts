export const fnSleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
