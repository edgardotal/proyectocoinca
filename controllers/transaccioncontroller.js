const Transaccion = require('../models/transaccionmodel');  // Asegúrate de que estás importando el modelo correctamente

exports.createTransaccion = async (req, res) => {
  try {
    const payload = req.body.total;  // Verifica que este campo es correcto y contiene un array de objetos

    if (!Array.isArray(payload)) {
      return res.status(400).json({ message: 'El payload debe ser un array de datos.' });
    }

    // Insertar cada registro del payload en la tabla totalpxlote
    const resultados = await Promise.all(
      payload.map((data) => {
        return new Promise((resolve, reject) => {
          // Limpia el campo 'producto' y otros campos si es necesario
          const transactionData = {
            fechae: data.fechae || null,
            fechas: data.fechas || null,
            lote: data.lote || null,
            producto: data.producto ? data.producto.trim() : null, // Elimina saltos de línea y espacios innecesarios
            tneto: data.tneto || 0,   // Asegúrate de manejar valores por defecto
            test: data.test || 0,
            tcestas: data.tcestas || 0,
            tgde: data.tgde || 0,
            tmed: data.tmed || 0,
            tpeq: data.tpeq || 0,
            tsacos: data.tsacos || 0
          };

          // Agregar log para revisar los datos recibidos para insertar
          console.log('Datos recibidos para insertar:', transactionData);

          Transaccion.create(transactionData, (err, result) => {
            if (err) {
              return reject(err);  // Si hay un error en la inserción, rechaza la promesa
            }
            resolve(result);
          });
        });
      })
    );

    res.status(201).json({
      message: 'Datos insertados correctamente',
      data: resultados,
    });

  } catch (error) {
    console.error('Error al insertar los datos:', error.message);  // Agrega logging para facilitar la depuración
    res.status(500).json({
      message: 'Error al insertar los datos',
      error: error.message,
    });
  }
};
