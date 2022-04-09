const { Router } = require ('express');
const { check } = require('express-validator');
const { getUser, postUser, putUser, deleteUser } = require('../controllers/users');

const { 
    validarCampos,
    validarJWT,
} = require('../middlewares')


const { esRolValido, existeUsuarioId } = require ('../helpers/dbValidator')

const router = Router();

router.get    ('/',[
    validarJWT
], getUser )

router.post   ('/',[
    
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('usuario','El nombre de usuario es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio y de mas de 6 letras').isLength({ min:6 }),
    check('direccion','La direccion del usuario es un campo obligatorio').not().isEmpty(),
    //check('correo').custom( emailExiste ),
    // check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    //check('rol').custom( esRolValido ), 
    validarCampos //Captura todos los errores y los muestra

], postUser )

router.put    ('/:id',[
    check( 'id','No es un ID valido' ).isNumeric(),
    check( 'id' ).custom( existeUsuarioId ),
    validarCampos
], putUser )

router.delete ('/:id',
    validarJWT,
    //esAdminRol,
    check( 'id','No es un ID valido' ).isNumeric(),
    check( 'id' ).custom( existeUsuarioId ),
    validarCampos
    , deleteUser )

module.exports = router;