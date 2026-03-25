import { Platform } from "react-native";

const IP_PC = "192.168.0.102";

export const API_BASE_URL = Platform.select({
  web: "http://localhost:3001", // El navegador web usa localhost
  android: "http://10.0.2.2:3001", // El emulador de Android usa 10.0.2.2

  default: `http://${IP_PC}:3001`, // Por si acaso (iOS, etc.)
});
