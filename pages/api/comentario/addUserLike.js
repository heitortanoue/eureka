import { connectToDatabase } from '../connect/mongoUtil';

export default async (request, response) => {
    var ObjectId = require('mongodb').ObjectId;
    const {id_comentario, id_user} = await request.body;
    const obj_id = ObjectId(id_comentario);
    const {db} = await connectToDatabase();
    const collection = db.collection('comentario');

    collection.findByIdAndUpdate(obj_id, {'$set' : { '$push': { 'pessoas_curtiram': id_user } }
    });

    return response.status(200).json({result: "Adicionou o ID na lista de pessoas que curtiram!"});
}