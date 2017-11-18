'use strict'

/*
  Este archivo es el encargado de ejecutar el servidor
*/

const http = require('http');

const Express = require('./app/server');
const { port } = require('./app/utils/');

const serverExpress = new Express();
const server = http.createServer(serverExpress);

server.listen(port, () => console.log(`Servidor ejecutandose en el puerto ${port}`));