import { XY } from "../types/common";

export const fnGetEventCoords = (e: globalThis.MouseEvent | globalThis.TouchEvent): XY =>
  "touches" in e
    ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
    : { x: e.clientX, y: e.clientY };
