const {request, response} = require('express');
const Membresia = require('../Models/membresia');
const Corporacion = require('../Models/corporaciones');
const Usuario = require('../Models/usuario');

//Obtener Membresias

exports.obtenerMembresias = async (request,response) => {
    try {
        const membresias = await Membresia.find();
        response.json(membresias)
    } catch (error) {
        response.status(500).json({error: "Error al ontener las membresias"})
    }
}

//Obtener membresias por su id

exports.obtenerMembresiasId = async (request,response) =>{
    try {
        const {id} = request.params
        const membresia = await Membresia.findById(id)

        if (membresia){
            response.json(membresia)
        }else {
            response.status(404).json({error: "Membresia no encontrada"})
        }
    } catch (error) {
        response.status(500).json({error:"Error al obtener la membresia por su id"})
    }
}

//Crear membresia 

exports.crearMembresia = async (request,response) => {
    try {
        const membresia = request.body
        if(!membresia.rol || !membresia.corporacion || !membresia.usuario){
            return response.status(400).json({error: "require fields are missing"})
        }

        const newMemb = new Membresia({
            rol: membresia.rol,
            corporacion: membresia.corporacion,
            usuario: membresia.usuario
        })
        const savedMemb = await newMemb.save()
        await Promise.all([

            Corporacion.findByIdAndUpdate(
                membresia.corporacion,
                {$push: {membresias: savedMemb._id}}
            ),

            Usuario.findByIdAndUpdate(
                membresia.usuario,
                {$push: {membresias: savedMemb._id}}
            )
        ])
        response.status(201).json(savedMemb)
    } catch (error) {
        response.status(500).json({error: "Error al crear membresia", detalle: error.message})
    }
}

//Borrar membresia

exports.borrarMembresia = async (request,response) =>{
    try {
        const {id} = request.params;
        const membresiaBorrada = await Membresia.findByIdAndDelete(id);

        await Promise.all([

            Corporacion.findByIdAndUpdate(
                membresiaBorrada.corporacion,
                {$pull: {membresias: id}}
            ),

            Usuario.findByIdAndUpdate(
                membresiaBorrada.usuario,
                {$pull: {membresias:id}}
            )
        ])
        response.json({Info: "Membresia borrada correctamente"})
    } catch (error) {
        response.status(500).json({error: "error al borrar la tarea"})
    } 

}

//Actualizar Membresia

exports.actualizarMembresia = async (request,response)=>{
    try {
        const {id} = request.params;
        const membresia = request.body;
        
        const Actualizada = await Membresia.findByIdAndUpdate(
            id, membresia, {new:true}
        )

        response.json({
            mensaje: "Membresia Actualizada Correctamente",
            membresia: Actualizada
        })
    } catch (error) {
        console.error("Error al actualizar membresia:", error);
        response.status(500).json({ error: "Error al actualizar la membresia", detalle: error.message });
    }
}
