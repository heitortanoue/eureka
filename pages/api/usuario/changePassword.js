import { connectToDatabase } from '../connect/mongoUtil';
var bcrypt = require('bcryptjs');

const changePassword = async (request, response) => {
    var ObjectId = require('mongodb').ObjectId;
    const {id_user, oldSenha, newSenha } = await request.body;
    const obj_id = ObjectId(id_user);
    const {db} = await connectToDatabase();
    const collection = db.collection('usuario');
    const salt = bcrypt.genSaltSync(10);
    
    const senha = await collection.findOne({'_id': obj_id}, {projection: { senha: true }});

    if( bcrypt.compareSync(oldSenha, senha.senha) ){
        if( bcrypt.compareSync( newSenha, senha.senha) ){
            return response.status(400).json({result: "A senha que você está tentando colocar é igual a senha atual"});
        }else{
            const hash = bcrypt.hashSync(newSenha, salt);
            await collection.updateOne({'_id': obj_id}, { $set: {senha : hash}} );
            return response.status(200).json({result: "Senha editada com sucesso!"});
        }
    }else{
        return response.status(400).json({result: "A senha digitada é diferente da sua senha atual"});
    }
}

export default changePassword