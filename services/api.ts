export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,

  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  try {
    const endpoint =
      query && query.trim() !== ""
        ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(
            query
          )}&include_adult=true`
        : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    console.log("Fetching from:", endpoint);

    const response = await fetch(endpoint, {
      method: "GET",
      headers: TMDB_CONFIG.headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      throw new Error(
        `Failed to fetch movies: ${
          errorData.status_message || response.statusText
        }`
      );
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const fetchMovieDetails = async (
  movieId: string
): Promise<MovieDetails> => {
  try {
    const endpoint = `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`;

    const response = await fetch(endpoint, {
      method: "GET",
      headers: TMDB_CONFIG.headers,
    });
    if (!response.ok) throw new Error("Failed to fetch movie details");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Fetch error:", error);
  }
};
