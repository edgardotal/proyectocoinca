const RecepcionModel = require('../models/datarecepcionmodel.js'); // Ajusta la ruta según la estructura

const guardarRecepcion = (req, res) => {
  const { codcli, fechar, ncontrol,  rows } = req.body;

  // Verifica si `rows` es un array
  if (!Array.isArray(rows) || rows.length === 0) {
    return res.status(400).json({ error: 'El formato de datos es incorrecto. Se esperaba un array de filas.' });
  }

  // Construir el array de objetos recepcion
  const recepciones = rows.map(row => ({
    ncontrol: ncontrol || null,
    codcli: codcli || null,
    fechar: fechar || null,
    pe: row.pe || null,
    lote: row.lote || null,
    codigo: row.codigo || null,
    producto: row.producto || null,
    c: row.c || null,
    f: row.f || null,
    n: row.n || null,
    pos: row.pos || null,
    bruto: row.bruto || null,
    gde25: row.gde25 || null,
    gde24: row.gde24 || null,
    gde23: row.gde23 || null,
    gde22: row.gde22 || null,
    med: row.med || null,
    peq: row.peq || null,
    est: row.est || null,
    tara: row.tara || null,
    neto: row.neto || null,
    sacos: row.sacos || null,
    totcesta: row.totcesta || null,
    bultos: row.bultos || null,
    unidad: row.unidad || null,
  }));

  // Llamada al modelo para insertar todas las filas a la vez
  RecepcionModel.create(recepciones, (error, results) => {
    if (error) {
      console.error('Error al guardar datos:', error);
      return res.status(500).json({ error: 'Error al guardar los datos' });
    }
    res.status(201).json({ message: 'Todas las filas se guardaron con éxito' });
  });
};

module.exports = {
  guardarRecepcion
};
