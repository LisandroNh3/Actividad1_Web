const { esTextoValido } = require('../utils/helpers');

let incidencias = [];
let idCounter = 1;

const registrarIncidencia = (req, res) => {
    try {
        const { empleado, area, descripcion, prioridad } = req.body;

        if (!esTextoValido(empleado) || !esTextoValido(area) || !esTextoValido(descripcion) || !esTextoValido(prioridad)) {
            return res.status(400).json({ error: "Todos los campos son obligatorios y no pueden estar vacíos" });
        }

        const prioridadLimpia = prioridad.trim();
        const prioridadesValidas = ["Alta", "Media", "Baja"];

        if (!prioridadesValidas.includes(prioridadLimpia)) {
            return res.status(400).json({ error: "La prioridad solo puede ser: Alta, Media o Baja" });
        }

        const nuevaIncidencia = {
            id: idCounter++,
            empleado: empleado.trim(),
            area: area.trim(),
            descripcion: descripcion.trim(),
            prioridad: prioridadLimpia,
            estado: "Pendiente" // Estado por defecto
        };

        incidencias.push(nuevaIncidencia); // Uso de push()

        return res.status(201).json({
            mensaje: "Incidencia registrada correctamente"
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const listarIncidencias = (req, res) => {
    return res.json(incidencias);
};

const buscarIncidenciaPorId = (req, res) => {
    const id = Number(req.params.id);
    
    const incidencia = incidencias.find(inc => inc.id === id);

    if (!incidencia) {
        return res.status(404).json({ mensaje: "Incidencia no encontrada" });
    }

    return res.json(incidencia);
};

const cambiarEstadoIncidencia = (req, res) => {
    const id = Number(req.params.id);
    const { estado } = req.body;

    const incidencia = incidencias.find(inc => inc.id === id);
    if (!incidencia) {
        return res.status(404).json({ mensaje: "Incidencia no encontrada" });
    }

    if (!esTextoValido(estado)) {
        return res.status(400).json({ error: "El estado es obligatorio" });
    }

    const estadoLimpio = estado.trim();

    switch (estadoLimpio) {
        case "Pendiente":
        case "En Proceso":
        case "Resuelta":
        case "Cancelada":
            incidencia.estado = estadoLimpio;
            return res.json({ mensaje: "Estado actualizado correctamente", incidencia });
        default:
            return res.status(400).json({ 
                error: "Estado no válido. Estados permitidos: Pendiente, En Proceso, Resuelta, Cancelada" 
            });
    }
};

const eliminarIncidencia = (req, res) => {
    const id = Number(req.params.id);

    const index = incidencias.findIndex(inc => inc.id === id);

    if (index === -1) {
        return res.status(404).json({ mensaje: "Incidencia no encontrada" });
    }

    incidencias.splice(index, 1);

    return res.json({ mensaje: "Incidencia eliminada correctamente" });
};

const obtenerEstadisticas = (req, res) => {
    const estadisticas = {
        totalIncidencias: incidencias.length,
        pendientes: incidencias.filter(inc => inc.estado === "Pendiente").length,
        enProceso: incidencias.filter(inc => inc.estado === "En Proceso").length,
        resueltas: incidencias.filter(inc => inc.estado === "Resuelta").length,
        canceladas: incidencias.filter(inc => inc.estado === "Cancelada").length
    };

    return res.json(estadisticas);
};

const clasificarIncidencia = (req, res) => {
    const id = Number(req.params.id);
    const incidencia = incidencias.find(inc => inc.id === id);

    if (!incidencia) {
        return res.status(404).json({ mensaje: "Incidencia no encontrada" });
    }

    let clasificacion = "";

    switch (incidencia.prioridad) {
        case "Alta":
            clasificacion = "Critica";
            break;
        case "Media":
            clasificacion = "Importante";
            break;
        case "Baja":
            clasificacion = "Normal";
            break;
        default:
            clasificacion = "Normal";
            break;
    }

    return res.json({
        id: incidencia.id,
        clasificacion: clasificacion
    });
};

module.exports = {
    registrarIncidencia,
    listarIncidencias,
    buscarIncidenciaPorId,
    cambiarEstadoIncidencia,
    eliminarIncidencia,
    obtenerEstadisticas,
    clasificarIncidencia
};