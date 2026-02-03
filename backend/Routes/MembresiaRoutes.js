const express = require ('express')
const router = express.Router()
const membresiaController = require('../Controllers/MembresiaController')

//Rutas Membresias

router.get("/",membresiaController.obtenerMembresias)
router.get("/:id",membresiaController.obtenerMembresiasId)
router.post("/",membresiaController.crearMembresia)
router.put("/:id",membresiaController.actualizarMembresia)
router.delete("/:id",membresiaController.borrarMembresia)

module.exports = router