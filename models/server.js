//@ts-check
const express = require('express')
const cors = require('cors');
const routerAuth = require('../routes/auth');
const routerUser = require('../routes/users');
const routerGrupos = require('../routes/grupo');
class Server{
    
    app;
    port;
    userPaths;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 5000;
        this.indexPath = '/api';
        this.userPaths = '/api/usuarios';
        this.authPath = '/api/auth';
        this.grupoPath = '/api/grupo';
        
        //Middlewares
        this.middlewares();
        
        //Routes
        this.routes();
    }

    middlewares(){
        //Cors
        this.app.use( cors() )

        this.app.use( express.json() )
        
        //Public folder
        this.app.use(express.static( "public" ))
        
    }

    routes(){
        this.app.get(this.indexPath, (req,res)=>{
            res.json({msg:"IVSI APP api - conected!"})
        })
        this.app.use(this.authPath, routerAuth )
        this.app.use(this.userPaths, routerUser )
        this.app.use(this.grupoPath, routerGrupos )
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Servidor corriendo en el puerto ${ this.port }`);
        })
    }
}

module.exports = Server;