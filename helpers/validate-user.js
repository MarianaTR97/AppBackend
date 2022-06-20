//const req = require("express");

const validateUser = (req) => {
    const validaciones = [];

    if(!req.body.nombre){
        validaciones.push('required name');
    }

    if(!req.body.email){
        validaciones.push('required email');
    }

    if(!req.body.estado){
        validaciones.push('required status');
    }

    return validaciones;
}

module.exports ={
    validateUser
}