const mongoose = require('mongoose');

const getConnection = async () => {
    try{
        console.log('Initializing database');
    await mongoose.connect('mongodb://user_20:LAoA89ziRhCdrayB@cluster0-shard-00-00.krted.mongodb.net:27017,cluster0-shard-00-01.krted.mongodb.net:27017,cluster0-shard-00-02.krted.mongodb.net:27017/Daniela-Inventario?ssl=true&replicaSet=atlas-c1za7l-shard-0&authSource=admin&retryWrites=true&w=majority');
    console.log('Successful connection');
    }catch(error){
        console.log('Failed connection to database');
    }
}

module.exports = {
    getConnection
}