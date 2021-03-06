//@ts-check

const { request, response } = require("express");
const jwt = require ('jsonwebtoken');
const Usuario = require("../models/usuario");

/**
 * 
 * @param {request} req peticion
 * @param {response} res respuesta
 * @param {function} next nextFunction
 * @returns void
 */
const validarJWT = async ( req, res, next ) =>{

    const token = req.header('access-token');

    if( !token) {
        return res.status(401).json({
            msg:'Se necesita enviar el token de auntenticacion'
        })
        
    }
    try {
        //@ts-ignore
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY )
        
        const usuario = await Usuario.buscar( uid );
        
        //Validar que el usuario exista en la base de datos
        if ( !usuario ) {
            return res.status(401).json({
                msg:'Token no valido - usuario eliminado de la BD'
            })
        }
        
        //Validar que el estado del usuario sea TRUE
        if( usuario.estado == 0 ) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no activo'
            })
        }
        //@ts-ignore
        req.autenthicatedUser = usuario,

        next();

    } catch (error) {
        console.log( error );
        res.status(401).json({
            msg:'Token invalido'
        })
    }
}

module.exports = {
    validarJWT
}