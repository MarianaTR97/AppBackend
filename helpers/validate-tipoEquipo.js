const validateTipoEquipo = (req) => {
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
    validateTipoEquipo
}