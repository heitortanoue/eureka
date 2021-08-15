import { connectToDatabase } from '../connect/mongoUtil';

export default async (request, response) => {
    var ObjectId = require('mongodb').ObjectId;
    const {faculdade, curso, foto, bio, id_user} = await request.body
    const obj_id = ObjectId(id_user);
    const {db} = await connectToDatabase();
    const collection = db.collection('usuario');

    await collection.updateOne({'_id': obj_id}, { $set: {'curso' : curso, 'faculdade':faculdade, 'bio': bio,'foto':foto}} );

    return response.status(200).json({result: "Perfil editado com sucesso!"});
}