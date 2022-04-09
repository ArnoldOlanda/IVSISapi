//@ts-check

const { request, response } = require("express");
const bcryptjs = require('bcryptjs')
const Usuario = require("../models/usuario");
const Direccion = require("../models/direccion");


module.exports={
    getUser: async (req = request, res = response) => {
        //const { limite = 5, desde = 0 } = req.query;
        try {
            const data = await Usuario.listar();

            return res.json({
                data
            })
        } catch (error) {
            
        }
        
    },
    postUser: async (req = request, res = response) => {
        
        try {
            const { nombre, usuario, password, direccion } = req.body

            const salt = bcryptjs.genSaltSync()
            const password_ = bcryptjs.hashSync( password, salt )
        
            await Direccion.registrar(direccion)
            const idDireccion = await Direccion.buscar(direccion)
            await Usuario.registrar({ nombre, usuario, password_,idDireccion })

            return res.json({
                msg:"Usuario registrado"
            })

        } catch (error) {
            return res.status(400).json({
                err:"Ocurrio un error al intentar registrar al usuario hable con el administrador"
            })
        }
        
    },
    putUser: async (req = request, res = response) => {
        // const { id } = req.params
        // const { _id, password, usuario, ...resto } = req.body;

        // if ( password ) {
        //     //Encriptar el password
        //     const salt = bcryptjs.genSaltSync();
        //     resto.password = bcryptjs.hashSync( password, salt );
        // }
        // const user = Usuario.actualizar()
    },

    deleteUser: async (req = request, res = response) => {
        const { id } = req.params

        try {
            const user = await Usuario.eliminar( id )
            if(!user){
                return res.status(400).json({
                    err:"Ocurrio un error al intentar eliminar al usuario hable con el administrador"
                })
            }

            return res.json({
                msg:"Usuario eliminado"
            })
        } catch (error) {
            return res.status(400).json({
                err:"Ocurrio un error al intentar eliminar al usuario hable con el administrador"
            })
        }

    }
}