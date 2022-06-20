const{Schema, model} = require('mongoose');

const UsuariosSchema = Schema({
    nombre:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    estado:{
        type: String,
        required: true,
        Enumerator:['Activo', 'Inactivo']
    },
    fechaCreacion:{
        type: Date,
        required: true,
    },
    fechaActualizacion:{
        type: Date,
        required: true
    }
});

// exportación por defecto del esquema
module.exports = model('Usuario', UsuariosSchema);