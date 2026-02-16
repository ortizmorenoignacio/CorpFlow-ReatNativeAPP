import {
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
import DateTimePicker from "@react-native-community/datetimepicker";
import { CalendarForm } from "../src/components/Icons";
export default function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dni, setDni] = useState("");

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [fechaTexto, setFechaTexto] = useState("");

  const seleccionFecha = (event, fechaSeleccionada) => {
    if (Platform.OS === "android") {
      setShowPicker(false);
    }
    if (fechaSeleccionada) {
      setDate(fechaSeleccionada);

      const formateo = fechaSeleccionada.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      setFechaTexto(formateo);
    }
  };
  return (
    <Screen>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        className="p-5"
      >
        <Stack.Screen options={{ headerShown: false }} />
        <View className="mb-10 mt-5">
          <Text className="text-4xl font-extrabold text-cyan-700 mb-2 text-center">
            CORPFLOW
          </Text>
          <Text className="text-center text-gray-500 text-base">
            Crea tu cuenta
          </Text>
        </View>
        <View>
          <Text className="text-base font-bold mb-3">Nombre</Text>
          <TextInput
            placeholder="Nombre"
            className="border border-gray-300 p-4 mb-5 rounded-lg"
            value={name}
            onChangeText={setName}
          ></TextInput>

          <Text className="text-base font-bold mb-3">Apellidos</Text>
          <TextInput
            placeholder="Apellidos"
            className="border border-gray-300 p-4 mb-5 rounded-lg"
            value={apellidos}
            onChangeText={setApellidos}
          ></TextInput>

          <Text className="text-base font-bold mb-3">Usuario</Text>
          <TextInput
            placeholder="Nombre de Usuario"
            className="border border-gray-300 p-4 mb-5 rounded-lg"
            value={username}
            onChangeText={setUsername}
          ></TextInput>

          <Text className="text-base font-bold mb-3">Correo</Text>
          <TextInput
            placeholder="tu@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            className="border border-gray-300 p-4 mb-5 rounded-lg"
            value={email}
            onChangeText={setEmail}
          ></TextInput>

          <Text className="text-base font-bold mb-3">DNI /NIE</Text>
          <TextInput
            placeholder="12345678A"
            autoCapitalize="characters"
            maxLength={9}
            className="border border-gray-300 p-4 mb-5 rounded-lg"
            value={dni}
            onChangeText={setDni}
          ></TextInput>

          <Text className="text-base font-bold mb-3">Fecha de Nacimiento</Text>
          <Pressable
            onPress={() => setShowPicker(true)}
            className="border border-gray-300 p-4 mb-5 rounded-lg flex-row justify-between"
          >
            <Text
              className={
                fechaTexto ? "text-black text-base" : "text-gray-400 text-base"
              }
            >
              {fechaTexto || "dd/mm/aaaa"}
            </Text>
            <CalendarForm></CalendarForm>
          </Pressable>
          {showPicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              maximumDate={new Date()}
              onChange={seleccionFecha}
            />
          )}
          <Text className="text-base font-bold mb-3">Contraseña</Text>
          <TextInput
            placeholder="Contraseña"
            className="border border-gray-300 p-4 mb-5 rounded-lg bg-white"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Pressable
            className="bg-cyan-700 rounded-xl active:opacity-80 p-4 mb-3"
            onPress={() => {
              console.log("Datos:", {
                username,
                name,
                apellidos,
                email,
                password,
                dni,
                fechaTexto,
              });
            }}
          >
            <Text className="text-center text-white font-bold text-base">
              Registrarse
            </Text>
          </Pressable>
          <View className="mt-3 flex-row justify-center mb-4">
            <Text className="text-gray-500">¿Ya tienes cuenta? </Text>
            <Pressable
              className="active:opacity-50"
              onPress={() => router.back()}
            >
              <Text className="text-cyan-700 font-semibold">Inicia Sesión</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}
