const db = require('../config/db'); // Asegúrate de que la ruta sea correcta

const DespachoModel = {
  

  // Método para obtener datos según la cava
  getByCava: (cava, callback) => {
    const query = `
      SELECT 
        r.id, 
        r.ncontrol, 
        r.fechar, 
        r.codcli, 
        r.pe, 
        r.lote, 
        r.producto, 
        r.c, 
        r.f, 
        r.n, 
        r.pos, 
        ROUND(r.bruto - IFNULL(SUM(d.bruto), 0), 2) AS bruto,        
        CAST(r.gde25 - IFNULL(SUM(d.gde25), 0) AS UNSIGNED) AS gde25, 
        CAST(r.gde24 - IFNULL(SUM(d.gde24), 0) AS UNSIGNED) AS gde24, 
        CAST(r.gde23 - IFNULL(SUM(d.gde23), 0) AS UNSIGNED) AS gde23, 
        CAST(r.gde22 - IFNULL(SUM(d.gde22), 0) AS UNSIGNED) AS gde22, 
        CAST(r.med - IFNULL(SUM(d.med), 0) AS UNSIGNED) AS med, 
        CAST(r.peq - IFNULL(SUM(d.peq), 0) AS UNSIGNED) AS peq, 
        CAST(r.sacos - IFNULL(SUM(d.sacos), 0) AS UNSIGNED) AS sacos,
        -- Asignar resultados de las restas a variables para su uso en HAVING
        CAST(r.gde25 - IFNULL(SUM(d.gde25), 0) AS UNSIGNED) AS gde25_diff,
        CAST(r.gde24 - IFNULL(SUM(d.gde24), 0) AS UNSIGNED) AS gde24_diff,
        CAST(r.gde23 - IFNULL(SUM(d.gde23), 0) AS UNSIGNED) AS gde23_diff,
        CAST(r.gde22 - IFNULL(SUM(d.gde22), 0) AS UNSIGNED) AS gde22_diff,
        CAST(r.med - IFNULL(SUM(d.med), 0) AS UNSIGNED) AS med_diff,
        CAST(r.peq - IFNULL(SUM(d.peq), 0) AS UNSIGNED) AS peq_diff,
        CAST(r.sacos - IFNULL(SUM(d.sacos), 0) AS UNSIGNED) AS sacos_diff
      FROM 
        recepcion r
      LEFT JOIN 
        despacho d ON r.id = d.recepcion_id
      WHERE 
        r.c = ?
      GROUP BY 
        r.id, r.ncontrol, r.fechar, r.codcli, r.pe, r.lote, r.producto, r.c, r.f, r.n, r.pos
      HAVING 
        gde25_diff <> 0 OR 
        gde24_diff <> 0 OR 
        gde23_diff <> 0 OR 
        gde22_diff <> 0 OR 
        med_diff <> 0 OR 
        peq_diff <> 0 OR 
        sacos_diff <> 0;`;

    db.query(query, [cava], (err, results) => {
      if (err) {
        console.error('Error al obtener datos por cava:', err);
        return callback(err, null);
      }
      console.log('Resultados obtenidos:', results); // Línea para depuración
      callback(null, results); // Devuelve los resultados
    });
},


  

  // -------------------------------------------------------------------------------------

  // insertar datos en la tabla despacho
  create: (despachos, callback) => {
    // Verificar que el parámetro 'despachos' sea un array no vacío
    if (!Array.isArray(despachos) || despachos.length === 0) {
      return callback(new Error('No se proporcionaron datos para insertar'), null);
    }

    // Construir la consulta SQL para múltiples inserciones en la tabla despacho
    const query = `
      INSERT INTO despacho (ncontrol, codcli, fechad, pe, lote, producto, c, f, n, pos, bruto, gde25, gde24, gde23, gde22, med, peq, sacos, est, tara, neto, totcesta, bultos, unidad, recepcion_id, recepcion_ncontrol)
      VALUES ?
    `;

    // Construir los valores para la consulta
    const values = despachos.map(despacho => [
      despacho.ncontrol || null,
      despacho.codcli || null,
      despacho.fechad || null,
      despacho.pe || null,
      despacho.lote || null,
      despacho.producto || null,
      despacho.c || null,
      despacho.f || null,
      despacho.n || null,
      despacho.pos || null,
      despacho.bruto || null,
      despacho.gde25 || null,
      despacho.gde24 || null,
      despacho.gde23 || null,
      despacho.gde22 || null,
      despacho.med || null,
      despacho.peq || null,
      despacho.sacos || null,
      despacho.est || null,
      despacho.tara || null,
      despacho.neto || null,
      despacho.totcesta || null,
      despacho.bultos || null,
      despacho.unidad || null,
      despacho.recepcion_id || null,  // Nuevo campo recepcion_id
      despacho.recepcion_ncontrol || null  // Nuevo campo recepcion_ncontrol
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




module.exports = DespachoModel;
