const db = require('../config/db');

const Transaction = {
  create: (data, callback) => {
    const query = `
      INSERT INTO totalpxlote 
      (fechae, fechas, lote, producto, tneto, test, tcestas, tgde, tmed, tpeq, tsacos) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      data.fechae || null,  // Maneja valores nulos
      data.fechas || null,
      data.lote || null,
      data.producto || null,
      data.tneto || 0,       // Asegúrate de que los valores numéricos tengan un valor predeterminado
      data.test || 0,
      data.tcestas || 0,
      data.tgde || 0,
      data.tmed || 0,
      data.tpeq || 0,
      data.tsacos || 0
    ];

    db.query(query, values, (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  }
};

module.exports = Transaction;
