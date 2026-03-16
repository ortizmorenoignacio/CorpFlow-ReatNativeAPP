import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { Screen } from "../src/components/Screen";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { CalendarForm } from "../src/components/Icons";
import { Feather } from "@expo/vector-icons";
import { registrarTareas } from "../src/api/services/tareaService";
import { useCorporacion } from "../src/context/CorporacionContext";
import { obtenerMiembrosCorporacion } from "../src/api/services/corporacionService";

export default function CrearTarea() {
  const router = useRouter();
  const { corporacionActiva } = useCorporacion();

  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [fechaTexto, setFechaTexto] = useState("");
  const [cargando, setCargando] = useState(false);
  const [concepto, setConcepto] = useState("");
  const [prioridad, setPrioridad] = useState("Media");

  // === ESTADOS DEL DESPLEGABLE ===
  // En lugar de un texto, guardamos el objeto del usuario completo
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [mostrarDropdown, setMostrarDropdown] = useState(false);
  const [miembros, setMiembros] = useState([]);
  const [cargandoMiembros, setCargandoMiembros] = useState(true);

  // === EFECTO PARA CARGAR LOS MIEMBROS ===
  useEffect(() => {
    const cargarMiembros = async () => {
      // Usamos .id o ._id dependiendo de cómo lo guardes
      const idCorp = corporacionActiva?.id || corporacionActiva?._id;
      if (!idCorp) return;

      try {
        setCargandoMiembros(true);
        // Suponiendo que tu servicio recibe el ID de la corporación
        const data = await obtenerMiembrosCorporacion(idCorp);

        if (Array.isArray(data)) {
          // Extraemos los usuarios de las membresías y filtramos nulos
          const usuariosLimpios = data
            .map((membresia) => membresia.usuario)
            .filter((usuario) => usuario !== null && usuario !== undefined);

          setMiembros(usuariosLimpios);
        }
      } catch (error) {
        console.error("Error al cargar los miembros:", error);
      } finally {
        setCargandoMiembros(false);
      }
    };
    cargarMiembros();
  }, [corporacionActiva]);

  // === MANEJADOR PARA CREAR LA TAREA ===
  const handleCrearTarea = async () => {
    // Validamos que usuarioSeleccionado no sea null
    if (!concepto.trim() || !fechaTexto || !usuarioSeleccionado) {
      Alert.alert(
        "Faltan datos",
        "Por favor, rellena todos los campos y selecciona un usuario.",
      );
      return;
    }
    setCargando(true);

    try {
      const nuevaTarea = {
        nombre: concepto,
        fechaInicio: new Date(),
        prioridad: prioridad.toUpperCase(),
        fechaVencimiento: date,
        // Mandamos el ID del usuario seleccionado a la base de datos
        usuario: usuarioSeleccionado._id || usuarioSeleccionado.id,
        estadoTarea: false,
        corporacion: corporacionActiva?.id || corporacionActiva?._id,
      };

      console.log("Enviando tarea:", nuevaTarea);

      await registrarTareas(nuevaTarea);
      Alert.alert("¡Éxito!", "La tarea se ha creado correctamente", [
        {
          text: "Genial",
          onPress: () =>
            router.replace({
              pathname: "/tareas",
              params: { nuevaTarea: true },
            }), // Nos devuelve automáticamente a la lista
        },
      ]);
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al guardar la tarea.");
      console.error(error);
    } finally {
      setCargando(false);
    }
  };

  const seleccionFecha = (event, fechaSeleccionada) => {
    if (Platform.OS === "android") {
      setShowPicker(false);
    }
    if (event.type === "set" && fechaSeleccionada) {
      setDate(fechaSeleccionada);
      const formateo = fechaSeleccionada.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      setFechaTexto(formateo);
    }
  };

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: () => (
            <Text className="text-3xl font-bold text-cyan-700 ml-3">
              NUEVA TAREA
            </Text>
          ),
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "white" },
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        className="p-5 bg-slate-50"
      >
        <View className="mb-6 mt-2">
          <Text className="text-3xl font-extrabold text-slate-800 mb-1">
            Crear Tarea
          </Text>
          <Text className="text-slate-500 text-base">
            Rellena los detalles para añadirla al equipo
          </Text>
        </View>

        <View className="mb-10">
          <Text className="text-sm font-bold text-slate-700 mb-2">
            Concepto
          </Text>
          <TextInput
            placeholder="Ej: Revisar campaña de marketing"
            placeholderTextColor="#94a3b8"
            className="bg-white border border-slate-200 p-4 mb-5 rounded-xl text-slate-800"
            value={concepto}
            onChangeText={setConcepto}
          />

          <Text className="text-sm font-bold text-slate-700 mb-2">
            Nivel de Prioridad
          </Text>
          <View className="flex-row justify-between mb-5 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <Pressable
              onPress={() => setPrioridad("Alta")}
              className={`flex-1 items-center py-3 rounded-lg ${
                prioridad === "Alta" ? "bg-red-100 shadow-sm" : "bg-transparent"
              }`}
            >
              <Text
                className={`font-bold ${prioridad === "Alta" ? "text-red-600" : "text-slate-500"}`}
              >
                ALTA
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setPrioridad("Media")}
              className={`flex-1 items-center py-3 rounded-lg mx-1 ${
                prioridad === "Media"
                  ? "bg-amber-100 shadow-sm"
                  : "bg-transparent"
              }`}
            >
              <Text
                className={`font-bold ${prioridad === "Media" ? "text-amber-600" : "text-slate-500"}`}
              >
                MEDIA
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setPrioridad("Baja")}
              className={`flex-1 items-center py-3 rounded-lg ${
                prioridad === "Baja" ? "bg-sky-100 shadow-sm" : "bg-transparent"
              }`}
            >
              <Text
                className={`font-bold ${prioridad === "Baja" ? "text-sky-600" : "text-slate-500"}`}
              >
                BAJA
              </Text>
            </Pressable>
          </View>

          <Text className="text-sm font-bold text-slate-700 mb-2">
            Fecha de Vencimiento
          </Text>
          <Pressable
            onPress={() => setShowPicker(true)}
            className="bg-white border border-slate-200 p-4 mb-5 rounded-xl flex-row justify-between items-center"
          >
            <Text className={fechaTexto ? "text-slate-800" : "text-slate-400"}>
              {fechaTexto || "Seleccionar fecha"}
            </Text>
            <CalendarForm />
          </Pressable>

          {showPicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              minimumDate={new Date()}
              onChange={seleccionFecha}
            />
          )}

          {/* === SUSTITUIDO TEXTINPUT POR DESPLEGABLE === */}
          <Text className="text-sm font-bold text-slate-700 mb-2">
            Usuario asignado
          </Text>

          <Pressable
            onPress={() => {
              if (!cargandoMiembros && miembros.length > 0) {
                setMostrarDropdown(!mostrarDropdown);
              }
            }}
            className={`bg-white border border-slate-200 p-4 rounded-xl flex-row justify-between items-center ${
              mostrarDropdown ? "mb-2" : "mb-8"
            } ${cargandoMiembros ? "opacity-70" : ""}`}
          >
            <Text
              className={
                usuarioSeleccionado ? "text-slate-800" : "text-slate-400"
              }
            >
              {cargandoMiembros
                ? "Cargando miembros..."
                : usuarioSeleccionado
                  ? usuarioSeleccionado.nombre
                  : "Seleccionar miembro..."}
            </Text>
            {cargandoMiembros ? (
              <ActivityIndicator size="small" color="#94a3b8" />
            ) : (
              <Feather
                name={mostrarDropdown ? "chevron-up" : "chevron-down"}
                size={20}
                color="#94a3b8"
              />
            )}
          </Pressable>

          {/* LISTA DEL DESPLEGABLE */}
          {mostrarDropdown && (
            <View className="bg-white border border-slate-200 rounded-xl mb-8 max-h-48 overflow-hidden shadow-sm">
              <ScrollView nestedScrollEnabled={true}>
                {miembros.map((miembro) => (
                  <Pressable
                    key={miembro._id || miembro.id}
                    onPress={() => {
                      setUsuarioSeleccionado(miembro);
                      setMostrarDropdown(false);
                    }}
                    className="p-4 border-b border-slate-100 active:bg-slate-50 flex-row items-center"
                  >
                    <Feather
                      name="user"
                      size={16}
                      color="#64748b"
                      className="mr-3"
                    />
                    <Text className="text-slate-700 ml-2">
                      {miembro.nombre}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          )}
          {/* ========================================= */}

          <Pressable
            className={`rounded-xl items-center justify-center p-4 shadow-sm ${
              cargando ? "bg-cyan-600/70" : "bg-[#0ea5e9] active:bg-sky-600"
            }`}
            onPress={handleCrearTarea} // Enchufamos la función aquí
            disabled={cargando}
          >
            {cargando ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-bold text-lg">Crear Tarea</Text>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </Screen>
  );
}
