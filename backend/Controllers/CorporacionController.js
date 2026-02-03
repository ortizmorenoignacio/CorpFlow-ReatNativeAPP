const {request,response} = require('express');
const Corporacion = require('../Models/corporaciones');
const Usuario = require('../Models/usuario');

//Obtener Corporaciones

exports.obtenerCorporaciones = async (request,response) => {

    try {
        const corporaciones = await Corporacion.find();
        response.json(corporaciones);
    } catch (error) {
        response.status(500).json({error: "Error al obtener las corporaciones"})
    }
}

//Obtener Corporacion ID

exports.obetenerCorporacionId = async (request,response) =>{
    try {
        const {id} = request.params;
        const corporacion = await Corporacion.findById(id);

        if(corporacion){
            response.json(corporacion);
        } else {
            response.status(404).json({error: "Corporacion no encontrada"})
        }
    } catch (error) {
        response.status(500).json({error:"Error al obtener corporacion por su id"})
    }
}

//Crear Corporacion

exports.crearCorporacion = async (request,response) => {

    try {
        const corporacion = request.body;
        const nombre = corporacion.nombre;
        const existe = await Corporacion.findOne({nombre});

        if (!corporacion.logo || !corporacion.nombre){
            return response.status(400).json({error: "require fields are missing"})
        }

        if (existe){
            return response.status(400).json({error: "Ya existe una corporacion con ese dni"})
        }

        const newCorp = new Corporacion({
            logo: corporacion.logo,
            nombre: corporacion.nombre
        })

        const savedCorp = await newCorp.save()
        response.status(201).json(savedCorp);
    } catch (error) {
        response.status(500).json({error: "Error al crear la corporacion", detalle: error.message})
    }
}

//Actualizar Corporacion

exports.actualizarCorporacion = async (request,response) => {
    try {
        const {id} = request.params;

        const corporacion = request.body;
        const corpOld = await Corporacion.findById(id);

        if (!corpOld){
            return response.status(404).json({error: "Corporacion no encontrada"});
        }

        const Actualizada = await Corporacion.findByIdAndUpdate(id,corporacion,{new: true})

        response.json({
            mensaje: "Corporacion actualizada correctamente",
            Corporacion: Actualizada
        })
    } catch (error) {
        response.status(500).json({error: "Error al actualizar Corporacion"})
    }
}

//Delete Corporacion

exports.borrarCorporacion = async (request,response) => {
    try{
        const {id} = request.params;
        const borrada = await Corporacion.findByIdAndDelete(id);
        response.json({
            mensaje: "Corporacion borrada correctamente"
        })
    }catch (error){
        response.status(500).json({error: "Error al borrar la corporacion"})
    }
}


//EXTRAS

//Obtener reuniones corporacion

exports.obtenerReunionesCorporacion = async (request,response) => {
    try {
        const {id} = request.params;
        const corporacion= await Corporacion.findById(id);
        const reuniones = corporacion.reuniones
        if (corporacion){
            if (reuniones.length !=0){
                response.json(reuniones)
            } else {
                response.json({Info: "La corporacion no tiene reuniones asignadas"})
            }
        }else{
            response.status(404).json({error: "Corporacion no encontrada"})
        } 
    } catch (error) {
        response.status(500).json({error:"Error al obtener reuniones de una corporacion por su id"})
    }
}

//Obtener tareas corporacion

exports.obtenerTareasCorporacion = async (request,response) => {
    try {
        const {id} = request.params;
        const corporacion= await Corporacion.findById(id);
        const tareas = corporacion.tareas
        if (corporacion){
            if (tareas.length !=0){
                response.json(tareas)
            } else {
                response.json({Info: "La corporacion no tiene tareas asignadas"})
            }
        }else{
            response.status(404).json({error: "Corporacion no encontrada"})
        } 
    } catch (error) {
        response.status(500).json({error:"Error al obtener tareas de una corporacion por su id"})
    }
}

//Obtener chat Corporacion

exports.obtenerChatCorporacion = async (request,response) => {
    try {
        const {id} = request.params;
        const corporacion= await Corporacion.findById(id);
        const chat = corporacion.chat
        if (corporacion){
            if (chat){
                response.json(chat)
            } else {
                response.json({Info: "La corporacion no tiene chat asignado"})
            }
        }else{
            response.status(404).json({error: "Corporacion no encontrada"})
        } 
    } catch (error) {
        response.status(500).json({error:"Error al obtener el chat de una corporacion por su id"})
    }
}

//Obtener carpetas Corporacion

exports.obtenerCarpetasCorporacion = async (request,response) => {
    try {
        const {id} = request.params;
        const corporacion= await Corporacion.findById(id);
        const carpetas = corporacion.carpetas
        if (corporacion){
            if (carpetas.length !=0){
                response.json(carpetas)
            } else {
                response.json({Info: "La corporacion no tiene carpetas asignadas"})
            }
        }else{
            response.status(404).json({error: "Corporacion no encontrada"})
        } 
    } catch (error) {
        response.status(500).json({error:"Error al obtener las carpetas de una corporacion por su id"})
    }
}

//Obtener membresias corporacion

exports.obtenerMembresiasCorporacion = async (request,response) => {
    try {
        const {id} = request.params;
        const corporacion= await Corporacion.findById(id);
        const membresias = corporacion.membresias
        if (corporacion){ 
            if (membresias.length !=0){
                response.json(membresias)
            } else {
                response.json({Info: "La corporacion no tiene membresias asignadas"})
            }
        }else{
            response.status(404).json({error: "Corporacion no encontrada"})
        } 
    } catch (error) {
        response.status(500).json({error:"Error al obtener las membresias de una corporacion por su id"})
    }
}

