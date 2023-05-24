import { useCallback, useEffect, useState } from "react";

const useFetch= <T,>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const fetchBookHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Algo salió mal!");
      }

      const responseData: T = await response.json();
      setData(responseData);
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    }
    setIsLoading(false);
  }, [url]);

  useEffect(() => {
    fetchBookHandler();
  }, [fetchBookHandler]);

  return { data, isLoading, error };
};

export default useFetch;
