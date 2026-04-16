import { get, post } from "../helpers/request";

export const obtenerReunionesUsuarioCorporacion = async (
  userId,
  corporacionId,
) => {
  return await get(
    `/api/reuniones?userId=${userId}&corporacionId=${corporacionId}`,
  );
};

export const crearReunion = async (datos) => {
  return await post("/api/reuniones", datos);
};
