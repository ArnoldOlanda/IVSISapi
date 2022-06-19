const { Router } = require ('express');
const { check } = require('express-validator');
const { getGrupos,postGrupo,deleteGrupo, getFindGrupoByQuery, putGrupo } = require('../controllers/grupo');
const { existeGrupoId } = require('../helpers/dbValidator');

const { 
    validarCampos,
    validarJWT,
} = require('../middlewares')



const router = Router();

router.get    ('/:id', getGrupos );

router.get('/query/:query',getFindGrupoByQuery)

router.post   ('/',[
    
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio y de mas de 6 letras').isLength({ min:6 }),
    check('maxUser','EL numero maximo de miembros debe ser numerico').isNumeric(),
    check('idAdmin','El campo es obligatorio').not().isEmpty(),
    check('idAdmin','El valor tiene que ser numerico').isNumeric(),
    check('contactos','Este campo debe ser un array de objetos').isArray(),
    validarCampos //Captura todos los errores y los muestra

], postGrupo )

router.put    ('/:id',[
    check( 'id','No es un ID valido' ).isNumeric(),
    check( 'id' ).custom( existeGrupoId ),
    validarCampos
], putGrupo )

router.delete ('/:id',
    check( 'id','No es un ID valido' ).isNumeric(),
    check( 'id' ).custom( existeGrupoId ),
    validarCampos
    , deleteGrupo )

module.exports = router;