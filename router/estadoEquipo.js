const { Router } = require('express');
const {} = require('express');
const { validateEstadoEquipo } = require('../helpers/validate-estadoEquipo');
const EstadoEquipo = require('../models/EstadoEquipo');

const router = Router();

router.get('/', async function(req, res){
    try{
        const estado = await EstadoEquipo.find();
        res.send(estado);
    }catch(error){
        console.log(error);
        res.status(500).send('an error occurred with server');
    }
});

router.get('/:estadoEquipoId', async function(req, res){
    try{
        const estadoEquipo = await EstadoEquipo.findById(req.params.estadoEquipoId);
        if(!estadoEquipo){
            return res.status(400).send('Does not exists equipment status')
        }
        res.send(estadoEquipo);
    }catch(error){
        console.log(error);
        res.status(500).send('an error occurred with server');
    }
    
});

router.post('/', async function(req, res){
    try{
        const validaciones = validateEstadoEquipo(req);

        if(validaciones.length > 0){
            return res.status(400).send(validaciones);
        }

        console.log(req.body);

        const estadoDelEquipo = await EstadoEquipo.findOne({nombre: req.body.nombre});
        console.log(estadoDelEquipo);
        
    
    let equipoEstado = new EstadoEquipo();
    equipoEstado.nombre = req.body.nombre;
    equipoEstado.estado = req.body.estado;
    equipoEstado.fechaCreacion = new Date();
    equipoEstado.fechaActualizacion = new Date();

    equipoEstado = await equipoEstado.save();

    res.send(equipoEstado);

    }catch(error){
        console.log(error);
        res.status(500).send('an error occurred with server');
    }
});

router.put('/:estadoEquipoId', async function(req, res){
    try{
        let equipoEstado = await EstadoEquipo.findById(req.params.estadoEquipoId)
        console.log(req.body);

        const estadoDelEquipo = await EstadoEquipo.findOne({nombre: req.body.nombre, _id:{$ne: equipoEstado._id}});
        console.log(estadoDelEquipo);
        
    equipoEstado.nombre = req.body.nombre;
    equipoEstado.estado = req.body.estado;
    equipoEstado.fechaCreacion = new Date();
    equipoEstado.fechaActualizacion = new Date();

    equipoEstado = await equipoEstado.save();

    res.send(equipoEstado);

    }catch(error){
        console.log(error);
        res.status(500).send('an error occurred with server');
    }
})

module.exports = router;