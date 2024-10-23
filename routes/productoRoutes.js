const express = require('express');
const router = express.Router();
const ProductoController = require('../controllers/productoController');

router.get('/productos', ProductoController.getProductos);
// Puedes agregar más rutas aquí para otros métodos como POST, PUT, DELETE

module.exports = router;
