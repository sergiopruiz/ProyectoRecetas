// Servicio de autenticacion
let autenticacion = (req, res, next) => {
    if (req.session && req.session.usuario)
        next();
    else
        res.render('auth_login');
};

module.exports = autenticacion;
