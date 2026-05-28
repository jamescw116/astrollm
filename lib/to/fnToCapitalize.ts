export const fnToCapitalize = (str?: string): string | undefined =>
  str !== undefined && typeof str === "string" && str.length > 0
    ? str.charAt(0).toUpperCase() + str.slice(1)
    : undefined;
