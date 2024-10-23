const db = require('../config/db'); // Asegúrate de que esta ruta es correcta

// Obtener el número de control actual
exports.obtenerNumeroControl = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT ncontrolrecep FROM numero_control LIMIT 1'; // Selecciona el primer valor
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error en la consulta:', err);
        return reject(err);
      }
      console.log('Número de control actual:', results[0].ncontrolrecep);
      resolve(results[0].ncontrolrecep); // Se resuelve con el valor actual
    });
  });
};

// Actualizar el número de control sumando 1
exports.actualizarNumeroControl = (nuevoNumeroControl) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE numero_control SET ncontrolrecep = ?';
    db.query(query, [nuevoNumeroControl], (err, results) => {
      if (err) {
        console.error('Error al actualizar el número de control:', err);
        return reject(err);
      }
      console.log('Número de control recepcion actualizado a:', nuevoNumeroControl);
      resolve(results);
    });
  });
};

/////////////////////////

// Obtener el número de control de despacho
exports.obtenerNumeroControldesp = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT ncontroldesp FROM numero_control LIMIT 1'; // Selecciona el primer valor
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error en la consulta:', err);
        return reject(err);
      }
      console.log('Número de control actual de despacho:', results[0].ncontroldesp);
      resolve(results[0].ncontroldesp); // Se resuelve con el valor actual
    });
  });
};

// Actualizar el número de control de despacho
exports.actualizarNumeroControldesp = (nuevoNumeroControl) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE numero_control SET ncontroldesp = ?'; // Asegúrate de que este es el campo correcto
    db.query(query, [nuevoNumeroControl], (err, results) => {
      if (err) {
        console.error('Error al actualizar el número de control de despacho:', err);
        return reject(err);
      }
      console.log('Número de control de despacho actualizado a:', nuevoNumeroControl);
      resolve(results);
    });
  });
};
