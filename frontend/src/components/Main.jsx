import { StatusBar } from "expo-status-bar";

import { ScrollView, View, Text } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ElementsCard } from "./ElementsCard";
import { Screen } from "./Screen";
import { useCorporacion } from "../context/CorporacionContext";
export function Main() {
  const { corporacionActiva } = useCorporacion();

  if (!corporacionActiva) {
    return (
      <Screen>
        <View className="flex-1 justify-center items-center">
          <Text>Por favor, selecciona una corporacion primero.</Text>
        </View>
      </Screen>
    );
  }
  return (
    <Screen>
      <ScrollView>
        <StatusBar style="auto" />
        <ElementsCard
          corporacionId={corporacionActiva.id}
          chatId={corporacionActiva.chat}
        ></ElementsCard>
      </ScrollView>
    </Screen>
  );
}
