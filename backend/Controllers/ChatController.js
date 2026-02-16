const { request, response } = require("express");
const Chat = require("../Models/chats");
const Corporacion = require("../Models/corporaciones");

//Obtener Chats

exports.obtenerChats = async (request, response) => {
  try {
    const chats = await Chat.find();
    response.json(chats);
  } catch (error) {
    response.status(500).json({ error: "Error al obtener los chats" });
  }
};

//Obtener Chat por su id

exports.obtenerChatID = async (request, response) => {
  try {
    const { id } = request.params;
    const chat = await Chat.findById(id);

    if (chat) {
      response.json(chat);
    } else {
      response.status(404).json({ error: "Chat no encontrado" });
    }
  } catch (error) {
    response.status(500).json({ error: "Error al obtener chat por su id" });
  }
};

//Crear un Chat

exports.crearChat = async (request, response) => {
  try {
    const chat = request.body;
    const corporacion = chat.corporacion;
    const corporacionExiste = await Chat.findOne({ corporacion });

    if (corporacionExiste) {
      return response
        .status(400)
        .json({ error: "Ya existe un chat para esa corporacion" });
    }

    if (!chat.nombre || !chat.corporacion) {
      return response.status(400).json({ error: "require fields are missing" });
    }
    const newChat = new Chat({
      nombre: chat.nombre,
      corporacion: chat.corporacion,
    });
    const savedChat = await newChat.save();
    await Corporacion.findByIdAndUpdate(chat.corporacion, {
      $push: { chat: savedChat._id },
    });
    response.status(201).json(savedChat);
  } catch (error) {
    response
      .status(500)
      .json({ error: "Error al crear chat", detalle: error.message });
  }
};

//Borrar Chat

exports.borrarChat = async (request, response) => {
  try {
    const { id } = request.params;
    const chat = await Chat.findByIdAndDelete(id);
    await Corporacion.findByIdAndUpdate(chat.corporacion, {
      $pull: { chat: id },
    });
    response.json({ Info: "Chat eliminado correctamente" });
  } catch (error) {
    response.status(500).json({ error: "error al borrar el chat" });
  }
};

//Actualizar Chat

exports.actualizarChat = async (request, response) => {
  try {
    const { id } = request.params;
    const chat = request.body;

    const chatOld = await Chat.findById(id);

    if (!chatOld) {
      return response.status(404).json({ error: "Tarea no encontrada" });
    }

    const corporacionOld = chatOld.corporacion;
    const Actualizada = await Chat.findByIdAndUpdate(id, chat, { new: true });

    if (chat.corporacion) {
      const newCorp = chat.corporacion;

      await Promise.all([
        Corporacion.findByIdAndUpdate(corporacionOld, { $pull: { chat: id } }),

        Corporacion.findByIdAndUpdate(newCorp, { $push: { chat: id } }),
      ]);
    }
    response.json({
      mensaje: "Chat actualizado correctamente",
      chat: Actualizada,
    });
  } catch (error) {
    console.error("Error al actualizar el chat:", error);
    response
      .status(500)
      .json({ error: "Error al actualizar el chat", detalle: error.message });
  }
};

//EXTRAS

exports.obtenerMensajes = async (request, response) => {
  try {
    const { id } = request.params;
    const chat = await Chat.findById(id);
    const mensajes = chat.mensajes;

    if (chat) {
      if (mensajes.length != 0) {
        response.json(mensajes);
      } else {
        response.json([]);
      }
    }
  } catch (error) {
    response
      .status(500)
      .json({ error: "Error al obtener mensajes de un chat por su id" });
  }
};
