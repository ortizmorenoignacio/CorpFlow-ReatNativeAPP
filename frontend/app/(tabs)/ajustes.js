import { View, Text } from "react-native";
import { Screen } from "../../src/components/Screen"; // O tu componente contenedor

// ¡IMPORTANTE! Tiene que ser 'export default'
export default function PerfilScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Perfil de Usuario</Text>
    </View>
  );
}
