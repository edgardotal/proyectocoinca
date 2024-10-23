const CavaPosiciones = require('../models/cavaPosicionesModel');

const cavaPosicionesController = {};

// Controlador para obtener todas las posiciones ocupadas en una cava específica
cavaPosicionesController.getCavas = (req, res) => {
  const cavaId = req.params.cavaId;

  console.log(`esta es la cava rata: ${cavaId}`);

  CavaPosiciones.getCavas(cavaId, (error, results) => {
    if (error) {
      console.error('Error al obtener las posiciones ocupadas:', error);
      return res.status(500).json({ error: 'Error en la consulta a la base de datos' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'No se encontró la cava' });
    }
    res.json(results);
  });
};

// Controlador para obtener el estado de una posición específica (incluye 'posicion')
cavaPosicionesController.getEstadoPosicion = (req, res) => {
  const { cavaId, fila, nivel, posicion } = req.params;

  console.log(`posiciones rata: ${cavaId}, fila: ${fila}, nivel: ${nivel}, posicion: ${posicion}`);

  CavaPosiciones.getEstadoPosicion(cavaId, fila, nivel, posicion, (error, posiciones) => {
    if (error) {
      console.error('Error al obtener el estado de la posición:', error);
      return res.status(500).json({ error: 'Error en la consulta a la base de datos' });
    }

    if (posiciones.length === 0) {
      return res.status(404).json({ message: 'No se encontraron posiciones' });
    }

    // Agregar un console.log para mostrar el estado de la posición obtenida
    const estadoPosicion = posiciones[0]?.estado;  // Aseguramos que posiciones[0] exista
    console.log(`Estado de la posición rata: ${estadoPosicion}`);

    res.json(posiciones);
  });
};

// Controlador para actualizar el estado de una posición específica (incluye 'posicion')
cavaPosicionesController.updateEstadoPosicion = (req, res) => {
  const { cavaId, fila, nivel, posicion, ncontrol } = req.params; // Asegúrate de que ncontrol se extraiga de req.params

  console.log(`Actualizando estado para cavaId: ${cavaId}, fila: ${fila}, nivel: ${nivel}, posicion: ${posicion}, ncontrol: ${ncontrol}`);

  // Primero obtenemos el estado actual de la posición
  CavaPosiciones.getEstadoPosicion(cavaId, fila, nivel, posicion, (error, posiciones) => {
    if (error) {
      console.error('Error al obtener el estado de la posición:', error);
      return res.status(500).json({ error: 'Error en la consulta a la base de datos' });
    }

    if (posiciones.length === 0) {
      return res.status(404).json({ message: 'No se encontraron posiciones para actualizar' });
    }

    // Suponemos que posiciones[0] contiene el resultado de la posición que nos interesa
    const posicionActual = posiciones[0];
    const estadoActual = posicionActual.estado;

    console.log(`Estado actual de la posición: ${estadoActual}`);

    // Cambiar el estado de "disponible" a "ocupado" o de "ocupado" a "disponible"
    const nuevoEstado = estadoActual === 'disponible' ? 'ocupado' : 'disponible';

    // Actualizamos el estado de la posición, ahora incluyendo ncontrol
    CavaPosiciones.updateEstadoPosicion(cavaId, fila, nivel, posicion, nuevoEstado, ncontrol, (updateError, result) => {
      if (updateError) {
        console.error('Error al actualizar el estado:', updateError);
        return res.status(500).json({ error: 'Error en la actualización de la posición' });
      }

      console.log(`Posición actualizada correctamente a ${nuevoEstado}`);
      res.json({ message: `Posición actualizada correctamente a ${nuevoEstado}` });
    });
  });
};


module.exports = cavaPosicionesController;
