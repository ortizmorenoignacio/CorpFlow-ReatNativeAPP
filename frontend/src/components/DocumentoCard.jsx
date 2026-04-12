import { View, Text, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

export const DocumentoCard = ({ tipo, color, onPress, nombre }) => {
  const carpeta = tipo === "carpeta";
  const nombreIcono = carpeta ? "folder" : "file-text";

  const colorIcono = color || "#0ea5e9";

  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center bg-white p-4 mb-3 rounded-2xl border border-slate-100 shadow-sm active:bg-slate-100 active:scale-[0.98]"
    >
      <View>
        <Feather name={nombreIcono} size={24} color={colorIcono}></Feather>
      </View>

      <View className="flex-1">
        <Text className="text-slate-800 text-base font-semibold">{nombre}</Text>
      </View>

      <View className="ml-2">
        <Feather name="chevron-right" size={20} color="#cbd5e1" />
      </View>
    </Pressable>
  );
};
