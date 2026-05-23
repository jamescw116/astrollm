export const fnTypeSystemPrompt = (type: string): string => {
  switch (type) {
    case "星體":
      return "lib\\ai\\systemPrompts\\01_planets.md";
    case "互融":
      return "lib\\ai\\systemPrompts\\02_mutualReceptions.md";
    case "相位":
      return "lib\\ai\\systemPrompts\\03_aspects.md";
    case "宮位":
      return "lib\\ai\\systemPrompts\\04_houses.md";
    case "總結":
      return "lib\\ai\\systemPrompts\\05_finalize.md";
  }
  return "";
};
