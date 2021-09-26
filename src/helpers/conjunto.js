
const autenticacion = {};

autenticacion.isAuthenticated = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error_msg', 'No autorizado');
    res.redirect('/usuarios/iniciarsecion')
}

                //manda o exporta para utilizarlo en otro lado
module.exports = autenticacion;
