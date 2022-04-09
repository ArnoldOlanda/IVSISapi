//@ts-check
const mysql = require ('mysql2/promise');

const config = {
    host:"localhost",
    user:"root",
    database:"ivsis",
    password:"admin123"
}

const query = async (queryString = "select 1 + 1 ") =>{
   const connection = await mysql.createConnection(config)
   const [rows] = await connection.execute(queryString)
   
   connection.end();
   return rows
}

module.exports = {
    query
} 