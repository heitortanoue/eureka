import { connectToDatabase } from '../connect/mongoUtil';

export default async (request, response) => {
    const { skip, num_perguntas } = await request.body;
    const {db} = await connectToDatabase();
    const collection = db.collection('pergunta');

    //PEGAR PERGUNTAS
    const perguntas = await collection.find({}).sort({_id:-1}).skip(skip).limit(num_perguntas).toArray();

    return response.status(201).json({result: "Lista de perguntas gerada com sucesso!", perguntas: perguntas });
}
