import { post } from "../helpers/request";

export const crearMensaje = async (datos) => {
  return await post("/api/mensajes", datos);
};
