import { Stack, useRouter } from "expo-router";
import { useCorporacion } from "../src/context/CorporacionContext";
import { useEffect, useState } from "react";
import { Screen } from "../src/components/Screen";
import * as DocumentPicker from "expo-document-picker";
import {
  crearCarpeta,
  obtenerArchivosGenerales,
  ObtenerCarpetasRaiz,
  subirArchivo,
} from "../src/api/services/documentosService";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { DocumentoCard } from "../src/components/DocumentoCard";
import { CrearCarpetaModal } from "../src/components/CarpetaModal";
import { Feather } from "@expo/vector-icons";
export default function DocumentosScreen() {
  const router = useRouter();

  const { corporacionActiva } = useCorporacion();

  const [carpetas, setCarpetas] = useState([]);
  const [archivos, setArchivos] = useState([]);
  const [loading, setLoading] = useState(true);

  const colores = ["#f59e0b", "#0ea5e9", "#10b981", "#8b5cf6"];

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    datos();
  }, [corporacionActiva]);

  const datos = async () => {
    if (!corporacionActiva?.id) return;
    try {
      setLoading(true);
      const [resCarpetas, resArchivos] = await Promise.all([
        ObtenerCarpetasRaiz(corporacionActiva.id),
        obtenerArchivosGenerales(corporacionActiva.id),
      ]);
      setCarpetas(resCarpetas);
      setArchivos(resArchivos);
    } catch (error) {
      console.error("Error al cargar documentos:", error);
      Alert.alert("Error", "No se pudieron cargar los archivos.");
    } finally {
      setLoading(false);
    }
  };

  const handleNuevaCarpeta = async (nombre) => {
    try {
      await crearCarpeta({
        nombre,
        corporacion: corporacionActiva.id,
        carpetaPadre: null,
      });
      datos();
    } catch (error) {
      Alert.alert("Error", "No se pudo crear la carpeta", error);
    }
  };

  const handleSubirArchivo = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        setLoading(true);
        const archivo = result.assets[0];

        await subirArchivo(archivo, corporacionActiva.id, null);
        Alert.alert("Éxito", "Archivo subido correctamente");
        datos();
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo subir el archivo", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Screen>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: () => (
            <Text className="text-3xl font-bold text-cyan-700 ml-3 ">
              Documentos
            </Text>
          ),
        }}
      ></Stack.Screen>

      <View className="flex-1">
        {loading ? (
          <View className="flex-1 justify-center items-center mt-10">
            <ActivityIndicator size="large" color="#0ea5e9" />
          </View>
        ) : (
          <ScrollView
            className="flex-1 px-5 pt-6"
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          >
            {/* SECCIÓN CARPETAS */}
            <View>
              <Text className="text-slate-400 font-bold text-[10px] tracking-[2px] mb-4 uppercase ml-1">
                Carpetas
              </Text>

              {carpetas.length > 0 ? (
                carpetas.map((folder, index) => (
                  <DocumentoCard
                    key={folder._id}
                    nombre={folder.nombre}
                    tipo="carpeta"
                    color={colores[index % colores.length]}
                    onPress={() =>
                      router.push(
                        `/documentos/${folder._id}?nombre=${folder.nombre}`,
                      )
                    }
                  ></DocumentoCard>
                ))
              ) : (
                <Text className="text-slate-400 italic ml-1">
                  No hay carpetas creadas
                </Text>
              )}
            </View>
            {/* SECCIÓN ARCHIVOS GENERALES */}
            <View>
              <Text className="text-slate-400 font-bold text-[10px] tracking-[2px] mb-4 uppercase ml-1">
                Archivos Generales
              </Text>
              {archivos && archivos.length > 0 ? (
                archivos.map((archivo) => (
                  <DocumentoCard
                    key={archivo._id}
                    nombre={archivo.nombre}
                    tipo="archivo"
                    color="#64748b"
                    onPress={() => Alert.alert("Archivo", archivo.nombre)}
                  />
                ))
              ) : (
                <Text className="text-slate-400 italic ml-4">
                  Sin archivos sueltos
                </Text>
              )}
            </View>
          </ScrollView>
        )}
      </View>

      <CrearCarpetaModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleNuevaCarpeta}
      ></CrearCarpetaModal>

      <Pressable
        onPress={() => {
          Alert.alert(
            "¿Qué quieres añadir?",
            "Selecciona una de las opciones",
            [
              { text: "Nueva Carpeta", onPress: () => setModalVisible(true) },
              { text: "Subir Archivo", onPress: handleSubirArchivo },
              { text: "Cancelar", style: "cancel" },
            ],
          );
        }}
        className="absolute bottom-8 right-6 w-16 h-16 bg-cyan-700 rounded-full items-center justify-center shadow-lg"
      >
        <Feather name="plus" size={30} color="white"></Feather>
      </Pressable>
    </Screen>
  );
}
