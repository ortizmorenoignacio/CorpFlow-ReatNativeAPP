import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  Pressable,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { Screen } from "../src/components/Screen";
import { Feather } from "@expo/vector-icons";
import { editarCorporacion } from "../src/api/services/corporacionService";
import { useCorporacion } from "../src/context/CorporacionContext";
import {
  buscarUsuarioCorreo,
  crearMembresia,
} from "../src/api/services/usuarioService";

export default function EditCorporacion() {
  const params = useLocalSearchParams();
  const { corporacionActiva, setCorporacionActiva } = useCorporacion();
  const [nombre, setNombre] = useState(params.nombre);
  const [nuevoUsuario, setNuevoUsuario] = useState("");
  const [logo, setLogo] = useState(params.logo);

  const cambiarFoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setLogo(result.assets[0].uri);
      // Aquí podrías usar tu función 'subirArchivo' para subir el logo al servidor
    }
  };

  const handleGuardar = async () => {
    //Llamar a tu API para actualizar nombre y logo
    try {
      const datos = {
        nombre: nombre,
        logo: logo,
      };

      const actualizado = await editarCorporacion(corporacionActiva.id, datos);

      setCorporacionActiva(actualizado);
      router.back();
    } catch (error) {
      console.error("Error al actualizar la corporación:", error);
      Alert.alert("Error", "No se pudieron guardar los cambios");
    }
    // 2. Si hay algo en 'nuevoUsuario' (email o ID), llamar a la API de membresías
    Alert.alert("Éxito", "Corporación actualizada");
    router.back();
  };

  const handleAñadirMiembro = async () => {
    if (!nuevoUsuario.trim()) return;

    try {
      const usuario = await buscarUsuarioCorreo(nuevoUsuario);
      if (!usuario || !usuario._id) {
        Alert.alert("Error", "Usuario no encontrado con ese correo");
        return;
      }

      const membresia = {
        rol: "MIEMBRO",
        corporacion: corporacionActiva.id,
        usuario: usuario._id,
      };
      await crearMembresia(membresia);
      Alert.alert("Éxito", "Usuario añadido a la corporación");
      setNuevoUsuario("");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo añadir al usuario");
    }
  };

  return (
    <Screen>
      <ScrollView className="p-6">
        <Text className="text-2xl font-bold text-slate-800 mb-6">
          Configuración
        </Text>

        {/* SECCIÓN FOTO */}
        <View className="items-center mb-8">
          <TouchableOpacity onPress={cambiarFoto} className="relative">
            <Image
              source={{ uri: logo || "https://via.placeholder.com/150" }}
              className="w-32 h-32 rounded-full border-4 border-white shadow-md"
            />
            <View className="absolute bottom-0 right-0 bg-cyan-700 p-2 rounded-full">
              <Feather name="camera" size={18} color="white" />
            </View>
          </TouchableOpacity>
        </View>

        {/* SECCIÓN NOMBRE */}
        <View className="mb-6">
          <Text className="text-slate-500 mb-2">Nombre de la Organización</Text>
          <TextInput
            className="bg-white border border-slate-200 p-4 rounded-xl text-base"
            value={nombre}
            onChangeText={setNombre}
          />
        </View>

        {/* SECCIÓN AÑADIR USUARIOS */}
        <View className="mb-6">
          <Text className="text-slate-500 mb-2">Añadir Miembro (Correo)</Text>
          <View className="flex-row gap-2">
            <TextInput
              className="flex-1 bg-white border border-slate-200 p-4 rounded-xl text-base"
              placeholder="ejemplo@correo.com"
              value={nuevoUsuario}
              onChangeText={setNuevoUsuario}
            />
            <Pressable
              onPress={handleAñadirMiembro}
              className="bg-slate-800 p-4 rounded-xl justify-center"
            >
              <Feather name="user-plus" size={20} color="white" />
            </Pressable>
          </View>
        </View>

        {/* BOTÓN GUARDAR */}
        <TouchableOpacity
          onPress={handleGuardar}
          className="bg-cyan-700 p-4 rounded-2xl mt-4 items-center"
        >
          <Text className="text-white font-bold text-lg">Guardar Cambios</Text>
        </TouchableOpacity>
      </ScrollView>
    </Screen>
  );
}
