const numeroControlModel = require('../models/numeroControlModel'); // Asegúrate de que esta ruta es correcta

// Obtener el número de control actual
exports.obtenerNumeroControl = (req, res) => {
  console.log('epale llamando a obtenerNumeroControl');

  numeroControlModel.obtenerNumeroControl()
    .then(result => {
      // Asegúrate de que se devuelva el campo correcto
      res.json({ ncontrolrecep: result });
    })
    .catch(error => {
      console.error('Error al obtener el número de control:', error);
      res.status(500).json({ error: 'Error al obtener el número de control' });
    });
};

// Actualizar el número de control
exports.actualizarNumeroControl = (req, res) => {
  console.log('Iniciando proceso de actualización del número de control');

  // Obtener el número de control actual
  numeroControlModel.obtenerNumeroControl()
    .then(numeroActual => {
      console.log('Número de control actual:', numeroActual);

      // Convertir el número a un entero y sumarle 1
      const prefix = numeroActual.substring(0, 1); // 'R'
      const numero = parseInt(numeroActual.substring(1), 10); // Extrae el número después del prefijo
      const nuevoNumeroControl = `${prefix}${(numero + 1).toString().padStart(6, '0')}`; // Incrementa y mantiene el formato

      // Actualizar el número de control en la base de datos
      return numeroControlModel.actualizarNumeroControl(nuevoNumeroControl);
    })
    .then(() => {
      res.status(200).json({ message: 'Número de control actualizado correctamente' });
    })
    .catch(error => {
      console.error('Error durante la actualización del número de control:', error);
      res.status(500).json({ error: 'Error durante la actualización del número de control' });
    });
};

//////////////////////////////////

// Controlador para obtener y actualizar el número de control de despacho
exports.obtenerNumeroControldesp = (req, res) => {
  console.log('epale llamando a obtenerNumeroControl de despacho');

  numeroControlModel.obtenerNumeroControldesp()
    .then(result => {
      res.json({ ncontroldesp: result });
    })
    .catch(error => {
      console.error('Error al obtener el número de control de despacho:', error);
      res.status(500).json({ error: 'Error al obtener el número de control despacho' });
    });
};

// Actualizar el número de control de despacho
exports.actualizarNumeroControldesp = (req, res) => {
  console.log('Iniciando proceso de actualización del número de control de despacho');

  // Obtener el número de control actual
  numeroControlModel.obtenerNumeroControldesp()
    .then(numeroActual => {
      console.log('Número de control actual:', numeroActual);

      // Convertir el número a un entero y sumarle 1
      const prefix = numeroActual.substring(0, 1); // 'R'
      const numero = parseInt(numeroActual.substring(1), 10); // Extrae el número después del prefijo
      const nuevoNumeroControl = `${prefix}${(numero + 1).toString().padStart(6, '0')}`; // Incrementa y mantiene el formato

      // Actualizar el número de control en la base de datos
      return numeroControlModel.actualizarNumeroControldesp(nuevoNumeroControl); // Asegúrate de usar el método correcto
    })
    .then(() => {
      res.status(200).json({ message: 'Número de control de despacho actualizado correctamente' });
    })
    .catch(error => {
      console.error('Error durante la actualización del número de control de despacho:', error);
      res.status(500).json({ error: 'Error durante la actualización del número de control de despacho' });
    });
};
