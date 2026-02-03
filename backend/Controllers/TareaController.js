const {request, response} = require('express');
const Tarea = require('../Models/tareas');
const Usuario = require('../Models/usuario')

//Obtener Tareas

exports.obtenerTareas = async (request,response) => {
    try {
        const tareas = await Tarea.find();
        response.json(tareas)
    } catch (error) {
        response.status(500).json({error: "Error al obtener las tareas"})
    }
}

//Obtener tareas por su id

exports.obtenerTareasId = async (request,response) => {
    try {
        const {id} = request.params
        const tarea = await Tarea.findById(id)

        if(tarea){
            response.json(tarea);
        } else {
            response.status(404).json({error: "Tarea no encontrada"})
        }
    } catch (error) {
        response.status(500).json({error:"Error al obtener la tarea por su id"})
    }
}

//Obtener usuario responsable de una tarea

exports.obtenerUsuarioTarea = async (request,response) => {

    try {
        const {id} = request.params
        const tarea = await Tarea.findById(id)

        if(tarea){
            response.json(tarea.usuario);
        } else {
            response.status(404).json({error: "Tarea o usuario no encontrados "})
        }

    } catch (error) {
        response.status(500).json({error:"Error al obtener la tarea por su id"})
    }
}

//Obtener tareas anteriores a una fecha

exports.obtenerTareasProximas = async (request,response) =>{
    try{
        const {fecha} = request.params;
        const fechaLimite = new Date(fecha);

        if (isNaN(fechaLimite.getTime())){
            return response.status(400).json({error: "Formate de fecha invalido"})
        }
        const tareas = await Tarea.find({
        fechaVencimiento: { $lt: fechaLimite }
        })

        response.json({
            mensaje: `Tareas con fecha anterior a ${fecha}`,
            cantidad: tareas.length,
            tareas: tareas
        })
    }catch (error){
        console.error("Error al obtener las tareas", error);
        response.status(500).json({error: "Error al buscar tarea"})
    }   
}

//Crear tarea

exports.crearTarea = async (request,response) => {
    try {
        const tarea = request.body;
        if (!tarea.nombre || !tarea.fechaInicio || !tarea.fechaVencimiento || tarea.estadoTarea === undefined ||
            !tarea.prioridad || !tarea.usuario){
                return response.status(400).json({error: "require fields are missing"})
        }
        const newTarea = new Tarea({
            nombre : tarea.nombre,
            fechaInicio: tarea.fechaInicio,
            fechaVencimiento: tarea.fechaVencimiento,
            estadoTarea: tarea.estadoTarea,
            prioridad: tarea.prioridad,
            usuario: tarea.usuario
        
        })
        const savedTarea = await newTarea.save()
        await Usuario.findByIdAndUpdate(
            tarea.usuario,                      //ID del usuario a buscar
            {$push: {tareas: savedTarea._id}}
        )
        response.status(201).json(savedTarea)
    } catch (error) {
        response.status(500).json({error: "Error al crear tarea", detalle: error.message})
    }   
}

// // Actualizar tarea

// exports.actualizarTarea = async (request,response) => {

//     try {
//         const {id} = request.params;

//         const tarea = request.body;

//         const newTareaInfo = {
//             nombre : tarea.nombre,
//             fechaInicio: tarea.fechaInicio,
//             fechaVencimiento: tarea.fechaVencimiento,
//             estadoTarea: tarea.estadoTarea,
//             prioridad: tarea.prioridad,
//             usuario: tarea.usuario 
//         }

//         await Tarea.findByIdAndUpdate(id,newTareaInfo,{new: true}.then(result => {
//             response.json(result).end()
//         }))
//     } catch (error) {
//          response.status(500).json({error: "Error al actualizar la tarea"})
//     }
// }



//Borrar Tarea

exports.borrarTarea =  async (request,response) =>{
    try {
        const {id} = request.params;
        tareaBorrada = await Tarea.findByIdAndDelete(id);
        await Usuario.findByIdAndUpdate(
            tareaBorrada.usuario,
            { $pull: { tareas: id } } // $pull saca el ID del array
        );
        response.json({Info: "Tarea borrada correctamente"})
    } catch (error) {
        response.status(500).json({error: "error al borrar la tarea"})
    }
}

//Actualizar Tareas

exports.actualizarTarea = async (request,response) => {

    try {
        const {id} = request.params;
        const tarea = request.body;

        const tareaOld = await Tarea.findById(id);

        if (!tareaOld) {
            return response.status(404).json({ error: "Tarea no encontrada" });
        }
        const usuarioOld = tareaOld.usuario;

        const Actualizada = await Tarea.findByIdAndUpdate(
            id,tarea, {new:true}
        )

        if (tarea.usuario){
            const newUser = tarea.usuario
            
            await Promise.all([

                Usuario.findByIdAndUpdate(
                    usuarioOld,
                    {$pull:{tareas: id}}
                ),
                Usuario.findByIdAndUpdate(
                    newUser,
                    {$push: {tareas: id}}
                ) 
            ])
        }

        response.json({
            mensaje: "Tarea Actualizada correctamente",
            tarea: Actualizada
        })
    } catch (error) {
        console.error("Error al actualizar tarea:", error);
        response.status(500).json({ error: "Error al actualizar la tarea", detalle: error.message });
    }
}