const TotalesModel = require('../models/datatotalesmodel'); // Asegúrate de que la ruta sea correcta

// Controlador para guardar los totales
const guardarTotales = async (req, res) => {
  try {
    const { ncontrol, codcli, fechar , totalBruto, totalTara, totalNeto, tcg25, tcg24, tcg23, tcg22, tcm, tcp, tsacos, testiba, tcestas, tbultos, tunidad} = req.body;

    

    // Verificación de datos obligatorios
    if (!ncontrol || !codcli || !fechar) {
      return res.status(400).json({ error: 'Faltan datos obligatorios: ncontrol, codcli o fechar' });
    }

    // Llamar directamente a la función de creación sin totalesData
    TotalesModel.create(ncontrol, codcli, fechar, totalBruto , totalTara, totalNeto, tcg25, tcg24, tcg23, tcg22, tcm, tcp, tsacos, testiba, tcestas, tbultos, tunidad, (error, results) => {
      if (error) {
        console.error('Error al guardar los totales:', error);
        return res.status(500).json({ error: 'Error al guardar los totales' });
      }
      res.status(201).json({ message: 'Totales guardados con éxito' });
    });
  } catch (error) {
    console.error('Error al guardar los totales:', error);
    res.status(500).json({ error: 'Error al guardar los totales' });
  }
};

module.exports = {
  guardarTotales
};
