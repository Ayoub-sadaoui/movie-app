import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
const MovieCard = ({
  title,
  id,
  poster_path,
  vote_average,
  release_date,
}: Movie) => {
  return (
    <Link href={`/movie/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path})`
              : `https://placehold.co/600x400/1a1a1a/ffffff.png`,
          }}
          className="w-full h-52 rounded-lg"
          style={{
            resizeMode: "cover",
            width: "100%",
            height: 180,
            borderRadius: 8,
          }}
        />
        <Text className="text-white mt-2 font-bold text-md" numberOfLines={1}>
          {title}
        </Text>
        <View className="flex-row  items-center  gap-x-1 mt-1">
          <Ionicons name="star" size={16} color="gold" />
          <Text className="text-white font-bold text-md">
            {Math.round(vote_average / 2)}
          </Text>
        </View>
        <Text className="text-white font-200  text-sm text-gray-400">
          {release_date}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;

const styles = StyleSheet.create({});
