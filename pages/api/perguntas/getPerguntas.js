import { connectToDatabase } from '../connect/mongoUtil';

export default async (request, response) => {
    const { skip, num_perguntas } = await request.body;
    const {db} = await connectToDatabase();
    const collection = db.collection('pergunta');
    const colUsuarios = db.collection('usuario');
    var ObjectId = require('mongodb').ObjectId; 

    //PEGAR PERGUNTAS
    let perguntas = await collection.find({}).sort({_id:-1}).skip(skip).limit(num_perguntas).toArray();
    for (const quest of perguntas) {
        const obj_id = ObjectId(quest.id_user)
        const obj = await colUsuarios.findOne({_id: obj_id}, {username: 1, foto: 1})
        quest["username"] = await obj.username
        quest["foto"] = await obj.foto
    }

    return response.status(200).json({result: "Lista de perguntas gerada com sucesso!", perguntas: perguntas });
}
