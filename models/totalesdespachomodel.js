const db = require('../config/db'); // Asegúrate de que la ruta sea correcta

const TotalesModeld = {
  create: (ncontrol, codcli, fechad, totalBruto, totalTara, totalNeto, tcg25, tcg24, tcg23, tcg22, tcm, tcp, tsacos, testiba, tcestas, tbultos, tunidad, callback) => {
    if (!codcli || !fechad) {
      return callback(new Error('Los campos codcli y fechar son requeridos'), null);
    }

    const query = `
      INSERT INTO totales (ncontrol, codcli, fechad, totalBruto, totalTara, totalNeto, tcg25, tcg24, tcg23, tcg22, tcm, tcp, tsacos, testiba, tcestas, tbultos, tunidad)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      ncontrol,
      codcli,
      fechad,
      totalBruto,
      totalTara,
      totalNeto,
      tcg25,
      tcg24,
      tcg23,
      tcg22,
      tcm,
      tcp,
      tsacos,
      testiba,
      tcestas,
      tbultos,
      tunidad
    ];

    // Mostrar la consulta y valores para depuración
    console.log('Consulta:', query);
    console.log('Valores:', values);

    db.query(query, values, (err, results) => {
      if (err) {
        console.error('Error al insertar totales:', err.message);
        return callback(new Error('Error al insertar los datos de totales'), null);
      }
      callback(null, results);
    });
  }
};

module.exports = TotalesModeld;
