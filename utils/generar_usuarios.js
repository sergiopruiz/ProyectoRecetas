// Iniciamos el archivo y creara dos usuarios para guardarlos en al base de datos y poder iniciar sesión
const mongoose = require('mongoose');
const Usuario = require(__dirname + '/../models/usuario');
var SHA256 = require("crypto-js/sha256");

mongoose.connect('mongodb://localhost:27017/recetasv3', {
    useNewUrlParser: true
});
Usuario.collection.drop();

let usu1 = new Usuario({
    login: 'sergio',
    password: SHA256('1234')
});
usu1.save();

let usu2 = new Usuario({
    login: 'nacho',
    password: SHA256('5678')
});
usu2.save();

module.exports = {
    usuarios: [usu1,usu2]
}