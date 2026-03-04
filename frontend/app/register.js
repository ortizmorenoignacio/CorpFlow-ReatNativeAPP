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
import DateTimePicker from "@react-native-community/datetimepicker";
import { CalendarForm } from "../src/components/Icons";

import { registrarUsuario } from "../src/api/services/usuarioService";
export default function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dni, setDni] = useState("");
  const [telefono, setTelefono] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [fechaTexto, setFechaTexto] = useState("");

  const [cargando, setCargando] = useState(false);
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

  const handleRegister = async () => {
    //Validamos los campos vacios
    if (
      !username ||
      !email ||
      !password ||
      !dni ||
      !telefono ||
      !date ||
      !fechaTexto
    ) {
      alert("Porfavor, rellena todos los campos");
      return;
    }

    try {
      setCargando(true);

      const datos = {
        nombre: username,
        correo: email.toLocaleLowerCase().trim(),
        telefono: telefono.toString(),
        dni: dni.toLocaleUpperCase(),
        fechaNacimiento: date.toISOString(),
        contraseña: password,
        genero: "OTRO",
        fotoPerfil:
          "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
      };

      await registrarUsuario(datos);

      Alert.alert(
        "¡Éxito!", // Título
        "Usuario creado correctamente. Pulsa OK para iniciar sesión.", // Mensaje (String)
        [{ text: "OK", onPress: () => router.replace("/login") }], // Botones (Array)
      );
    } catch (error) {
      if (error.response) {
        // El servidor respondió con un código de error (400, 401, 500...)
        console.log("❌ Datos de error del servidor:", error.response.data);
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
            Crea tu cuenta
          </Text>
        </View>
        <View className="mb-10">
          {/* <Text className="text-base font-bold mb-3">Nombre</Text>
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
          ></TextInput> */}

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
          <Text className="text-base font-bold mb-3">Telefono</Text>
          <TextInput
            placeholder="123456789"
            className="border border-gray-300 p-4 mb-5 rounded-lg"
            keyboardType="numeric"
            value={telefono}
            onChangeText={setTelefono}
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
            onPress={handleRegister}
            disabled={cargando}
          >
            {cargando ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-center text-white font-bold text-base">
                Registrarse
              </Text>
            )}
          </Pressable>
          <View className="mt-3 flex-row justify-center mb-10">
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
