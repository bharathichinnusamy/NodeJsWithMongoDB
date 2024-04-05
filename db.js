const mongodb = require("mongodb")
const mongoClient = mongodb.MongoClient
const objectID = mongodb.ObjectId
let database
async function getDatabase() {
    const client = await mongoClient.connect('mongodb+srv://Cluster95503:RlRlTFtPVU5t@cluster95503.owfrw0u.mongodb.net',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    database = client.db('library')

    if (!database) {
        console.log("database not connected")

    }
    return database

}
module.exports = {
    getDatabase, objectID
}
