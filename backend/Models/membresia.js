const mongoose = require('mongoose');
const {Schema, model} = require('mongoose');

const membresiaSchema = new Schema({
    rol: {
        type: String,
        enum: ['ADMIN','MIEMBRO']
    },
    corporacion:{
        type: Schema.Types.ObjectId,
        ref: 'Corporacion'
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref:'Usuario'
    },
})

const Membresia = model('Membresia', membresiaSchema)

module.exports = Membresia