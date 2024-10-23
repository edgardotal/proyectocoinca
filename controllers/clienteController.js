const ClienteModel = require('../models/clientemodel'); // Verifica que la ruta sea correcta

const clienteController = {
  // Método para obtener todos los clientes
  getClientes: (req, res) => {
    ClienteModel.getAll((err, results) => {
      if (err) {
        console.error('Error ejecutando la consulta: ' + err.stack);
        res.status(500).send('Error en la base de datos');
        return;
      }
      res.json(results);
    });
  },

  // Puedes agregar más métodos aquí según sea necesario
};

module.exports = clienteController;
