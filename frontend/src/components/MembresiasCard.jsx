import { Image, Pressable, Text, View } from "react-native";

export const MembresiaCard = ({ nombre, logo, rol, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      className="bg-white p-5 rounded-[24px] mb-4 shadow-sm border border-gray-100 flex-row items-center active:opacity-90"
    >
      <View className="w-14 h-14 bg-slate-50 rounded-2xl mr-4 items-center justify-center overflow-hidden border border-gray-50">
        {logo ? (
          <Image
            source={{ uri: logo }}
            className="w-full h-full"
            resizeMode="contain"
          ></Image>
        ) : (
          <Text className="text-xl font-bold text-cyan-700">
            {nombre ? nombre.charAt(0).toUpperCase() : "?"}
          </Text>
        )}
      </View>
      {/* Texto de la Organización */}
      <View className="flex-1">
        <Text className="text-lg font-semibold text-cyan-700">{nombre}</Text>
        {rol && (
          <Text className="text-xs text-slate-400 font-medium uppercase tracking-wider">
            {rol}
          </Text>
        )}
      </View>
    </Pressable>
  );
};
