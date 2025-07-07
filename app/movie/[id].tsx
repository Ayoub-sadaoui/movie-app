import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import {
  getSavedMovie,
  saveMovie,
  subscribeToSavedMovies,
} from "@/services/appwrite";
import usefetch from "@/services/usefetch";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const [isSaved, setIsSaved] = useState(false);
  const {
    data: movie,
    loading,
    error,
  } = usefetch(() => fetchMovieDetails(id as string));
  const {
    data: savedMovie,
    loading: savedMoviesLoading,
    error: savedMoviesError,
  } = usefetch(() => getSavedMovie(Number(id)));

  useEffect(() => {
    setIsSaved(savedMovie?.[0]?.is_saved || false);
  }, [savedMovie]);

  useEffect(() => {
    if (!id) return;

    // Subscribe to changes in saved movies
    const unsubscribe = subscribeToSavedMovies((updatedMovies) => {
      // Find this specific movie in the updated list
      const updatedMovie = updatedMovies.find((m) => m.movie_id === Number(id));
      // Update saved status if found
      if (updatedMovie) {
        setIsSaved(updatedMovie.is_saved);
      }
    });

    // Clean up subscription when component unmounts
    return () => {
      unsubscribe();
    };
  }, [id]);

  return (
    <View className="flex-1 bg-dark-200 ">
      <ScrollView
        className="flex-1 pb-40"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`,
          }}
          className="w-full h-[450px] rounded-lg "
          resizeMode="stretch"
        />
        <View className="px-5 mt-4 pb-20">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-white text-2xl font-bold flex-1">
              {movie?.title}
            </Text>

            <TouchableOpacity
              style={{
                padding: 10,
                zIndex: 10,
              }}
              onPress={() => {
                const newIsSaved = !isSaved;
                saveMovie(movie, newIsSaved);
                setIsSaved(newIsSaved);
              }}
            >
              {isSaved ? (
                <Ionicons name="bookmark" size={28} color="#AB8BFF" />
              ) : (
                <Ionicons name="bookmark-outline" size={28} color="white" />
              )}
            </TouchableOpacity>
          </View>

          <Text className="text-gray-400 text-sm mt-2">
            {movie?.release_date.split("-")[0]}
            {"  "} {movie?.runtime} m
          </Text>

          <View className="flex-row items-center bg-dark-100 rounded-lg p-2 mt-2 w-40">
            <Image
              source={icons.star}
              className="w-4 h-4"
              resizeMode="stretch"
            />

            <Text className="text-white text-sm font-bold ">
              {" "}
              {Math.round(movie?.vote_average)}/10 {"   "}
              <Text className="text-gray-400 text-s font-normal">
                ({movie?.vote_count} votes)
              </Text>
            </Text>
          </View>
          {/* Overview */}

          <View className="flex-row items-start gap-2 mt-2 flex-col mt-6">
            <Text className="text-gray-400 text-sm ">Overview</Text>
            <Text className="text-white text-md font-semibold ">
              {movie?.overview}
            </Text>
          </View>
          {/* Genre */}
          <View className="flex-row items-start gap-2 mt-2 flex-col mt-6">
            <Text className="text-gray-400 text-sm ">Genre</Text>
            <Text className="text-white text-sm ">
              {movie?.genres
                .map((genre) => {
                  return genre.name;
                })
                .join(" - ")}
            </Text>
          </View>
          {/* budget & revenue */}
          <View className="flex-row items-start  mt-4">
            <View className=" w-1/2 mt-2 flex-col ">
              <Text className="text-gray-400 text-sm ">Budget</Text>
              <Text className="text-white text-md mt-2">
                $ {movie?.budget / 1_000_000} ml
              </Text>
            </View>
            <View className=" w-1/2 mt-2 flex-col">
              <Text className="text-gray-400 text-sm ">Revenue</Text>
              <Text className="text-white text-md mt-2">{movie?.revenue}</Text>
            </View>
          </View>
          {/* Production Companies */}
          <View className="flex-row items-start gap-2 mt-2 flex-col mt-6">
            <Text className="text-gray-400 text-sm ">Production Companies</Text>
            <Text className="text-white text-md ">
              {movie?.production_companies
                .map((company) => {
                  return company.name;
                })
                .join(" - ")}
            </Text>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        className="fixed bottom-14 flex-row justify-center items-center gap-2 bg-accent mx-5 
        rounded-lg left-0 right-0 bg-primary-500 py-3"
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={20} color="white" />
        <Text className="text-white text-center text-md font-bold">
          Go back
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({});
