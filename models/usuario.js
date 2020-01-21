const mongoose = require('mongoose');

let usuarioSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true,
        min: 5
    },
    password: {
        type: String,
        minlength: 8
    }
});

let Usuario = mongoose.model('usuario',usuarioSchema);

module.exports = Usuario;