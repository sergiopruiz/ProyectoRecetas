const express = require('express');
const multer = require('multer');

let router = express.Router();
let Receta = require(__dirname + '/../models/receta.js');
let upload = require('../app.js');
let auth = require('../utils/auth');

let storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/uploads')
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + "_" + file.originalname)
        }
    });
let subirImg = multer({
    storage: storage
});
// Servicio para renderizar todas las recetas y sus ingredientes
router.get('/',auth, (req, res) => {
    Receta.find().then(resultado => {
        res.render('admin_recetas',{recetas: resultado});
    }).catch(error => {
        res.render('admin_error');
    });
});
// Servicio para renderizar el formulario para insertar una nueva receta
router.get('/nueva',auth,(req, res) => {
    res.render('admin_recetas_form');
});

// Servicio para renderizar la busqueda de una receta por su id y modificarla
router.get('/editar/:id',auth , (req, res) => {
    Receta.findById(req.params.id).then(resultado => {
        res.render('admin_recetas_form',{receta: resultado})
    }).catch(error => {
        res.render('admin_error', {error: 'Receta no encontrada'});
    });
});

// Servicio para añadir una nueva receta
 router.post('/',auth, subirImg.single('imagen'), async (req, res) => {
    let arrayElementos=[];
    for (let i = 0; i < req.body.elementos.cantidad.length; i++) {
        arrayElementos.push({ 
            ingrediente: req.body.elementos.ingrediente[i],
            cantidad: req.body.elementos.cantidad[i],
            unidad:  req.body.elementos.unidad[i]
        });
    }
    let nuevaReceta = new Receta({
        titulo: req.body.titulo,
        comensales: req.body.comensales,
        preparacion: req.body.preparacion,
        coccion: req.body.coccion,
        descripcion: req.body.descripcion,
        elementos: arrayElementos,
        imagen: req.file.filename
    });
    await nuevaReceta.save().then(resultado => {
        res.redirect(req.baseUrl)
    }).catch(error => {
        res.render('admin_error');
    });
});

//Servicio para renderiza la vista para editar una receta existente
router.put('/:id',auth, subirImg.single('imagen'), (req, res) => {
    Receta.findOneAndUpdate(req.params.id, {
        $set: {
            titulo: req.body.titulo,
            comensales: req.body.comensales,
            preparacion: req.body.preparacion,
            coccion: req.body.coccion,
            descripcion: req.body.descripcion,
            imagen: req.file.filename
        }
    }, {
        new: true
    }).then(resultado => {
        if (resultado)
            res.render(req.baseUrl);
        else
            res.render('admin_error',{error: 'Receta no encontrada'});
    }).catch(error => {
        res.render('admin_error')
    });
});

// Servicio para renderizar la vista de eliminar una receta a traves de su id
router.delete('/:id',auth ,(req, res) => {
    Receta.findByIdAndDelete(req.params.id).then(resultado => {
        if (resultado)
            res.redirect(req.baseUrl);
        else
            res.render('admin_error',{error: 'Receta no encontrada'});
    }).catch(error => {
        res.render('admin_error')
    });
});

module.exports = router;