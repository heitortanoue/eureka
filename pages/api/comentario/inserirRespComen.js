import { connectToDatabase } from '../connect/mongoUtil';

//Função de inserir a pergunta do BDD
const inserirRespComen = async (request, response) => {
    const { user, texto, id_comentario } = await request.body
    const date = new Date();
    const {db} = await connectToDatabase();
    const collection = db.collection('resposta_comentario');

    let data = {}
    data.texto = texto;
    data.qtd_reacao = 0;
    data.date = date;
    data.qtd_denuncia = 0;
    data.id_user = user;
    data.id_comentario = id_comentario;

    await collection.insertOne(data);

    return response.status(200).json({result: "Resposta do comentário publicada com sucesso!" })

}

export default inserirRespComen