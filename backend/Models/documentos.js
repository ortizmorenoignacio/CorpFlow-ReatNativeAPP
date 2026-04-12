const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const documentoSchema = new Schema({
  nombre: String,
  formato: String,
  url: String,
  clasificado: Boolean,
  carpeta: {
    type: Schema.Types.ObjectId,
    ref: "Carpeta",
  },
  corporacion: {
    type: Schema.Types.ObjectId,
    ref: "Corporacion",
  },
});

const Documento = model("Documento", documentoSchema);

module.exports = Documento;
