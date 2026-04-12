import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Screen } from "../src/components/Screen";
import { Stack, useLocalSearchParams } from "expo-router";
import {
  CalendarProvider,
  ExpandableCalendar,
  AgendaList,
  LocaleConfig,
} from "react-native-calendars";

import { useAuth } from "../src/context/AuthContext";
import { useCorporacion } from "../src/context/CorporacionContext";
import { obtenerTareasUsuarioCorporacion } from "../src/api/services/usuarioService";
import { aactualizarEstadoTarea } from "../src/api/services/tareaService";

// Configuramos el calendario en Español
LocaleConfig.locales["es"] = {
  monthNames: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  monthNamesShort: [
    "Ene.",
    "Feb.",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul.",
    "Ago",
    "Sep.",
    "Oct.",
    "Nov.",
    "Dic.",
  ],
  dayNames: [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ],
  dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
  today: "Hoy",
};
LocaleConfig.defaultLocale = "es";

export default function CalendarioScreen() {
  const { user } = useAuth();
  const { corporacionActiva } = useCorporacion();
  const params = useLocalSearchParams();

  const [agendaData, setAgendaData] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [loading, setLoading] = useState(true);

  const hoy = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (!user?._id || !corporacionActiva?.id) return;

    const cargarDatos = async () => {
      try {
        setLoading(true);
        const datos = await obtenerTareasUsuarioCorporacion(
          user._id,
          corporacionActiva.id,
        );

        const agrupado = {};
        const puntosCalendario = {};

        datos.forEach((tarea) => {
          if (!tarea.fechaVencimiento) return;

          const fechaCalendario = tarea.fechaVencimiento.split("T")[0];

          if (!agrupado[fechaCalendario]) {
            agrupado[fechaCalendario] = [];
          }
          agrupado[fechaCalendario].push(tarea);

          puntosCalendario[fechaCalendario] = {
            marked: true,
            dotColor: tarea.estadoTarea ? "#059669" : "#0ea5e9", // Verde si está lista, cyan si está pendiente
          };
        });

        const agendaFinal = Object.keys(agrupado)
          .map((fecha) => ({
            title: fecha,
            data: agrupado[fecha],
          }))
          .sort((a, b) => new Date(a.title) - new Date(b.title));

        setAgendaData(agendaFinal);
        setMarkedDates(puntosCalendario);
      } catch (error) {
        console.error("Error cargando tareas para el calendario", error);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, [user?._id, corporacionActiva?.id, params.nuevaTarea]);

  // Función para cambiar el estado al hacer un "toque largo" en la tarjeta
  const handleEstado = async (idTarea, estadoActual) => {
    const nuevoEstado = !estadoActual;

    setAgendaData((agendaActual) =>
      agendaActual.map((seccion) => ({
        ...seccion,
        data: seccion.data.map((tarea) =>
          tarea._id === idTarea
            ? { ...tarea, estadoTarea: nuevoEstado }
            : tarea,
        ),
      })),
    );

    try {
      await aactualizarEstadoTarea(idTarea, nuevoEstado);
    } catch (error) {
      console.error("Error al actualizar la tarea", error);
      setAgendaData((agendaActual) =>
        agendaActual.map((seccion) => ({
          ...seccion,
          data: seccion.data.map((tarea) =>
            tarea._id === idTarea
              ? { ...tarea, estadoTarea: estadoActual }
              : tarea,
          ),
        })),
      );
    }
  };

  const renderItem = useCallback(({ item }) => {
    // 1. Sacamos la hora de la fecha de vencimiento (ej: "10:30")
    let horaFormateada = "Sin hora";
    if (item.fechaVencimiento) {
      const fechaObj = new Date(item.fechaVencimiento);
      horaFormateada = fechaObj.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    // 2. Ajustamos los colores si la tarea está completada
    const colorBorde = item.estadoTarea
      ? "border-emerald-500"
      : "border-cyan-500";
    const colorCajitaTexto = item.estadoTarea
      ? "text-emerald-600 bg-emerald-50"
      : "text-cyan-600 bg-cyan-50";

    return (
      <TouchableOpacity
        className={`bg-white p-4 mx-4 my-2 rounded-xl border-l-4 ${colorBorde} shadow-sm`}
        // Al tocar normal, ves un resumen.
        onPress={() =>
          Alert.alert(item.nombre, `Prioridad: ${item.prioridad || "Normal"}`)
        }
        // Al dejar pulsado, cambia el estado (completada/pendiente)
        onLongPress={() => handleEstado(item._id, item.estadoTarea)}
      >
        <View className="flex-row justify-between items-center mb-1">
          <Text
            className={`text-lg font-bold ${item.estadoTarea ? "text-slate-400 line-through" : "text-slate-800"}`}
            numberOfLines={1}
          >
            {item.nombre}
          </Text>
          <Text
            className={`text-sm font-semibold px-2 py-1 rounded-md ${colorCajitaTexto}`}
          >
            {horaFormateada}
          </Text>
        </View>
        <Text className="text-slate-500 capitalize">
          Prioridad: {item.prioridad || "No definida"}
        </Text>
      </TouchableOpacity>
    );
  }, []);

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: () => (
            <Text className="text-2xl font-bold text-cyan-700 ml-3">
              Agenda
            </Text>
          ),
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "white" },
        }}
      />

      <View className="flex-1 bg-slate-50">
        {loading ? (
          <ActivityIndicator className="mt-10" color="#0e7490" size="large" />
        ) : (
          <CalendarProvider
            date={hoy}
            showTodayButton
            theme={{ todayButtonTextColor: "#0ea5e9" }}
          >
            <ExpandableCalendar
              theme={{
                selectedDayBackgroundColor: "#0ea5e9",
                selectedDayTextColor: "#ffffff",
                todayTextColor: "#0284c7",
                arrowColor: "#0ea5e9",
                textDayFontWeight: "500",
                textMonthFontWeight: "bold",
                textDayHeaderFontWeight: "600",
              }}
              markedDates={markedDates}
            />
            <AgendaList
              sections={agendaData}
              renderItem={renderItem}
              theme={{ listTitleColor: "#64748b", listTitleFontSize: 14 }}
              sectionStyle={{
                backgroundColor: "#f8fafc",
                textTransform: "capitalize",
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}
            />
          </CalendarProvider>
        )}
      </View>
    </Screen>
  );
}
