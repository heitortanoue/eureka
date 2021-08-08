import { connectToDatabase } from '../connect/mongoUtil';

//Função de inserir a pergunta do BDD
export default async (request, response) => {
    const { user, texto, materia, foto } = await request.body
    const date = new Date();
    const {db} = await connectToDatabase();
    const collection = db.collection('pergunta');

    let data = {}
    data.texto = texto;
    data.materia = materia;
    data.foto = foto;
    data.id_user = user;
    data.date = date;
    data.qtd_denuncia = 0;

    await collection.insertOne(data);

    return response.status(201).json({result: "Pergunta postada com sucesso!" })

}