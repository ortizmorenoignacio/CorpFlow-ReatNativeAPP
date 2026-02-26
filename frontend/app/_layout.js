import { Text, View } from "react-native";
import { router, Stack, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "../src/context/AuthContext";
import { useEffect } from "react";
// function Navigation() {
//   const { user, loading } = useAuth();
//   const segments = useSegments();
//   const router = useRouter();

//   useEffect(() => {
//     if (loading) return;

//     const carpetaPrivada = segments[0] === "(tabs)";
//     //Comprobamos si ya no hay usuario y si esta dentro de tabs (Es decir en el cerrar sesion)
//     if (!user && carpetaPrivada) {
//       router.replace("/"); //Lo mandamos al login
//     } else if (user && !carpetaPrivada) {
//       //Comprobamos que hay usuario y esta fuera de tabs (Es decir acaba de iniciar sesion desde login)
//       router.replace("/(tabs)");
//     }
//   }, [user, loading, segments, router]);

//   return (
//     <Stack
//       screenOptions={{
//         headerStyle: { backgroundColor: "white" },
//         headerTintColor: "black",
//         headerTitle: "",
//         headerLeft: () => (
//           <Text className="text-3xl font-bold text-slate-800">Deloitte</Text>
//         ),
//       }}
//     />
//   );
// }
export default function Layout() {
  return (
    <AuthProvider>
      <View className="flex-1 ">
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: "white" },
            headerTintColor: "black",
            headerTitle: "",
            headerLeft: () => (
              <Text className="text-3xl font-bold text-slate-800">
                Deloitte
              </Text>
            ),
          }}
        />
      </View>
    </AuthProvider>
  );
}
