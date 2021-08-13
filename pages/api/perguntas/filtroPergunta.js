import { connectToDatabase } from '../connect/mongoUtil';

export default async (request, response) => {
    var ObjectId = require('mongodb').ObjectId;
    const {frase, skip, num_perguntas} = await request.body;
    const {db} = await connectToDatabase();
    const colPerguntas = db.collection('pergunta');
    const colUsuarios = db.collection('usuario');

    //Filtro
    colPerguntas.createIndex( { "texto": "text" } )
    let perguntas = await colPerguntas.find({ "texto": new RegExp(frase, "gi") }).sort({_id:-1}).skip(skip).limit(num_perguntas).toArray();
    for (const quest of perguntas) {
        const obj_id = ObjectId(quest.id_user)
        const obj = await colUsuarios.findOne({_id: obj_id}, {projection: {username: true, foto: true, _id: false}})
        quest["username"] = await obj.username
        quest["foto"] = await obj.foto
    }

    return response.status(200).json({result: "Filtro da pergunta realizado com sucesso!", perguntas : perguntas });


}