const { MongoClient } = require('mongodb')

let connection

async function connectDB() {

    if(connection) return connection;

    let client

    try {

        client = await MongoClient.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        connection = client.db('cafeDB')

    } catch (error) {
        console.log(error);
        throw new Error('Error inicializando la base de datos')
    }

    return connection;

}

module.exports = connectDB;