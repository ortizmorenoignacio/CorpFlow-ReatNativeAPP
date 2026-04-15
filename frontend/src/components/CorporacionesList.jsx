import { useEffect, useState } from "react";
import { obtenerMembresiasUsuario } from "../api/services/usuarioService";
import { ActivityIndicator, FlatList } from "react-native";
import { MembresiaCard } from "./MembresiasCard";
import { Screen } from "./Screen";
import { useCorporacion } from "../context/CorporacionContext";
import { useRouter } from "expo-router";

export const CorporacionesList = ({ userId }) => {
  const { seleccionarCorporacion } = useCorporacion();
  const router = useRouter();
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

  const handleSelect = (item) => {
    seleccionarCorporacion({
      id: item.corporacion._id,
      nombre: item.corporacion.nombre,
      chat: item.corporacion.chat,
      logo: item.corporacion.logo,
    });

    router.replace("/(tabs)");
  };
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
            onPress={() => handleSelect(item)}
            onEdit={() =>
              router.push({
                pathname: "/editCorporacion",
                params: {
                  id: item.corporacion._id,
                  nombre: item.corporacion.nombre,
                  logo: item.corporacion.logo,
                },
              })
            }
          ></MembresiaCard>
        )}
      ></FlatList>
    </Screen>
  );
};
