const express = require('express');
const router = express.Router();

const {
    registrarIncidencia,
    listarIncidencias,
    buscarIncidenciaPorId,
    cambiarEstadoIncidencia,
    eliminarIncidencia,
    obtenerEstadisticas,
    clasificarIncidencia
} = require('../routes/controllerIssues');

router.post('/incidencias', registrarIncidencia);
router.get('/incidencias', listarIncidencias);
router.get('/estadisticas', obtenerEstadisticas);
router.get('/incidencias/:id', buscarIncidenciaPorId);
router.put('/incidencias/:id/estado', cambiarEstadoIncidencia);
router.delete('/incidencias/:id', eliminarIncidencia);
router.get('/incidencias/:id/clasificacion', clasificarIncidencia);

module.exports = router;