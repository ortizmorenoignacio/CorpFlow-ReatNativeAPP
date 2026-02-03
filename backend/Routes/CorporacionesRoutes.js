const express = require ('express')
const router = express.Router()
const corporacionController = require('../Controllers/CorporacionController')


//Rutas Corporaciones

router.get("/",corporacionController.obtenerCorporaciones)
router.get("/:id",corporacionController.obetenerCorporacionId)
router.post("/",corporacionController.crearCorporacion)
router.put("/:id",corporacionController.actualizarCorporacion)
router.delete("/:id",corporacionController.borrarCorporacion)

//Extras
router.get("/:id/reuniones",corporacionController.obtenerReunionesCorporacion)
router.get("/:id/tareas",corporacionController.obtenerTareasCorporacion)
router.get("/:id/chat",corporacionController.obtenerChatCorporacion)
router.get("/:id/carpetas",corporacionController.obtenerCarpetasCorporacion)
router.get("/:id/membresias",corporacionController.obtenerMembresiasCorporacion)
module.exports = router