const express = require('express');

let router = express.Router();
let Receta = require(__dirname + '/../models/receta.js');

// Servicio página de inicio pública
router.get('/', (req, res) => {
    res.render('publico_index');
});

// Servicio de busqueda de recetas
router.get('/buscar', (req, res) => {
    let receta = req.query.buscar;
    let busqueda = new RegExp(receta, 'i');
    Receta.find({'titulo': busqueda}).then(resultado => {
        if(resultado.length > 0){
            res.render('publico_index',{recetas: resultado});
        } else {
            res.render('publico_index',{error: 'No se encontraron recetas'});
        }
    }).catch(error => {
        res.render('publico_error');
    });
});

// Servicio de busqueda de recetas por id
router.get('/:id', (req, res) => {
    Receta.findById(req.params.id).then(resultado => {
        if(resultado){
            res.render('publico_receta',{receta: resultado});
        } else {
            res.render('publico_error',{error: 'Receta no encontrada'});
        }
    }).catch(error => {
        res.render('publico_error');
    });
});

module.exports = router;