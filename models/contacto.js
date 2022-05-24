const { query } = require("../database/config")

module.exports = class {
    static async registrar(data = {}){
        try {
            const { nombre, numero, para, id } = data

            const rows = await query(`insert into contactos( nombre, numero ) values ( "${ nombre }", "${ numero }");`);

            if(para === 'usuario') {
                console.log("usuario");
                this.vinculaContactoUsuario(id, rows)
            }else {
                console.log("grupo");
                this.vinculaContactoGrupo(id, rows)
            }

            return true;

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

    static async listarContactosUsuario( id ){
        try {
            const rows = await query(`select c.id, c.nombre, c.numero from contactos c 
            inner join contactos_usuario cu on cu.id_contacto = c.id
            where cu.id_usuario=${ id }`)
            
            return rows
        } catch (error) {
            console.log(error);
            throw error 
        }
    }

    static async listarContactosGrupo( id ){
        try {
            const rows = await query(`select c.nombre, c.numero from contactos c 
            inner join contactos_grupo cg on cu.id_contacto = c.id
            where cu.id_grupo = ${ id }`)

            return rows
        } catch (error) {
            console.log(error);
            throw error 
        }
    }

    static async actualizar(data={}){

        const { nombre, numero, id } = data

        try {
            const rows = await query(`update contactos set nombre="${ nombre }",numero="${ numero }" where id=${ parseInt(id) }`);

            return rows;

        } catch (error) {
            
            console.log(error);
            throw error;

        }
    }

    static async eliminar(id){
        try {

            const rows = await query(`delete from contactos where id=${ id }`)
            return rows;

        } catch (error) {
            
            console.log(error);
            return false;
        
        }
    }

    static async buscar(id){
        try {
            
            const [ contacto ] = await query(`select * from contactos where id=${ id }`);
            
            return contacto;

        } catch (error) {

            console.log(error);
            throw error;

        }
    }

    static async vinculaContactoUsuario (id, rows) {
        const { insertId } = rows
        try {
            await query(`insert into contactos_usuario (id_usuario,id_contacto) values(${ parseInt(id) }, ${ parseInt(insertId) })`)

            return true;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async vinculaContactoGrupo (id, rows) {
        const { insertId } = rows
        try {
            await query(`insert into contactos_grupo (id_grupo,id_contacto) values(${ parseInt(id) }, ${ parseInt(insertId) })`)

            return true;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}