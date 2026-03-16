import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { Screen } from "../src/components/Screen";
import { router, Stack } from "expo-router";
import { useState } from "react";

import { registrarCorporacion } from "../src/api/services/corporacionService";
import { useAuth } from "../src/context/AuthContext";
export default function CrearCorporacionScreen() {
  const { user } = useAuth();
  const [nombre, setNombre] = useState("");

  const [cargando, setCargando] = useState(false);

  const handleRegister = async () => {
    //Validamos los campos vacios
    if (!nombre) {
      alert("El nombre no puede estar vacío");
      return;
    }

    try {
      setCargando(true);

      const datos = {
        nombre: nombre,
        logo: "C:\Users\ortiz\Desktop\CorpFlow\frontend\assets\favicon.png",
        usuarioId: user._id,
      };

      await registrarCorporacion(datos);

      Alert.alert(
        "¡Éxito!", // Título
        "Corporacion creado correctamente. Pulsa OK para volver.", // Mensaje (String)
        [{ text: "OK", onPress: () => router.replace("/(tabs)") }], // Botones (Array)
      );
    } catch (error) {
      if (error.response) {
        // El servidor respondió con un código de error (400, 401, 500...)
        console.log(" Datos de error del servidor:", error.response.data);
        alert("Error: " + JSON.stringify(error.response.data));
      } else if (error.request) {
        // La petición se hizo pero no hubo respuesta
        alert("No hubo respuesta del servidor. ¿Está encendido?");
      } else {
        alert("Error de configuración: " + error.message);
      }
    } finally {
      setCargando(false);
    }
  };
  return (
    <Screen>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        className="p-5 mb-10"
      >
        <Stack.Screen options={{ headerShown: false }} />
        <View className="mb-10 mt-5">
          <Text className="text-4xl font-extrabold text-cyan-700 mb-2 text-center">
            CORPFLOW
          </Text>
          <Text className="text-center text-gray-500 text-base">
            Crea tu corporación
          </Text>
        </View>
        <View className="mb-10">
          <Text className="text-base font-bold mb-3">Nombre</Text>
          <TextInput
            placeholder="Nombre de Corporación"
            className="border border-gray-300 p-4 mb-5 rounded-lg"
            value={nombre}
            onChangeText={setNombre}
          ></TextInput>

          <Pressable
            className="bg-cyan-700 rounded-xl active:opacity-80 p-4 mb-3"
            onPress={handleRegister}
            disabled={cargando}
          >
            {cargando ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-center text-white font-bold text-base">
                Crear
              </Text>
            )}
          </Pressable>
          <View className="mt-3 flex-row justify-center mb-10">
            <Text className="text-gray-500">¿Volver atrás? </Text>
            <Pressable
              className="active:opacity-50"
              onPress={() => router.back()}
            >
              <Text className="text-cyan-700 font-semibold">
                Volver a Corporaciones
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}
