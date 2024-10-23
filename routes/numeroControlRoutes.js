const express = require('express');
const router = express.Router();
const numeroControlController = require('../controllers/numeroControlController');

router.get('/numeroControl', numeroControlController.obtenerNumeroControl);
router.put('/numeroControl/actualizar', numeroControlController.actualizarNumeroControl);


// Rutas para el número de control de despacho
router.get('/numeroControlDesp', numeroControlController.obtenerNumeroControldesp);
router.put('/numeroControlDesp/actualizar', numeroControlController.actualizarNumeroControldesp); // Asegúrate de que la ruta es correcta


module.exports = router;