const mongoose = require('mongoose');
const {Schema, model} = require('mongoose');


const corpSchema = new Schema({
    logo: String,
    nombre: String,
    reuniones: [{
        type: Schema.Types.ObjectId,
        ref: 'Reunion'
    }],
    tareas:[{
        type: Schema.Types.ObjectId,
        ref: 'Tareas'
    }],
    chat:{
        type: Schema.Types.ObjectId,
        ref: 'Chat'
    },
    carpetas: [{
        type: Schema.Types.ObjectId,
        ref: 'Carpeta'
    }],
    membresias:[{
        type: Schema.Types.ObjectId,
        ref: 'Membresia'
    }]
    
});

const Corporacion= mongoose.model('Corporacion', corpSchema);

module.exports = Corporacion;
