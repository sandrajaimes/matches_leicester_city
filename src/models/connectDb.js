require('dotenv').config();
const mongoose = require("mongoose");

// Connection URL
const url = 'mongodb://localhost:27017';

// Use connect method to connect to the server
const connect = async function(){
    try{
        let connectionOk = await mongoose.connect(url, {
            dbName:process.env.DB_NAME,
            useUnifiedTopology: true,
            useNewUrlParser:true,
            user:process.env.DB_USER,
            pass:process.env.DB_PASSWORD
        });
        console.log("Conectado a la BD");
        return connectionOk;
    }catch (e) {
        console.log("Fallo la conexion a la BD: ", e);
    }
};

const disconnect = async function(){
    try{
        await mongoose.disconnect(() => {
            console.log('connection is ended');
        });
    }catch (e) {
        console.log("Fallo la conexion a la BD: ", e);
    }
};

module.exports = {
    connect,
    disconnect
};
