import { get } from "../helpers/request";

export const obtenerMensajesChat = async (id) => {
  return await get(`/api/chats/${id}/mensajes`);
};
