import { View, Text, TextInput, Button, Pressable, Alert } from "react-native";
import { Screen } from "../src/components/Screen";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";

import { useAuth } from "../src/context/AuthContext";
import { login } from "../src/api/AuthEndpoints";
export default function LoginScreen() {
  const { signIn, user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  //Bloquear el boton mientras carga
  const [cargando, setCargando] = useState(false);
  //Comprobamos si esta logeado, si lo esta pasamos a la pantalla principal

  useEffect(() => {
    if (!loading && user) {
      router.replace("/(tabs)");
    }
  }, [user, loading]);

  const manejoLogin = async () => {
    //Validaciones
    if (email === "" || password === "") {
      Alert.alert("Error", "Porfavor rellena todos los campos");
      return;
    }

    setCargando(true);
    try {
      const response = await login({
        email: email,
        password: password,
      });

      await signIn(response.user, response.token);
    } catch (error) {
      Alert.alert("Error de inicio de sesión", error.message);
    } finally {
      setCargando(false);
    }
  };
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
          <Text className="text-base font-bold mb-3">Correo Electrónico</Text>
          <TextInput
            placeholder="Nombre de Usuario"
            className="border border-gray-300 p-4 mb-5 rounded-lg"
            value={email}
            onChangeText={setEmail}
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
            onPress={manejoLogin}
          >
            <Text className="text-center text-white font-bold">
              {cargando ? "Cargando" : "Iniciar Sesión"}
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
