import { connectToDatabase } from '../connect/mongoUtil';

export default async (request, response) => {
    var ObjectId = require('mongodb').ObjectId;
    const {valMateria} = await request.body;
    const {db} = await connectToDatabase();
    const colPerguntas = db.collection('pergunta');
    const colUsuarios = db.collection('usuario');

    
    //Filtro
    let perguntas = colPerguntas.find({ materia : { $text: { $search: valMateria } }} );
    for (const quest of perguntas) {
        const obj_id = ObjectId(quest.id_user)
        const obj = await colUsuarios.findOne({_id: obj_id}, {username: 1, foto: 1})
        quest["username"] = await obj.username
        quest["foto"] = await obj.foto
    }

    return response.status(201).json({result: "Filtro da matéria feito sucesso!", perguntas : perguntas });



}