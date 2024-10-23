const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); // Importa morgan
const app = express();
const port = 3000;

// Importa las rutas
const productoRoutes = require('./routes/productoRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const numeroControlRoutes = require('./routes/numeroControlRoutes');
const dataRecepcionRoutes = require('./routes/datarecepcionroutes'); // Importa las rutas de DataRecepcion
const dataTotalesRoutes = require('./routes/datatotalesroutes'); // Esto debe apuntar al archivo correcto
const cavaPosicionesRoutes = require('./routes/cavaPosicionesRoutes');
const despachoroutes = require('./routes/despachoroutes');
const totalesDespachoRoutes = require('./routes/totalesdespachoroutes'); // Importa la nueva ruta de totales despacho
const transactionRoutes = require('./routes/transaccionroutes');

app.use(cors());
app.use(express.json()); // Asegúrate de que esto esté antes de tus rutas

// Configuración de morgan para registrar las solicitudes HTTP
app.use(morgan('combined')); // Puedes usar 'tiny', 'common', 'combined', etc.

// Usa las rutas
app.use('/api', numeroControlRoutes);
app.use('/api', clienteRoutes);
app.use('/api', productoRoutes);
app.use('/api', dataRecepcionRoutes); 
app.use('/api', dataTotalesRoutes); 
app.use('/api', cavaPosicionesRoutes);
app.use('/api', despachoroutes);
app.use('/api', totalesDespachoRoutes); 
app.use('/api', transactionRoutes);  // Nueva ruta para transacciones

// Middleware para registrar todas las peticiones a las rutas
app.use((req, res, next) => {
  console.log(`Petición a la ruta: ${req.url}`);
  next();
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
