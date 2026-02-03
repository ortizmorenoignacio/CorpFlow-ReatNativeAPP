require("./Conexion/connection")

const Usuarios = require("./Models/usuario")
const Reuniones = require("./Models/reuniones")
const Coorporaciones = require("./Models/corporaciones")
const express = require('express');

const notFound = require("./middelware/notFound");
const handleError = require("./middelware/handleError");
const app = express()


app.use(express.json())
const PORT = 3001
app.listen(PORT);

console.log("NEXUSTEAM running on port ", PORT)


const usuarioRoutes = require ("./Routes/UsuarioRoutes");
const reunionRoutes = require ("./Routes/ReunionesRoutes");
const tareaRoutes = require ("./Routes/TareaRoutes");
const corporacionRoutes = require("./Routes/CorporacionesRoutes")
const chatRoutes = require("./Routes/ChatsRoutes")
const carpetaRoutes = require("./Routes/CarpetaRoutes")
const documentoRoutes = require("./Routes/DocumentoRoutes")
const membresiaRoutes = require("./Routes/MembresiaRoutes")
const mensajeRoutes = require("./Routes/MensajeRoutes")


//RUTAS

app.use("/api/usuario",usuarioRoutes);
app.use("/api/reuniones",reunionRoutes);
app.use("/api/tareas",tareaRoutes)
app.use("/api/corporaciones",corporacionRoutes)
app.use("/api/chats",chatRoutes)
app.use("/api/carpetas",carpetaRoutes)
app.use("/api/documentos",documentoRoutes)
app.use("/api/membresias",membresiaRoutes)
app.use("/api/mensajes",mensajeRoutes)

//MANEJO DE ERRORES


app.use(notFound)
app.use(handleError)





//middelware validators controlladores