import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Screen } from "../src/components/Screen";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { obtenerReunionesUsuarioCorporacion } from "../src/api/services/reunionesService";
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
        //Llamadas a ambos servicios
        const [tareas, reuniones] = await Promise.all([
          obtenerTareasUsuarioCorporacion(user._id, corporacionActiva.id),
          obtenerReunionesUsuarioCorporacion(user._id, corporacionActiva.id), // Tu nueva función
        ]);

        //Normalizamos
        const eventos = [
          ...tareas.map((t) => ({
            ...t,
            tipo: "tarea",
            fecha: t.fechaVencimiento,
          })),
          ...reuniones.map((r) => ({
            ...r,
            tipo: "reunion",
            fecha: r.fecha_Inicio,
          })),
        ];
        const agrupado = {};
        const puntosCalendario = {};

        eventos.forEach((e) => {
          if (!e.fecha) return;
          const fecha = e.fecha.split("T")[0];

          if (!agrupado[fecha]) agrupado[fecha] = [];
          agrupado[fecha].push(e);

          puntosCalendario[fecha] = {
            marked: true,
            dotColor: e.tipo === "reunion" ? "#f59e0b" : "#0ea5e9",
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
    const esReunion = item.tipo === "reunion";

    // --- LÓGICA PARA TAREAS ---
    const horaFormateada = item.fechaVencimiento
      ? new Date(item.fechaVencimiento).toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "Sin hora";

    const colorBorde = item.estadoTarea
      ? "border-emerald-500"
      : "border-cyan-500";
    const colorCajitaTexto = item.estadoTarea
      ? "text-emerald-600 bg-emerald-50"
      : "text-cyan-600 bg-cyan-50";

    // --- LÓGICA PARA REUNIONES ---
    const horaReunion = item.horaInicio
      ? new Date(item.horaInicio).toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";

    return (
      <TouchableOpacity
        className={`bg-white p-4 mx-4 my-2 rounded-xl border-l-4 ${esReunion ? "border-amber-500" : colorBorde} shadow-sm`}
        onPress={() => {
          if (!esReunion)
            Alert.alert(
              item.nombre,
              `Prioridad: ${item.prioridad || "Normal"}`,
            );
          else
            Alert.alert(item.nombre, `Reunión programada a las ${horaReunion}`);
        }}
        onLongPress={() =>
          !esReunion && handleEstado(item._id, item.estadoTarea)
        }
      >
        <View className="flex-row justify-between items-center mb-1">
          <Text
            className={`text-lg font-bold ${!esReunion && item.estadoTarea ? "text-slate-400 line-through" : "text-slate-800"}`}
            numberOfLines={1}
          >
            {item.nombre}
          </Text>
          {esReunion ? (
            <Text className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded">
              REUNIÓN
            </Text>
          ) : (
            <Text
              className={`text-sm font-semibold px-2 py-1 rounded-md ${colorCajitaTexto}`}
            >
              {horaFormateada}
            </Text>
          )}
        </View>

        <Text className="text-slate-500 capitalize">
          {esReunion
            ? `Hora: ${horaReunion}`
            : `Prioridad: ${item.prioridad || "No definida"}`}
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
        <TouchableOpacity
          onPress={() => router.push("/crearReunion")}
          className="absolute bottom-8 right-6 w-14 h-14 bg-amber-500 rounded-full items-center justify-center shadow-lg"
        >
          <Text className="text-white text-3xl font-bold">+</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}
