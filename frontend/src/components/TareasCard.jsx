import { Pressable, Text, View } from "react-native";

import { Feather } from "@expo/vector-icons";
export const TareaCard = ({
  nombre,
  fechaVencimiento,
  estadoTarea,
  prioridad,
  onToggle,
  vencida,
}) => {
  const getPrioridad = (prioridad) => {
    if (!prioridad) return { bg: "bg-sky-100", text: "text-sky-500" };

    if (prioridad.toLowerCase() === "alta") {
      return { bg: "bg-red-100", text: "text-red-600" };
    }
    if (prioridad.toLowerCase() === "media") {
      return { bg: "bg-amber-100", text: "text-amber-600" };
    }

    return { bg: "bg-sky-100", text: "text-sky-500" };
  };

  const colores = getPrioridad(prioridad);
  return (
    <View className="flex-row items-center bg-white p-1 mb-3 rounded-2xl border border-slate-100 shadow-2xl">
      <Pressable
        onPress={onToggle}
        className={` w-6 h-6 rounded-full border-2 items-center justify-center ml-2 mr-2 ${estadoTarea ? "bg-emerald-600 border-emerald-700" : "border-gray-400"}`}
      >
        {estadoTarea && <Feather name="check" size={14} color="white" />}
      </Pressable>

      <Text
        numberOfLines={2}
        className={`flex-1 text-base ${estadoTarea ? "text-slate-400 line-through" : "text-slate-800 font-medium"}`}
      >
        {nombre}
      </Text>
      <Text
        className={`w-16  text-slate-500 text-xs font-medium ${vencida && !estadoTarea ? "text-red-600 font-bold" : "text-slate-500"}`}
      >
        {fechaVencimiento}
      </Text>
      <View className={`${colores.bg} px-3 py-1 rounded-full mx-2`}>
        <Text className={`${colores.text} text-xs font-bold capitalize`}>
          {prioridad}
        </Text>
      </View>
    </View>
  );
};
