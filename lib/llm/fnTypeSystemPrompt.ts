import path from "path";

export const fnTypeSystemPrompt = (type: string): string => {
  const fnPathJoin = (fileName: string): string =>
    path.join("lib", "llm", "systemPrompts", fileName);

  switch (type) {
    case "星體":
      return fnPathJoin("01_planets.md");
      //return fnPathJoin("01_p.md");
    case "互融":
      return fnPathJoin("02_mutualReceptions.md");
    case "相位":
      return fnPathJoin("03_aspects.md");
    case "宮位":
      return fnPathJoin("04_houses.md");
    case "總結":
      return fnPathJoin("05_finalize.md");
  }

  return "";
};
