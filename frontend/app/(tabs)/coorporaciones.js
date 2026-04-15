import { View, Text, Pressable } from "react-native";
import { Screen } from "../../src/components/Screen";
import { useAuth } from "../../src/context/AuthContext";
import { CorporacionesList } from "../../src/components/CorporacionesList";
import { router } from "expo-router";

export default function CoorporacionesScreen() {
  const { user } = useAuth();
  return (
    <Screen>
      <View className="flex-1 bg-[#F8FAFC] p-6">
        {/* El color de fondo F8FAFC le da ese toque limpio de tu captura */}
        <Text className="text-slate-500 text-base mb-8 mt-4">
          Selecciona la organización con la que deseas trabajar
        </Text>

        <CorporacionesList userId={user?._id} />
        <View className="mt-6 flex-row justify-center">
          <Text className="text-gray-500">
            ¿Quiere crear una nueva corporacion?{" "}
          </Text>
          <Pressable
            className="active:opacity-50"
            onPress={() => router.push("/formCorporacion")}
          >
            <Text className="text-cyan-700 font-semibold">Crear</Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}
