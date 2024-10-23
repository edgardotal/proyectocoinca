const MermaModel = require('../models/mermaModel'); // Asegúrate de que coincide con el nombre del archivo

const MermaController = {
  // Método para obtener los datos de merma por cava
  getMerma: (req, res) => {
    const cava = req.params.cava; // Obtener el parámetro 'cava' de la URL
    
    // Llamar al modelo para obtener los datos
    MermaModel.getMerma(cava, (err, results) => {
      if (err) {
        // En caso de error, devolver un estado 500 con un mensaje de error
        return res.status(500).json({ message: 'Error al obtener datos', error: err });
      }
      // Enviar los resultados en formato JSON como respuesta
      res.json(results);
    });
  },
};

module.exports = MermaController;
