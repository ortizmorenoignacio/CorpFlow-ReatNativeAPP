import { View, Text } from "react-native";
import { Screen } from "../src/components/Screen";

export default function AcercaDe() {
  return (
    <Screen>
      <View className="flex-1 items-center justify-center p-6">
        <Text className="text-3xl font-bold text-cyan-800">CorpFlow</Text>
        <Text className="text-slate-500 mt-2">Versión 1.0.0</Text>

        <View className="mt-10 items-center">
          <Text className="font-semibold text-slate-700">Créditos:</Text>
          <Text className="text-slate-500">Desarrollado por Ignacio Ortiz</Text>
          <Text className="text-slate-400 mt-4 text-center">
            © 2026 Todos los derechos reservados.
          </Text>
        </View>
      </View>
    </Screen>
  );
}
