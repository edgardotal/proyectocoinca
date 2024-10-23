// routes/mermaRoutes.js

const express = require('express');
const router = express.Router();
const MermaController = require('../controllers/mermaController');

// Ruta para obtener la merma por cava
router.get('/merma/:cava', MermaController.getMerma);

module.exports = router;
