const mongoose = require('mongoose');
const {Schema} = mongoose;

const NotaSchema = new Schema({
    titulo:{type: String,require: true},
    descripcion:{type: String, require: true},
    fecha: {type: Date, default: Date.now},
    usuario: {type: String}
})

module.exports = mongoose.model('Nota',NotaSchema);