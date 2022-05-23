const { Router } = require ('express');
const { check } = require('express-validator');
const { getUser, postUser, putUser, deleteUser, putContactsUser, putNotificationToken, putJoinGroup, getListaContactos } = require('../controllers/users');

const { 
    validarCampos,
    validarJWT,
} = require('../middlewares')


const { existeUsuarioId } = require ('../helpers/dbValidator')

const router = Router();

router.get    ('/',[
    validarJWT
], getUser )

router.get('/contactos/:id',[
    check('id').custom(existeUsuarioId),
    validarCampos
],getListaContactos)

router.post   ('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('usuario','El nombre de usuario es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio y de mas de 6 letras').isLength({ min:6 }),
    check('direccion','La direccion del usuario es un campo obligatorio').not().isEmpty(),
    validarCampos //Captura todos los errores y los muestra

], postUser )

router.put('/addContact/:id',[
    check( 'id','No es un ID valido' ).isNumeric(),
    check( 'id' ).custom( existeUsuarioId ),
    validarCampos
], putContactsUser )

router.put('/updateNotificationToken',[
    check( 'id','No es un ID valido' ).isNumeric(),
    check( 'id' ).custom( existeUsuarioId ),
    check('token','El token debe ser una cadena de texto').isString(),
    validarCampos
], putNotificationToken )

router.put('/joinGroup',[
    check('usuario','No es un ID valido').isNumeric(),
    check('usuario').custom( existeUsuarioId ),
    check('grupo').isString(),
    validarCampos
],putJoinGroup)

router.delete ('/:id',[
    validarJWT,
    check( 'id','No es un ID valido' ).isNumeric(),
    check( 'id' ).custom( existeUsuarioId ),
    validarCampos
], deleteUser )

module.exports = router;