import { connectToDatabase } from '../connect/mongoUtil';

export default async (request, response) => {
    var ObjectId = require('mongodb').ObjectId;
    const {id_comentario, id_user} = await request.body;
    const obj_id = ObjectId(id_comentario);
    const {db} = await connectToDatabase();
    const collection = db.collection('comentario');

    const curtiu = await collection.findOne({'_id': obj_id}, {projection: {pessoas_curtiram: true, _id: false}})
    if((curtiu.pessoas_curtiram.indexOf(id_user)) == -1){
        return response.status(200).json({result: "Sucesso!", res: false});
        //REtornar não curtiu
    }else{
        //retornar curtiu
        return response.status(200).json({result: "Sucesso!", res: true});
    }



}