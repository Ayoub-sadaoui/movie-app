import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = () => {
    // Placeholder for signup logic
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setError("");
    // TODO: Implement signup logic
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 justify-center items-center bg-white dark:bg-black px-6"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="w-full max-w-md">
        <Text className="text-3xl font-bold text-center mb-8 text-black dark:text-white">
          Sign Up
        </Text>
        {error ? (
          <Text className="text-red-500 mb-4 text-center">{error}</Text>
        ) : null}
        <TextInput
          className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 mb-4 text-black dark:text-white bg-gray-100 dark:bg-gray-800"
          placeholder="Email"
          placeholderTextColor="#888"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 mb-6 text-black dark:text-white bg-gray-100 dark:bg-gray-800"
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          className="bg-blue-600 rounded-lg py-3 mb-4"
          onPress={handleSignup}
        >
          <Text className="text-white text-center font-semibold text-lg">
            Sign Up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/auth/Login")}>
          <Text className="text-blue-600 text-center">
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
