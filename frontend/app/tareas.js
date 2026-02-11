import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { obtenerTareas } from "../src/api/services/tareaService";
import { Link } from "expo-router";

export default function Tareas() {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    obtenerTareas().then((tareas) => setTareas(tareas));
  });
  return (
    <ScrollView>
      <Link href="/" className="mt-24">
        Ir al inicio
      </Link>
      {tareas.map((tarea) => (
        <View key={tarea._id} className=" mt-10 justify-center text-center">
          <Text>{tarea.nombre}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
