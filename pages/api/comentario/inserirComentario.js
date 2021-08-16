import { connectToDatabase } from '../connect/mongoUtil';

//Função de inserir a pergunta do BDD
const inserirComentario = async (request, response) => {
    const { user, texto, id_pergunta } = await request.body
    const date = new Date();
    const {db} = await connectToDatabase();
    const collection = db.collection('comentario');
    var ObjectId = require('mongodb').ObjectId;
    const colPergunta = db.collection("pergunta")
    const id_obj_pergunta = ObjectId(id_pergunta)

    let data = {}
    data.texto = texto;
    data.qtd_reacao = 0;
    data.date = date;
    data.melhorComentario = 0;
    data.qtd_denuncia = 0;
    data.id_user = user;
    data.id_pergunta = id_pergunta;
    data.pessoas_curtiram = []

    await collection.insertOne(data);
    await colPergunta.updateOne({_id: id_obj_pergunta}, { $inc: {"qtd_respostas" : 1} })

    return response.status(200).json({result: "Comentário inserido com sucesso!", newComment: data})

}

export default inserirComentario