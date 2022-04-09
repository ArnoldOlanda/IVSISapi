const { query } = require("../database/config")

module.exports = class {
    static async registrar(data = {}){
        try {
            const {nombre, usuario, password_, idDireccion} = data
            await query(`
                insert into usuario (nombre_completo,nombre_usuario,password_,id_direccion) 
                values ("${ nombre }","${ usuario }","${ password_ }",${ parseInt(idDireccion) })`)

            return true
        } catch (error) {
           console.log(error);
           throw error  
        }
    }

    static async listar(){
        try {
            const rows = await query("select * from usuario")

            return rows
        } catch (error) {
            console.log(error);
            throw error   
        }
    }

    // static async actualizar(data={}){
    //     try {
    //         const {} = data
    //     } catch (error) {
            
    //     }
    // }

    static async eliminar(id){
        try {
            await query(`update usuario set estado=0 where id=${ id }`)
            return true
        } catch (error) {
            console.log(error);
            return false
        }
    }

    static async buscar(id){
        try {
            const [ usuario ] = await query(`select id from usuario where id=${ id }`);
            return usuario
        } catch (error) {
            
        }
    }
}