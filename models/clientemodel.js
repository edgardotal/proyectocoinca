const db = require('../config/db'); // Verifica que la ruta sea correcta

const ClienteModel = {
  // Obtiene todos los clientes
  getAll: (callback) => {
    db.query('SELECT * FROM clientes', callback); // Verifica el nombre de la tabla
  },

  // Obtiene un cliente por ID
  getById: (id, callback) => {
    db.query('SELECT * FROM clientes WHERE id = ?', [id], callback); // Verifica el nombre de la tabla
  },

  // Crea un nuevo cliente
  create: (cliente, callback) => {
    const { nombre } = cliente; // Ajusta según los campos de tu tabla
    db.query('INSERT INTO clientes (nombre) VALUES (?)', [nombre], callback); // Verifica el nombre de la tabla
  },

  // Actualiza un cliente existente
  update: (id, cliente, callback) => {
    const { nombre } = cliente; // Ajusta según los campos de tu tabla
    db.query('UPDATE clientes SET nombre = ? WHERE id = ?', [nombre, id], callback); // Verifica el nombre de la tabla
  },

  // Elimina un cliente
  delete: (id, callback) => {
    db.query('DELETE FROM clientes WHERE id = ?', [id], callback); // Verifica el nombre de la tabla
  }
};

module.exports = ClienteModel;
