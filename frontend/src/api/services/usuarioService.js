// src/api/services/usuarioService.js
import { get, post } from "../helpers/request";

// URL Final: http://10.0.2.2:3001/api/usuario
export const obtenerUsuarios = async () => {
  return await get("/api/usuario");
};

export const registrarUsuario = async (datosUsuario) => {
  return await post("/api/usuario", datosUsuario);
};

export const obtenerMembresiasUsuario = async (userId) => {
  return await get(`/api/usuario/${userId}/membresias`);
};
