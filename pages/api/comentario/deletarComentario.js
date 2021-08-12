import { connectToDatabase } from '../connect/mongoUtil';

export default async (request, response) => {
    var ObjectId = require('mongodb').ObjectId;
    const {id} = request.body
    const {db} = await connectToDatabase();
    const collectionComen = db.collection('comentario');

    //deletar as resp do comen antes
    const collectionResp = db.collection('resposta_comentario');
    collectionResp.remove({"id_comentario": id});

    //Deletar comentarios
    collectionComen.remove({"_id": ObjectId(id)});

    return response.status(201).json({result: "Comentário deletado com sucesso!" })

}