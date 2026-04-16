import { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { router } from "expo-router";
import { Screen } from "../src/components/Screen";
import { useAuth } from "../src/context/AuthContext";
import { useCorporacion } from "../src/context/CorporacionContext";
import { crearReunion } from "../src/api/services/reunionesService";

export default function FormCrearReunion() {
  const { user } = useAuth();
  const { corporacionActiva } = useCorporacion();

  const [form, setForm] = useState({
    nombre: "",
    fecha_Inicio: new Date().toISOString(),
    horaInicio: "",
    asistentes: [user._id],
  });

  const handleSave = async () => {
    try {
      await crearReunion({
        ...form,
        corporacion: corporacionActiva.id,
      });
      Alert.alert("Éxito", "Reunión creada correctamente");
      router.back();
    } catch (error) {
      Alert.alert("Error", "No se pudo crear la reunión");
    }
  };

  return (
    <Screen>
      <View className="p-6">
        <Text className="text-2xl font-bold mb-6 text-slate-800">
          Nueva Reunión
        </Text>

        <TextInput
          placeholder="Nombre de la reunión"
          className="bg-white p-4 rounded-xl border border-slate-200 mb-4"
          onChangeText={(val) => setForm({ ...form, nombre: val })}
        />

        {/* Aquí podrías añadir un DateTimePicker para fecha y hora */}
        <TextInput
          placeholder="Fecha (YYYY-MM-DD)"
          className="bg-white p-4 rounded-xl border border-slate-200 mb-4"
          onChangeText={(val) => setForm({ ...form, fecha_Inicio: val })}
        />

        <Pressable
          onPress={handleSave}
          className="bg-amber-500 p-4 rounded-xl items-center mt-4"
        >
          <Text className="text-white font-bold">Guardar Reunión</Text>
        </Pressable>
      </View>
    </Screen>
  );
}
