import { Platform } from "react-native";

const IP_PC = "192.168.0.103";

export const API_BASE_URL =
  Platform.OS === "android" ? "http://10.0.2.2:3001" : `http://${IP_PC}:3001`;
