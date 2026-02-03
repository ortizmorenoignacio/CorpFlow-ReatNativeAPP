const mongoose = require('mongoose');
const {Schema,model} = require('mongoose');

const tareaSchema = new Schema({
    nombre: String,
    fechaInicio: Date,
    fechaVencimiento: Date,
    estadoTarea: Boolean,
    prioridad: {
        type: String,
        enum: ['BAJA', 'MEDIA', 'ALTA']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref:'Usuario'
    },
    corporacion:{
        type: Schema.Types.ObjectId,
        ref: 'Corporacion'
    }

})

const Tarea = model('Tarea',tareaSchema);

module.exports = Tarea