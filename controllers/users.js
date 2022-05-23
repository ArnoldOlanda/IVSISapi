let admin = require('firebase-admin');

const { request, response } = require("express");
const bcryptjs = require('bcryptjs')
const Usuario = require("../models/usuario");
const Direccion = require("../models/direccion");
const Contacto = require("../models/contacto");
const Grupo = require("../models/grupo");


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

    },

    putContactsUser : async (req = request, res = response) => {
        const { id } = req.params
        const { nombre, numero } = req.body
        
        try {

            await Contacto.registrar({
                nombre,
                numero,
                para:'usuario',
                id
            });

            res.json({
                msg:"Contacto registrado"
            })
        } catch (error) {
            return res.status(400).json({
                err:"Ocurrio un error hable con el administrador"
            })
        }
    },

    putNotificationToken : async (req = request, res = response) => {
        const { id, token } = req.body
        
        try {
            await Usuario.actualizarNotificacionToken(id,token)
            res.json({
                msg:"Token de notificacion actualizado"
            })
        } catch (error) {
            return res.status(400).json({
                err:"Ocurrio un error hable con el administrador"
            }) 
        }
    },
    putJoinGroup: async ( req = request, res = response ) => {

        const { usuario, grupo, password } = req.body
        
        try {
            
            const userDb = await Usuario.buscar(usuario)
            const grupoDb = await Grupo.query(grupo);
            console.log(userDb);
            const passwordValido = await bcryptjs.compare(password,grupoDb.password_)

            if(passwordValido){

                const rows = await Usuario.ingresarGrupo(usuario,grupoDb.id);
                
                const {notif_token} = rows[0]
                console.log();
                if (notif_token != null) {
                    const message = {
                        //tokens: [''],
                        notification: {
                          body: userDb.nombre_completo + ' ingreso al grupo que administras',
                          title: 'Ivsis App',
                        },
                        apns: {
                          payload: {
                            aps: { 'mutable-content': 1 },
                          },
                          fcm_options: { image: 'image-url' },
                        },
                        android: {
                          notification: { image: 'image-url' },
                        },
                        token:notif_token
                      };
            
                    await admin.messaging()
                    //@ts-ignore
                    .send(message)    
                    .then(response=>{
                        console.log("mensaje enviado");
                    })
                    .catch(console.log)
                }
                
                return res.json({
                    msg:"Operacion exitosa"
                })
            }
            res.status(400).json({
                err:"El password no es valido"
            })
            
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                err:"Ocurrio un error hable con el administrador"
            }) 
        }
    }
}