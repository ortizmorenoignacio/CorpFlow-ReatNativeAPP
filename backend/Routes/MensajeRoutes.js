const express = require ('express')
const router = express.Router()
const mensajeController = require('../Controllers/MensajesController')

//Rutas Mensaje

router.get("/",mensajeController.obtenerMensajes)
router.get("/:id",mensajeController.obtenerMensajeID)
router.post("/",mensajeController.crearMensaje)
router.delete("/:id",mensajeController.borrarMensaje)
router.put("/:id",mensajeController.actualizarMensaje)

module.exports = router