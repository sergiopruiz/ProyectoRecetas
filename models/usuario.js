const mongoose = require('mongoose');

// Define esquema y modelo para e login.

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