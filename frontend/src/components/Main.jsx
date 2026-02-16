import { StatusBar } from "expo-status-bar";

import { ScrollView, View, Text } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ElementsCard } from "./ElementsCard";
import { Screen } from "./Screen";
export function Main() {
  const empresa = {
    id: "695a45494425fe76fe5a4f6b",
    nombre: "Deloitte",
    chat: "695f97e07ea456d03e126fdc",
  };
  return (
    <Screen>
      <ScrollView>
        <StatusBar style="auto" />
        <ElementsCard
          corporacionId={empresa.id}
          chatId={empresa.chat}
        ></ElementsCard>
      </ScrollView>
    </Screen>
  );
}
