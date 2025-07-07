import AuthProvider, { useAuth } from "@/context/AuthContext";
import { SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "react-native";
import "./globals.css";
import { useEffect } from "react";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "auth";

    if (user && inAuthGroup) {
      router.replace("/(tabs)");
    } else if (!user && !inAuthGroup) {
      router.replace("/auth/Login");
    }

    if (!loading) {
        SplashScreen.hideAsync();
    }
  }, [user, loading]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar hidden={true} />
      <InitialLayout />
    </AuthProvider>
  );
}
