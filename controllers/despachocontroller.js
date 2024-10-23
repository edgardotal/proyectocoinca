const DespachoModel = require('../models/despachomodel.js'); // Ajusta la ruta según la estructura

const guardarDespacho = (req, res) => {
  const { codcli, fechad, ncontrol, rows } = req.body;

  // Verifica si `rows` es un array y tiene elementos
  if (!Array.isArray(rows) || rows.length === 0) {
    return res.status(400).json({ error: 'El formato de datos es incorrecto. Se esperaba un array de filas.' });
  }

  // Construir el array de objetos despachos con los nuevos campos recepcion_id y recepcion_ncontrol
  const despachos = rows.map(row => ({
    ncontrol: ncontrol || null,
    codcli: codcli || null,
    fechad: fechad || null,
    pe: row.pe || null,
    lote: row.lote || null,
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
    sacos: row.sacos || null,
    est: row.est || null,
    tara: row.tara || null,
    neto: row.neto || null,
    totcesta: row.totcesta || null,
    bultos: row.bultos || null,
    unidad: row.unidad || null,
    // Nuevos campos
    recepcion_id: row.recepcion_id || null,  
    recepcion_ncontrol: row.recepcion_ncontrol || null,
  }));

  // Llamada al modelo para insertar todas las filas a la vez
  DespachoModel.create(despachos, (error, results) => {
    if (error) {
      console.error('Error al guardar datos:', error);
      return res.status(500).json({ error: 'Error al guardar los datos' });
    }
    res.status(201).json({ message: 'Todas las filas se guardaron con éxito', data: results });
  });
};
// -------------------------------------------------------------------------------------


// Nuevo método para obtener datos de despacho según la cava
const obtenerDespachoPorCava = (req, res) => {
  const { cava } = req.params;

  if (!cava) {
    return res.status(400).json({ error: 'El número de cava es obligatorio' });
  }

  DespachoModel.getByCava(cava, (error, results) => {
    if (error) {
      console.error('Error al obtener datos de despacho por cava:', error);
      return res.status(500).json({ error: 'Error al obtener los datos de despacho por cava' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'No se encontraron datos para la cava especificada' });
    }
    
  //  console.log('Resultados obtenidos para la cava:', results);

    res.status(200).json(results);
  });
};





module.exports = {
  guardarDespacho,
  obtenerDespachoPorCava
  
};
