// app/chat/[id].jsx
import { useLocalSearchParams, Stack } from "expo-router";
import { View, Text, ActivityIndicator, ScrollView, _Text } from "react-native";
import { Screen } from "../../src/components/Screen";
import { useEffect, useState } from "react";

import {
  obtenerChat,
  obtenerMensajesChat,
} from "../../src/api/services/chatService";

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const [mensajes, setMensajes] = useState(null);
  const [nombreChat, setNombreChat] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (id) {
      obtenerChat(id).then((data) => {
        setNombreChat(data.nombre);
      });
      obtenerMensajesChat(id).then((data) => {
        setMensajes(data);
      });
    }
  }, [id]);

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: () => (
            <Text className="text-2xl font-bold text-cyan-700">
              {nombreChat}
            </Text>
          ),
          headerStyle: { backgroundColor: "white" },
          headerTintColor: "#0e7490",
        }}
      />
      <View className="flex-1 bg-slate-50">
        <Text className="text-xl">
          Estás en el Chat de la Corporación: {id}
        </Text>

        {mensajes === null ? (
          <ActivityIndicator color={"#000"} />
        ) : (
          <ScrollView>
            {mensajes.length === 0 ? (
              <Text>No hay mensajes aun</Text>
            ) : (
              mensajes.map((msg, index) => (
                <View key={index} className="p-3 bg-gray-100 mb-2 rounded-lg">
                  <Text>{JSON.stringify(msg)}</Text>
                </View>
              ))
            )}
          </ScrollView>
        )}
      </View>
    </Screen>
  );
}
