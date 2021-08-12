import { connectToDatabase } from '../connect/mongoUtil';

export default async (request, response) => {
    var ObjectId = require('mongodb').ObjectId;
    const {id} = request.body
    const {db} = await connectToDatabase();
    const collection = db.collection('pergunta');
    const collectionComentario = db.collection('comentario');
    const collectionRespComen = db.collection('resposta_comentario');

    //Pega todos comentários da pergunta
    const comenPergunta = await collectionComentario.find({'id_pergunta': id}, {'_id': 1}).toArray();

    //Apagar resposta e dps o comentarios pergunta
    for (const quest of comenPergunta) {
        const obj_id = ObjectId(quest._id);
        await collectionRespComen.remove({'id_comentario': quest._id});
        await collectionComentario.remove({'_id': obj_id});
    }

    //Apaga a pergunta
    collection.remove({"_id": ObjectId(id)});

    return response.status(201).json({result: "Pergunta deletada com sucesso!" })

}