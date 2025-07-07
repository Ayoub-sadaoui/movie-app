import { useEffect, useState } from "react";
import { getSavedMovies, subscribeToSavedMovies } from "./appwrite";

export const useRealtimeSavedMovies = () => {
  const [movies, setMovies] = useState<SavedMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Initial fetch
    setLoading(true);
    getSavedMovies()
      .then((data) => {
        if (data) setMovies(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });

    // Set up realtime subscription
    const unsubscribe = subscribeToSavedMovies((updatedMovies) => {
      setMovies(updatedMovies);
    });

    // Clean up subscription on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  return { movies, loading, error };
};
