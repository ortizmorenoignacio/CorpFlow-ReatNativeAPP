import { useEffect, useState } from "react";
import { obtenerMembresiasUsuario } from "../api/services/usuarioService";
import { ActivityIndicator, FlatList } from "react-native";
import { MembresiaCard } from "./MembresiasCard";
import { Screen } from "./Screen";

export const CorporacionesList = ({ userId }) => {
  const [membresias, setMembresias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const cargarDatos = async () => {
      try {
        const data = await obtenerMembresiasUsuario(userId);
        setMembresias(data);
      } catch (error) {
        console.error("Error cargando corporaciones", error);
      } finally {
        setLoading(false);
      }
    };
    cargarDatos();
  }, [userId]);

  if (loading) return <ActivityIndicator className="mt-10" color="0e7490" />;

  return (
    <Screen>
      <FlatList
        data={membresias}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <MembresiaCard
            nombre={item.corporacion?.nombre}
            logo={item.corporacion?.logo}
            rol={item.rol}
            onPress={() =>
              console.log("Seleccionada:", item.corporacion?.nombre)
            }
          ></MembresiaCard>
        )}
      ></FlatList>
    </Screen>
  );
};
