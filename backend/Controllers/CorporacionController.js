const { request, response } = require("express");
const Corporacion = require("../Models/corporaciones");
const Usuario = require("../Models/usuario");
const Membresia = require("../Models/membresia");
const Chat = require("../Models/chats");
const Tareas = require("../Models/tareas");
const Reunion = require("../Models/reuniones");
const Carpeta = require("../Models/carpetas");

//Obtener Corporaciones

exports.obtenerCorporaciones = async (request, response) => {
  try {
    const corporaciones = await Corporacion.find();
    response.json(corporaciones);
  } catch (error) {
    response.status(500).json({ error: "Error al obtener las corporaciones" });
  }
};

//Obtener Corporacion ID

exports.obetenerCorporacionId = async (request, response) => {
  try {
    const { id } = request.params;
    const corporacion = await Corporacion.findById(id);

    if (corporacion) {
      response.json(corporacion);
    } else {
      response.status(404).json({ error: "Corporacion no encontrada" });
    }
  } catch (error) {
    response
      .status(500)
      .json({ error: "Error al obtener corporacion por su id" });
  }
};

//Crear Corporacion

exports.crearCorporacion = async (request, response) => {
  try {
    const corporacion = request.body;
    const nombre = corporacion.nombre;
    const usuarioId = corporacion.usuarioId;
    const existe = await Corporacion.findOne({ nombre });

    if (!corporacion.logo || !corporacion.nombre) {
      return response.status(400).json({ error: "require fields are missing" });
    }

    if (!usuarioId) {
      return response.status(400).json({ error: "usuarioId no obtenido" });
    }
    if (existe) {
      return response
        .status(400)
        .json({ error: "Ya existe una corporacion con ese nombre" });
    }

    const newCorp = new Corporacion({
      logo: corporacion.logo,
      nombre: corporacion.nombre,
    });

    const savedCorp = await newCorp.save();
    //Creamos el chat de la corporacion

    const nuevoChat = new Chat({
      nombre: `Chat ${savedCorp.nombre}`,
      corporacion: savedCorp._id,
    });

    const savedChat = await nuevoChat.save();

    await Corporacion.findByIdAndUpdate(savedCorp._id, {
      chat: savedChat._id,
    });
    //Creamos la membresia como ADMIN del usuario que crea la corporacion

    const nuevaMembresia = new Membresia({
      rol: "ADMIN",
      corporacion: savedCorp._id,
      usuario: usuarioId,
    });

    const savedMembresia = await nuevaMembresia.save();
    await Usuario.findByIdAndUpdate(usuarioId, {
      $push: { membresias: savedMembresia._id },
    });

    await Corporacion.findByIdAndUpdate(savedCorp._id, {
      $push: { membresias: savedMembresia._id },
    });
    response.status(201).json(savedCorp);
  } catch (error) {
    response
      .status(500)
      .json({ error: "Error al crear la corporacion", detalle: error.message });
  }
};

//Actualizar Corporacion

exports.actualizarCorporacion = async (request, response) => {
  try {
    const { id } = request.params;

    const corporacion = request.body;
    const corpOld = await Corporacion.findById(id);

    if (!corpOld) {
      return response.status(404).json({ error: "Corporacion no encontrada" });
    }

    const Actualizada = await Corporacion.findByIdAndUpdate(id, corporacion, {
      new: true,
    });

    response.json({
      mensaje: "Corporacion actualizada correctamente",
      Corporacion: Actualizada,
    });
  } catch (error) {
    response.status(500).json({ error: "Error al actualizar Corporacion" });
  }
};

//Delete Corporacion

