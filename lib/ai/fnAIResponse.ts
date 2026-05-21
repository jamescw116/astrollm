"use server";

const fnTypeSteps = (type: string): string => {
  switch (type) {
    case "星體": return "星體本質與落入星座的'染色'過程.";
    case "互融": return "互融(Mutual Reception)對星體能量的轉換與補救.";
    case "相位": return "相位(Aspects)引發的星體動量互動.";
    case "宮位": return "宮位(Houses)作為具象化舞臺的顯化.";
  }
  return "";
}

export const fnAIResponse = async (
  type: string,
  data: string,
  ref: string = "",
): Promise<string> =>
  await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      //    'HTTP-Referer': '<YOUR_SITE_URL>', // Optional. Site URL for rankings on openrouter.ai.
      //    'X-OpenRouter-Title': '<YOUR_SITE_NAME>', // Optional. Site title for rankings on openrouter.ai.
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENROUTER_MODEL,
      messages: [
        {
          role: "system",
          content:
            "你是一位精通古典占星的分析師." +
            "你只進行基於古典占星原理的技術分析,嚴禁提供心靈雞湯,現代心理諮商或靈性建議." +
            "分析邏輯:" + fnTypeSteps(type) +
            "在分析過程中,必須保持高度理性,專注於結構與能量判定." +
            "結果必須是基於上述分析邏輯的具體結論,而非籠統描述." +
            "禁止跨星體比較 (除非在相位與互融階段)," +
            "並確保推導出的狀態(如廟旺陷落)符合古典邏輯." +
            "以繁體中文輸出結果,禁止任何前言或後語."
        },
        {
          role: "user",
          content: `請${ref.length > 0 ? `參考「${ref}」,並\n` : ""}分析${type}資料: ${data}`,
        },
      ],
    }),
  })
    .then((resp: Response) => resp.json())
    .then((json) => {
      console.log(`AI response ${type}:`, json.choices?.[0].message.content);
      return json.choices?.[0].message.content as string || ""
    })
    .catch((error) => error);
