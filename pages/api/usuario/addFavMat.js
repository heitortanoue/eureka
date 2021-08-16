import { connectToDatabase } from '../connect/mongoUtil';

const addFavMat = async (request, response) => {
    var ObjectId = require('mongodb').ObjectId;
    const {id_user, fav_disciplinas } = await request.body;
    const obj_id = ObjectId(id_user);
    const {db} = await connectToDatabase();
    const collection = db.collection('usuario');

    await collection.updateOne({'_id': obj_id}, { $set: {'fav_disciplinas' : fav_disciplinas}} );

    return response.status(200).json({result: "Matérias favoritas adicionadas sucesso!"});
}

export default addFavMat