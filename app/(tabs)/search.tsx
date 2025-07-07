import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { UpdateSearchCount } from "@/services/appwrite";
import usefetch from "@/services/usefetch";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

const search = () => {
  const [searchQuery, setsearchQuery] = useState("");
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    fetchData,
    reset,
  } = usefetch(() => fetchMovies({ query: searchQuery }), false);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery) {
        await fetchData();
        if (movies.length > 0 && movies[0]) {
          await UpdateSearchCount(searchQuery, movies[0]);
        }
      } else {
        reset();
      }
    }, 800);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);
  return (
    <View className="flex-1  bg-dark-200">
      <Image source={images.bg} className="w-full absolute z-0 " />
      <View className="   mt-40 px-5">
        <SearchBar
          value={searchQuery}
          onChangeText={setsearchQuery}
          onPress={() => {}}
        />
      </View>
      {moviesLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : moviesError ? (
        <Text className="text-white">Error occured ${moviesError.message}</Text>
      ) : (
        <View className="flex-1 mt-10 px-5 pb-40">
          {searchQuery && (
            <Text className="text-white text-xl mb-5">
              search result for{" "}
              <Text className="text-accent">{searchQuery}</Text>
            </Text>
          )}
          <FlatList
            data={movies || []}
            renderItem={({ item }) => {
              return <MovieCard {...item} />;
            }}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: "space-between",
              marginBottom: 10,
            }}
            ListEmptyComponent={
              !moviesError && !moviesLoading && searchQuery ? (
                <Text className="text-gray-400 text-center mt-40">
                  No movies found
                </Text>
              ) : (
                <Text className="text-gray-400 text-center mt-40">
                  Search for a movie
                </Text>
              )
            }
          />
        </View>
      )}
    </View>
  );
};

export default search;

const styles = StyleSheet.create({});
