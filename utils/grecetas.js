const mongoose = require('mongoose');
const Receta = require(__dirname + '/../models/receta');

mongoose.connect('mongodb://localhost:27017/recetasv3', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

Receta.collection.drop();

let rec1 = new Receta({
    titulo: 'Receta de prueba 1',
    comensales: 2,
    preparacion: 30,
    coccion: 90,
    descripcion: 'Esto es una receta de prueba.',
    imagen: 'tallarines.jpg'
});

rec1.save();

let rec2 = new Receta({
    titulo: 'Receta de prueba 2',
    comensales: 2,
    preparacion: 30,
    coccion: 90,
    descripcion: 'Esto es una receta de prueba.',
    imagen: 'tallarines.jpg'
});

rec2.save();

let rec3 = new Receta({
    titulo: 'Receta de prueba 3',
    comensales: 2,
    preparacion: 30,
    coccion: 90,
    descripcion: 'Esto es una receta de prueba.',
    imagen: 'tallarines.jpg'
});

rec3.save();

let rec4 = new Receta({
    titulo: 'Receta de prueba 4',
    comensales: 2,
    preparacion: 30,
    coccion: 90,
    descripcion: 'Esto es una receta de prueba.',
    imagen: 'tallarines.jpg'
});

rec4.save();

let rec5 = new Receta({
    titulo: 'Receta de prueba 5',
    comensales: 2,
    preparacion: 30,
    coccion: 90,
    descripcion: 'Esto es una receta de prueba.',
    imagen: 'tallarines.jpg'
});

rec5.save();

let rec6 = new Receta({
    titulo: 'Receta de prueba 6',
    comensales: 2,
    preparacion: 30,
    coccion: 90,
    descripcion: 'Esto es una receta de prueba.',
    imagen: 'tallarines.jpg'
});

rec6.save();