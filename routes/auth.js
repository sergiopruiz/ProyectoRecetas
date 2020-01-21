const express = require('express');

let router = express.Router();
let Usuario = require(__dirname + '/../models/usuario.js');
var SHA256 = require("crypto-js/sha256");

// Servicio para cargar la vista de login
router.get('/login', (req, res) => {
    res.render('auth_login');
});

// Servicio para enviar los datos de login para validarlos e iniciar sesion
router.post('/login', (req, res) => {
    let login = req.body.usuario;
    let password = SHA256(req.body.password);
    Usuario.find({login: login, password: password.toString()}).then(resultado => {
        if (resultado.length > 0){
            res.render('admin_recetas');
        }else{
            res.render('auth_login',{error: 'Usuario incorrecto'});
        }
    }).catch(error => {
        res.render('admin_error');
    });
});

// Servicio para hacer logout y destruir la sesion
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.render('publico_index');
});
module.exports = router;