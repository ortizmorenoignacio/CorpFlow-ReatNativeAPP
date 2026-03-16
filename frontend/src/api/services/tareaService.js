import { get, post, put } from "../helpers/request";

// Esta función llama a tu ruta: router.get('/', obtenertareas)

export const obtenerTareas = async () => {
  return await get("/api/tareas");
};

// Esta función llama a: router.post('/', crearTarea)
export const registrarTareas = async (datosTareas) => {
  return await post("/api/tareas", datosTareas);
};

export const aactualizarEstadoTarea = async (idTarea, nuevoEstado) => {
  return await put(`/api/tareas/${idTarea}`, { estadoTarea: nuevoEstado });
};
