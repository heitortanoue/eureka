import { connectToDatabase } from '../connect/mongoUtil';

//Função de inserir a pergunta do BDD
export default async (request, response) => {
    const { user, texto, id_pergunta } = await request.body
    const date = new Date();
    const {db} = await connectToDatabase();
    const collection = db.collection('comentario');

    let data = {}
    data.texto = texto;
    data.qtd_reacao = 0;
    data.date = date;
    data.melhorComentario = 0;
    data.qtd_denuncia = 0;
    data.id_user = user;
    data.id_pergunta = id_pergunta;

    await collection.insertOne(data);

    return response.status(201).json({result: "Comentário inserido com sucesso!" })

}