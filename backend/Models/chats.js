const mongoose = require('mongoose');
const {Schema, model} = require('mongoose');

const chatSchema = new Schema({
    nombre: String,
    mensajes:[{
        type: Schema.Types.ObjectId,
        ref: 'Mensaje'
    }],
    corporacion:{
        type: Schema.Types.ObjectId,
        ref: 'Corporacion'
    }
})

const Chat = model('Chat', chatSchema);

module.exports = Chat