const credencial = require('passport');
const estrategia = require('passport-local').Strategy;
const Usuario = require('../models/Usuario');


credencial.use(new estrategia({usernameField: 'correo',passwordField: 'contraseña'}, async(correo, contraseña, done)=>{

    const usuario = await Usuario.findOne({correo: correo});
    if(!usuario){
        return done(null, false,{message: 'Usuario no encontrado.'});
    }else{
        const procede = await usuario.matchPassword(contraseña);
        if(procede){
            return done(null,usuario);
        } else{
            return done(null,false,{message: 'Contraseña incorrecta'});
        }
    }

}));

//Se queda en sesion guarda id
credencial.serializeUser((usuario,done)=>{
    done(null, usuario.id);
});
//done es un colback
credencial.deserializeUser((id,done)=>{
    Usuario.findById(id, (err, usuario)=>{
        done(err, usuario);
    });
});