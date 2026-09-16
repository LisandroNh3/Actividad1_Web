const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const incidenciasRoutes = require('./routes/issues');
app.use('/', incidenciasRoutes);


app.get('/', (req, res) => {
    res.send('API de TechSupport S.A. funcionando correctamente.');
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});