import { View, Text } from "react-native";

export default function ScreenPerfil() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        ¡Funciona! Esta es la pantalla de Perfil (Index)
      </Text>
    </View>
  );
}
