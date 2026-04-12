const express = require("express");
const router = express.Router();
const DocumentoController = require("../Controllers/DocumentoController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
//Rutas Documentos

router.get("/", DocumentoController.obtenerDocumentos);
router.get("/:id", DocumentoController.obtenerDocumentoId);
// En tu archivo de rutas
router.post(
  "/",
  upload.single("archivo"),
  (req, res, next) => {
    console.log("¡He recibido una petición POST!");
    console.log("Archivo:", req.file); // Esto debería mostrar los datos del archivo
    console.log("Body:", req.body); // Esto debería mostrar la corporación, etc.
    next(); // Pasa al controlador
  },
  DocumentoController.crearDocumento,
);
router.delete("/:id", DocumentoController.borrarDocumento);
router.put("/:id", DocumentoController.actualizarDocumento);

module.exports = router;
