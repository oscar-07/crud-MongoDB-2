const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

const credencial = require('passport');

router.get('/usuarios/iniciarsecion', (req,res)=>{
    res.render('usuarios/iniciarsecion');
});

router.post('/usuarios/iniciarsecion', credencial.authenticate('local',{
    successRedirect: '/notas',
    failureRedirect: '/usuarios/iniciarsecion',
    failureFlash: true
}));

router.get('/usuarios/registrar', (req,res)=>{
    res.render('usuarios/registrar');
});

router.post('/usuarios/registrar', async(req,res)=>{
    const {nombre,correo,contraseña,contraseña_confirmada} = req.body;
    const errors = [];
    if(nombre.length <= 0){
        errors.push({text: 'Ingresa tu nombre'});
    }
    if(correo.length <= 0){
        errors.push({text: 'Ingresa tu correo'});
    }
    if(contraseña.length <= 0){
        errors.push({text: 'Ingresa tu contraseña'});
    }
    if(contraseña_confirmada.length <= 0){
        errors.push({text: 'Confirma tu contraseña'});
    }
    if (contraseña != contraseña_confirmada){
        errors.push({text: 'Las contraseñas no son iguales.'});
    }
    if (contraseña.length < 4){
        errors.push({text: 'La contraseña tiene que ser mayor a 4 caracteres.'})
    }
    if (errors.length > 0){
        res.render('usuarios/registrar', {errors, nombre, correo, contraseña, contraseña_confirmada});
    }else{
        const correoUsuario = await Usuario.findOne({correo: correo});
        if(correoUsuario){
            req.flash('error_msg', 'Correo ya registrado');
            res.redirect('/usuarios/registrar');
        }
        const nuevoUsuario = new Usuario({nombre, correo, contraseña});
        nuevoUsuario.contraseña = await nuevoUsuario.encryptPassword(contraseña);
        await nuevoUsuario.save();
        req.flash('success_msg', 'Registrado exitosamente');
        res.redirect('/usuarios/iniciarsecion');
    }
});

router.get('/usuarios/salir',(req ,res)=>{
    req.logout();
    res.redirect('/');
});


module.exports= router;