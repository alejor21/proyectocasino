const { Router } = require('express');
const { 
    agregarUsuario, 
    mostrarUsuarios, 
} = require('../controladores/controladores.usuarios'); // Asegúrate de que la ruta sea correcta

const router = Router();

// Rutas de usuarios
router.get('/mostrar', mostrarUsuarios);           // Mostrar todos los usuarios
router.post('/crear', agregarUsuario);          // Agregar un nuevo usuario


module.exports = router;
