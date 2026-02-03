const express = require ('express')
const router = express.Router()
const carpetaController = require('../Controllers/CarpetaController')

//Rutas Carpetas

router.get("/",carpetaController.obtenerCarpetas)
router.get("/:id",carpetaController.obtenerCarpetaId)
router.post("/",carpetaController.crearCarpeta)
router.delete("/:id",carpetaController.borrarCarpeta)
router.put("/:id",carpetaController.actualizarCarpeta)


//EXTRAS

router.get("/:id/subcarpetas",carpetaController.obtenerCarpetasHijas)
router.get("/:id/documentos",carpetaController.obtenerDocumentos)

module.exports = router