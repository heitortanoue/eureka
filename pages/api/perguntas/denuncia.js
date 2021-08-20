import { connectToDatabase } from '../connect/mongoUtil';

const denuncia = async (request, response) => {
    var ObjectId = require('mongodb').ObjectId;
    const {id, texto, campo} = await request.body;
    const {db} = await connectToDatabase();
    const collection = db.collection('analise');
    
    const denuncia = await collection.findOne({$or:[{'id_pergunta': id}, {'id_comentario': id}]});

    if(denuncia){
        return response.status(400).json({result: "A pergunta já foi mandada para análise"});        
    }else{
        if(campo == 'pergunta'){
            const obj_id = ObjectId(id);
            const collectionPergunta = db.collection('pergunta');
            const pergunta = await collectionPergunta.findOne({'_id':obj_id}, {projection: {'qtd_denuncia': true}});
            if(pergunta.qtd_denuncia >= 9){
                await collection.insertOne({'id_pergunta': id, 'motivo': texto, 'data': new Date()});
                return response.status(200).json({result: "A pergunta foi mandada para análise"});
            }else{
                await collectionPergunta.updateOne({'_id': obj_id},  {$inc : {'qtd_denuncia' : 1}});
                return response.status(200).json({result: "Foi incrementado a qtd de denuncia"});
            }
        }else{
            const obj_id = ObjectId(id);
            const collectionComentario = db.collection('comentario');
            const comentario = await collectionComentario.findOne({'_id':obj_id}, {projection: {'qtd_denuncia': true}});
            if(comentario.qtd_denuncia >= 9){
                await collection.insertOne({'id_comentario': id, 'motivo': texto, 'data': new Date()});
                return response.status(200).json({result: "O comentário foi mandada para análise"});
            }else{
                await collectionComentario.updateOne({'_id': obj_id},  {$inc : {'qtd_denuncia' : 1}});
                return response.status(200).json({result: "Foi incrementado a qtd de denuncia"});
            }    
        }       
    }
}

export default denuncia