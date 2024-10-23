const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaccioncontroller');

// Ruta para crear una nueva transacción
router.post('/guardatotalxplote', transactionController.createTransaccion);

module.exports = router;
