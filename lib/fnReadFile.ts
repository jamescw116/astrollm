import fs from "fs";
import path from "path";

export const fnReadFile = (filename: string): string => {
  const filePath = path.join(process.cwd(), filename);
  return fs.readFileSync(filePath, "utf8");
};
