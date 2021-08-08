import { connectToDatabase } from '../connect/mongoUtil';

export default async (request, response) => {
    var ObjectId = require('mongodb').ObjectId;
    const {id_pergunta} = await request.body;
    const obj_idPergun = ObjectId(id_pergunta);
    const {db} = await connectToDatabase();
    const colComentario = db.collection('comentario');
    const colUsuarios = db.collection('usuario');

    //Pega comentario de uma pergunta
    const comentarios = await colComentario.find({id_pergunta: obj_idPergun}).toArray();
    for (const quest of comentarios) {
        const obj_id = ObjectId(quest.id_user)
        const obj = await colUsuarios.findOne({_id: obj_id}, {username: 1, foto: 1})
        quest["username"] = await obj.username
        quest["foto"] = await obj.foto
    }

    return response.status(201).json({result: "Comentários da pergunta gerados com sucesso!", comentarios : comentarios });


}