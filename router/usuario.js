const {Router} = require('express');
const { validateUser } = require('../helpers/validate-user');
const router = Router();
const Usuario = require('../models/Usuario');

router.post('/', async function(req, res){

    try{
        const validaciones = validateUser(req);

        if(validaciones.length > 0){
            return res.status(400).send(validaciones);
        }

        console.log('It has been received',req.body);

        const existeUsuario = await Usuario.findOne({email: req.body.email});
        console.log(existeUsuario);
        if(existeUsuario){
            return res.status(400).send('Email already exists');
        }
    
    let usuario = new Usuario();
    usuario.nombre = req.body.nombre;
    usuario.email = req.body.email;
    usuario.estado = req.body.estado;
    usuario.fechaCreacion = new Date();
    usuario.fechaActualizacion = new Date();

    usuario = await usuario.save();

    res.send(usuario);

    }catch(error){
        console.log(error);
        res.status(500).send('an error occurred with server');
    }
    
});

router.get('/', async function(req, res){
    try{
        const usuarios = await Usuario.find();
        res.send(usuarios);
    }catch(error){
        console.log(error);
        res.status(500).send('an error occurred with server');
    }
});

router.get('/:usuarioId', async function(req, res){
    try{
        const usuario = await Usuario.findById(req.params.usuarioId);
        if(!usuario){
            return res.status(400).send('Does not exists that user');
        }
        res.send(usuario);
    }catch(error){
        console.log(error);
        res.status(500).send('an error occurred with server');
    }
});

router.put('/:usuarioId', async function(req, res){
    try{

        let usuario = await Usuario.findById(req.params.usuarioId);
        if(!usuario){
            return res.status(400).send('does not exists user');
        }

        const existeUsuario = await Usuario
        .findOne({email: req.body.email, _id:{$ne: usuario._id}});
        console.log(existeUsuario);
        if(existeUsuario){
            return res.status(400).send('Email already exists');
        }
        
        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.estado = req.body.estado;
        usuario.fechaCreacion = new Date();
        usuario.fechaActualizacion = new Date();
    
        usuario = await usuario.save();
    
        res.send(usuario);

    }catch(error){
        console.log(error);
        res.status(500).send('an error occurred with server');
    }
});

module.exports = router;