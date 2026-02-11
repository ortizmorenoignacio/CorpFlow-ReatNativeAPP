import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, ActivityIndicator, View } from "react-native";
import { obtenerUsuarios } from "../api/services/usuarioService";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ElementsCard } from "./ElementsCard";
export function Main() {
  const insets = useSafeAreaInsets(); //HOOK para tener los espacios por arriba y abajo
  const empresa = {
    id: "695a45494425fe76fe5a4f6b",
  };
  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <ScrollView>
        <StatusBar style="auto" />
        <ElementsCard corporacionId={empresa.id}></ElementsCard>
      </ScrollView>
    </View>
  );
}
