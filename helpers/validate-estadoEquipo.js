//const req = require('express');

const validateEstadoEquipo = (req) => {
    const validaciones = [];

    if(!req.body.nombre){
        validaciones.push('required name');
    }

    if(!req.body.estado){
        validaciones.push('required status');
    }

    return validaciones;
}

module.exports = {
    validateEstadoEquipo
}