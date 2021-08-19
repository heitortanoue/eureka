import { connectToDatabase } from '../connect/mongoUtil';
var bcrypt = require('bcryptjs');

const changePasswordOut = async (request, response) => {
    var ObjectId = require('mongodb').ObjectId;
    const {id_user, senha } = await request.body;
    const obj_id = ObjectId(id_user);
    const {db} = await connectToDatabase();
    const collection = db.collection('usuario');
    const salt = bcrypt.genSaltSync(10);
    
    const senhaDB = await collection.findOne({'_id': obj_id}, {projection: { senha: true }});
    if( bcrypt.compareSync( senha, senhaDB.senha) ){
        return response.status(400).json({result: "A senha que você está tentando colocar é igual a senha atual"});
    }else{
        const hash = bcrypt.hashSync(senha, salt);
        await collection.updateOne({'_id': obj_id}, { $set: {senha : hash}} );
        return response.status(200).json({result: "Senha editada com sucesso!"});
    }
  
}

export default changePasswordOut