import { View, Text, Pressable } from "react-native";
import { Screen } from "../../src/components/Screen"; // O tu componente contenedor
import { router, Stack } from "expo-router";
import {
  ChevronIcon,
  CloudIcon,
  InterrrogacionIcon,
  PrivacidadIcon,
  Usercog,
} from "../../src/components/Icons";

// ¡IMPORTANTE! Tiene que ser 'export default'
export default function AjustesScreen() {
  return (
    <Screen>
      <View className=" px-4 py-6 justify-between">
        <Pressable onPress={() => router.push("/privacidad")}>
          {({ pressed }) => (
            <View
              className={`flex-row items-center justify-between border rounded-2xl mt-4 px-5 py-4 ${
                pressed
                  ? "bg-slate-200 border-slate-300"
                  : "bg-white border-slate-200"
              }`}
            >
              <View className="flex-row items-center">
                <PrivacidadIcon />
                <Text className="font-semibold ml-3">Privacidad</Text>
              </View>

              <ChevronIcon />
            </View>
          )}
        </Pressable>

        <View className="flex-row items-center bg-white border border-slate-200 rounded-2xl mt-4 px-5 py-4">
          <View className="mr-3">
            <CloudIcon></CloudIcon>
          </View>
          <Text className="font-semibold">Activar modo oscuro</Text>
        </View>

        <Pressable>
          {({ pressed }) => (
            <View
              className={`flex-row items-center justify-between border rounded-2xl mt-4 px-5 py-4 ${
                pressed
                  ? "bg-slate-200 border-slate-300"
                  : "bg-white border-slate-200"
              }`}
            >
              <View className="flex-row items-center">
                <Usercog></Usercog>

                <Text className="font-semibold ml-3">Gestión de Cuenta</Text>
              </View>
              <ChevronIcon className="self-end"></ChevronIcon>
            </View>
          )}
        </Pressable>

        <Pressable>
          {({ pressed }) => (
            <View
              className={`flex-row items-center justify-between border rounded-2xl mt-4 px-5 py-4 ${
                pressed
                  ? "bg-slate-200 border-slate-300"
                  : "bg-white border-slate-200"
              }`}
            >
              <View className="flex-row items-center">
                <InterrrogacionIcon></InterrrogacionIcon>

                <Text className="font-semibold ml-3">Acerca de</Text>
              </View>
              <ChevronIcon className="self-end"></ChevronIcon>
            </View>
          )}
        </Pressable>
      </View>
    </Screen>
  );
}
