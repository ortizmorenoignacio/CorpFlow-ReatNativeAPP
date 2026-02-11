const { request, response } = require("express");
const Usuario = require("../Models/usuario");

// Obtener Usuarios

exports.obtenerUsuarios = async (request, response) => {
  try {
    const usuarios = await Usuario.find();
    console.log("Colección que estoy leyendo:", Usuario.collection.name);
    console.log("Cantidad encontrada:", usuarios.length);
    console.log(
      "IDs encontrados:",
      usuarios.map((u) => u._id),
    );
    response.json(usuarios);
  } catch (error) {
    response.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

// Obtener usuario por ID

exports.obtenerUsuarioId = async (request, response) => {
  try {
    const { id } = request.params;
    const usuario = await Usuario.findById(id);

    if (usuario) {
      response.json(usuario);
    } else {
      response.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    response.status(500).json({ error: "Error al obtener usuario por su id" });
  }
};

//Obtener reuniones de un usuario

exports.obtenerReunionesUsuario = async (request, response) => {
  try {
    const { id } = request.params;
    const usuario = await Usuario.findById(id);
    const reuniones = usuario.reuniones;
    if (usuario) {
      if (reuniones.length != 0) {
        response.json(reuniones);
      } else {
        response.json({ Info: "El usuario no tiene reuniones asignadas" });
      }
    } else {
      response.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    response
      .status(500)
      .json({ error: "Error al obtener reuniones de un usuario por su id" });
  }
};

// Crear un usuario

exports.crearUsuario = async (request, response) => {
  try {
    const usuario = request.body;
    const dni = usuario.dni;
    const usuarioExiste = await Usuario.findOne({ dni });

    if (
      !usuario.nombre ||
      !usuario.correo ||
      !usuario.telefono ||
      !usuario.fotoPerfil ||
      !usuario.fechaNacimiento ||
      !usuario.contraseña ||
      !usuario.dni ||
      !usuario.genero
    ) {
      return response.status(400).json({ error: "require fields are missing" });
    }

    if (usuarioExiste) {
      return response
        .status(400)
        .json({ error: "Ya existe un usuario con ese dni" });
    }
    const newUser = new Usuario({
      nombre: usuario.nombre,
      correo: usuario.correo,
      telefono: usuario.telefono,
      fotoPerfil: usuario.fotoPerfil,
      fechaNacimiento: usuario.fechaNacimiento,
      contrasena: usuario.contraseña,
      dni: usuario.dni,
      genero: usuario.genero,
    });
    const savedUser = await newUser.save();
    response.status(201).json(savedUser);
  } catch (error) {
    response
      .status(500)
      .json({ error: "Error al crear usuario", detalle: error.message });
  }
};

//Actualizar Usuario por su ID

exports.actualizarUsuario = async (request, response) => {
  try {
    const { id } = request.params;

    const usuario = request.body;
    const newUserInfo = {
      nombre: usuario.nombre,
      correo: usuario.correo,
      telefono: usuario.telefono,
      fotoPerfil: usuario.fotoPerfil,
      fechaNacimiento: usuario.fechaNacimiento,
      contraseña: usuario.contraseña,
      dni: usuario.dni,
      genero: usuario.genero,
    };
    await Usuario.findByIdAndUpdate(id, newUserInfo, { new: true }).then(
      (result) => {
        response.json(result).end();
      },
    );
  } catch (error) {
    response.status(500).json({ error: "Error al actualizar usuario" });
  }
};

//Borrar Usuario

exports.eliminarUsuarioID = async (request, response) => {
  try {
    const { id } = request.params;
    await Usuario.findByIdAndDelete(id);
    response.json({ Info: "Usuario borrado correctamente" });
  } catch (error) {
    response.status(500).json({ error: "Error al borrar usuario" });
  }
};
