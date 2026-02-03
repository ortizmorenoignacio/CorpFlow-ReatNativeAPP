const mongoose = require('mongoose');
const {Schema, model} = require('mongoose');

const carpetaSchema = new Schema({
    nombre: String,
    carpetasHijas: [{
        type:Schema.Types.ObjectId,
        ref: 'Carpeta'
    }],
    documentos: [{
        type: Schema.Types.ObjectId,
        ref: 'Documento'
    }],
    corporacion:{
        type: Schema.Types.ObjectId,
        ref: 'Corporacion'
    },
    carpetaPadre:{
        type: Schema.Types.ObjectId,
        ref: 'Carpeta'
    }
})

const Carpeta = model('Carpeta',carpetaSchema)

module.exports = Carpeta