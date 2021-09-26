const express = require('express');
const router = express.Router();
const Nota = require('../models/Nota');
const {isAuthenticated} = require('../helpers/conjunto');

                        //si esta isAuthenticated valida primero y despues hace la ejecucion 
router.get('/notas/agregar', isAuthenticated, (req,res)=>{
    res.render('notas/nueva-nota');
});
        //si esta isAuthenticated valida primero y despues hace la ejecucion 
        //async <- es asincronos y AWAIT ABAJO
router.post('/notas/nueva-nota', isAuthenticated, async(req, res) =>{
    const {titulo,descripcion}= req.body;
    const errors=[];
    if(!titulo){
        errors.push({text: 'Por favor ingresa el titulo'});
    }
    if(!descripcion){
        errors.push({text: 'Por favor ingresa la descripcion'});
    }
    if(errors.length>0){
        res.render('notas/nueva-nota',{
        errors,
        titulo,
        descripcion
        });
    }else{
        const nuevaNota = new Nota({titulo, descripcion});
        nuevaNota.usuario = req.user.id;
        //await va de la mano con async
        await nuevaNota.save();
        req.flash('success_msg', 'Nota agregada :)')
        res.redirect('/notas');
    }

});
        //si esta isAuthenticated valida primero y despues hace la ejecucion 
router.get('/notas', isAuthenticated,async(req,res)=>{
    //opera con la base de datos Nota
    //.find() normal pide todo  .find({titulo, descripcion})
    //recuerda que await y la consulta es asincrona
    //const notas = await Nota.find().lean();
    const notas = await Nota.find({usuario: req.user.id}).lean().sort({fecha: 'desc'});  //AQUI.............
    res.render('notas/todaslasnotas',{notas});
});

        //si esta isAuthenticated valida primero y despues hace la ejecucion 
router.get('/notas/editar/:id', isAuthenticated,async(req,res)=>{
    const nota = await Nota.findById(req.params.id).lean();
    res.render('notas/editar-nota', {nota});
});
            //si esta isAuthenticated valida primero y despues hace la ejecucion 
router.put('/notas/editar-nota/:id', isAuthenticated,async(req,res)=>{
    const {titulo, descripcion} = req.body;
    await Nota.findByIdAndUpdate(req.params.id, {titulo, descripcion}).lean();
    req.flash('success_msg', 'Nota editada exitosamente');
    res.redirect('/notas');
});

                            ////si esta isAuthenticated valida primero y despues hace la ejecucion 
router.delete('/notas/borrar/:id', isAuthenticated,async(req, res)=>{
    await Nota.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Nota borrada exitosamente');
    res.redirect('/notas');
});



module.exports= router;