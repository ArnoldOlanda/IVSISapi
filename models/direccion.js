
const { query } = require("../database/config")

module.exports = class{
    static async registrar( direccion = ''){
        try {
            await query(`insert into direcciones (direccion) values ("${ direccion }")`);
            return "Registrado"
        } catch (error) {
            console.log(error);
            return
        }
    }

    static async buscar( direccion = ''){ //devuelve el id de una direccion
        try {
            const [rows] = await query(`select id from direcciones where direccion = "${ direccion }"`)
            const { id } = rows
            return id
        } catch (error) {
            console.log(error);
            return
        }
    }
}