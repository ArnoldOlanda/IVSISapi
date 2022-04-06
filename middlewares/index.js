

const validarCampos = require ('../middlewares/validarCampos');
const validarRol    = require ('../middlewares/validarRol');
const validarJWT    = require ('../middlewares/validarJWT');

module.exports = {
    ...validarCampos,
    ...validarRol,
    ...validarJWT,
}

