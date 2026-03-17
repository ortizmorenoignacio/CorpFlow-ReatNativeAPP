import { Tabs } from "expo-router";
import { useCorporacion } from "../../src/context/CorporacionContext";
import {
  User,
  Users,
  Engranaje,
  SignOut,
  HomeIcon,
} from "../../src/components/Icons";
import { Text } from "react-native";

export default function TabsLayout() {
  const { corporacionActiva } = useCorporacion();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#0e7490",
        tabBarInactiveTintColor: "#94a3b8",

        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: "#f1f5f9",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <HomeIcon color={color}></HomeIcon>,

          headerShown: true,
          headerStyle: {
            backgroundColor: "white",
            borderBottomWidth: 1,
            borderBottomColor: "#e2e8f0",
            elevation: 0, // Quita la sombra difuminada en Android
            shadowOpacity: 0, // Quita la sombra difuminada en iOS
          },
          headerTintColor: "black",
          headerTitle: "",
          headerLeft: () => (
            <Text className="text-3xl font-bold text-cyan-700 ml-3 text-">
              {corporacionActiva?.nombre || "CorpFlow"}
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => <User color={color} />,
          headerShown: true,
          headerTitleAlign: "center",
          headerTitle: () => (
            <Text className="text-3xl font-bold text-cyan-700 ml-3">
              Perfil
            </Text>
          ),
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
          headerShown: true,
          headerTitleAlign: "center",
          headerTitle: () => (
            <Text className="text-3xl font-bold text-cyan-700 ml-3">
              Ajustes
            </Text>
          ),
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
