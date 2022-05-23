const Server = require("./models/server");
const { initializeApp } = require("firebase-admin/app");
var admin = require("firebase-admin");
var serviceAccount = require("./ivsisapp-rn-firebase-adminsdk-e9evq-28b3b35b11.json");

require('dotenv').config();


initializeApp({
    credential:admin.credential.cert(serviceAccount)
});

const server = new Server();

server.listen();