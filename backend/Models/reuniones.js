const mongoose = require('mongoose');
const {Schema, model} = require('mongoose');

//DateTime me da error
const reunionSchema = new Schema({
    nombre: String,
    horaInicio: Date,
    horaFin: Date,
    fecha_Inicio: Date,
    asistentes:[{
        type: Schema.Types.ObjectId,
        ref:'Usuario'
    }],
    corporacion:{
            type: Schema.Types.ObjectId,
            ref: 'Corporacion'
    }
});

const Reunion= mongoose.model('Reunion', reunionSchema);

module.exports = Reunion;