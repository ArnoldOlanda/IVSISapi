const { query } = require("../database/config")

module.exports = class {
    static async registrar(data = {}){
        try {
            const {nombre, usuario, password_, idDireccion} = data
            const rows = await query(`
                insert into usuario (nombre_completo,nombre_usuario,password_,id_direccion) 
                values ("${ nombre }","${ usuario }","${ password_ }",${ parseInt(idDireccion) })`)

            return rows
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

    static async actualizarNotificacionToken(id, token){
        try {
            const rows = await query(`update usuario set notif_token="${ token }" where id=${id}`);
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
            const [ usuario ] = await query(`select id,nombre_completo from usuario where id=${ id }`);
            return usuario
        } catch (error) {
            console.log(error);
            return false
        }
    }

    static async ingresarGrupo( usuario, grupo ){
        try {
            await query(`update usuario set id_grupo=${ grupo } where id=${ usuario }`)
            const rows = await query(`select u.notif_token from usuario u inner join grupos g on g.id_admin=u.id where g.id=${grupo}`)
            return rows
        } catch (error) {
            console.log(error);
            return false
        }
    }
}