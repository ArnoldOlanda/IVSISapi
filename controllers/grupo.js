//@ts-check

const { request, response } = require("express");
const bcryptjs = require('bcryptjs')
const Grupo = require("../models/grupo");
const Contacto = require("../models/contacto");



module.exports={
    getGrupos: async (req = request, res = response) => {

        const { id } = req.params;

        try {
            const data = await Grupo.listar(parseInt(id));

            return res.json({
                data
            })
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                err:'Ocurrio un error consulte con el administrador'
            })
        }
        
    },
    getFindGrupoByQuery:async (req = request, res = response)=>{
        const { query } = req.params
        try {
            const data = await Grupo.query( query );

            return res.json({
                data
            })
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                err:'Ocurrio un error consulte con el administrador'
            })
        }
    },
    postGrupo: async (req = request, res = response) => {
        
        try {
            const { nombre, password, maxUser, idAdmin, contactos } = req.body

            //Encriptado del password
            const salt = bcryptjs.genSaltSync()
            const password_ = bcryptjs.hashSync( password, salt )
        
            //@ts-ignore
            const { insertId } = await Grupo.registrar({ nombre, password_ , maxUser, idAdmin })
            
            if(!(contactos.length < 1)){ //Registramos la lista de contactos en caso no este vacia 
                contactos.forEach( async ( element ) => {
                    await Contacto.registrar({ 
                        nombre:element.nombre,
                        numero:element.numero,
                        para:'grupo',
                        id:parseInt( insertId )
                    });
                });
            }

            return res.json({
                msg:"Grupo registrado"
            })

        } catch (error) {

            console.log(error);

            return res.status(400).json({
                err:"Ocurrio un error al intentar registrar el grupo hable con el administrador"
            })
        }
        
    },
    putGrupo: async (req = request, res = response) => {
        // const { id } = req.params
        // const { _id, password, usuario, ...resto } = req.body;

        // if ( password ) {
        //     //Encriptar el password
        //     const salt = bcryptjs.genSaltSync();
        //     resto.password = bcryptjs.hashSync( password, salt );
        // }
        // const user = Usuario.actualizar()
    },

    deleteGrupo: async (req = request, res = response) => {
        const { id } = req.params

        try {
            const grupo = await Grupo.eliminar( id )
            if(!grupo){
                return res.status(400).json({
                    err:"Ocurrio un error al intentar eliminar al usuario hable con el administrador"
                })
            }

            return res.json({
                msg:"Grupo eliminado"
            })
        } catch (error) {
            return res.status(400).json({
                err:"Ocurrio un error al intentar eliminar al usuario hable con el administrador"
            })
        }

    }
    
}