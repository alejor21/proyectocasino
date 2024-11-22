require('dotenv').config();
const Server = require('./modelos/server');

const server = new Server();

server.listen();

