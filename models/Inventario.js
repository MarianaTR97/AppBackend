const{Schema, model, SchemaTypes} = require('mongoose');

const InventarioSchema = Schema({
    serial:{
        type: String,
        required: true,
        unique: true
    },
    modelo:{
        type: String,
        required: true,
    },
    descripcion:{
        type: String,
        required: true,
    },
    foto:{
        type: String,
        required: true,
    },
    precio:{
        type: Number,
        required: true
    },
    fechaCompra:{
        type: Date,
        required: true,
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
    },
    marca:{
        type: Schema.Types.ObjectId,
        ref: 'Marca',
        required: true,
    },
    tipoEquipo:{
        type: Schema.Types.ObjectId,
        ref: 'TipoEquipo',
        required: true,
    },
    estadoEquipo:{
        type: Schema.Types.ObjectId,
        ref: 'EstadoEquipo',
        required: true
    },
    fechaCreacion:{
        type: Date,
        required: true,
    },
    fechaActualizacion:{
        type: Date,
        required: true, 
    }
});

// exportación por defecto del esquema
module.exports = model('Inventario', InventarioSchema);