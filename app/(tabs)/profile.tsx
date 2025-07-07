import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "@/services/appwrite";
import { useRouter } from "expo-router";

const profile = () => {
  const { user, setUser } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    setUser(null);
    router.replace("/auth/Login");
  };

  return (
    <View className="flex-1 bg-dark-200 items-center justify-center gap-2">
      <Text className="text-white text-2xl mb-4">Welcome, {user?.name || 'User'}</Text>
      <TouchableOpacity
        className="bg-accent rounded-lg py-3 px-6"
        onPress={handleLogout}
      >
        <Text className="text-white font-semibold text-lg">Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({});
