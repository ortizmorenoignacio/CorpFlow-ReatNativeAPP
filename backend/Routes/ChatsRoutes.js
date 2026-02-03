const express = require ('express')
const router = express.Router()
const chatController = require('../Controllers/ChatController')

//Rutas Chat

router.get("/",chatController.obtenerChats)
router.get("/:id",chatController.obtenerChatID)
router.post("/",chatController.crearChat)
router.delete("/:id",chatController.borrarChat)
router.put("/:id",chatController.actualizarChat)

//EXTRAS

router.get("/:id/mensajes",chatController.obtenerMensajes)
module.exports = router