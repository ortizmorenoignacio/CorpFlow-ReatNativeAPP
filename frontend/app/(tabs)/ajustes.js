import { View, Text, Pressable } from "react-native";
import { Screen } from "../../src/components/Screen";
import { router } from "expo-router";
import {
  ChevronIcon,
  PrivacidadIcon,
  Usercog,
  InterrrogacionIcon,
} from "../../src/components/Icons";

export default function AjustesScreen() {
  return (
    <Screen>
      <View className="px-4 py-6">
        {/* PRIVACIDAD (Se mantiene igual) */}
        <Pressable onPress={() => router.push("/privacidad")}>
          {({ pressed }) => (
            <View
              className={`flex-row items-center justify-between border rounded-2xl mt-4 px-5 py-4 ${pressed ? "bg-slate-200 border-slate-300" : "bg-white border-slate-200"}`}
            >
              <View className="flex-row items-center">
                <PrivacidadIcon />
                <Text className="font-semibold ml-3">Privacidad</Text>
              </View>
              <ChevronIcon />
            </View>
          )}
        </Pressable>

        {/* GESTIÓN DE CUENTA */}
        <Pressable onPress={() => router.push("/gestionCuenta")}>
          {({ pressed }) => (
            <View
              className={`flex-row items-center justify-between border rounded-2xl mt-4 px-5 py-4 ${pressed ? "bg-slate-200 border-slate-300" : "bg-white border-slate-200"}`}
            >
              <View className="flex-row items-center">
                <Usercog />
                <Text className="font-semibold ml-3">Gestión de Cuenta</Text>
              </View>
              <ChevronIcon />
            </View>
          )}
        </Pressable>

        {/* ACERCA DE */}
        <Pressable onPress={() => router.push("/acercaDe")}>
          {({ pressed }) => (
            <View
              className={`flex-row items-center justify-between border rounded-2xl mt-4 px-5 py-4 ${pressed ? "bg-slate-200 border-slate-300" : "bg-white border-slate-200"}`}
            >
              <View className="flex-row items-center">
                <InterrrogacionIcon />
                <Text className="font-semibold ml-3">Acerca de</Text>
              </View>
              <ChevronIcon />
            </View>
          )}
        </Pressable>
      </View>
    </Screen>
  );
}
