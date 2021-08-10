import { connectToDatabase } from '../connect/mongoUtil';

export default async (request, response) => {
    var ObjectId = require('mongodb').ObjectId;
    const {id} = request.body
    const {db} = await connectToDatabase();
    const collection = db.collection('pergunta');

    collection.remove({"_id": ObjectId(id)});

    return response.status(201).json({result: "Pergunta deletada com sucesso!" })

}