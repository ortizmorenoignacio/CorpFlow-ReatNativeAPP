import { useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

export const CrearCarpetaModal = ({
  visible,
  onClose,
  onConfirm,
  animacion,
}) => {
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!nombre.trim()) return;

    setLoading(true);
    await onConfirm(nombre);
    setNombre("");
    setLoading(false);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 justify-center items-center bg-slate-500/50 px-6">
        <View bg-white w-full rounded-3xl p-6 shadow-xl>
          <Text className="text-xl font-bold text-slate-800 mb-4">
            Nueva Carpeta
          </Text>
          <TextInput
            className="bg-slate-100 p-4 rounded-xl text-base text-slate-700 mb-6 border border-slate-200"
            placeholder="Nombre de la carpeta"
            autoFocus={true}
            value={nombre}
            onChangeText={setNombre}
          ></TextInput>
          <View className="flex-row justify-end gap-x-4">
            <Pressable onPress={onClose} className="px-4 py-2">
              <Text className="text-slate-400 font-semibold">Cancelar</Text>
            </Pressable>

            <Pressable
              onPress={handleConfirm}
              disabled={!nombre.trim() || loading}
              className={`px-6 py-2 rounded-lg ${nombre.trim() ? "bg-sky-500" : "bg-slate-200"}`}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-bold">Crear</Text>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};
