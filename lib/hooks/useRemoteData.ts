import { useState, useEffect, useRef } from "react";

const useRemoteData = <T, P>(fnFetch: (params: P) => Promise<T>, params: P) => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // 使用 useRef 記錄上次請求的參數指紋，防止參數沒變卻重複請求
  const lastParamsRef = useRef<string | null>(null);

  useEffect(() => {
    if (!params) return;

    const paramsKey = JSON.stringify(params);
    // 如果參數跟上次一樣，直接跳過，省錢又省工
    if (lastParamsRef.current === paramsKey) return;

    const run = async () => {
      setLoading(true);
      try {
        lastParamsRef.current = paramsKey;

        const result = await fnFetch(params);

        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [params, fnFetch]);

  return { data, loading, error };
};

export default useRemoteData;
