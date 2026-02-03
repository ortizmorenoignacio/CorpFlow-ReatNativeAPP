const express = require("express");
const router = express.Router()
const tareaController = require("../Controllers/TareaController");

//Rutas Tareas

router.get("/",tareaController.obtenerTareas);
router.get("/:id/usuario",tareaController.obtenerUsuarioTarea);
router.get("/:id",tareaController.obtenerTareasId);
router.get("/:fecha", tareaController.obtenerTareasProximas);
router.delete("/:id",tareaController.borrarTarea);
router.put("/:id",tareaController.actualizarTarea);
router.post("/",tareaController.crearTarea)

module.exports = router;