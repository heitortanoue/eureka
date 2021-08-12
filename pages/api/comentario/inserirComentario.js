import { connectToDatabase } from '../connect/mongoUtil';

//Função de inserir a pergunta do BDD
export default async (request, response) => {
    const { user, texto, id_pergunta } = await request.body
    const date = new Date();
    const {db} = await connectToDatabase();
<<<<<<< HEAD
    const collectionComen = db.collection('comentario');
=======
    const collection = db.collection('comentario');
    var ObjectId = require('mongodb').ObjectId;
    const colPergunta = db.collection("pergunta")
    const id_obj_pergunta = ObjectId(id_pergunta)
>>>>>>> ff6062e2f5b41839276b294fea76473b4ed86b8b

    let data = {}
    data.texto = texto;
    data.qtd_reacao = 0;
    data.date = date;
    data.melhorComentario = 0;
    data.qtd_denuncia = 0;
    data.id_user = user;
    data.id_pergunta = id_pergunta;
<<<<<<< HEAD
    data.pessoas_curtiram = [];

    await collectionComen.insertOne(data);

    //


=======
    data.pessoas_curtiram = []

    await collection.insertOne(data);
    await colPergunta.updateOne({_id: id_obj_pergunta}, { $inc: {"qtd_respostas" : 1} })
>>>>>>> ff6062e2f5b41839276b294fea76473b4ed86b8b

    return response.status(200).json({result: "Comentário inserido com sucesso!", newComment: data})

}