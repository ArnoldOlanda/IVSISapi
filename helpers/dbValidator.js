//@ts-check
const Categoria = require('../models/categoria');
const Producto = require('../models/producto');
const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async ( rol = '' ) =>{

    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) throw new Error (`El rol ${ rol } no esta registrado en la base de datos`);
}

//Validar correo si existe
const emailExiste = async( correo = '' )=>{
    
    const existe = await Usuario.findOne({ correo })
    if( existe ) throw new Error (`El correo ${ correo } ya esta registrado por otro usuario`) 
}

//Validar usuario si no existe
const existeUsuarioId = async( id )=>{
    
    const existe = await Usuario.findById( id )
    if( !existe ) throw new Error (`No existe el usuario con id : ${ id }.`) 
} 

//Validar categoria si no existe
const existeCategoriaId = async( id )=>{
    
    const existe = await Categoria.findById( id )
    if( !existe ) throw new Error (`No existe la categoria con id : ${ id }.`) 
} 

//Validar categoria si no existe
const existeProductoId = async( id )=>{
    
    const existe = await Producto.findById( id )
    if( !existe ) throw new Error (`No existe el producto con id : ${ id }.`) 
} 

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioId,
    existeCategoriaId,
    existeProductoId
}