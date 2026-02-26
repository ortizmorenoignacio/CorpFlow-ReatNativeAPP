import {
  View,
  Text,
  Pressable,
  Alert,
  ActivityIndicator,
  Modal,
} from "react-native";
import { Screen } from "../../src/components/Screen"; // O tu componente contenedor
import { useState } from "react";
import { useAuth } from "../../src/context/AuthContext";
import { useRouter } from "expo-router";

// ¡IMPORTANTE! Tiene que ser 'export default'
export default function LogoutScreen() {
  const { signOut } = useAuth();
  const [cargando, setCargando] = useState(false);
  const router = useRouter();
  const manejoSignOut = async () => {
    try {
      setCargando(true);

      await signOut();
      setTimeout(() => {
        router.replace("/login");
      }, 0);
    } catch (error) {
      Alert.alert("Error cerrando sesión", error.message);
    } finally {
      setCargando(false);
    }
  };
  return (
    <Modal transparent={true}>
      <View className="flex-1 justify-center items-center bg-black/50 px-6">
        <View className="w-full bg-white rounded-3xl p-8 shdow-xl items-center">
          <Text>¿Cerrar la sesión de tu cuenta?</Text>
          <View className="flex-row">
            <Pressable onPress={manejoSignOut} disabled={cargando}>
              {cargando ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-red-700 font-bold">Sí, salir </Text>
              )}
            </Pressable>
            <Pressable onPress={() => router.back()}>
              <Text>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
