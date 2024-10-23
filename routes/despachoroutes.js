const express = require('express');
const router = express.Router();
const DespachoController = require('../controllers/despachocontroller');

// Ruta para obtener los datos de despacho por número de cava
router.get('/despacho/cava/:cava', DespachoController.obtenerDespachoPorCava);
// -------------------------------------------------------------------------------------

// Ruta para insertar  despachos
router.post('/despacho', DespachoController.guardarDespacho);

module.exports = router;
