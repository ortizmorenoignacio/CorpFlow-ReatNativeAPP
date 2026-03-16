import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { Screen } from "./Screen";
import { useEffect, useState } from "react";
import { TareaCard } from "./TareasCard";
import { obtenerTareasUsuarioCorporacion } from "../api/services/usuarioService";
import { aactualizarEstadoTarea } from "../api/services/tareaService";
import { useLocalSearchParams } from "expo-router";

export const TareasList = ({ userId, corporacionId }) => {
  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(true);
  //Fromateo fecha
  const params = useLocalSearchParams();
  const formatearFecha = (fechaISO) => {
    if (!fechaISO) return "sin fecha";
    const fecha = new Date(fechaISO);
    const dia = fecha.getDate(toString().padStart(2, "0"));
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const anio = fecha.getFullYear().toString().slice(-2);
    return `${dia}-${mes}-${anio}`;
  };
  useEffect(() => {
    if (!userId || !corporacionId) {
      return;
    }
    const cargarDatos = async () => {
      try {
        setLoading(true);
        const datos = await obtenerTareasUsuarioCorporacion(
          userId,
          corporacionId,
        );
        setTareas(datos);
      } catch (error) {
        console.error("Error cargando tareas", error);
      } finally {
        setLoading(false);
      }
    };
    cargarDatos();
  }, [userId, corporacionId, params.nuevaTarea]);
  //Manejo actualizar estado tarea

  const handleEstado = async (idTarea, estadoActual) => {
    const nuevoEstado = !estadoActual;

    setTareas((tareasActuales) =>
      tareasActuales.map((tarea) =>
        tarea._id === idTarea ? { ...tarea, estadoTarea: nuevoEstado } : tarea,
      ),
    );

    try {
      await aactualizarEstadoTarea(idTarea, nuevoEstado);
      console.log("Tarea actualizada en la base de datos");
    } catch (error) {
      console.error("Error al actualizar la tarea", error);
      setTareas((tareasActuales) =>
        tareasActuales.map((tarea) =>
          tarea._id === idTarea
            ? { ...tarea, estadoTarea: estadoActual }
            : tarea,
        ),
      );
    }
  };

  if (loading)
    return (
      <ActivityIndicator className="mt-10" color="0e7490"></ActivityIndicator>
    );
  return (
    <Screen>
      <View className="w-full px-4 pt-2">
        <View className="flex-row items-center px-2 py-3 mb-1">
          <Text className="flex-1 text-xs font-bold text-slate-500 uppercase tracking-wider">
            Tarea
          </Text>
          <Text className="w-16 text-right text-xs font-bold text-slate-400 uppercase tracking-wider">
            Fecha
          </Text>
          <Text className="w-20 text-center text-xs font-bold text-slate-400 uppercase tracking-wider mx-3">
            Prioridad
          </Text>
        </View>
        <FlatList
          data={tareas}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            <TareaCard
              nombre={item.nombre}
              fechaVencimiento={formatearFecha(item.fechaVencimiento)}
              estadoTarea={item.estadoTarea}
              prioridad={item.prioridad}
              onToggle={() => handleEstado(item._id, item.estadoTarea)}
            ></TareaCard>
          )}
        ></FlatList>
      </View>
    </Screen>
  );
};
