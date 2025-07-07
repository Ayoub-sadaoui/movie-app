import { useEffect, useState } from "react";

const usefetch = <T>(fetchFunction: () => Promise<T>, autofetch = true) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      setError(null);
      const data = await fetchFunction();
      setData(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Error occured"));
    } finally {
      setLoading(false);
    }
  };
  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  useEffect(() => {
    if (autofetch) fetchData();
  }, [autofetch]);

  return { data, loading, error, fetchData, reset };
};

export default usefetch;
