import { useCallback, useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBookHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch( url );

      if (!response.ok) {
        throw new Error("Algo salió mal!");
      }

      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [url]);

  useEffect(() => {
    fetchBookHandler();
  }, [fetchBookHandler]);

  return { data, isLoading, error };
};

export default useFetch;
