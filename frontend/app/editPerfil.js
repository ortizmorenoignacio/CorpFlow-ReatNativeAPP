import { useState } from "react";
import { useAuth } from "../src/context/AuthContext";
import { actualizarUsuario } from "../src/api/services/usuarioService";
import {
  Alert,
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
    correo: user.correo,
  });

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
        <Text className="text-2xl font-bold text-slate-800 mb-6">
          Editar Perfil
        </Text>

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
