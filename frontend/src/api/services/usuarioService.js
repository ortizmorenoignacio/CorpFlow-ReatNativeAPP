// src/api/services/usuarioService.js
import { get, post } from "../helpers/request";

// Esta función llama a tu ruta: router.get('/', obtenerUsuarios)
// URL Final: http://10.0.2.2:3001/api/usuario
export const obtenerUsuarios = async () => {
  return await get("/api/usuario");
};

// Esta función llama a tu ruta: router.post('/', crearUsuario)
export const registrarUsuario = async (datosUsuario) => {
  return await post("/api/usuario", datosUsuario);
};
