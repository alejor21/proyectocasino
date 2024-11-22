const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const routesJuegos = require('../rutas/rutas.juego'); 

dotenv.config(); // Cargar las variables de entorno

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3200;  
        this.middlewares();
        this.routes();
    }

    // Middlewares
    middlewares() {
        this.app.use(cors());  // Habilitar CORS
        this.app.use(express.json());  // Habilitar el parsing de JSON en las peticiones
    }

    // Configuración de rutas
    routes() {
        this.app.use('/juegos', routesJuegos);  
    }

    // Iniciar el servidor
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en http://localhost:${this.port}`);
        });
    }
}

module.exports = Server;
