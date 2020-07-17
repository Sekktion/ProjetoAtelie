const { MongoClient, ObjectID, ResumeToken } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'projeto-atelie'

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)
})