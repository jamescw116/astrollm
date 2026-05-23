import path from "path";

export const fnTypeSystemPrompt = (type: string): string => {
  switch (type) {
    case "星體":
      return path.join(
        process.cwd(),
        "lib",
        "ai",
        "systemPrompts",
        "01_planets.md",
      );
    case "互融":
      return path.join(
        process.cwd(),
        "lib",
        "ai",
        "systemPrompts",
        "02_mutualReceptions.md",
      );
    case "相位":
      return path.join(
        process.cwd(),
        "lib",
        "ai",
        "systemPrompts",
        "03_aspects.md",
      );
    case "宮位":
      return path.join(
        process.cwd(),
        "lib",
        "ai",
        "systemPrompts",
        "04_houses.md",
      );
    case "總結":
      return path.join(
        process.cwd(),
        "lib",
        "ai",
        "systemPrompts",
        "05_finalize.md",
      );
  }
  return "";
};
