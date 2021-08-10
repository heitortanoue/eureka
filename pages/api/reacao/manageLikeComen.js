import { connectToDatabase } from '../connect/mongoUtil';

export default async (request, response) => {
    var ObjectId = require('mongodb').ObjectId;
    const {id_comentario, id_user} = await request.body;
    const obj_id = ObjectId(id_comentario);
    const {db} = await connectToDatabase();
    const collection = db.collection('comentario');
    let res

    const comment = await collection.findOne({_id: obj_id}, {"pessoas_curtiram": 1})
    if (comment.pessoas_curtiram.indexOf(id_user.toString()) != -1) {
        // TIRAR
        await collection.update({_id: obj_id}, {'$pull': { 'pessoas_curtiram': id_user },  $inc : {'qtd_reacao' : -1}});
        res = false
    } else {
        // COLOCAR
        await collection.update({_id: obj_id},  { '$push': { 'pessoas_curtiram': id_user },  $inc : {'qtd_reacao' : 1}});
        res = true
    }
    return response.status(200).json({result: "Sucesso!", res: res});
}