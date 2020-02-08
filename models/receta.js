const mongoose = require('mongoose');

// Define esquema y modelo de la receta.
let elementoSchema = new mongoose.Schema([{
    ingrediente: {
        type: String,
        required: true,
        min: 3
    },
    cantidad: {
        type: Number,
        required: true,
        min: 1
    },
    unidad: {
        type: String,
        required: true,
        minlength: 5
    }
}]);

let recetaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        minlength: 5
    },
    comensales: {
        type: Number,
        required: true,
        min: 1
    },
    preparacion: {
        type: Number,
        required: true,
        min: 1
    },
    coccion: {
        type: Number,
        required: true,
        min: 0
    },
    descripcion: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        required: false
    },
    elementos: [elementoSchema]
});
let Receta = mongoose.model('receta',recetaSchema);

module.exports = Receta;