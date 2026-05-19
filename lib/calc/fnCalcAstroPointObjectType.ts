import type { AspectConfigObjectType } from "../types/aspect";
import type { AstroPointName } from "../types/planet";

export const fnCalcAstroPointObjectType = (
  name: AstroPointName,
): AspectConfigObjectType =>
  (({
    lilith: "apogee",
    northNode: "node",
  })[name] ?? "other") as AspectConfigObjectType;
