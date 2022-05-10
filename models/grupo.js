const { query } = require("../database/config")

module.exports = class {
    static async registrar(data = {}){
        try {
            const {nombre, password_, maxUser, idAdmin } = data
            await query(`
                insert into grupos (nombre,  password_, usuarios_max, id_admin) 
                values ("${ nombre }","${ password_ }",${ maxUser },${ idAdmin });`)

            return true
        } catch (error) {
           console.log(error);
           throw error  
        }
    }

    static async listar(id = 0){
        try {
            const rows = await query(`select * from grupos where id_admin=${ id };`)

            return rows
        } catch (error) {
            console.log(error);
            throw error   
        }
    }

    static async actualizar(data={}){

        const { nombre, password, maxUser, id } = data

        try {
            await query(`update grupos set nombre="${ nombre }",password_="${ password }",usuarios_max=${parseInt(maxUser)}
            where id=${parseInt(id)}`);

            return true;
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    static async eliminar(id){
        try {
            await query(`delete from grupos where id=${ id }`)
            return true
        } catch (error) {
            console.log(error);
            return false
        }
    }

    static async buscar(id){
        try {
            const [ grupo ] = await query(`select * from grupos where id=${ id }`);
            return grupo
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    static async query (queryString = '' ){
        try {
            const [ grupo ] = await query(`select * from grupos where nombre like "%${queryString}%"`);

            return grupo
        } catch (error) {
            console.log(error);
            throw error
        }
    }
}