const mongoose = require('mongoose');
const Usuario = require('../Models/usuario')
const Reunion = require('../Models/reuniones')
const Corporacion = require('../Models/corporaciones')
main().catch(err=> console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/nexusteam').then(
        ()=>{
            console.log("Conectado a NexusTeam")
        }
    )
}