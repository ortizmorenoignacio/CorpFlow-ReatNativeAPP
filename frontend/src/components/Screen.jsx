import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export function Screen({ children }) {
  return <View className="flex-1 bg-slate-50">{children}</View>;
}
