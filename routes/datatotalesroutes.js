const express = require('express');
const router = express.Router();
const RecepcionController = require('../controllers/totalescontroller');

// Ruta para guardar los totales
router.post('/totales', RecepcionController.guardarTotales);

module.exports = router;
