//@ts-check
const Usuario = require('../models/usuario');


//Validar correo si existe
const emailExiste = async( correo = '' )=>{
    
    // const existe = await Usuario.findOne({ correo })
    // if( existe ) throw new Error (`El correo ${ correo } ya esta registrado por otro usuario`) 
}

//Validar usuario si no existe
const existeUsuarioId = async( id = 0 )=>{
    
    const existe = await Usuario.buscar( id )
    if( !existe ) throw new Error (`No existe el usuario con id : ${ id }.`) 
} 

module.exports = {
    emailExiste,
    existeUsuarioId,
}