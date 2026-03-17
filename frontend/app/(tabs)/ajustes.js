import { View, Text } from "react-native";
import { Screen } from "../../src/components/Screen"; // O tu componente contenedor
import { Stack } from "expo-router";
import {
  CloudIcon,
  InterrrogacionIcon,
  PrivacidadIcon,
} from "../../src/components/Icons";

// ¡IMPORTANTE! Tiene que ser 'export default'
export default function AjustesScreen() {
  return (
    <Screen>
      <View className=" px-4 py-6 justify-between">
        <View className="flex-row items-center bg-white border border-slate-200 rounded-2xl mt-4 px-5 py-4">
          <View className="mr-3">
            <PrivacidadIcon></PrivacidadIcon>
          </View>
          <Text className="font-semibold">Privacidad</Text>
        </View>

        <View className="flex-row items-center bg-white border border-slate-200 rounded-2xl mt-4 px-5 py-4">
          <View className="mr-3">
            <CloudIcon></CloudIcon>
          </View>
          <Text className="font-semibold">Activar modo oscuro</Text>
        </View>

        <View className="flex-row items-center bg-white border border-slate-200 rounded-2xl mt-4 px-5 py-4">
          <View className="mr-3">
            <InterrrogacionIcon></InterrrogacionIcon>
          </View>
          <Text className="font-semibold">Acerca de</Text>
        </View>
      </View>
    </Screen>
  );
}
