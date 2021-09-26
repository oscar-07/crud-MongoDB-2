const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcryptjs');


const UsuarioSchema = new Schema({
    nombre: {type: String, required: true},
    correo: {type: String, required: true},
    contraseña: {type: String, required: true},
    fecha: {type: Date, default: Date.now},
});

UsuarioSchema.methods.encryptPassword = async(contraseña) =>{
                            //ejecutar 10 veces algoritmo entre mas vueltas mas recursos
    const salt = await bcrypt.genSalt(10);
                            //usa contraseña y hash
    const hash = bcrypt.hash(contraseña,salt);
                            //genera cifrado
    return hash;
};
                                        //Metodo para logear
UsuarioSchema.methods.matchPassword = async function (contraseña){
    return await bcrypt.compare(contraseña, this.contraseña);
};

module.exports = mongoose.model('Usuario',UsuarioSchema);