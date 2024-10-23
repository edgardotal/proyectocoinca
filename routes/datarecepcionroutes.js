const express = require('express');
const router = express.Router();
const RecepcionController = require('../controllers/recepcioncontroller');

// Ruta para guardar los datos de recepción
router.post('/recepcion', RecepcionController.guardarRecepcion);


module.exports = router;
