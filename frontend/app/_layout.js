import { Text, View } from "react-native";
import { Slot } from "expo-router";
export default function Layout() {
  return (
    <View className="flex-1 items-center justify-center">
      <Slot />
    </View>
  );
}
