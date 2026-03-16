import { get, post } from "../helpers/request";

export const obtenerCorporacion = async () => {
  return await get("/api/corporaciones");
};

export const registrarCorporacion = async (datosCorp) => {
  return await post("/api/corporaciones", datosCorp);
};

export const obtenerMiembrosCorporacion = async (idCorp) => {
  return await get(`/api/corporaciones/${idCorp}/membresias`);
};
