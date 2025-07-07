import { useAuth } from "@/context/AuthContext";
import { createUser } from "@/services/appwrite";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { setUser } = useAuth();

  const handleSignup = async () => {
    if (!email || !password || !username) {
      setError("Please fill in all fields.");
      return;
    }
    try {
      const newUser = await createUser(email, password, username);
      setUser(newUser);
      router.replace("/(tabs)");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-primary"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        className="px-6"
      >
        <View className="w-full max-w-md">
          <Image
            source={require("../../assets/images/logo.png")}
            className="w-32 h-32 mx-auto mb-4"
            resizeMode="contain"
          />
          <Text className="text-3xl font-bold text-center mb-8 text-white">
            Sign Up
          </Text>
          {error ? (
            <Text className="text-red-500 mb-4 text-center">{error}</Text>
          ) : null}
          <TextInput
            className="border border-dark-200 rounded-lg px-4 py-3 mb-4 text-white bg-dark-100"
            placeholder="Username"
            placeholderTextColor="#888"
            autoCapitalize="none"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            className="border border-dark-200 rounded-lg px-4 py-3 mb-4 text-white bg-dark-100"
            placeholder="Email"
            placeholderTextColor="#888"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            className="border border-dark-200 rounded-lg px-4 py-3 mb-6 text-white bg-dark-100"
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            className="bg-accent rounded-lg py-3 mb-4"
            onPress={handleSignup}
          >
            <Text className="text-white text-center font-semibold text-lg">
              Sign Up
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/auth/Login")}>
            <Text className="text-accent text-center">
              Already have an account? Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
