require('dotenv').config();

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const dataBaseName = 'helper-test';


MongoClient.connect(
    process.env.DB_URL_DEV,
    {useNewUrlParser: true},
    (error, client) => {
        if(error) {
            return console.log('unable to connect to DB' + error);
        }

       const db =  client.db(dataBaseName);
       db.collection('users').insertOne({
        name: 'Naveh', 
        age: 30
       });
    }
);
