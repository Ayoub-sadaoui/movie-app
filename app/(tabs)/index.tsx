import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import usefetch from "@/services/usefetch";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();
  const {
    data: trendingMovies,
    loading: trendingMoviesLoading,
    error: trendingMoviesError,
  } = usefetch(() => getTrendingMovies());

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = usefetch(() => fetchMovies({ query: "" }));

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={require("../../assets/images/bg.png")}
        className="absolute w-full z-0"
      />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 20,
        }}
      >
        <Image
          source={require("../../assets/images/logo.png")}
          className="w-12 h-10 mt-20 mb-10 mx-auto"
        />

        {moviesError || trendingMoviesError ? (
          <Text className="text-center text-white mt-10">
            Error: {moviesError?.message || trendingMoviesError?.message}
          </Text>
        ) : moviesLoading || trendingMoviesLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View>
            <SearchBar
              onPress={() => router.push("/search")}
              value=""
              onChangeText={() => {}}
            />
            {trendingMovies && (
              <>
                <Text className="text-white text-xl mt-10">
                  Trending Movies
                </Text>

                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className=" mt-5"
                  data={trendingMovies}
                  contentContainerStyle={{
                    gap: 26,
                  }}
                  renderItem={({ item, index }) => (
                    <TrendingCard movie={item} index={index} />
                  )}
                  keyExtractor={(item) => item.movie_id.toString()}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                />
              </>
            )}
            <Text className="text-white text-xl mt-10 ">Latest Movies</Text>
            <FlatList
              data={movies}
              scrollEnabled={false}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <MovieCard {...item} />}
              numColumns={3}
              className=" mt-5 gap-32 pb-40 "
              columnWrapperStyle={{
                justifyContent: "flex-start",
                gap: 20,
                marginBottom: 10,
                paddingRight: 5,
              }}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
