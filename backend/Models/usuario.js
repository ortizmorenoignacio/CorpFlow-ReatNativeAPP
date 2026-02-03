const mongoose = require('mongoose');
const {Schema, model} = require('mongoose');


const userSchema = new Schema({
    nombre: String,
    correo: String,
    telefono: String,
    fotoPerfil: String,
    fechaNacimiento: Date,
    contraseña: String,
    dni: String,
    genero: {
        type: String,
        enum: ['HOMBRE','MUJER','OTRO']
    },
    reuniones: [{
        type: Schema.Types.ObjectId,
        ref: 'Reunion'
    }],
    tareas: [{
        type: Schema.Types.ObjectId,
        ref: 'Tarea'
    }],
    membresias: [{
        type: Schema.Types.ObjectId,
        ref: 'Membresia'
    }],
    documentos:[{
        type: Schema.Types.ObjectId,
        ref: 'Documento'
    }]
    
});

const Usuario = mongoose.model('Usuario', userSchema);

module.exports = Usuario;
