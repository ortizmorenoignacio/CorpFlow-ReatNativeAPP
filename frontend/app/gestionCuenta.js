import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useAuth } from "../src/context/AuthContext";
import { Screen } from "../src/components/Screen";
import { eliminarUsuarioID } from "../src/api/services/usuarioService";

export default function GestionCuenta() {
  const { user, signOut } = useAuth(); // Asumo que tienes signOut en tu AuthContext

  const handleEliminarCuenta = () => {
    Alert.alert(
      "¿Eliminar cuenta?",
      "Esta acción es permanente y no se puede deshacer.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            await eliminarUsuarioID(user._id);
            signOut();
          },
        },
      ],
    );
  };

  return (
    <Screen>
      <View className="p-6">
        <Text className="text-xl font-bold mb-6">Información de Cuenta</Text>
        <View className="bg-white p-4 rounded-2xl border border-slate-200 mb-6">
          <Text className="text-slate-500">Nombre: {user?.nombre}</Text>
          <Text className="text-slate-500">Correo: {user?.correo}</Text>
        </View>

        <TouchableOpacity
          onPress={handleEliminarCuenta}
          className="bg-red-50 p-4 rounded-xl items-center border border-red-200"
        >
          <Text className="text-red-600 font-bold">
            Eliminar Cuenta permanentemente
          </Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}
