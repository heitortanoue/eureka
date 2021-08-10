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

    const res = await collection.insertOne(data);
    const id = await res.insertedId.toString()

    return response.status(200).json({result: "Pergunta postada com sucesso!", id_question: id})
}