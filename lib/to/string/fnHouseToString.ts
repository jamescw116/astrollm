const fnHouseToStringCore = (idx: number, eqHouse?: boolean): string =>
  `${eqHouse ? "Equal " : ""}House ${(idx + 1).toString().padStart(2, "0")}`;

export const fnHouseToString = (
  idx: number,
  eqHouse: boolean = false,
  showAxis: boolean = true,
): string => {
  let name: string;

  if (showAxis) {
    switch (idx) {
      case 0:
        name = "ASC";
        break;
      case 3:
        name = "IC";
        break;
      case 6:
        name = "DSC";
        break;
      case 9:
        name = "MC";
        break;
      default:
        name = fnHouseToStringCore(idx, eqHouse);
    }
  } else {
    name = fnHouseToStringCore(idx, eqHouse);
  }

  return name;
};
