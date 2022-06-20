const express = require('express');
const { getConnection } = require('./db/DBConnection-mongo');
const tipoEquipo = require('./models/TipoEquipo');
const estadoEquipo = require('./models/EstadoEquipo');
const marca = require('./models/Marca');
const usuario = require('./models/Usuario');
const inventario = require('./models/Inventario');
require('dotenv').config();
const cors = require('cors');

const application = express();
const port = process.env.port;

application.use(cors());

getConnection();

application.use(express.json());

application.use('/usuario', require('./router/usuario'));
application.use('/estado-equipo', require('./router/estadoEquipo'));
application.use('/tipo-equipo', require('./router/tipoEquipo'));
application.use('/marca', require('./router/marca'));
application.use('/inventario', require('./router/inventario'));


application.listen(port, () => {
    console.log(`Index listening on port ${port}`)
  })
