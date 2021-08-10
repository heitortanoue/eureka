import { connectToDatabase } from '../connect/mongoUtil';

export default async (request, response) => {
    var ObjectId = require('mongodb').ObjectId;
    const {id_resp_comentario} = await request.body;
    const obj_id = ObjectId(id_resp_comentario);
    const {db} = await connectToDatabase();
    const collection = db.collection('resposta_comentario');

    collection.findByIdAndUpdate(obj_id, {'$set' : {
        $inc : {'qtd_reacao' : 1}
    }});

    return response.status(201).json({result: "Curtiu a resposta do comentário sucesso!"});
}