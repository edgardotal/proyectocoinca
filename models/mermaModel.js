const db = require('../config/db'); // Asegúrate de que esta ruta es correcta

const MermaModel = {
  getMerma: (cava, callback) => {
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
        ROUND(r.bruto - IFNULL(SUM(d.bruto), 2), 2) AS bruto, -- Mantener decimales en bruto
        CAST(r.gde25 - IFNULL(SUM(d.gde25), 0) AS UNSIGNED) AS gde25, -- Convertir a entero gde25
        CAST(r.gde24 - IFNULL(SUM(d.gde24), 0) AS UNSIGNED) AS gde24, -- Convertir a entero gde24
        CAST(r.gde23 - IFNULL(SUM(d.gde23), 0) AS UNSIGNED) AS gde23, -- Convertir a entero gde23
        CAST(r.gde22 - IFNULL(SUM(d.gde22), 0) AS UNSIGNED) AS gde22, -- Convertir a entero gde22
        CAST(r.med - IFNULL(SUM(d.med), 0) AS UNSIGNED) AS med, -- Convertir a entero med
        CAST(r.peq - IFNULL(SUM(d.peq), 0) AS UNSIGNED) AS peq, -- Convertir a entero peq
        CAST(r.sacos - IFNULL(SUM(d.sacos), 0) AS UNSIGNED) AS sacos -- Convertir a entero sacos
      FROM 
        recepcion r
      LEFT JOIN 
        despacho d ON r.id = d.recepcion_id
      WHERE 
        r.c = ?
      GROUP BY 
        r.id, r.ncontrol, r.fechar, r.codcli, r.pe, r.lote, r.producto, r.c, r.f, r.n, r.pos
      HAVING 
        (gde25 + gde24 + gde23 + gde22 + med + peq + sacos) > 0`; // Excluir registros con todos esos campos en 0

    db.query(query, [cava], (err, results) => {
      if (err) {
        console.error('Error al obtener datos por cava:', err);
        return callback(err, null);
      }
      console.log('Resultados obtenidos:', results);
      callback(null, results);
    });
  },
};

module.exports = MermaModel;
