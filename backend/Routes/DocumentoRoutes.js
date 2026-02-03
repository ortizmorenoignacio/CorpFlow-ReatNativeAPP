const express = require("express");
const router = express.Router()
const DocumentoController = require("../Controllers/DocumentoController")

//Rutas Documentos

router.get("/",DocumentoController.obtenerDocumentos)
router.get("/:id",DocumentoController.obtenerDocumentoId)
router.post("/",DocumentoController.crearDocumento)
router.delete("/:id",DocumentoController.borrarDocumento)
router.put("/:id",DocumentoController.actualizarDocumento)

module.exports = router