const {Router} = require('express');
const router= Router();

const { agregarApuesta, mostrarApuestas } = require('../controladores/controladores.juego');

//crear apuesta
router.post('/apostar', agregarApuesta);

// Ruta para obtener todas las apuestas
router.get('/apuestas', mostrarApuestas);

module.exports = router;