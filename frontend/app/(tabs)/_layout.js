import { Tabs } from "expo-router";
// Aquí asumo que tus iconos funcionan. Si te da error, comenta esta línea y los iconos de abajo temporalmente.
import {
  User,
  Users,
  Engranaje,
  SignOut,
  HomeIcon,
} from "../../src/components/Icons";

import { View } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <HomeIcon color={color}></HomeIcon>,
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => <User color={color}></User>,
        }}
      />
      <Tabs.Screen
        name="coorporaciones"
        options={{
          title: "Equipos",
          tabBarIcon: ({ color }) => <Users color={color}></Users>,
        }}
      />
      <Tabs.Screen
        name="ajustes"
        options={{
          title: "Ajustes",
          tabBarIcon: ({ color }) => <Engranaje color={color}></Engranaje>,
        }}
      />
      <Tabs.Screen
        name="signOut"
        options={{
          title: "Salir",
          tabBarIcon: ({ color }) => <SignOut color={color}></SignOut>,
        }}
      />
    </Tabs>
  );
}
