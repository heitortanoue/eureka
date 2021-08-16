import { connectToDatabase } from '../connect/mongoUtil';

const deletarPergunta = async (request, response) => {
    var ObjectId = require('mongodb').ObjectId;
    const {id} = request.body
    const {db} = await connectToDatabase();
    const collection = db.collection('pergunta');
    const collectionComentario = db.collection('comentario');
    const collectionRespComen = db.collection('resposta_comentario');

    //Pega todos comentários da pergunta
    const comenPergunta = await collectionComentario.find({'id_pergunta': id}, {projection: {_id: true}}).toArray();

    //Apagar resposta e dps o comentarios pergunta
    for (const comment of comenPergunta) {
        const obj_id = ObjectId(comment._id);
        await collectionRespComen.deleteMany({'id_comentario': comment._id.toString()});
        await collectionComentario.deleteOne({'_id': obj_id});
    }

    //Apaga a pergunta
    collection.deleteOne({"_id": ObjectId(id)});

    return response.status(200).json({result: "Pergunta deletada com sucesso!" })
}

export default deletarPergunta