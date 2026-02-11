// app/chat/[id].jsx
import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function ChatScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-xl">Estás en el Chat de la Corporación: {id}</Text>
    </View>
  );
}
