import { connectToDatabase } from '../connect/mongoUtil';

const deleteUser = async (request, response) => {
    var ObjectId = require('mongodb').ObjectId;
    const {id_user} = await request.body;
    const obj_id = ObjectId(id_user);
    const {db} = await connectToDatabase();
    const collectionUser = db.collection('usuario');
    const collectionComen = db.collection('comentario');
    const collectionPerg = db.collection('pergunta');
    const collectionResp = db.collection('resposta_comentario');
    
    //Remover respostas
    await collectionResp.deleteMany({"id_user": id_user});

    //Remover curtidas que o user fez (decrementar em cada lugar a reação retirada)
    const allComen = await collectionComen.find().toArray();
    for(const comen of allComen){
        const curtiu = await collection.findOne({'_id': ObjectId(comen._id)}, {projection: {pessoas_curtiram: true}})
        if((curtiu.pessoas_curtiram.indexOf(id_user)) != -1){
           await collectionComen.updateOne({'_id': ObjectId(comen._id)}, { $set : {'$pull': { 'pessoas_curtiram': id_user },  $inc : {'qtd_reacao' : -1}}});
        }

        if(comen.id_user == id_user){
            //deletar as resp do comen antes
            await collectionResp.deleteMany({"id_comentario": id});

            const id_quest = await collectionComen.findOneAndDelete({"_id": ObjectId(comen._id)}, {projection:{"id_pergunta" : true}});
            await collectionPerg.updateOne({"_id" : ObjectId(id_quest.value.id_pergunta)}, {$set: { $inc : {"qtd_respostas" : -1}}})
        }
    } 
    
    //Remover perguntas
    await collectionPerg.deleteMany({"id_user": id_user});

    //Remover o user
    await collectionUser.deleteOne({'_id': obj_id });

    return response.status(200).json({result: "Perfil apagado!"});
}

export default deleteUser