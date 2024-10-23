const express = require('express');
const router = express.Router();
const ClienteController = require('../controllers/clienteController'); // Verifica que la ruta sea correcta

// Definir las rutas
router.get('/clientes', ClienteController.getClientes);
// Puedes agregar más rutas aquí para otros métodos como POST, PUT, DELETE

module.exports = router;
