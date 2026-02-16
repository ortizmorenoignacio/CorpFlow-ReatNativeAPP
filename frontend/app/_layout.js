import { Text, View } from "react-native";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <View className="flex-1 ">
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "white" },
          headerTintColor: "black",
          headerTitle: "",
          headerLeft: () => (
            <Text className="text-3xl font-bold text-slate-800">Deloitte</Text>
          ),
        }}
      />
    </View>
  );
}
