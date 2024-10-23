const express = require('express');
const router = express.Router();
const { guardarTotalesDespacho } = require('../controllers/totalesdespachocontroller');

// Ruta para crear un nuevo registro de totales despacho
router.post('/guardarTotalesDespacho', guardarTotalesDespacho);

module.exports = router;
