const db = require('../config/db');

const ProductoModel = {
  getAll: (callback) => {
    db.query('SELECT * FROM producto', callback);
  },
  // Puedes agregar más métodos como create, update, delete, etc.
};

module.exports = ProductoModel;
