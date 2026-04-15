import { get, post, put } from "../helpers/request";

export const obtenerCorporacion = async () => {
  return await get("/api/corporaciones");
};

export const registrarCorporacion = async (datosCorp) => {
  return await post("/api/corporaciones", datosCorp);
};

export const obtenerMiembrosCorporacion = async (idCorp) => {
  return await get(`/api/corporaciones/${idCorp}/membresias`);
};

export const editarCorporacion = async (idCorp, datos) => {
  return await put(`/api/corporaciones/${idCorp}`, datos);
};
