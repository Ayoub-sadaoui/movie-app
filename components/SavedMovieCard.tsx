import { icons } from "@/constants/icons";
import { saveMovie } from "@/services/appwrite";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

const TrendingCard = ({ movie, index }: TrendingCardProps) => {
  const { movie_id, movie_title, movie_poster, movie_rating, is_saved } = movie;
  return (
    <Link href={`/movie/${movie_id}`} asChild>
      <TouchableOpacity className="w-32 relative  flex-row items-center gap-2  w-full">
        <Image
          source={{ uri: movie_poster }}
          className="w-28 h-28 rounded-lg"
          resizeMode="cover"
        />
        <View
          className="w-64 flex-row  justify-between "
          //   style={{ width: "100%" }}
        >
          <View className=" items-start justify-start ">
            <Text
              className="text-lg font-bold mt-2 text-light-200"
              numberOfLines={1}
            >
              {movie_title}
            </Text>
            <View className="flex-row items-center bg-dark-100 rounded-lg p-2 mt-2 w-17 justify-center">
              <Image
                source={icons.star}
                className="w-4 h-4"
                resizeMode="stretch"
              />

              <Text className="text-white text-sm font-bold ">
                {" "}
                {Math.round(movie_rating)}/10 {"   "}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              padding: 10,
              zIndex: 10,
            }}
            onPress={() => {
              saveMovie(movie, is_saved);
            }}
          >
            {is_saved ? (
              <Ionicons name="bookmark" size={28} color="#AB8BFF" />
            ) : (
              <Ionicons name="bookmark-outline" size={28} color="white" />
            )}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;
