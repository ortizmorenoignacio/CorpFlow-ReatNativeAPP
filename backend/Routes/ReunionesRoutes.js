const express = require("express");
const router = express.Router()
const reunionController = require("../Controllers/ReunionController")

//Rutas Reuniones

router.get("/",reunionController.obtenerReuniones)
router.get("/:id",reunionController.obtenerReunionID)
router.get("/:id/asistentes",reunionController.obtenerUsuariosReunion)
router.post("/",reunionController.crearReunion)
router.put("/:id",reunionController.actualizarReunion)
router.delete("/:id",reunionController.borrarReunion)


module.exports = router;