//Delete Corporacion
exports.borrarCorporacion = async (request, response) => {
  try {
    const { id } = request.params;

    const corp = await Corporacion.findById(id);

    if (!corp) {
      return response.status(404).json({ error: "Corporación no encontrada" });
    }

    console.log(`Iniciando borrado en cascada para la corporacion: ${id}`);

    // 1. BORRAR EL CHAT (Método agresivo)
    // En lugar de buscar el ID guardado en la corporación (que a veces falla),
    // le decimos a la base de datos: "Borra cualquier chat que pertenezca a esta corporacion"
    await Chat.deleteMany({ corporacion: id });
    console.log("Chats eliminados correctamente");

    // 2. BORRAR TAREAS, REUNIONES Y CARPETAS
    if (corp.tareas && corp.tareas.length > 0) {
      await Tareas.deleteMany({ _id: { $in: corp.tareas } });
    }
    if (corp.reuniones && corp.reuniones.length > 0) {
      await Reunion.deleteMany({ _id: { $in: corp.reuniones } });
    }
    if (corp.carpetas && corp.carpetas.length > 0) {
      await Carpeta.deleteMany({ _id: { $in: corp.carpetas } });
    }
    console.log("Tareas, Reuniones y Carpetas eliminadas");

    // 3. LIMPIEZA DE USUARIOS Y MEMBRESÍAS
    const membresiasRelacionadas = await Membresia.find({ corporacion: id });
    const idsMembresias = membresiasRelacionadas.map((m) => m._id);

    // Usamos $pullAll en lugar de $pull con $in (es mucho más seguro para arrays de IDs en MongoDB)
    if (idsMembresias.length > 0) {
      await Usuario.updateMany(
        { membresias: { $in: idsMembresias } },
        { $pullAll: { membresias: idsMembresias } },
      );
      console.log(
        `IDs de membresías borrados de los usuarios: ${idsMembresias.length}`,
      );
    }

    // Borramos físicamente los documentos de Membresía
    await Membresia.deleteMany({ corporacion: id });
    console.log("Documentos de Membresía eliminados");

    // 4. EL GOLPE FINAL: Borramos la Corporación
    await Corporacion.findByIdAndDelete(id);
    console.log("Corporación eliminada con éxito");

    response.json({
      mensaje:
        "Corporación y todo su ecosistema (chat, tareas, membresías) borrados correctamente",
    });
  } catch (error) {
    // ESTO ES VITAL: Si algo falla, lo imprimiremos en la consola roja de tu servidor
    console.error("🔴 ERROR GRAVE EN BORRADO CASCADA:", error);
    response.status(500).json({
      error: "Error al borrar la corporación",
      detalle: error.message,
    });
  }
};

//EXTRAS

//Obtener reuniones corporacion

exports.obtenerReunionesCorporacion = async (request, response) => {
  try {
    const { id } = request.params;
    const corporacion = await Corporacion.findById(id);
    const reuniones = corporacion.reuniones;
    if (corporacion) {
      if (reuniones.length != 0) {
        response.json(reuniones);
      } else {
        response.json({ Info: "La corporacion no tiene reuniones asignadas" });
      }
    } else {
      response.status(404).json({ error: "Corporacion no encontrada" });
    }
  } catch (error) {
    response.status(500).json({
      error: "Error al obtener reuniones de una corporacion por su id",
    });
  }
};

//Obtener tareas corporacion

exports.obtenerTareasCorporacion = async (request, response) => {
  try {
    const { id } = request.params;
    const corporacion = await Corporacion.findById(id);
    const tareas = corporacion.tareas;
    if (corporacion) {
      if (tareas.length != 0) {
        response.json(tareas);
      } else {
        response.json({ Info: "La corporacion no tiene tareas asignadas" });
      }
    } else {
      response.status(404).json({ error: "Corporacion no encontrada" });
    }
  } catch (error) {
    response
      .status(500)
      .json({ error: "Error al obtener tareas de una corporacion por su id" });
  }
};

//Obtener chat Corporacion

exports.obtenerChatCorporacion = async (request, response) => {
  try {
    const { id } = request.params;
    const corporacion = await Corporacion.findById(id);
    const chat = corporacion.chat;
    if (corporacion) {
      if (chat) {
        response.json(chat);
      } else {
        response.json({ Info: "La corporacion no tiene chat asignado" });
      }
    } else {
      response.status(404).json({ error: "Corporacion no encontrada" });
    }
  } catch (error) {
    response
      .status(500)
      .json({ error: "Error al obtener el chat de una corporacion por su id" });
  }
};

//Obtener carpetas Corporacion

exports.obtenerCarpetasCorporacion = async (request, response) => {
  try {
    const { id } = request.params;
    const corporacion = await Corporacion.findById(id);
    const carpetas = corporacion.carpetas;
    if (corporacion) {
      if (carpetas.length != 0) {
        response.json(carpetas);
      } else {
        response.json({ Info: "La corporacion no tiene carpetas asignadas" });
      }
    } else {
      response.status(404).json({ error: "Corporacion no encontrada" });
    }
  } catch (error) {
    response.status(500).json({
      error: "Error al obtener las carpetas de una corporacion por su id",
    });
  }
};

//Obtener membresias corporacion

exports.obtenerMembresiasCorporacion = async (request, response) => {
  try {
    const { id } = request.params;
    const corporacion = await Corporacion.findById(id).populate({
      path: "membresias",
      populate: {
        path: "usuario",
        select: "nombre email",
      },
    });
    if (corporacion) {
      if (corporacion.membresias.length != 0) {
        response.json(corporacion.membresias);
      } else {
        response.json({ Info: "La corporacion no tiene membresias asignadas" });
      }
    } else {
      response.status(404).json({ error: "Corporacion no encontrada" });
    }
  } catch (error) {
    response.status(500).json({
      error: "Error al obtener las membresias de una corporacion por su id",
    });
  }
};
