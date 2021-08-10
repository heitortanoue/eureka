import { connectToDatabase } from '../connect/mongoUtil';

export default async (request, response) => {
    var ObjectId = require('mongodb').ObjectId;
    const {id_Comentario} = await request.body;
    const {db} = await connectToDatabase();
    const colRespComen = db.collection('resposta_comentario');
    const colUsuarios = db.collection('usuario');

    //Pega comentario de uma pergunta
    const resp_comen = await colRespComen.find({id_comentario: id_Comentario}).toArray();
    for (const quest of resp_comen) {
        const obj_id = ObjectId(quest.id_user)
        const obj = await colUsuarios.findOne({_id: obj_id}, {username: 1, foto: 1})
        quest["username"] = await obj.username
        quest["foto"] = await obj.foto
    }

    return response.status(201).json({result: "Respostas do comentário geradas com sucesso!", resp_comen : resp_comen });


}