import { connectToDatabase } from '../connect/mongoUtil';

export default async (request, response) => {
    var ObjectId = require('mongodb').ObjectId;
    const {id_user, fav_disciplinas } = await request.body;
    const obj_id = ObjectId(id_user);
    const {db} = await connectToDatabase();
    const collection = db.collection('usuario');

    collection.findByIdAndUpdate(obj_id, {'$set' : {
       'materiasFav' : fav_disciplinas
    }});

    return response.status(201).json({result: "Matérias favoritas adicionadas sucesso!"});
}