import { useLocalSearchParams, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Screen } from "../../src/components/Screen";
import { useEffect, useState, useRef } from "react";
import {
  obtenerChat,
  obtenerMensajesChat,
} from "../../src/api/services/chatService";
import { crearMensaje } from "../../src/api/services/mensajesService";
import { useAuth } from "../../src/context/AuthContext";
export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const [mensajes, setMensajes] = useState([]);
  const [nombreChat, setNombreChat] = useState("");
  const [cargando, setCargando] = useState(true);
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const flatListRef = useRef();
  const { user } = useAuth();

  useEffect(() => {
    if (id) {
      obtenerChat(id).then((data) => setNombreChat(data.nombre));
      obtenerMensajesChat(id).then((data) => {
        setMensajes(data.reverse());
        setCargando(false);
      });
    }
  }, [id]);

  const enviarMensaje = async () => {
    if (nuevoMensaje.trim().length === 0) return;

    const msg = {
      _id: Math.random().toString(),
      contenido: nuevoMensaje,
      usuario: 1, // Tu ID
      fechaHora: new Date().toISOString(),
    };

    setMensajes([msg, ...mensajes]); //Añade los mensajes al princio porque la lista esta invertida
    setNuevoMensaje(""); //Limpia el input
    //LLamada a la API

    try {
      const mensajeSaved = await crearMensaje({
        contenido: msg.contenido,
        chat: id,
        usuario: user._id,
      });

      setMensajes((real) =>
        real.map((m) => (m._id === msg._id ? mensajeSaved : m)),
      );
    } catch (error) {
      console.error("Error al guardar mensaje:", error);
    }
  };

  const renderItem = ({ item }) => (
    <View
      className={`p-3 m-2 rounded-2xl max-w-[80%] ${item.usuario === user._id ? "bg-cyan-600 self-end" : "bg-white self-start border border-slate-200"}`}
    >
      <Text
        className={item.usuario === user._id ? "text-white" : "text-slate-800"}
      >
        {item.contenido}
      </Text>
    </View>
  );

  if (cargando) {
    return (
      <View className="flex-1 justify-center">
        <ActivityIndicator size="large" color="#0e7490" />
      </View>
    );
  }

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerShown: true,

          headerTitle: () => (
            <Text className="text-2xl font-bold text-cyan-700 ml-3">
              {nombreChat}
            </Text>
          ),
        }}
      />

      <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={80}
        >
          <FlatList
            ref={flatListRef}
            data={mensajes}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            inverted
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              paddingTop: 10,
              paddingBottom: 10,
            }}
          />

          <View className="flex-row p-3 bg-white border-t border-slate-200 items-center">
            <TextInput
              className="flex-1 bg-slate-100 rounded-full px-4 py-2 text-base"
              placeholder="Escribe un mensaje..."
              value={nuevoMensaje}
              onChangeText={setNuevoMensaje}
              multiline
            />
            <TouchableOpacity onPress={enviarMensaje} className="ml-3">
              <Text className="bg-cyan-700  font-bold text-base text-white rounded-3xl px-2">
                Enviar
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Screen>
  );
}
