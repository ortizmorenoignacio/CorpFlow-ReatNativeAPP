const { request, response } = require('express');
const Documento = require('../Models/documentos');
const Carpeta = require('../Models/carpetas');

//Obtener Documentos

exports.obtenerDocumentos = async (request,response) =>{
    try {
        const documento = await Documento.find()
        response.json(documento)
    } catch (error) {
        response.status(500).json({error: "Error al obtener los documentos"})
    }
}

//Obtener documento por su id

exports.obtenerDocumentoId = async (request,response) =>{
    try {
        const {id} = request.params
        const documento = await Documento.findById(id)

        if (documento){
            response.json(documento)
        }else{
            response.status(404).json({error: "Documento no encontrado"})
        }
    } catch (error) {
        response.status(500).json({error:"Error al obtener documento por su id"})
    }
}

//Crear Documento

exports.crearDocumento = async (request,response) =>{
    try {
        const documento = request.body;
        const carpeta = documento.carpeta;
        const clasificado = carpeta ? true: false;

        if (!documento.nombre || !documento.formato){
            return response.status(400).json({error: "require fields are missing"})
        }

        const newDoc = new Documento({
            nombre: documento.nombre,
            formato: documento.formato,
            clasificado: clasificado,
            carpeta: carpeta || null
        })
        const savedDoc = await newDoc.save()

        if (carpeta){
            await Carpeta.findByIdAndUpdate(
                carpeta,
                {$push: {documentos: savedDoc._id}}
            )
        }
        
        response.status(201).json(savedDoc)
    } catch (error) {
        response.status(500).json({error: "Error al crear documento", detalle: error.message})
    }
}

//Borrar Documento

exports.borrarDocumento = async (request,response) => {
    try {
        const {id} = request.params
        const documento = await Documento.findByIdAndDelete(id)
        if (documento.carpeta){
            await Carpeta.findByIdAndUpdate(
                documento.carpeta,
                {$pull: {documentos: id}}
            )
        }
         response.json({Info: "Documento borrado correctamente"})
    } catch (error) {
        response.status(500).json({error: "error al borrar el documento"})
    }
}

//Actualizar Documento

exports.actualizarDocumento = async (request,response) =>{
    try {
        const {id} = request.params
        const documento = request.body

        const Actualizada = await Documento.findByIdAndUpdate(
            id,
            documento,
            {new:true}
        )
        response.json({mensaje: "Documento Actualizado correctamente", carpeta: Actualizada})
    } catch (error) {
        console.error("Error al actualizarel documento:", error);
        response.status(500).json({ error: "Error al actualizar el documento", detalle: error.message });
    }
}
