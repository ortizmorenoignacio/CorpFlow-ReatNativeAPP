const mongoose = require('mongoose');
const {Schema,model} = require('mongoose');

const mensajeSchema = new Schema({
    fechaHora: Date,
    contenido: String,
    chat: {
        type: Schema.Types.ObjectId,
        ref: 'Chat'
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref:'Usuario'
    },
})

const Mensaje = mongoose.model('Mensaje',mensajeSchema)

module.exports = Mensaje