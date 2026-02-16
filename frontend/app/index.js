import { View, Text, TextInput, Button, Pressable } from "react-native";
import { Screen } from "../src/components/Screen";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  return (
    <Screen>
      <View className="flex-1  justify-center p-5">
        <Stack.Screen options={{ headerShown: false }} />
        <View className="mb-10">
          <Text className="text-4xl font-extrabold text-cyan-700 mb-2 text-center">
            CORPFLOW
          </Text>
          <Text className="text-center text-gray-500 text-base">
            Inicia Sesión
          </Text>
        </View>
        <View>
          <Text className="text-base font-bold mb-3">Usuario</Text>
          <TextInput
            placeholder="Nombre de Usuario"
            className="border border-gray-300 p-4 mb-5 rounded-lg"
            value={username}
            onChangeText={setUsername}
          ></TextInput>
          <Text className="text-base font-bold mb-3">Contraseña</Text>
          <TextInput
            placeholder="Contraseña"
            className="border border-gray-300 p-4 mb-5 rounded-lg"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          ></TextInput>
          <Pressable
            className="bg-cyan-700 rounded-xl active:opacity-80 p-4"
            onPress={() => {}}
          >
            <Text className="text-center text-white font-bold">
              Iniciar Sesión
            </Text>
          </Pressable>
          <View className="mt-6 flex-row justify-center">
            <Text className="text-gray-500">¿No está registrado? </Text>
            <Pressable
              className="active:opacity-50"
              onPress={() => router.push("/register")}
            >
              <Text className="text-cyan-700 font-semibold">
                Cree Una cuenta
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Screen>
  );
}
