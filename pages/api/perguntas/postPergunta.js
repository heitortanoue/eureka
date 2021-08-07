import { connectToDatabase } from '../connect/mongoUtil';

//Função de inserir a pergunta do BDD
export default async (request, response) => {
    const { user, texto, assunto, materia, foto } = await request.body
    const date = new Date();
    const {db} = await connectToDatabase();
    const collection = db.collection('pergunta');

    let data = {}
    data.texto = texto;
    data.qtd_reacao = 0;
    data.assunto = assunto;
    data.materia = materia;
    data.foto = foto;
    data.id_user = user;
    data.date = date;

    await collection.insertOne(data);

    return response.status(201).json({result: "Pergunta postada com sucesso!" })

}