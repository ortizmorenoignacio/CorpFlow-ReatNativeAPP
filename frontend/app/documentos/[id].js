import { useLocalSearchParams, Stack, router } from "expo-router";
import { useEffect, useState } from "react";
import {
  crearCarpeta,
  obtenerContenidoCarpeta,
} from "../../src/api/services/documentosService";
import { Screen } from "../../src/components/Screen";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { DocumentoCard } from "../../src/components/DocumentoCard";
import { useCorporacion } from "../../src/context/CorporacionContext";
import { CrearCarpetaModal } from "../../src/components/CarpetaModal";
import { Feather } from "@expo/vector-icons";

export default function CarpetaDetails() {
  const { id, nombre } = useLocalSearchParams();
  const [subcarpetas, setSubcarpetas] = useState([]);
  const [archivos, setArchivos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { corporacionActiva } = useCorporacion();
  const [modalVisible, setModalVisible] = useState(false);

  const colores = ["#f59e0b", "#0ea5e9", "#10b981", "#8b5cf6"];
  useEffect(() => {
    cargarContenido();
  }, [id]);

  const cargarContenido = async () => {
    setLoading(true);
    const { subcarpetas, documentos } = await obtenerContenidoCarpeta(id);
    setSubcarpetas(subcarpetas);
    setArchivos(documentos);
    setLoading(false);
  };

  const handleNuevaCarpeta = async (nombre) => {
    try {
      await crearCarpeta({
        nombre,
        corporacion: corporacionActiva.id,
        carpetaPadre: id,
      });
      cargarContenido();
    } catch (error) {
      Alert.alert("Error", "No se pudo crear la carpeta", error);
    }
  };

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: () => (
            <Text className="text-3xl font-bold text-cyan-700 ml-3 ">
              {nombre}
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

              {subcarpetas.length > 0 ? (
                subcarpetas.map((folder, index) => (
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
        onPress={() => setModalVisible(true)}
        className="absolute bottom-8 right-6 w-16 h-16 bg-cyan-700 rounded-full items-center justify-center shadow-lg"
      >
        <Feather name="plus" size={30} color="white"></Feather>
      </Pressable>
    </Screen>
  );
}
