
const esTextoValido = (texto) => {
    return typeof texto === 'string' && texto.trim().length > 0;
};

module.exports = {
    esTextoValido
};
