import { Pressable, Text, View } from "react-native";
import { Link } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
export function ElementsCard({ corporacionId, chatId }) {
  const menuItems = [
    {
      id: 1,
      name: "Calendario",
      bg: "#E3F2FD",
      color: "#2196F3",
      link: `/calendario/${corporacionId}`,
      icono: "calendar-alt",
    },
    {
      id: 2,
      name: "Tareas",
      bg: "#E8F5E9",
      color: "#4CAF50",
      link: "/tareas",
      icono: "check-square",
    },
    {
      id: 3,
      name: "Chat",
      bg: "#FFF3E0",
      color: "#FF9800",
      link: `/chat/${chatId}`,
      icono: "comment",
    },
    {
      id: 4,
      name: "Docs",
      bg: "#FFEBEE",
      color: "#F44336",
      link: "/documentos",
      icono: "file-alt",
    },
  ];

  return (
    <View className="flex-row justify-between px-5 mt-5 w-full">
      {menuItems.map((item) => (
        <Link key={item.id} asChild href={item.link}>
          <Pressable
            className="w-20 h-20 rounded-2xl items-center justify-center active:opacity-60"
            style={{ backgroundColor: item.bg }}
          >
            <FontAwesome5 name={item.icono} size={24} color={item.color} />
            <Text
              className=" text-xs font-semibold"
              style={{ color: item.color }}
            >
              {item.name}
            </Text>
          </Pressable>
        </Link>
      ))}
    </View>
  );
}
