import { connectToDatabase } from '../connect/mongoUtil';

export default async (request, response) => {
    var ObjectId = require('mongodb').ObjectId;
    const {id} = request.body
    const {db} = await connectToDatabase();
    const collectionComen = db.collection('comentario');
    const colPerguntas = db.collection("pergunta")

    //deletar as resp do comen antes
    const collectionResp = db.collection('resposta_comentario');
    await collectionResp.deleteMany({"id_comentario": id});
    //Deletar comentarios
    const id_quest = await collectionComen.findOneAndDelete({"_id": ObjectId(id)}, {projection: {id_pergunta : true, _id: false}});
    await colPerguntas.updateOne({"_id" : ObjectId(id_quest.value.id_pergunta)}, { $inc : {"qtd_respostas" : -1}})
    return response.status(200).json({result: "Comentário deletado com sucesso!" })

}