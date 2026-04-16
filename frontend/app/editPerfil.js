import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "../src/context/AuthContext";
import { actualizarUsuario } from "../src/api/services/usuarioService";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { router } from "expo-router";
import { Screen } from "../src/components/Screen";

export default function EditPerfil() {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({
    nombre: user.nombre,
    telefono: user.telefono,
    genero: user.genero || "OTRO",
    fotoperfil: user.fotoPerfil,
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      base64: true, // Importante para enviar al backend
    });

    if (!result.canceled) {
      setForm({
        ...form,
        fotoPerfil: `data:image/jpeg;base64,${result.assets[0].base64}`,
      });
    }
  };
  const handleSave = async () => {
    try {
      const actualizado = await actualizarUsuario(user._id, form);
      setUser(actualizado);
      Alert.alert("Exito", "Perfil actualizado correctamente");
      router.back();
    } catch (error) {
      Alert.alert("Error", "No se pudieron guardar los cambios", error);
    }
  };
  return (
    <Screen>
      <ScrollView className="px-5 pt-5">
        <Text className="text-2xl font-bold text-slate-800 mb-6 mt-6">
          Editar Perfil
        </Text>
        <Pressable onPress={pickImage} className="items-center mb-6">
          <Image
            source={{
              uri:
                form.fotoPerfil ||
                "https://ui-avatars.com/api/?name=" + form.nombre,
            }}
            className="w-32 h-32 rounded-full border-2 border-cyan-700"
          />
          <Text className="text-cyan-700 font-bold mt-2">Cambiar foto</Text>
        </Pressable>
        <View className="mb-4">
          <Text className="text-gray-500 mb-2">Nombre Completo</Text>
          <TextInput
            className="bg-white border border-slate-200 p-4 rounded-xl text-base"
            value={form.nombre}
            onChangeText={(text) => setForm({ ...form, nombre: text })}
          />
        </View>

        <View className="mb-4">
          <Text className="text-gray-500 mb-2">Teléfono</Text>
          <TextInput
            className="bg-white border border-slate-200 p-4 rounded-xl text-base"
            keyboardType="phone-pad"
            value={form.telefono}
            onChangeText={(text) => setForm({ ...form, telefono: text })}
          />
        </View>
        <Text className="text-gray-500 mb-2">Género</Text>
        <View className="flex-row justify-between mb-4">
          {["HOMBRE", "MUJER", "OTRO"].map((g) => (
            <Pressable
              key={g}
              onPress={() => setForm({ ...form, genero: g })}
              className={`p-3 rounded-xl border ${form.genero === g ? "bg-cyan-700 border-cyan-700" : "bg-white border-slate-200"}`}
            >
              <Text
                className={form.genero === g ? "text-white" : "text-slate-600"}
              >
                {g}
              </Text>
            </Pressable>
          ))}
        </View>
        <Pressable
          onPress={handleSave}
          className="bg-cyan-700 p-4 rounded-2xl mt-6 items-center shadow-lg"
        >
          <Text className="text-white font-bold text-lg">Guardar Cambios</Text>
        </Pressable>
      </ScrollView>
    </Screen>
  );
}
