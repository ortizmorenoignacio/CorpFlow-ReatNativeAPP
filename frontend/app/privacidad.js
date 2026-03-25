import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { Screen } from "../src/components/Screen";
import { router, Stack } from "expo-router";
import { useState } from "react";
import { useAuth } from "../src/context/AuthContext";
import { cambiarContraseña } from "../src/api/services/usuarioService";

export default function PrivacidadScreen() {
  const { user } = useAuth();
  const [contraseñaActual, setContraseñaActual] = useState("");
  const [contraseñaNueva, setContraseñaNueva] = useState("");
  const [confirmacion, setConfirmacion] = useState("");

  const handleChangePassword = async () => {
    if (!contraseñaActual || !contraseñaNueva || !confirmacion) {
      Alert.alert("Error", "Por favor, rellena todos los campos.");
      return;
    }

    if (contraseñaNueva !== confirmacion) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }

    try {
      await cambiarContraseña(user._id, contraseñaActual, contraseñaNueva);
      Alert.alert(
        "¡Éxito!",
        "Tu contraseña ha sido actualizada correctamente.",
        [{ text: "Ok", onPress: () => router.back() }],
      );
    } catch {}
  };
  return (
    <Screen>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: () => (
            <Text className="text-3xl font-bold text-cyan-700 ml-3 ">
              Privacidad
            </Text>
          ),
        }}
      ></Stack.Screen>

      <View className="px-4 mt-4">
        <Text className="text-xl font-bold text-cyan-700 mb-6">
          Cambiar contraseña
        </Text>

        {/* Contraseña actual */}
        <Text className="text-base font-semibold mb-2">Contraseña actual</Text>
        <TextInput
          placeholder="Introduce tu contraseña actual"
          secureTextEntry
          className="border border-gray-300 p-4 mb-4 rounded-xl bg-white"
          value={contraseñaActual}
          onChangeText={setContraseñaActual}
        />

        {/* Nueva contraseña */}
        <Text className="text-base font-semibold mb-2">Nueva contraseña</Text>
        <TextInput
          placeholder="Nueva contraseña"
          secureTextEntry
          className="border border-gray-300 p-4 mb-4 rounded-xl bg-white"
          value={contraseñaNueva}
          onChangeText={setContraseñaNueva}
        />

        {/* Confirmar contraseña */}
        <Text className="text-base font-semibold mb-2">
          Confirmar contraseña
        </Text>
        <TextInput
          placeholder="Repite la nueva contraseña"
          secureTextEntry
          className="border border-gray-300 p-4 mb-6 rounded-xl bg-white"
          value={confirmacion}
          onChangeText={setConfirmacion}
        />

        {/* Botón */}
        <Pressable
          onPress={handleChangePassword}
          className="bg-cyan-600 p-4 rounded-2xl items-center"
        >
          <Text className="text-white font-bold text-lg">Guardar cambios</Text>
        </Pressable>
      </View>
    </Screen>
  );
}
