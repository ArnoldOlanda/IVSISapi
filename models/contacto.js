const { query } = require("../database/config")

module.exports = class {
    static async registrar(data = {}){
        try {
            const { nombre, numero, idGrupo } = data
            await query(`
                insert into contactos_grupo(id_grupo, nombre, numero ) 
                values ( ${ idGrupo }, "${ nombre }", "${ numero }");`);

            return true
        } catch (error) {
           console.log(error);
           throw error  
        }
    }

    static async listar(id = 0){
        try {
            const rows = await query(`select * from contactos_grupo where id_grupo=${ id };`)

            return rows
        } catch (error) {
            console.log(error);
            throw error   
        }
    }

    static async actualizar(data={}){

        const { nombre, numero, idGrupo } = data

        try {
            await query(`update contactos_grupo set nombre="${ nombre }",numero="${ numero }" where id=${parseInt(idGrupo)}`);
            return true;

        } catch (error) {
            
            console.log(error);
            throw error;

        }
    }

    static async eliminar(id){
        try {

            await query(`delete from contactos_grupo where id=${ id }`)
            return true;

        } catch (error) {
            
            console.log(error);
            return false;
        
        }
    }

    static async buscar(id){
        try {
            const [ contacto ] = await query(`select * from grupos where id=${ id }`);
            return contacto;

        } catch (error) {

            console.log(error);
            throw error;

        }
    }
}