import { MongoClient } from "mongodb"
import url from "url"

let cachedDb = null
let cachedClient = null

async function connectToDatabase(uri) {
    if (cachedDb && cachedClient && cachedClient.isConnected()) {
        return [cachedDb, cachedClient]
    }

    const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    const dbName = url.parse(uri).pathname.substr(1)
    const db = client.db(dbName)
    cachedClient = client
    cachedDb = db
    console.log('MDB connected');
    return [db, client]
}

export default async (request, response) => {
    const { email, senha, nome, username, faculdade, dataNasc } = request.body
    const db = await connectToDatabase("mongodb+srv://eurekaadm:BLHT_eureka@eurekacluster.qv7ob.mongodb.net/Eureka")
    const collection = db[0].collection('usuario')

    if (email) {
        let data = {}
        data.email = email
        data.senha = senha
        data.nome = nome
        data.username = username
        data.faculdade = faculdade
        data.dataNasc = dataNasc
        await collection.insertOne(data)
        console.log('MDB postFirst');
    }

    return response.status(201).json({resultado: `Operação realizada com sucesso!` })
}