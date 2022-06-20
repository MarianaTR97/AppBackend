const{Schema, model} = require('mongoose');

const EstadoEquipoSchema = Schema({
    nombre:{
        type: String,
        required: true,
        Enumerator:[
            'en uso',
            'en bodega',
            'depreciado',
            'daniado'
        ]
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
module.exports = model('EstadoEquipo', EstadoEquipoSchema);