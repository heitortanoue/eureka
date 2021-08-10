import { connectToDatabase } from '../connect/mongoUtil';

export default async (request, response) => {
    var ObjectId = require('mongodb').ObjectId;
    const {id_comentario} = await request.body;
    const obj_id = ObjectId(id_comentario);
    const {db} = await connectToDatabase();
    const collection = db.collection('comentario');

    collection.findByIdAndUpdate(obj_id, {'$set' : {
        $inc : {'qtd_reacao' : 1}
    }});

    return response.status(201).json({result: "Curtiu o comentário sucesso!"});
}