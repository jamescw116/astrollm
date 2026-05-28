export const fnToCapitalize = (str?: string): string | undefined =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : undefined;