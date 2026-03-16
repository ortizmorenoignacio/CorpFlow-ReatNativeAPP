import { View } from "react-native";

export function Screen({ children }) {
  return <View className="flex-1 bg-slate-50">{children}</View>;
}
