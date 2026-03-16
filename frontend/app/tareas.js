import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { obtenerTareas } from "../src/api/services/tareaService";
import { Screen } from "../src/components/Screen";
import { router, Stack, Tabs, useRouter } from "expo-router";
import { useAuth } from "../src/context/AuthContext";
import { useCorporacion } from "../src/context/CorporacionContext";
import { TareasList } from "../src/components/TareasList";
export default function Tareas() {
  const { user } = useAuth();
  const { corporacionActiva } = useCorporacion();

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: () => (
            <Text className="text-3xl font-bold text-cyan-700 ml-3 text-">
              Lista de Tareas
            </Text>
          ),
        }}
      ></Stack.Screen>

      <View className="flex-1 relative ">
        <TareasList
          userId={user?._id}
          corporacionId={corporacionActiva?.id}
        ></TareasList>

        <Pressable
          onPress={() => {
            router.push("/formCrearTarea");
          }}
          className="absolute bottom-8 right-6 w-14 h-14 bg-cyan-700 rounded-full items-center justify-center shadow-lg active:bg-cyan-900"
        >
          <Text className="text-white text-2xl">+</Text>
        </Pressable>
      </View>
    </Screen>
  );
}
