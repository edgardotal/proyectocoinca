const db = require('../config/db'); // Asegúrate de que la ruta sea correcta

const RecepcionModel = {
  create: (recepciones, callback) => {
    // Verificar que el parámetro 'recepciones' sea un array no vacío
    if (!Array.isArray(recepciones) || recepciones.length === 0) {
      return callback(new Error('No se proporcionaron datos para insertar'), null);
    }

    // Construir la consulta SQL para múltiples inserciones
    const query = `
      INSERT INTO recepcion (ncontrol, codcli, fechar, pe, lote, codigo, producto, c, f, n, pos,  bruto, gde25, gde24, gde23, gde22, med, peq, sacos, est, tara, neto, totcesta, bultos, unidad)
      VALUES ?
    `;

    // Construir los valores para la consulta
    const values = recepciones.map(recepcion => [
      recepcion.ncontrol || null,
      recepcion.codcli || null,
      recepcion.fechar || null,
      recepcion.pe || null,
      recepcion.lote || null,
      recepcion.codigo || null,
      recepcion.producto || null,
      recepcion.c || null,
      recepcion.f || null,
      recepcion.n || null,
      recepcion.pos || null,
      recepcion.bruto || null,
      recepcion.gde25 || null,
      recepcion.gde24 || null,
      recepcion.gde23 || null,
      recepcion.gde22 || null,
      recepcion.med || null,
      recepcion.peq || null,
      recepcion.sacos || null,
      recepcion.est || null,
      recepcion.tara || null,
      recepcion.neto || null,
      recepcion.totcesta || null,
      recepcion.bultos || null,
      recepcion.unidad || null
    ]);

    // Ejecutar la consulta con múltiples valores
    db.query(query, [values], (err, results) => {
      if (err) {
        console.error('Error al insertar datos:', err);
        return callback(err, null);
      }
      callback(null, results);
    });
  }
};

module.exports = RecepcionModel;
