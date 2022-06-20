const{Router} = require('express');
const Inventario = require('../models/Inventario');
const { validateInventory} = require('../helpers/validate-inventory');

const router = Router();

router.get('/', async function(req, res){
    try{
        const inventarios = await Inventario.find().populate([
            {
                path:'usuario', select: 'nombre email estado'
            },
            {
                path: 'marca', select:'nombre estado'
            },
            {
                path: 'tipoEquipo' , select: 'nombre estado'
            },
            {
                path: 'estadoEquipo', select: 'nombre estado'
            }
        ]);
        res.send(inventarios);
    }catch(error){
        console.log(error);
        res.status(500).send('an error occurred with server');
    }
});

router.post('/', async function(req, res){
    try{
        const validaciones = validateInventory(req);

        if(validaciones.length > 0){
            return res.status(400).send(validaciones);
        }

        const existeInventariosPorSerial = await Inventario.findOne({serial: req.body.serial});
        if(existeInventariosPorSerial){
            return res.status(400).send('serial already exists for other equipment');
        }

        const existeInventariosPorModelo = await Inventario.findOne({modelo: req.body.modelo});
        if(existeInventariosPorModelo){
            return res.status(400).send('model already exists for other equipment');
        }

        let inventario = new Inventario();
        inventario.serial = req.body.serial;
        inventario.modelo = req.body.modelo;
        inventario.descripcion = req.body.descripcion;
        inventario.foto = req.body.foto;
        inventario.color = req.body.color;
        inventario.precio = req.body.precio;
        inventario.fechaCompra = req.body.fechaCompra;
        inventario.usuario = req.body.usuario._id;
        inventario.marca = req.body.marca._id;
        inventario.tipoEquipo = req.body.tipoEquipo._id;
        inventario.estadoEquipo = req.body.estadoEquipo._id;
        inventario.fechaCreacion = new Date();
        inventario.fechaActualizacion = new Date();
        inventario = await inventario.save();

        res.send(inventario); 

    }catch(error){
        console.log(error);
        res.status(500).send('an error occurred with server');
    }
});

router.put('/:inventarioId', async function(req, res){
    try{

        let inventario = await Inventario.findById(req.params.inventarioId);
        if(!inventario){
            return res.status(400).send('does not exists inventory');
        }
        const existeInventariosPorSerial = await Inventario
        .findOne({serial: req.body.serial, _id: {$ne: inventario._id}});
        if(existeInventariosPorSerial){
            return res.status(400).send('serial already exists for other equipment');
        }

        const existeInventariosPorModelo = await Inventario
        .findOne({modelo: req.body.modelo, _id:{$ne: inventario._id}});
        if(existeInventariosPorModelo){
            return res.status(400).send('model already exists for other equipment');
        }

        inventario.serial = req.body.serial;
        inventario.modelo = req.body.modelo;
        inventario.descripcion = req.body.descripcion;
        inventario.foto = req.body.foto;
        inventario.color = req.body.color;
        inventario.precio = req.body.precio;
        inventario.fechaCompra = req.body.fechaCompra;
        inventario.usuario = req.body.usuario._id;
        inventario.marca = req.body.marca._id;
        inventario.tipoEquipo = req.body.tipoEquipo._id;
        inventario.estadoEquipo = req.body.estadoEquipo._id;
        inventario.fechaActualizacion = new Date();
        
        inventario = await inventario.save();

        res.send(inventario); 
    }catch(error){
        console.log(error);
        res.status(500).send('an error occurred with inventory');
    }
});

module.exports = router;