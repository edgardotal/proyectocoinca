const express = require('express');
const router = express.Router();
const cavaPosicionesController = require('../controllers/cavaPosicionesController');

// Ruta para obtener las posiciones ocupadas de una cava específica
router.get('/ocupadas/:cavaId', cavaPosicionesController.getCavas);

// Ruta para obtener el estado de una posición específica (ahora incluye 'posicion')
router.get('/posiciones/:cavaId/fila/:fila/nivel/:nivel/posicion/:posicion', cavaPosicionesController.getEstadoPosicion);

// Ruta para actualizar el estado de una posición específica (ahora incluye 'posicion')
router.put('/posiciones/:cavaId/fila/:fila/nivel/:nivel/posicion/:posicion/ncontrol/:ncontrol', cavaPosicionesController.updateEstadoPosicion);


module.exports = router;
