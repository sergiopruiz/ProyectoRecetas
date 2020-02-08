// Aplicación RecetasV3 - Sergio Peña Ruiz
// La aplicación web trata sobre recetas de comida en la cual vamos a poder diferenciar claramente dos áreas
// área pública donde tendrá acceso cualquier usuario donde podrá ver todas las recetas, o buscar una receta a través
// del nombre. En la área  administración, donde podremos crear, editar y borrar recetas, y solo podrán entrar
// usuarios pertenecientes a la base de datos.

// Carga de librerías
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const methodOverride = require('method-override');
const session = require('express-session');
// const multer = require('multer');


// Enrutadores
const publico = require(__dirname + '/routes/publico.js');
const recetas = require(__dirname + '/routes/recetas.js');
const auth = require(__dirname + '/routes/auth.js');

// Conectar con BD en Mongo 
mongoose.connect('mongodb://localhost:27017/recetasv3', {
    useNewUrlParser: true
});

// Inicialización de express
let app = express();

// Inicialización del motor de plantillas Nunjucks
app.set('view engine', 'njk');
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

// Carga de servicios middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

// Procesador de peticiones DELETE
app.use(methodOverride((req, res) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        let method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

// Sobreescribe el metodo Post para realizar el PUT de los formularios (?_method=PUT)
app.use(methodOverride('_method'));

// Iniciar sesiones
app.use(session({
    secret: '1234',
    resave: true,
    saveUninitialized: false
}));

// asociacion de sesiones y recursos
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});


// Guardado de fotos de recetas a traves de multer exportando el modulo
// let storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'public/uploads')
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + "_" + file.originalname)
//     }
// });
// module.exports = {
//     storage: storage
// };



// Enrutadores para cada una de las rutas
app.use('/public', express.static(__dirname + '/public'));
app.use('/admin', recetas);
app.use('/auth', auth);
app.use('/', publico);

// Arranque del servidor
app.listen(8080);