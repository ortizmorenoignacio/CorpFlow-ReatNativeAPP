const {request, response} = require('express');
const Mensaje = require('../Models/mensajes')
const Chat = require('../Models/chats');
const Usuario = require('../Models/usuario');
//Obtener mensajes

exports.obtenerMensajes = async (request,response) =>{
    try {
        const mensajes = await Mensaje.find();
        response.json(mensajes)
    } catch (error) {
        response.status(500).json({error: "Error al obtener los mensajes"})
    }
}

//Obtener Mensaje por su Id

exports.obtenerMensajeID = async (request,response) => {
    try {
        const {id} = request.params;
        const mensaje = await Mensaje.findById(id)

        if(mensaje){
            response.json(mensaje)
        } else{
            response.status(404).json({error: "Mensaje no encontrado"})
        }
    } catch (error) {
        response.status(500).json({error:"Error al obtener el mensaje por su id"})
    }
}

//Crear Mensaje

exports.crearMensaje = async (request,response) => {
    try {
        const mensaje = request.body;
        if(!mensaje.contenido || !mensaje.chat || !mensaje.usuario ){
            return response.status(400).json({error: "require fields are missing"})
        }
        const newMsg = new Mensaje({
            fechaHora: new Date(),
            contenido: mensaje.contenido,
            chat: mensaje.chat,
            usuario: mensaje.usuario
        })

        const savedMensaje = await newMsg.save()

        await   Chat.findByIdAndUpdate(
                mensaje.chat,
                {$push: {mensajes: savedMensaje._id}}
            )
        response.status(201).json(savedMensaje)
    } catch (error) {
        response.status(500).json({error: "Error al crear mensaje", detalle: error.message})
    }
}

//Borrar Mensaje

exports.borrarMensaje = async (request,response) =>{
    try {
        const {id} = request.params
        const mensajeBorrado = await Mensaje.findByIdAndDelete(id)

        await Chat.findByIdAndUpdate(
            mensajeBorrado.chat,
            {$pull: {mensajes: id}}
        )

        response.json({Info: "Mensaje borrado correctamente"})
    } catch (error) {
        response.status(500).json({error: "Error al borrar mensaje", detalle: error.message})
    }
}

//Actualizar Mensaje

exports.actualizarMensaje = async (request,response) =>{
    try {
        const {id} = request.params;
        const mensaje = request.body;

        const Actualizado = await Mensaje.findByIdAndUpdate(
            id,
            mensaje,
            {new:true}
        )
        response.json({mensaje: "Mensaje Actualizado correctamente",mensaje: Actualizado})
    } catch (error) {
        console.error("Error al actualizar el mensaje:", error);
        response.status(500).json({ error: "Error al actualizar el mensaje", detalle: error.message });
    }
}