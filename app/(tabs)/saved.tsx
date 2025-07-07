import SavedMovieCard from "@/components/SavedMovieCard";
import { useRealtimeSavedMovies } from "@/services/useRealtimeData";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

const saved = () => {
  const {
    movies: savedMovies,
    loading: savedMoviesLoading,
    error: savedMoviesError,
  } = useRealtimeSavedMovies();

  return (
    <View className="flex-1 bg-dark-200 justify-center gap-2 px-5">
      <Text className="text-white text-xl mt-10">Saved Movies</Text>

      {savedMoviesLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : savedMoviesError ? (
        <Text>Error</Text>
      ) : (
        <FlatList
          showsHorizontalScrollIndicator={false}
          className=" mt-5"
          data={savedMovies}
          contentContainerStyle={{
            gap: 26,
          }}
          renderItem={({ item, index }) => (
            <SavedMovieCard movie={item} index={index} />
          )}
          keyExtractor={(item) => item.movie_id.toString()}
        />
      )}
    </View>
  );
};

export default saved;

const styles = StyleSheet.create({});
