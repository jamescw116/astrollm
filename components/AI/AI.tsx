import { useCallback, useEffect, useState } from "react";

import { ChartData } from "@/lib/types/chartData";
import { allExpanded, darkStyles, JsonView } from "react-json-view-lite";
import 'react-json-view-lite/dist/index.css';
import React from "react";

interface AIProps {
  data: ChartData;
}

const AI = ({ data }: AIProps) => {
  const [json, setJson] = useState<string>("");

  const fetchAIResponse = useCallback(async (d: ChartData) => {
    fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(d),
    })
      .then((res) => res.json())
      .then((data) => setJson(data));
  }, []);

  useEffect(() => {
    fetchAIResponse(data);
  }, [fetchAIResponse, data]);

  return (
    <React.Fragment>
      <JsonView
        data={json}
        shouldExpandNode={allExpanded}
        clickToExpandNode={true}
        compactTopLevel={true}
        style={darkStyles}
      />
    </React.Fragment>
  );
};

export default AI;
