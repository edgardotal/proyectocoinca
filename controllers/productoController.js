const ProductoModel = require('../models/productomodel');

const ProductoController = {
  getProductos: (req, res) => {
    ProductoModel.getAll((err, results) => {
      if (err) {
        console.error('Error ejecutando la consulta: ' + err.stack);
        res.status(500).send('Error en la base de datos');
        return;
      }
      res.json(results);
    });
  },
};

module.exports = ProductoController;
