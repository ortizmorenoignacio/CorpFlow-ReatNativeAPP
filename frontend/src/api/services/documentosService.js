import { get, post } from "../helpers/request";

export const ObtenerCarpetasRaiz = async (corporacionId) => {
  const todasLasCarpetas = await get("/api/carpetas");

  const filtradas = todasLasCarpetas.filter(
    (carpeta) =>
      carpeta.corporacion === corporacionId &&
      (!carpeta.carpetaPadre || carpeta.carpetaPadre === null),
  );

  return filtradas;
};

export const obtenerArchivosGenerales = async (corporacionId) => {
  const todosLosDocumentos = await get("/api/documentos");

  return todosLosDocumentos.filter(
    (doc) => doc.corporacion === corporacionId && doc.clasificado === false,
  );
};

export const obtenerContenidoCarpeta = async (carpetaId) => {
  try {
    const [todasLasCarpetas, todosLosDocs] = await Promise.all([
      get("/api/carpetas"),
      get("/api/documentos"),
    ]);

    const subcarpetas = todasLasCarpetas.filter(
      (sub) => String(sub.carpetaPadre) === String(carpetaId),
    );

    const documentos = todosLosDocs.filter(
      (docs) => String(docs.carpeta) === String(carpetaId),
    );

    return { subcarpetas, documentos };
  } catch (error) {
    console.error("Error al obtener contenido de carpeta:", error);
    return { subcarpetas: [], documentosEnCarpeta: [] };
  }
};

export const crearCarpeta = async (datos) => {
  return await post("api/carpetas", datos);
};

export const subirArchivo = async (
  archivoSeleccionado,
  corporacionId,
  carpetaPadreId = null,
) => {
  try {
    const formData = new FormData();

    //Formato para React Native

    formData.append("archivo", {
      uri: archivoSeleccionado.uri,
      name: archivoSeleccionado.name,
      type: archivoSeleccionado.mimeType,
    });

    formData.append("nombre", archivoSeleccionado.name);
    formData.append("corporacion", corporacionId);

    if (carpetaPadreId) {
      formData.append("carpeta", carpetaPadreId);
    }

    // Usamos una petición POST pero indicando que es multipart/form-data
    const response = await fetch(`http://10.0.2.2:3001/api/documentos`, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error al subir archivo:", error);
    throw error;
  }
};
