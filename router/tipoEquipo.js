const { Router } = require('express');
const {} = require('express');
const { validateTipoEquipo } = require('../helpers/validate-tipoEquipo');
const TipoEquipo = require('../models/TipoEquipo');

const router = Router();

router.get('/', async function(req, res){
    try{
        const tipoEquipos = await TipoEquipo.find();
        res.send(tipoEquipos);
    }catch(error){
        console.log(error);
        res.status(500).send('an error occurred with server');
    }
});

router.get('/:tipoEquipoId', async function(req, res){
    try{
        const tipoEquipos = await TipoEquipo.findById(req.params.tipoEquipoId);
        if(!tipoEquipos){
            return res.status(400).send('Does not exists type of equipment ')
        }
        res.send(tipoEquipos);
    }catch(error){
        console.log(error);
        res.status(500).send('an error occurred with server');
    }
});

router.post('/', async function(req, res){
    try{

        const validaciones = validateTipoEquipo(req);

        if(validaciones.length > 0){
            return res.status(400).send(validaciones);
        }
        
        console.log(req.body);

        /*const clasificacion = await TipoEquipo.findOne({nombre: req.body.nombre});
        console.log(clasificacion);
        if(clasificacion){
            return res.status(400).send('classification not found');
        }*/
       
    
    let tipo = new TipoEquipo();
    tipo.nombre = req.body.nombre;
    tipo.estado = req.body.estado;
    tipo.fechaCreacion = new Date();
    tipo.fechaActualizacion = new Date();

    tipo = await tipo.save();

    res.send(tipo);

    }catch(error){
        console.log(error);
        res.status(500).send('an error occurred with server');
    }
});

router.put('/:tipoEquipoId', async function(req, res){
    try{

        let tipo = TipoEquipo.findById(req.params.tipoEquipoId)
        if(!tipo){
            return res.status(400).send('does not exists type of equipment');
        }

        const clasificacion = await TipoEquipo.findOne({nombre: req.body.nombre, _id:{$ne: tipo._id}});
        console.log(clasificacion);
        if(clasificacion){
            return res.status(400).send('does not exists classification');
        }
       
    tipo.nombre = req.body.nombre;
    tipo.estado = req.body.estado;
    tipo.fechaCreacion = new Date();
    tipo.fechaActualizacion = new Date();

    tipo = await tipo.save();

    res.send(tipo);

    }catch(error){
        console.log(error);
        res.status(500).send('an error occurred with server');
    }
});

module.exports = router;