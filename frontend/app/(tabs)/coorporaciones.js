import { View, Text } from "react-native";
import { Screen } from "../../src/components/Screen"; // O tu componente contenedor
import { useAuth } from "../../src/context/AuthContext";
import { CorporacionesList } from "../../src/components/CorporacionesList";

// ¡IMPORTANTE! Tiene que ser 'export default'
export default function CoorporacionesScreen() {
  const { user } = useAuth();
  return (
    <Screen>
      <View className="flex-1 bg-[#F8FAFC] p-6">
        {/* El color de fondo F8FAFC le da ese toque limpio de tu captura */}
        <Text className="text-slate-500 text-base mb-8 mt-4">
          Selecciona la organización con la que deseas trabajar
        </Text>

        <CorporacionesList userId={user?._id} />
      </View>
    </Screen>
  );
}
