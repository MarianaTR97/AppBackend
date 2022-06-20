//const req = require("express/lib/request");

const validateInventory = (req) => {
    const validaciones = [];

    if(!req.body.serial){
        validaciones.push('required serial');
    }

    if(!req.body.modelo){
        validaciones.push('required model');
    }

    if(!req.body.descripcion){
        validaciones.push('required description');
    }

    if(!req.body.foto){
        validaciones.push('required photo');
    }

    if(!req.body.precio){
        validaciones.push('required price');
    }

    if(!req.body.fechaCompra){
        validaciones.push('required purchase date');
    }

    if(!req.body.usuario){
        validaciones.push('required user');
    }

    if(!req.body.marca){
        validaciones.push('required mark');
    }

    if(!req.body.tipoEquipo){
        validaciones.push('required type of equipment');
    }

    if(!req.body.estadoEquipo){
        validaciones.push('required equipment status');
    }

    return validaciones;
}

module.exports = {
    validateInventory
}