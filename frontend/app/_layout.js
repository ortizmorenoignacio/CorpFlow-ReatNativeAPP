import { Stack, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "../src/context/AuthContext";
import { CorporacionProvider } from "../src/context/CorporacionContext";
import { useEffect } from "react";
import "../global.css";

function InitialLayout() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // if (loading) return;
    // const inAuthGroup = segments[0] === "login";
    // if (!user && !inAuthGroup) {
    //   router.replace("/login");
    // } else if (user && inAuthGroup) {
    //   router.replace("/(tabs)");
    // }
  }, [user, loading, segments, router]);

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function Layout() {
  return (
    <AuthProvider>
      <CorporacionProvider>
        <InitialLayout />
      </CorporacionProvider>
    </AuthProvider>
  );
}
