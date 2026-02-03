const {request, response} = require("express");
const Reunion = require("../Models/reuniones");
const Usuario = require("../Models/usuario");


//Obtener Reuniones

exports.obtenerReuniones = async (request,response) =>{
    try {
        const reuniones = await Reunion.find()
        response.json(reuniones);

    } catch (error) {
        response.status(500).json({error: "Error al obtener las reuniones"})
    }
}

//Obtener Reunion ID

exports.obtenerReunionID = async (request,response) =>{
    try {
        const {id} = request.params
        const reunion = await Reunion.findById(id)
        if (reunion){
            response.json(reunion)
        }else{
            response.status(404).json({error: "Reunion no encontrada"})
        }
    } catch (error) {
        response.status(500).json({error:"Error al obtener reunion por su id"})
    }
}

//Crear reunion

exports.crearReunion = async (request,response) =>{
    try {
        const reunion = request.body;
        
        const idUsuarios = reunion.asistentes;
        if (idUsuarios.length === 0) {
            return response.status(400).json({ error: "La lista de asistentes no puede estar vacía" });
        }
        const nuevaReunion = new Reunion({
            nombre: reunion.nombre,
            horaInicio: reunion.horaInicio,
            horaFin: reunion.horaFin,
            fecha_Inicio: reunion.fecha_Inicio,
            asistentes: idUsuarios
        })

        const reunionGuardada = await nuevaReunion.save()
        //Actualizamos los usuarios asistentes

        await Usuario.updateMany(
            {_id: {$in: idUsuarios}}, // Aqui definimos quienes vamos a actualizar
            {$push: {reuniones: reunionGuardada._id}}
        )
        response.status(201).json({
            mensaje: "Reunion creada y usuarios actualizados",
            reunion: reunionGuardada,
            usuariosAfectados: usuarios
        })
    } catch (error) {
        response.status(500).json({ error: "Error al crear la reunión", mensaje: error.message });
    }
}

//Obtener usuarios de una reunion

exports.obtenerUsuariosReunion = async (request,response) =>{
    try {
        const {id} = request.params
        const reunion = await Reunion.findById(id)
        const usuarios = reunion.asistentes
        if (usuarios.length !=0){
            response.json(usuarios)
        }
    } catch (error) {
        response.status(500).json({error:"Error al obtener usuarios de la reunion por su id"})
    }
}

//Actualizar reunion por su id

exports.actualizarReunion = async (request,response) =>{
    try {
        const {id} = request.params
        const reunion = request.body

        const reunionOld = await Reunion.findById(id)

        //Convertimos los Ids a String para poder comparar facil
        const asistentesViejos = reunionOld.asistentes.map(id=> id.toString());

        const Actualizada = await Reunion.findByIdAndUpdate(id,reunion, {new:true})

        if (reunion.asistentes){
            const nuevos = reunion.asistentes;

            //Encontrar usuarios a añadir
            const añadir = nuevos.filter(uid => !asistentesViejos.includes(uid));

            //Encontrar usuarios a borrar

            const borrar = asistentesViejos.filter(uid => !nuevos.includes(uid));

            await Promise.all([     //Para ejecutar dos operaciones de acceso a la base de datos a la vez

                Usuario.updateMany(
                    {_id: {$in: añadir}},       // Este es el filtro de a quien modifico 
                    {$push: {reuniones: id}}    // Esta es la accion
                ),
                Usuario.updateMany(
                    {_id: {$in: borrar}},
                    {$pull: {reuniones: id}}
                )
            ]);
        }

        response.json({
            mensaje: "Reunion actualizada correctamente",
            reunion: Actualizada
        })
    } catch (error) {
        console.error("Error al actualizar reunión:", error);
        response.status(500).json({ error: "Error al actualizar la reunión", detalle: error.message });
    }
}

//Delete Idreunion


exports.borrarReunion = async (request,response) => {
    try {
        const {id} = request.params;
        const reunionBorrada = await Reunion.findByIdAndDelete(id);
        await Usuario.updateMany(
            { _id: { $in: reunionBorrada.asistentes } }, // Filtro: Usuarios que iban a esa reunión
            { $pull: { reuniones: id } }                 // Acción: Quitar el ID de la reunión
        );
        response.json({Info: "Reunion Borrada correctamente"})
    } catch (error) {
        response.status(500).json({error: "error al borrar la reunion"})
    }
}



