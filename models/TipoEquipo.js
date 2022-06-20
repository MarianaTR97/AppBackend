const{Schema, model} = require('mongoose');

const TipoEquipoSchema = Schema({
    nombre:{
        type: String,
        required: true,
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
module.exports = model('TipoEquipo', TipoEquipoSchema);