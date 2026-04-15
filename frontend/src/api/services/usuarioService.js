// src/api/services/usuarioService.js
import { get, post, put } from "../helpers/request";

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

export const obtenerTareasUsuarioCorporacion = async (userId, corpId) => {
  return await get(`/api/usuario/${userId}/corporacion/${corpId}/tareas`);
};

export const cambiarContraseña = async (
  userId,
  contraseñaActual,
  contraseñaNueva,
) => {
  return await put(`/api/usuario/${userId}/contrasena`, {
    contraseñaActual,
    contraseñaNueva,
  });
};

export const actualizarUsuario = async (userId, datos) => {
  return await put(`/api/usuario/${userId}`, datos);
};

export const crearMembresia = async (datos) => {
  return await post("/api/membresias", datos);
};

export const buscarUsuarioCorreo = async (correo) => {
  return await get(`/api/usuario?correo=${correo}`);
};
