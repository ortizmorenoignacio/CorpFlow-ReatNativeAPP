import { View, Text } from "react-native";
import { Screen } from "../../src/components/Screen";
import {
  Calendar,
  DniIcon,
  EmailIcon,
  PhoneIcon,
  User,
} from "../../src/components/Icons";
import { useAuth } from "../../src/context/AuthContext";
export default function ScreenPerfil() {
  const { user } = useAuth();

  const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    const dia = fecha.getDate(toString().padStart(2, "0"));
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const anio = fecha.getFullYear().toString();
    return `${dia}-${mes}-${anio}`;
  };
  return (
    <Screen>
      <View className="px-3">
        <View className=" bg-white border border-slate-200 rounded-2xl mt-5">
          <View className="flex-row mb-3 mt-3">
            <View className="px-2">
              <User color={""}></User>
            </View>
            <View>
              <Text className="text-gray-500">Nombre</Text>
              <Text className="font-semibold text-base">{user.nombre}</Text>
            </View>
          </View>
          <View className="h-[1px] bg-slate-200 w-full" />
          <View className="flex-row mb-3 mt-3">
            <View className="px-2">
              <DniIcon></DniIcon>
            </View>
            <View>
              <Text className="text-gray-500">DNI</Text>
              <Text className="font-semibold text-base">{user.dni}</Text>
            </View>
          </View>
          <View className="h-[1px] bg-slate-200 w-full" />
          <View className="flex-row mb-3 mt-3">
            <View className="px-2">
              <Calendar></Calendar>
            </View>
            <View>
              <Text className="text-gray-500">Fecha Nacimiento</Text>
              <Text className="font-semibold text-base">
                {formatearFecha(user.fechaNacimiento)}
              </Text>
            </View>
          </View>
          <View className="h-[1px] bg-slate-200 w-full" />
          <View className="flex-row mb-3 mt-3">
            <View className="px-2">
              <User></User>
            </View>
            <View>
              <Text className="text-gray-500">Genero</Text>
              <Text className="font-semibold text-base">{user.genero}</Text>
            </View>
          </View>
          <View className="h-[1px] bg-slate-200 w-full" />
        </View>
        <View className=" bg-white border border-slate-200 rounded-2xl mt-5">
          <View className="flex-row mb-3 mt-3">
            <View className="px-2">
              <EmailIcon color={"gray"}></EmailIcon>
            </View>
            <View>
              <Text className="text-gray-500">Correo</Text>
              <Text className="font-semibold text-base">{user.correo}</Text>
            </View>
          </View>
          <View className="h-[1px] bg-slate-200 w-full" />
          <View className="flex-row mb-3 mt-3">
            <View className="px-2">
              <PhoneIcon color={"gray"}></PhoneIcon>
            </View>
            <View>
              <Text className="text-gray-500">Telefono</Text>
              <Text className="font-semibold text-base">{user.telefono}</Text>
            </View>
          </View>

          <View className=" mb-3 mt-3">
            <Text className="text-center text-cyan-700 font-semibold">
              Editar Datos
            </Text>
          </View>
        </View>
      </View>
    </Screen>
  );
}
