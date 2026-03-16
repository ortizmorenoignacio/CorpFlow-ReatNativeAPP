import { Text, View } from "react-native";
import { router, Stack, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "../src/context/AuthContext";
import { useEffect } from "react";
import {
  CorporacionProvider,
  useCorporacion,
} from "../src/context/CorporacionContext";

function NombreCorporacion() {
  const { corporacionActiva } = useCorporacion();

  return (
    <View className="flex-1 ">
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}
export default function Layout() {
  return (
    <AuthProvider>
      <CorporacionProvider>
        <NombreCorporacion></NombreCorporacion>
      </CorporacionProvider>
    </AuthProvider>
  );
}
