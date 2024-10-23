const db = require('../config/db');

const CavaPosiciones = {};

// Método para obtener todas las posiciones ocupadas de una cava específica
CavaPosiciones.getCavas = (cavaId, callback) => {
  const query = `SELECT * FROM cava_posiciones WHERE cava_id = ?`;
  db.query(query, [cavaId], (error, results) => {
    if (error) {
      console.error('Error ejecutando la consulta:', error);
      return callback(error, null);
    }
    callback(null, results);
  });
};

// Método para obtener el estado de una posición específica (incluye 'posicion')
CavaPosiciones.getEstadoPosicion = (cavaId, fila, nivel, posicion, callback) => {
  const query = `
    SELECT * FROM cava_posiciones 
    WHERE cava_id = ? AND fila = ? AND nivel = ? AND posicion = ?`;
  
  db.query(query, [cavaId, fila, nivel, posicion], (error, results) => {
    if (error) {
      console.error('Error ejecutando la consulta:', error);
      return callback(error, null);
    }
    callback(null, results);
  });
};

// Método para actualizar el estado de una posición específica (incluye 'posicion')
CavaPosiciones.updateEstadoPosicion = (cavaId, fila, nivel, posicion, nuevoEstado, nuevocontrol, callback) => {
  // Validar el estado
  if (nuevoEstado !== 'disponible' && nuevoEstado !== 'ocupado') {
    return callback(new Error('El estado debe ser "disponible" o "ocupado"'), null);
  }

  const query = `
  UPDATE cava_posiciones 
  SET estado = ?, ncontrol = ? 
  WHERE cava_id = ? AND fila = ? AND nivel = ? AND posicion = ?`;

  // Asegúrate de incluir nuevocontrol en el arreglo de valores
  db.query(query, [nuevoEstado, nuevocontrol, cavaId, fila, nivel, posicion], (error, results) => {
    if (error) {
      console.error('Error ejecutando la consulta:', error);
      return callback(error, null);
    }
    callback(null, results);
  });
};


module.exports = CavaPosiciones;
