import { icons } from "@/constants/icons";
import { Image, StyleSheet, TextInput, View } from "react-native";

const SearchBar = ({
  onPress,
  value,
  onChangeText,
}: {
  onPress: () => void;
  value: string;
  onChangeText: (text: string) => void;
}) => {
  return (
    <View className="flex-row justify-center items-center px-4 py-1 bg-dark-100 rounded-full">
      <Image source={icons.search} />
      <TextInput
        placeholder="Search"
        placeholderTextColor="#a8b5db"
        className="flex-1 ml-1 text-white"
        onChangeText={onChangeText}
        onPress={onPress}
        value={value}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
