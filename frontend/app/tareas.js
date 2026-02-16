import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { obtenerTareas } from "../src/api/services/tareaService";
import { Screen } from "../src/components/Screen";

export default function Tareas() {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    obtenerTareas().then((tareas) => setTareas(tareas));
  });
  return (
    <Screen>
      <ScrollView>
        {tareas.map((tarea) => (
          <View key={tarea._id} className=" mt-10 justify-center text-center">
            <Text>{tarea.nombre}</Text>
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
}
