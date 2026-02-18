const express = require("express");
const router = express.Router();
const usuarioController = require("../Controllers/UsuarioControllerT");

// Rutas Usuarios

router.get("/", usuarioController.obtenerUsuarios);
router.get("/:id", usuarioController.obtenerUsuarioId);
router.get("/:id/reuniones", usuarioController.obtenerReunionesUsuario);
router.post("/", usuarioController.crearUsuario);
router.put("/:id", usuarioController.actualizarUsuario);
router.delete("/:id", usuarioController.eliminarUsuarioID);
router.post("/login", usuarioController.login);

module.exports = router;
