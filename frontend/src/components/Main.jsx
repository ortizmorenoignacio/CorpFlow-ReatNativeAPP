import { StatusBar } from "expo-status-bar";

import {
  ScrollView,
  View,
  Text,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { obtenerTareasUsuarioCorporacion } from "../api/services/usuarioService";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ElementsCard } from "./ElementsCard";
import { Screen } from "./Screen";
import { useCorporacion } from "../context/CorporacionContext";
import { useCallback, useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
export function Main() {
  const { corporacionActiva } = useCorporacion();
  const { user } = useAuth();

  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?._id && corporacionActiva?.id) {
      cargarResumen();
    }
  }, [user?._id, corporacionActiva?.id]);

  useFocusEffect(
    useCallback(() => {
      if (user?._id && corporacionActiva?.id) {
        cargarResumen();
      }
    }, [user?._id, corporacionActiva?.id]),
  );
  const cargarResumen = async () => {
    try {
      setLoading(true);
      const datos = await obtenerTareasUsuarioCorporacion(
        user._id,
        corporacionActiva.id,
      );
      setTareas(datos);
    } catch (error) {
      console.error("Error cargando resumen:", error);
    } finally {
      setLoading(false);
    }
  };
  if (!corporacionActiva) {
    return (
      <Screen>
        <View className="flex-1 justify-center items-center">
          <Text>Por favor, selecciona una corporacion primero.</Text>
        </View>
      </Screen>
    );
  }

  //Filtramos tareas para la vista previa

  const tareasPendientes = tareas.filter((t) => !t.estadoTarea).slice(0, 3);
  const hoy = new Date().toISOString().split("T")[0];
  const eventosHoy = tareas.filter((t) => t.fechaVencimiento?.startsWith(hoy));
  return (
    <Screen>
      <ScrollView>
        <StatusBar style="auto" />

        {loading ? (
          <ActivityIndicator color="#0e7490" className="mt-10" />
        ) : (
          <View className="px-6 pb-10">
            {/* VISTA PREVIA: TAREAS */}
            <View className="mt-8">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-xl font-bold text-slate-800">
                  Tareas Pendientes
                </Text>
                <Pressable onPress={() => router.push("/tareas")}>
                  <Text className="text-cyan-700 font-semibold">Ver todas</Text>
                </Pressable>
              </View>

              {tareasPendientes.length > 0 ? (
                tareasPendientes.map((tarea) => (
                  <View
                    key={tarea._id}
                    className="bg-white p-4 rounded-2xl mb-3 shadow-sm border border-slate-100 flex-row items-center"
                  >
                    <View className="w-2 h-10 bg-cyan-500 rounded-full mr-4" />
                    <View className="flex-1">
                      <Text
                        className="font-bold text-slate-700 text-base"
                        numberOfLines={1}
                      >
                        {tarea.nombre}
                      </Text>
                      <Text className="text-slate-400 text-xs uppercase">
                        {tarea.prioridad || "Media"}
                      </Text>
                    </View>
                  </View>
                ))
              ) : (
                <Text className="text-slate-400 italic">
                  No tienes tareas pendientes
                </Text>
              )}
            </View>

            {/* VISTA PREVIA: CALENDARIO / AGENDA */}
            <View className="mt-8">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-xl font-bold text-slate-800">
                  Agenda de Hoy
                </Text>
                <Pressable onPress={() => router.push("/calendario")}>
                  <Text className="text-cyan-700 font-semibold">
                    Abrir Agenda
                  </Text>
                </Pressable>
              </View>

              <Pressable
                onPress={() => router.push("/calendario")}
                className="bg-cyan-700 p-6 rounded-3xl shadow-lg shadow-cyan-200"
              >
                <View className="flex-row justify-between items-start">
                  <View>
                    <Text className="text-cyan-100 text-base uppercase font-bold tracking-widest">
                      {new Date().toLocaleDateString("es-ES", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      })}
                    </Text>
                    <Text className="text-white text-2xl font-bold mt-1">
                      {eventosHoy.length}{" "}
                      {eventosHoy.length === 1 ? "Evento" : "Eventos"} hoy
                    </Text>
                  </View>
                  <View className="bg-white/20 p-2 rounded-xl">
                    <Feather name="calendar" size={24} color="white" />
                  </View>
                </View>
              </Pressable>
            </View>
          </View>
        )}
        <ElementsCard
          corporacionId={corporacionActiva.id}
          chatId={corporacionActiva.chat}
        ></ElementsCard>
      </ScrollView>
    </Screen>
  );
}
