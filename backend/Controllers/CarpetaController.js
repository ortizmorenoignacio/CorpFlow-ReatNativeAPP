const { request, response } = require('express');
const Carpeta = require('../Models/carpetas');
const Corporacion = require('../Models/corporaciones');

//Obtener Carpetas

exports.obtenerCarpetas = async (request,response) => {
    try {
        const carpetas = await Carpeta.find()
        response.json(carpetas)
    } catch (error) {
        response.status(500).json({error: "Error al obtener las carpetas"})
    }
}

//Obtener Carpeta por su id

exports.obtenerCarpetaId = async (request,response) =>{
    try {
        const {id} = request.params
        const carpeta = await Carpeta.findById(id);

        if (carpeta){
            response.json(carpeta)
        }else{
            response.status(404).json({error: "Carpeta no encontrada"})
        }
    } catch (error) {
        response.status(500).json({error:"Error al obtener carpeta por su id"})
    }
}

//Crear Carpeta 

// DUDA AL CREAR UNA SUBCARPETA DEBE AÑADIRSE TAMBIEN A LA CORPORACION O NO ES NECESARIO
//
////////
///////
exports.crearCarpeta = async (request,response) => {
    try {
        const carpeta = request.body;
        const carpetaPadre = carpeta.carpetaPadre;
        const corporacion = carpeta.corporacion

        if (!carpeta.nombre){
            return response.status(400).json({error: "require fields are missing"})
        }
        // Caso 1: Es subcarpeta

        if (carpetaPadre){
            const parentFolderDoc = await Carpeta.findById(carpetaPadre);
            if (!parentFolderDoc) {
                return res.status(404).json({ error: "La carpeta padre no existe" });
            }
            const newSubCarpeta = new Carpeta({
                nombre: carpeta.nombre,
                carpetaPadre: carpeta.carpetaPadre,
                corporacion: parentFolderDoc.corporacion
            })
            const savedFolder = await newSubCarpeta.save()

            await Promise.all([
                Carpeta.findByIdAndUpdate(
                    carpetaPadre,
                    {$push: {carpetasHijas: savedFolder._id}}),
                Corporacion.findByIdAndUpdate(
                    parentFolderDoc.corporacion,
                    {$push: {carpetas: savedFolder._id}})
        
            ])
            return response.status(201).json({
                mensaje: "SubCarpeta creada correctamente",
                savedFolder,
                tipo: "subcarpeta"
            })
        }

        //Caso 2: Es carpeta Raiz
        else{
            if (!corporacion){
                return res.status(400).json({ error: "Para crear una carpeta raíz, se requiere el campo 'corporacion'" });
            }
            const corpExiste = await Corporacion.findById(corporacion)
            if (!corpExiste) {
                return res.status(404).json({ error: "La corporación especificada no existe" });
            }

            const newFolder = new Carpeta({
                nombre: carpeta.nombre,
                corporacion: corporacion,
                carpetaPadre:null
            })

            const savedFolder = await newFolder.save()
            await Corporacion.findByIdAndUpdate(
                savedFolder.corporacion,
                {$push: {carpetas: savedFolder._id}}
            )
            return response.json({
                mensaje: "Carpeta creada correctamente",
                savedFolder,
                tipo: "raiz"
            })
        }   
    } catch (error) {
        response.status(500).json({error: "Error al crear la carpeta", detalle: error.message})
    }
}

//Borrar Carpeta

//FUNCION RECURSIVA PARA BORRAR LO QUE HAY DENTRO

const eliminarContenido = async (carpetaId) =>{
    const subCarpetas = await Carpeta.find({carpetaPadre: carpetaId});

    for (const subCarpeta of subCarpetas){
        await eliminarContenido(subCarpeta._id)
        await Carpeta.findByIdAndDelete(subCarpeta._id)
    }

    await Documento.deleteMany({carpeta: carpetaId})
}

//DELETE CONTROLLER

exports.borrarCarpeta = async (request,response) =>{
    try {
        const {id} = request.params;

        const carpeta = await Carpeta.findById(id)
        if (!carpeta){
            return response.status(404).json({error: "No existe la carpeta deseada con ese id"})
        }

        await eliminarContenido(id)

        await Promise.all([

            Corporacion.findByIdAndUpdate(carpeta.corporacion,{$pull: {carpetas: id}}),
            carpeta.carpetaPadre ?
                carpeta.findByIdAndUpdate(carpeta.carpetaPadre, {$pull: {carpetasHijas: id}}) : null
        ])

        await Carpeta.findByIdAndDelete(id);

        response.json({mensaje: "Carpeta y contenido borrados correctamente"})
    } catch (error) {
        console.error(error);
        response.status(500).json({error: "Error al borrar", detalle: error.message})
    }
}
//DUDA: AL BORRAR UNA CARPETA PADRE BORRA TAMBIEN LAS HIJAS??? Y SUS DOCUMENTOS


//Actualizar Carpeta
// DUDA: Actualizar campos o solo el nombre??
exports.actualizarCarpeta = async (request,response) => {
    try {
        const {id} = request.params
        const carpeta = request.body

        const Actualizada = await Carpeta.findByIdAndUpdate(
            id,
            carpeta, {new:true}
        )

        response.json({mensaje: "Carpeta Actualizada correctamente", carpeta: Actualizada})
    } catch (error) {
        console.error("Error al actualizar la carpeta:", error);
        response.status(500).json({ error: "Error al actualizar la carpeta", detalle: error.message });
    }
}


//EXTRAS

//Obtener Carpetas Hijas
exports.obtenerCarpetasHijas = async (request,response) =>{
    try {
        const {id} = request.params
        const carpeta = await Carpeta.findById(id);
        const carpetasHijas = carpeta.carpetasHijas

        if (carpeta){
            if (carpetasHijas.length !=0){
                response.json(carpetasHijas)
            } else {
                response.json({Info: "La carpeta no tiene subcarpetas asignadas"})
            }
        }
    } catch (error) {
        response.status(500).json({error:"Error al obtener subcarpetas de una carpeta por su id"})
    }
}

//Obtener Documentos de una carpeta

exports.obtenerDocumentos = async (request,response) =>{
    try {
        const {id} = request.params
        const carpeta = await Carpeta.findById(id);
        const documentos = carpeta.documentos

        if (carpeta){
            if (documentos.length !=0){
                response.json(documentos)
            } else {
                response.json({Info: "La carpeta no tiene documentos asignados"})
            }
        }
    } catch (error) {
        response.status(500).json({error:"Error al obtener documentos de una carpeta por su id"})
    }
}